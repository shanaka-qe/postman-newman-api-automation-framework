/**
 * data_loader.js
 * Utility functions to load and parse test data from JSON and CSV files
 * Used for data-driven testing in Postman collections
 */

const fs = require('fs');
const path = require('path');

/**
 * Loads and parses a JSON file containing test data
 * @param {string} filePath - Relative or absolute path to JSON file
 * @returns {Object|Array} Parsed JSON data
 */
function loadJsonData(filePath) {
    try {
        // Resolve the absolute path to the file
        const absolutePath = path.resolve(filePath);
        
        // Read the file contents as a string
        const fileContent = fs.readFileSync(absolutePath, 'utf8');
        
        // Parse the JSON string into a JavaScript object
        const jsonData = JSON.parse(fileContent);
        
        // Log success message for debugging
        console.log(`✓ Successfully loaded JSON data from: ${filePath}`);
        
        // Return the parsed data
        return jsonData;
    } catch (error) {
        // Log error with details if file cannot be loaded
        console.error(`✗ Error loading JSON file '${filePath}':`, error.message);
        
        // Return empty object to prevent crashes
        return {};
    }
}

/**
 * Loads and parses a CSV file containing test data
 * @param {string} filePath - Relative or absolute path to CSV file
 * @returns {Array} Array of objects representing CSV rows
 */
function loadCsvData(filePath) {
    try {
        // Resolve the absolute path to the file
        const absolutePath = path.resolve(filePath);
        
        // Read the file contents as a string
        const fileContent = fs.readFileSync(absolutePath, 'utf8');
        
        // Split content into lines (rows)
        const lines = fileContent.split('\n').filter(line => line.trim() !== '');
        
        // Extract header row (first line) and split by comma
        const headers = lines[0].split(',').map(header => header.trim());
        
        // Parse remaining lines as data rows
        const dataRows = [];
        for (let i = 1; i < lines.length; i++) {
            // Split each line by comma
            const values = lines[i].split(',').map(value => value.trim());
            
            // Create an object with headers as keys
            const rowObject = {};
            headers.forEach((header, index) => {
                rowObject[header] = values[index];
            });
            
            // Add the row object to the data array
            dataRows.push(rowObject);
        }
        
        // Log success message for debugging
        console.log(`✓ Successfully loaded CSV data from: ${filePath} (${dataRows.length} rows)`);
        
        // Return the array of row objects
        return dataRows;
    } catch (error) {
        // Log error with details if file cannot be loaded
        console.error(`✗ Error loading CSV file '${filePath}':`, error.message);
        
        // Return empty array to prevent crashes
        return [];
    }
}

/**
 * Gets a specific data item by index from a data array
 * @param {Array} dataArray - Array of data items
 * @param {number} index - Index of the item to retrieve (0-based)
 * @returns {Object} Data item at the specified index
 */
function getDataByIndex(dataArray, index) {
    // Check if index is valid
    if (index < 0 || index >= dataArray.length) {
        console.error(`✗ Invalid index ${index}. Array length is ${dataArray.length}`);
        return null;
    }
    
    // Return the item at the specified index
    return dataArray[index];
}

/**
 * Filters data array based on a field value
 * @param {Array} dataArray - Array of data items
 * @param {string} fieldName - Name of the field to filter by
 * @param {*} fieldValue - Value to match
 * @returns {Array} Filtered array of matching items
 */
function filterDataByField(dataArray, fieldName, fieldValue) {
    // Filter array to include only items where field matches value
    const filteredData = dataArray.filter(item => item[fieldName] === fieldValue);
    
    // Log the number of matching items
    console.log(`✓ Found ${filteredData.length} items where ${fieldName} = ${fieldValue}`);
    
    // Return the filtered array
    return filteredData;
}

/**
 * Gets a random item from a data array
 * @param {Array} dataArray - Array of data items
 * @returns {Object} Random data item
 */
function getRandomData(dataArray) {
    // Check if array is not empty
    if (dataArray.length === 0) {
        console.error('✗ Cannot get random item from empty array');
        return null;
    }
    
    // Generate random index between 0 and array length - 1
    const randomIndex = Math.floor(Math.random() * dataArray.length);
    
    // Return the item at the random index
    return dataArray[randomIndex];
}

/**
 * Merges two data objects (useful for combining default and custom data)
 * @param {Object} defaultData - Default data object
 * @param {Object} customData - Custom data to override defaults
 * @returns {Object} Merged data object
 */
function mergeData(defaultData, customData) {
    // Use spread operator to merge objects (custom data overrides defaults)
    const mergedData = { ...defaultData, ...customData };
    
    // Log merge operation for debugging
    console.log('✓ Data merged successfully');
    
    // Return the merged object
    return mergedData;
}

// Export all data loader functions for use in other scripts
module.exports = {
    loadJsonData,
    loadCsvData,
    getDataByIndex,
    filterDataByField,
    getRandomData,
    mergeData
};

