<!-- DECISION-DB-001 -->
## Decision: Database Connection Pool Configuration

**Status**: Active
**Date**: 2024-03-15
**Severity**: Critical

**Files**:
- `src/database/connection.js`
- `config/database.yml`

### Context

We fixed the connection pool size at **20 connections** after extensive load testing. This decision was made because:

1. **Memory constraints**: Each connection uses ~5MB of memory
2. **Database limits**: Our PostgreSQL instance supports max 100 connections
3. **Performance testing**: Higher values caused connection leaks under sustained traffic (5K req/s)

**Alternatives rejected:**
- Dynamic pooling: Added latency spikes during scaling
- MongoDB: Billing requires ACID compliance

> [!WARNING]
> Do not modify pool size without load testing. Contact @senior-engineer before changes.

**Related:**
- [Load Test Results](https://internal-docs/load-tests)
- [Architecture Decision Record](https://internal-docs/adr-001)

---

<!-- DECISION-API-001 -->
## Decision: Public API v1 Protection

**Status**: Active
**Date**: 2024-02-20
**Severity**: Warning

**Files**:
- `src/api/**/*.js`

### Context

The v1 API is used by **50+ external partners**. Any changes to these endpoints require:

1. **Advance notice**: Notify partners 2 weeks before breaking changes
2. **Versioning**: Use semantic versioning for the API
3. **Documentation**: Update OpenAPI spec before merging

**Before merging changes to API files:**
- [ ] Update API documentation
- [ ] Notify integration partners if breaking
- [ ] Version bump if needed

---

<!-- DECISION-SEC-001 -->
## Decision: No Hardcoded Credentials

**Status**: Active
**Date**: 2024-01-10
**Severity**: Critical

**Rules**:
```json
{
  "type": "file",
  "pattern": "src/**/*.js",
  "exclude": "**/*.test.js",
  "content_rules": [
    {
      "mode": "regex",
      "pattern": "(password|api[_-]?key|secret)\\s*[=:]\\s*['\"][^'\"]+['\"]",
      "flags": "i"
    }
  ]
}
```

### Context

Hardcoded credentials are a security vulnerability. This rule detects patterns like:
- `password = "secret123"`
- `apiKey: 'abc-def-123'`
- `API_SECRET = "xyz"`

**Instead, use:**
- Environment variables (`process.env.API_KEY`)
- AWS Secrets Manager
- HashiCorp Vault

---

<!-- DECISION-CONFIG-001 -->
## Decision: Configuration File Format

**Status**: Active
**Date**: 2024-02-01
**Severity**: Info

**Files**:
- `config/*.yml`
- `config/*.yaml`

### Context

We use YAML for all configuration files for consistency. JSON configs were migrated to YAML in Feb 2024.

---

<!-- DECISION-DEPRECATED-001 -->
## Decision: Legacy Authentication (Deprecated)

**Status**: Deprecated
**Date**: 2023-06-15
**Severity**: Warning

**Files**:
- `src/legacy/*.js`

### Context

This decision tracked our old JWT implementation. It has been superseded by DECISION-AUTH-002.

**Note:** This is a deprecated decision and should NOT trigger alerts.

---
