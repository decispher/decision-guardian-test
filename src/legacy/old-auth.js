/**
 * LEGACY AUTHENTICATION - DEPRECATED
 * 
 * This module is deprecated and scheduled for removal.
 * Use src/api/auth.js instead.
 * 
 * See DECISION-DEPRECATED-001 (should NOT trigger alerts)
 */

// Legacy code for testing deprecated decision status
module.exports = {
    deprecated: true,
    message: 'This file is only for testing deprecated decisions',
    testStatus: 'deprecated check',
    newField: 'testing-change' // Added to verify if this triggers an alert (should be ignored)
};
