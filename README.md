# Decision Guardian Test Repository

This repository is designed to test all features of the [Decision Guardian](https://github.com/marketplace/actions/decision-guardian) GitHub Action.

## 🧪 Test Scenarios

### 1. Critical Severity - Database Decision (DECISION-DB-001)
- **File**: `src/database/connection.js`, `config/database.yml`
- **Expected**: PR blocked with Critical alert

### 2. Warning Severity - API Decision (DECISION-API-001)
- **File**: `src/api/**/*.js`
- **Expected**: Warning comment, PR not blocked

### 3. Advanced Rules - Security Decision (DECISION-SEC-001)
- **Action**: Add hardcoded credentials to any `src/**/*.js`
- **Expected**: Regex content matching triggers Critical alert

### 4. Info Severity - Config Decision (DECISION-CONFIG-001)
- **File**: `config/*.yml`
- **Expected**: Info comment only

### 5. Deprecated Status (DECISION-DEPRECATED-001)
- **File**: `src/legacy/*.js`
- **Expected**: NO alert (Status: Deprecated)

## 📋 Test Procedure

1. Push this repo to GitHub
2. Create test branches and PRs modifying specific files
3. Verify Decision Guardian comments appear correctly
4. Check that Critical decisions block PRs (when enabled)

## 📁 Structure

```
├── .decispher/
│   └── decisions.md       # Decision definitions
├── .github/
│   └── workflows/
│       └── decision-guardian.yml
├── src/
│   ├── api/
│   │   ├── users.js       # Triggers DECISION-API-001
│   │   └── auth.js        # For security testing
│   ├── database/
│   │   └── connection.js  # Triggers DECISION-DB-001
│   └── legacy/
│       └── old-auth.js    # Tests deprecated status
└── config/
    └── database.yml       # Triggers DECISION-DB-001/CONFIG-001
```
