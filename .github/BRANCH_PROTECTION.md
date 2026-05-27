# Recommended branch protection for `main`

Apply the following branch protection settings to the `main` branch:

- Require pull requests before merging.
- Require at least 1 approving review.
- Dismiss stale pull request approvals when new commits are pushed.
- Require status checks to pass before merging.
- Require the CI workflow checks to succeed before merging.
- Require linear history.
- Do not allow force pushes.
- Require signed commits (recommended).
