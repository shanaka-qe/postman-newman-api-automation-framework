/**
 * env_helper.js
 * Helper functions to manage Postman environment variables dynamically
 * Simplifies reading, writing, and clearing environment variables
 */

/**
 * Sets an environment variable in Postman
 * @param {Object} pm - Postman scripting object
 * @param {string} key - Variable name/key
 * @param {*} value - Value to store (will be converted to string)
 */
function setEnvVar(pm, key, value) {
    // Convert value to string (Postman stores all vars as strings)
    const stringValue = String(value);
    
    // Set the environment variable using Postman API
    pm.environment.set(key, stringValue);
    
    // Log the action for debugging purposes
    console.log(`✓ Environment variable set: ${key} = ${stringValue}`);
}

/**
 * Gets an environment variable from Postman
 * @param {Object} pm - Postman scripting object
 * @param {string} key - Variable name/key to retrieve
 * @returns {string} Value of the environment variable
 */
function getEnvVar(pm, key) {
    // Retrieve the environment variable using Postman API
    const value = pm.environment.get(key);
    
    // Check if variable exists
    if (value === undefined || value === null) {
        console.warn(`⚠ Environment variable '${key}' not found`);
        return null;
    }
    
    // Log the retrieval for debugging
    console.log(`✓ Retrieved environment variable: ${key} = ${value}`);
    
    // Return the variable value
    return value;
}

/**
 * Removes an environment variable from Postman
 * @param {Object} pm - Postman scripting object
 * @param {string} key - Variable name/key to remove
 */
function clearEnvVar(pm, key) {
    // Unset the environment variable using Postman API
    pm.environment.unset(key);
    
    // Log the action for debugging
    console.log(`✓ Environment variable cleared: ${key}`);
}

/**
 * Checks if an environment variable exists
 * @param {Object} pm - Postman scripting object
 * @param {string} key - Variable name/key to check
 * @returns {boolean} True if variable exists, false otherwise
 */
function hasEnvVar(pm, key) {
    // Get the variable value
    const value = pm.environment.get(key);
    
    // Return true if value exists (not null or undefined)
    return value !== undefined && value !== null;
}

/**
 * Sets a global variable in Postman (persists across collections)
 * @param {Object} pm - Postman scripting object
 * @param {string} key - Variable name/key
 * @param {*} value - Value to store
 */
function setGlobalVar(pm, key, value) {
    // Convert value to string
    const stringValue = String(value);
    
    // Set the global variable using Postman API
    pm.globals.set(key, stringValue);
    
    // Log the action for debugging
    console.log(`✓ Global variable set: ${key} = ${stringValue}`);
}

/**
 * Gets a global variable from Postman
 * @param {Object} pm - Postman scripting object
 * @param {string} key - Variable name/key to retrieve
 * @returns {string} Value of the global variable
 */
function getGlobalVar(pm, key) {
    // Retrieve the global variable using Postman API
    const value = pm.globals.get(key);
    
    // Check if variable exists
    if (value === undefined || value === null) {
        console.warn(`⚠ Global variable '${key}' not found`);
        return null;
    }
    
    // Log the retrieval for debugging
    console.log(`✓ Retrieved global variable: ${key} = ${value}`);
    
    // Return the variable value
    return value;
}

/**
 * Sets a collection variable in Postman (scoped to current collection)
 * @param {Object} pm - Postman scripting object
 * @param {string} key - Variable name/key
 * @param {*} value - Value to store
 */
function setCollectionVar(pm, key, value) {
    // Convert value to string
    const stringValue = String(value);
    
    // Set the collection variable using Postman API
    pm.collectionVariables.set(key, stringValue);
    
    // Log the action for debugging
    console.log(`✓ Collection variable set: ${key} = ${stringValue}`);
}

/**
 * Gets a collection variable from Postman
 * @param {Object} pm - Postman scripting object
 * @param {string} key - Variable name/key to retrieve
 * @returns {string} Value of the collection variable
 */
function getCollectionVar(pm, key) {
    // Retrieve the collection variable using Postman API
    const value = pm.collectionVariables.get(key);
    
    // Check if variable exists
    if (value === undefined || value === null) {
        console.warn(`⚠ Collection variable '${key}' not found`);
        return null;
    }
    
    // Log the retrieval for debugging
    console.log(`✓ Retrieved collection variable: ${key} = ${value}`);
    
    // Return the variable value
    return value;
}

/**
 * Extracts a value from JSON response and stores it as environment variable
 * @param {Object} pm - Postman scripting object
 * @param {string} jsonPath - Path to the field in response (e.g., "data.id")
 * @param {string} envVarName - Name of environment variable to store value
 */
function extractAndStoreFromResponse(pm, jsonPath, envVarName) {
    try {
        // Parse the response body as JSON
        const responseData = pm.response.json();
        
        // Split the JSON path by dots (e.g., "data.user.id" -> ["data", "user", "id"])
        const pathParts = jsonPath.split('.');
        
        // Navigate through the nested object structure
        let value = responseData;
        for (const part of pathParts) {
            value = value[part];
        }
        
        // Check if value was found
        if (value === undefined || value === null) {
            console.error(`✗ Could not find value at path: ${jsonPath}`);
            return;
        }
        
        // Store the extracted value as environment variable
        setEnvVar(pm, envVarName, value);
        
        // Log success
        console.log(`✓ Extracted '${value}' from '${jsonPath}' and stored as '${envVarName}'`);
    } catch (error) {
        // Log error if extraction fails
        console.error(`✗ Error extracting from response: ${error.message}`);
    }
}

/**
 * Generates a unique timestamp-based ID and stores it as environment variable
 * @param {Object} pm - Postman scripting object
 * @param {string} envVarName - Name of environment variable to store ID
 */
function generateAndStoreUniqueId(pm, envVarName) {
    // Generate unique ID using current timestamp and random number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const uniqueId = `${timestamp}_${randomNum}`;
    
    // Store as environment variable
    setEnvVar(pm, envVarName, uniqueId);
    
    // Log the generated ID
    console.log(`✓ Generated unique ID: ${uniqueId}`);
}

// Export all environment helper functions
module.exports = {
    setEnvVar,
    getEnvVar,
    clearEnvVar,
    hasEnvVar,
    setGlobalVar,
    getGlobalVar,
    setCollectionVar,
    getCollectionVar,
    extractAndStoreFromResponse,
    generateAndStoreUniqueId
};

