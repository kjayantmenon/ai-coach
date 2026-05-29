#!/usr/bin/env python3
"""Create GitHub issues from local markdown files in an issues/ folder.

Reads numbered markdown files (e.g. 001-foo.md, 002-bar.md), creates them as
GitHub issues in dependency order, and rewrites local `Blocked by` references
to live issue numbers as it goes.

Usage:
    create_issues.py [--repo OWNER/NAME] [--issues-dir PATH] [--dry-run]

If --repo is omitted, the script uses `gh repo view` on the current directory.
If --issues-dir is omitted, the script uses ./issues relative to cwd.

Conventions assumed:
  * Filenames match the pattern `NNN-slug.md` where NNN is a zero-padded number.
  * A file named `prd.md` (or any non-numbered file) is ignored.
  * The issue title is derived from the filename: `NNN: Slug With Spaces`,
    unless the file contains a top-level `# Title` heading on the first line.
  * `Blocked by` references look like `Blocked by ` + backtick + `issues/NNN-slug.md` + backtick
    and are rewritten to `Blocked by #N` after that file has been created.
"""
import argparse
import pathlib
import re
import subprocess
import sys


def discover_files(issues_dir: pathlib.Path) -> list[pathlib.Path]:
    pattern = re.compile(r"^(\d+)-.+\.md$")
    files = [p for p in issues_dir.iterdir() if p.is_file() and pattern.match(p.name)]
    files.sort(key=lambda p: int(pattern.match(p.name).group(1)))
    return files


def derive_title(path: pathlib.Path) -> str:
    text = path.read_text()
    first_line = text.splitlines()[0] if text else ""
    if first_line.startswith("# "):
        return first_line[2:].strip()
    stem = path.stem  # e.g. "001-walking-skeleton"
    m = re.match(r"^(\d+)-(.+)$", stem)
    if not m:
        return stem
    num, slug = m.group(1), m.group(2)
    words = slug.replace("-", " ").strip()
    return f"{num}: {words[0].upper() + words[1:]}" if words else num


def resolve_repo(explicit: str | None) -> str:
    if explicit:
        return explicit
    result = subprocess.run(
        ["gh", "repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        sys.exit(f"Could not resolve repo via `gh repo view`:\n{result.stderr}")
    return result.stdout.strip()


def rewrite_blocked_by(body: str, filename_to_number: dict[str, int]) -> str:
    def repl(match: re.Match) -> str:
        ref = match.group(1)
        if ref in filename_to_number:
            return f"Blocked by #{filename_to_number[ref]}"
        return match.group(0)
    return re.sub(r"Blocked by `issues/([^`]+)`", repl, body)


def create_issue(repo: str, title: str, body: str, dry_run: bool) -> int:
    if dry_run:
        print(f"--- DRY RUN: would create issue ---")
        print(f"Title: {title}")
        print(f"Body:\n{body}\n--- end ---")
        return 0
    result = subprocess.run(
        ["gh", "issue", "create", "--repo", repo, "--title", title, "--body", body],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        sys.exit(f"FAILED creating issue '{title}':\n{result.stderr}")
    url = result.stdout.strip()
    return int(url.rsplit("/", 1)[-1])


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", help="OWNER/NAME (default: inferred from `gh repo view`)")
    parser.add_argument("--issues-dir", default="issues",
                        help="Directory containing NNN-*.md files (default: ./issues)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Print what would be created without calling gh")
    args = parser.parse_args()

    issues_dir = pathlib.Path(args.issues_dir).resolve()
    if not issues_dir.is_dir():
        sys.exit(f"Issues directory not found: {issues_dir}")

    repo = resolve_repo(args.repo) if not args.dry_run else (args.repo or "<inferred>")
    files = discover_files(issues_dir)
    if not files:
        sys.exit(f"No numbered markdown files found in {issues_dir}")

    print(f"Repo: {repo}")
    print(f"Found {len(files)} issue file(s) in {issues_dir}\n")

    filename_to_number: dict[str, int] = {}
    for path in files:
        title = derive_title(path)
        body = rewrite_blocked_by(path.read_text(), filename_to_number)
        number = create_issue(repo, title, body, args.dry_run)
        filename_to_number[path.name] = number
        print(f"{path.name:55s} -> #{number}")

    print(f"\nDone. Created {len(filename_to_number)} issue(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
