/**
 * logger.js
 * Centralized logging utility for standardized console output
 * Provides different log levels (INFO, WARN, ERROR, SUCCESS, DEBUG)
 */

const fs = require('fs');
const path = require('path');

/**
 * Gets current timestamp in readable format
 * @returns {string} Formatted timestamp string
 */
function getTimestamp() {
    // Create a new Date object with current time
    const now = new Date();
    
    // Format as YYYY-MM-DD HH:MM:SS
    const timestamp = now.toISOString().replace('T', ' ').substr(0, 19);
    
    // Return the formatted timestamp
    return timestamp;
}

/**
 * Logs an INFO level message (general information)
 * @param {string} message - Message to log
 */
function logInfo(message) {
    // Create formatted log entry with timestamp and level
    const logEntry = `[${getTimestamp()}] [INFO] ${message}`;
    
    // Output to console
    console.log(`ℹ️  ${logEntry}`);
    
    // Optionally write to file
    writeToLogFile(logEntry);
}

/**
 * Logs a WARNING level message (potential issues)
 * @param {string} message - Message to log
 */
function logWarn(message) {
    // Create formatted log entry with timestamp and level
    const logEntry = `[${getTimestamp()}] [WARN] ${message}`;
    
    // Output to console with warning styling
    console.warn(`⚠️  ${logEntry}`);
    
    // Write to log file
    writeToLogFile(logEntry);
}

/**
 * Logs an ERROR level message (failures and exceptions)
 * @param {string} message - Message to log
 * @param {Error} error - Optional error object with stack trace
 */
function logError(message, error = null) {
    // Create formatted log entry with timestamp and level
    let logEntry = `[${getTimestamp()}] [ERROR] ${message}`;
    
    // If error object is provided, include error details
    if (error) {
        logEntry += `\n    Error Details: ${error.message}`;
        if (error.stack) {
            logEntry += `\n    Stack Trace: ${error.stack}`;
        }
    }
    
    // Output to console with error styling
    console.error(`❌ ${logEntry}`);
    
    // Write to log file
    writeToLogFile(logEntry);
}

/**
 * Logs a SUCCESS level message (successful operations)
 * @param {string} message - Message to log
 */
function logSuccess(message) {
    // Create formatted log entry with timestamp and level
    const logEntry = `[${getTimestamp()}] [SUCCESS] ${message}`;
    
    // Output to console with success styling
    console.log(`✅ ${logEntry}`);
    
    // Write to log file
    writeToLogFile(logEntry);
}

/**
 * Logs a DEBUG level message (detailed debugging information)
 * @param {string} message - Message to log
 * @param {Object} data - Optional data object to log
 */
function logDebug(message, data = null) {
    // Create formatted log entry with timestamp and level
    let logEntry = `[${getTimestamp()}] [DEBUG] ${message}`;
    
    // If data object is provided, stringify and include it
    if (data) {
        logEntry += `\n    Data: ${JSON.stringify(data, null, 2)}`;
    }
    
    // Output to console
    console.log(`🐛 ${logEntry}`);
    
    // Write to log file
    writeToLogFile(logEntry);
}

/**
 * Logs test execution start
 * @param {string} testName - Name of the test being executed
 */
function logTestStart(testName) {
    // Create separator line for visual clarity
    const separator = '='.repeat(60);
    
    // Log test start with formatting
    console.log(`\n${separator}`);
    console.log(`🚀 Starting Test: ${testName}`);
    console.log(`${separator}\n`);
    
    // Write to log file
    writeToLogFile(`\n${separator}`);
    writeToLogFile(`Starting Test: ${testName}`);
    writeToLogFile(`${separator}\n`);
}

/**
 * Logs test execution end with results
 * @param {string} testName - Name of the test that was executed
 * @param {boolean} passed - Whether the test passed (true) or failed (false)
 */
function logTestEnd(testName, passed) {
    // Create separator line for visual clarity
    const separator = '='.repeat(60);
    
    // Determine status message based on pass/fail
    const status = passed ? '✅ PASSED' : '❌ FAILED';
    
    // Log test end with formatting
    console.log(`\n${separator}`);
    console.log(`Test: ${testName} - ${status}`);
    console.log(`${separator}\n`);
    
    // Write to log file
    writeToLogFile(`\n${separator}`);
    writeToLogFile(`Test: ${testName} - ${status}`);
    writeToLogFile(`${separator}\n`);
}

/**
 * Logs HTTP request details (for API debugging)
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} url - Request URL
 * @param {Object} headers - Request headers
 * @param {Object} body - Request body
 */
function logRequest(method, url, headers = {}, body = null) {
    // Log request details in structured format
    console.log(`📤 REQUEST: ${method} ${url}`);
    console.log(`   Headers: ${JSON.stringify(headers, null, 2)}`);
    
    // If body exists, log it
    if (body) {
        console.log(`   Body: ${JSON.stringify(body, null, 2)}`);
    }
    
    // Write to log file
    const logEntry = `REQUEST: ${method} ${url}\nHeaders: ${JSON.stringify(headers)}\nBody: ${JSON.stringify(body)}`;
    writeToLogFile(logEntry);
}

/**
 * Logs HTTP response details (for API debugging)
 * @param {number} statusCode - HTTP status code
 * @param {Object} headers - Response headers
 * @param {Object} body - Response body
 * @param {number} responseTime - Response time in milliseconds
 */
function logResponse(statusCode, headers = {}, body = null, responseTime = 0) {
    // Log response details in structured format
    console.log(`📥 RESPONSE: Status ${statusCode} (${responseTime}ms)`);
    console.log(`   Headers: ${JSON.stringify(headers, null, 2)}`);
    
    // If body exists, log it
    if (body) {
        console.log(`   Body: ${JSON.stringify(body, null, 2)}`);
    }
    
    // Write to log file
    const logEntry = `RESPONSE: Status ${statusCode} (${responseTime}ms)\nHeaders: ${JSON.stringify(headers)}\nBody: ${JSON.stringify(body)}`;
    writeToLogFile(logEntry);
}

/**
 * Writes log entry to a file (for persistent logging)
 * @param {string} logEntry - Log message to write
 */
function writeToLogFile(logEntry) {
    try {
        // Define log file path (in logs directory)
        const logDir = path.join(process.cwd(), 'logs');
        
        // Create logs directory if it doesn't exist
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        
        // Create log filename with current date
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const logFile = path.join(logDir, `test-execution-${date}.log`);
        
        // Append log entry to file with newline
        fs.appendFileSync(logFile, logEntry + '\n', 'utf8');
    } catch (error) {
        // If file write fails, silently continue (don't break test execution)
        console.error(`Failed to write to log file: ${error.message}`);
    }
}

// Export all logging functions
module.exports = {
    logInfo,
    logWarn,
    logError,
    logSuccess,
    logDebug,
    logTestStart,
    logTestEnd,
    logRequest,
    logResponse,
    getTimestamp
};

