# AI Coach Security Practices

This document captures the baseline security expectations for developing and operating AI Coach.

## Dependency Management

- Keep runtime and development dependencies updated on a regular cadence
- Run `npm audit` during maintenance work and investigate meaningful findings
- Review dependency changes carefully in pull requests, especially Azure SDK updates
- Remove unused packages to reduce attack surface and maintenance overhead

## Secret Management

- Never commit secrets, Cosmos DB keys, or production connection details
- Use `.env` for local development only, and keep it out of version control
- Use Azure Key Vault or another managed secret store in production
- Rotate Cosmos DB keys if there is any chance they were exposed
- Keep separate credentials for local, test, and production environments

## Code Review Requirements

Changes to AI Coach should receive peer review with focus on:

- new configuration inputs or secret-handling paths
- Cosmos DB access patterns and partition key usage
- error messages that may accidentally expose sensitive details
- test coverage for failure handling and security-sensitive behavior

## CI/CD Security Checks

AI Coach already includes security automation under `.github/workflows/security.yml`.

### Current checks

- **CodeQL** analysis for JavaScript/TypeScript code scanning
- **Dependency Review** on pull requests to catch risky dependency changes

### Supporting quality gates

The main CI workflow also helps security by enforcing:

- linting
- formatting checks
- build validation
- automated tests

## Cosmos DB Security Best Practices

When deploying AI Coach against Azure Cosmos DB:

- prefer Azure RBAC and managed identities where possible over widely shared account keys
- restrict network access with private endpoints, firewall rules, or approved IP ranges
- use TLS for all client connections and rely on Cosmos DB encryption at rest
- isolate dev, test, and production data into separate databases or accounts
- review query patterns to avoid broad reads over user data
- monitor account access and throughput anomalies for signs of misuse or configuration drift

## Reporting Vulnerabilities

If you discover a vulnerability, follow the process in [SECURITY.md](../SECURITY.md). Do not open public issues or pull requests for active security problems.

## Related Documentation

- [Project README](../README.md)
- [Development Guide](development-guide.md)
- [Architecture Overview](architecture.md)
