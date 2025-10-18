/**
 * assertions.js
 * Reusable assertion helper functions for Postman test scripts
 * These functions standardize common API validation patterns
 */

/**
 * Checks if the HTTP response status code matches the expected value
 * @param {Object} pm - Postman scripting object
 * @param {number} expectedStatus - Expected HTTP status code (e.g., 200, 201, 404)
 */
function assertStatusCode(pm, expectedStatus) {
    // Get the actual response status code from the response
    const actualStatus = pm.response.code;
    
    // Create a descriptive test name
    const testName = `Status code is ${expectedStatus}`;
    
    // Perform the assertion using Postman's test method
    pm.test(testName, function() {
        pm.expect(actualStatus).to.eql(expectedStatus);
    });
}

/**
 * Validates that the response time is within acceptable limits
 * @param {Object} pm - Postman scripting object
 * @param {number} maxTime - Maximum acceptable response time in milliseconds
 */
function assertResponseTime(pm, maxTime) {
    // Create a descriptive test name with the max time threshold
    const testName = `Response time is less than ${maxTime}ms`;
    
    // Check that response time is below the threshold
    pm.test(testName, function() {
        pm.expect(pm.response.responseTime).to.be.below(maxTime);
    });
}

/**
 * Verifies that the response body contains a specific field
 * @param {Object} pm - Postman scripting object
 * @param {string} fieldName - Name of the field to check (e.g., "id", "email")
 */
function assertFieldExists(pm, fieldName) {
    // Create a descriptive test name
    const testName = `Response has field: ${fieldName}`;
    
    // Parse the JSON response body
    const jsonData = pm.response.json();
    
    // Check if the field exists in the response
    pm.test(testName, function() {
        pm.expect(jsonData).to.have.property(fieldName);
    });
}

/**
 * Validates that a specific field has an expected value
 * @param {Object} pm - Postman scripting object
 * @param {string} fieldName - Name of the field to check
 * @param {*} expectedValue - Expected value of the field
 */
function assertFieldValue(pm, fieldName, expectedValue) {
    // Create a descriptive test name
    const testName = `Field '${fieldName}' equals '${expectedValue}'`;
    
    // Parse the JSON response body
    const jsonData = pm.response.json();
    
    // Check that the field value matches expected value
    pm.test(testName, function() {
        pm.expect(jsonData[fieldName]).to.eql(expectedValue);
    });
}

/**
 * Verifies that the response body is valid JSON
 * @param {Object} pm - Postman scripting object
 */
function assertValidJson(pm) {
    // Create a descriptive test name
    const testName = "Response is valid JSON";
    
    // Attempt to parse response as JSON
    pm.test(testName, function() {
        pm.response.to.be.json;
    });
}

/**
 * Checks that a response header exists and optionally matches a value
 * @param {Object} pm - Postman scripting object
 * @param {string} headerName - Name of the header (e.g., "Content-Type")
 * @param {string} expectedValue - Optional expected value of the header
 */
function assertHeader(pm, headerName, expectedValue = null) {
    // Check if header exists
    pm.test(`Header '${headerName}' exists`, function() {
        pm.expect(pm.response.headers.has(headerName)).to.be.true;
    });
    
    // If expected value is provided, validate it
    if (expectedValue !== null) {
        const testName = `Header '${headerName}' equals '${expectedValue}'`;
        pm.test(testName, function() {
            pm.expect(pm.response.headers.get(headerName)).to.include(expectedValue);
        });
    }
}

/**
 * Validates that an array field has a specific length
 * @param {Object} pm - Postman scripting object
 * @param {string} arrayFieldName - Name of the array field
 * @param {number} expectedLength - Expected array length
 */
function assertArrayLength(pm, arrayFieldName, expectedLength) {
    // Create a descriptive test name
    const testName = `Array '${arrayFieldName}' has length ${expectedLength}`;
    
    // Parse the JSON response body
    const jsonData = pm.response.json();
    
    // Check array length
    pm.test(testName, function() {
        pm.expect(jsonData[arrayFieldName]).to.be.an('array').that.has.lengthOf(expectedLength);
    });
}

/**
 * Validates that a field is not null or undefined
 * @param {Object} pm - Postman scripting object
 * @param {string} fieldName - Name of the field to check
 */
function assertNotNull(pm, fieldName) {
    // Create a descriptive test name
    const testName = `Field '${fieldName}' is not null`;
    
    // Parse the JSON response body
    const jsonData = pm.response.json();
    
    // Check that field is not null or undefined
    pm.test(testName, function() {
        pm.expect(jsonData[fieldName]).to.not.be.null;
        pm.expect(jsonData[fieldName]).to.not.be.undefined;
    });
}

/**
 * Validates response against a JSON schema
 * @param {Object} pm - Postman scripting object
 * @param {Object} schema - JSON schema object
 */
function assertJsonSchema(pm, schema) {
    // Create a descriptive test name
    const testName = "Response matches JSON schema";
    
    // Validate response against schema
    pm.test(testName, function() {
        pm.response.to.have.jsonSchema(schema);
    });
}

// Export all assertion functions for use in Postman scripts
// Note: In Postman, you'll need to use eval() to load these functions
module.exports = {
    assertStatusCode,
    assertResponseTime,
    assertFieldExists,
    assertFieldValue,
    assertValidJson,
    assertHeader,
    assertArrayLength,
    assertNotNull,
    assertJsonSchema
};

