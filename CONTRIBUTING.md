# Contributing to AI Coach

Thank you for your interest in contributing to AI Coach. This document explains how to get set up, how to contribute changes, and what is expected before you open a pull request.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Prerequisites

Before you begin, make sure you have the following installed and available:

- [Node.js](https://nodejs.org/) 20 or later
- [npm](https://www.npmjs.com/)
- Either the Azure Cosmos DB Emulator or access to an Azure Cosmos DB instance

## Fork and Clone Workflow

1. Fork this repository to your own GitHub account.
2. Clone your fork locally:

   ```bash
   git clone https://github.com/<your-account>/ai-coach.git
   cd ai-coach
   ```

3. Add the upstream remote:

   ```bash
   git remote add upstream https://github.com/<upstream-owner>/ai-coach.git
   ```

4. Sync with upstream before starting new work:

   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

## Branch Naming Conventions

Create a focused branch for each change using one of these prefixes:

- `feature/<short-description>`
- `bugfix/<short-description>`
- `docs/<short-description>`

Examples:

- `feature/chat-session-history`
- `bugfix/cosmos-connection-retry`
- `docs/setup-guide`

## Code Style

This project uses ESLint and Prettier for code quality and formatting.

Before submitting changes, run:

```bash
npm run lint
npm run format
```

Keep changes small, readable, and consistent with the surrounding code.

## Testing Requirements

Contributors are expected to add or update tests for functional changes. Run the test suite locally before opening a pull request:

```bash
npm test
```

If your change cannot be tested automatically, explain the manual validation steps in the pull request description.

## Commit Message Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

Examples:

- `feat: add coaching session summary endpoint`
- `fix: handle Cosmos DB timeout during startup`
- `docs: clarify local development prerequisites`

## Pull Request Process

1. Ensure your branch is up to date with the latest upstream changes.
2. Complete the pull request template in full.
3. Verify that CI passes successfully.
4. Ensure all requested tests and checks have been completed.
5. Obtain at least one approval from a project maintainer before merge.

## Contributor License Agreement (CLA)

This project requires contributors to sign the Microsoft Contributor License Agreement (CLA). When you open a pull request, the Microsoft CLA bot will determine whether you need to provide a CLA and guide you through the process.

For details, visit [https://cla.opensource.microsoft.com](https://cla.opensource.microsoft.com).

## Reporting Issues

- For bugs and feature requests, use GitHub Issues.
- For questions, use GitHub Discussions.
- For security vulnerabilities, follow the instructions in [SECURITY.md](SECURITY.md).

We appreciate your contributions and your help in making AI Coach better.


-----
Thank you

