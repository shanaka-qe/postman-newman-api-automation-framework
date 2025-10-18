# 📖 Detailed Starter User Guide

**Postman-Newman API Automation Framework**

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding the Framework](#understanding-the-framework)
3. [Your First Test Run](#your-first-test-run)
4. [Working with Collections](#working-with-collections)
5. [Managing Environments](#managing-environments)
6. [Using Test Data](#using-test-data)
7. [Understanding Reports](#understanding-reports)
8. [Common Workflows](#common-workflows)
9. [Troubleshooting Guide](#troubleshooting-guide)
10. [Next Steps](#next-steps)

---

## Getting Started

### Prerequisites Checklist

Before you begin, ensure you have the following installed:

- [ ] **Node.js** (v18 or higher)
  ```bash
  node --version  # Should show v18.x.x or higher
  ```

- [ ] **npm** (comes with Node.js)
  ```bash
  npm --version  # Should show v6.x.x or higher
  ```

- [ ] **Git** (for version control)
  ```bash
  git --version  # Should show v2.x.x or higher
  ```

- [ ] **Text Editor** (VS Code, Sublime Text, etc.)

### Installation Steps

#### Step 1: Clone the Repository

```bash
# Navigate to your desired directory
cd /path/to/your/projects

# Clone the repository
git clone https://github.com/<your-username>/postman-api-automation-framework.git

# Navigate into the project
cd postman-api-automation-framework
```

#### Step 2: Install Dependencies

```bash
# Install all required packages
npm install
```

This will install:
- `newman` - The CLI test runner
- `newman-reporter-html` - HTML report generator
- `newman-reporter-htmlextra` - Enhanced HTML reports
- `newman-reporter-junit` - JUnit XML reports

#### Step 3: Verify Installation

```bash
# Check if Newman is installed
npx newman --version

# You should see something like: 6.1.1
```

---

## Understanding the Framework

### Project Structure Overview

```
postman-api-automation-framework/
├── 📁 collections/          # Your API test collections
│   ├── user_management.postman_collection.json
│   └── orders_api.postman_collection.json
├── 📁 environments/         # Environment configurations
│   ├── dev.postman_environment.json
│   ├── qa.postman_environment.json
│   └── prod.postman_environment.json
├── 📁 data/                 # Test data files
│   ├── users_data.json
│   └── orders_data.csv
├── 📁 utils/                # Reusable utility functions
│   ├── assertions.js
│   ├── data_loader.js
│   ├── env_helper.js
│   └── logger.js
├── 📁 jenkins/              # CI/CD configuration
│   ├── Jenkinsfile
│   └── newman_run.sh
├── 📁 reports/              # Generated test reports
├── 📁 docs/                 # Documentation
├── package.json             # Project dependencies
├── README.md                # Main documentation
└── QUICK_START.md          # Quick start guide
```

### Key Concepts

#### 1. Collections
- **What**: Postman collections are groups of API requests
- **Purpose**: Organize related API endpoints together
- **Example**: All user management endpoints in one collection

#### 2. Environments
- **What**: Configuration files with variables
- **Purpose**: Switch between different environments (dev, qa, prod)
- **Example**: Different base URLs for each environment

#### 3. Test Data
- **What**: External data files (JSON/CSV)
- **Purpose**: Data-driven testing with multiple test cases
- **Example**: Different user accounts to test with

#### 4. Utilities
- **What**: Reusable JavaScript functions
- **Purpose**: Avoid code duplication, standardize testing
- **Example**: Common assertion functions

---

## Your First Test Run

### Step-by-Step First Test

#### Step 1: Run a Simple Test

```bash
# Run the user management tests
npm run test:users
```

**What happens:**
1. Newman loads the user management collection
2. Sets up the dev environment
3. Loads test data from `users_data.json`
4. Executes all API requests
5. Runs validation tests
6. Generates reports

#### Step 2: Check the Results

After the test completes, you'll see:

```
┌─────────────────────────┬──────────┬──────────┐
│                         │ executed │   failed │
├─────────────────────────┼──────────┼──────────┤
│              iterations │        3 │        0 │
├─────────────────────────┼──────────┼──────────┤
│                requests │       15 │        0 │
├─────────────────────────┼──────────┼──────────┤
│            test-scripts │       45 │        0 │
├─────────────────────────┼──────────┼──────────┤
│              assertions │       90 │        0 │
└─────────────────────────┴──────────┴──────────┘
```

**Understanding the output:**
- **iterations**: How many times the collection ran (based on data file)
- **requests**: Total API calls made
- **test-scripts**: Total test scripts executed
- **assertions**: Total validation checks performed

#### Step 3: View the HTML Report

```bash
# Open the HTML report (macOS)
open reports/users-report.html

# Open the HTML report (Linux)
xdg-open reports/users-report.html

# Open the HTML report (Windows)
start reports/users-report.html
```

The HTML report shows:
- 📊 Test summary with charts
- 📝 Detailed request/response logs
- ⏱️ Response times for each request
- ✅/❌ Pass/fail status for each test

---

## Working with Collections

### Understanding Collections

Collections are the heart of your API testing. They contain:
- **Requests**: API calls (GET, POST, PUT, DELETE)
- **Tests**: Validation scripts
- **Pre-request Scripts**: Setup code
- **Variables**: Dynamic values

### Example Collection Structure

```
User Management Collection
├── Authentication
│   └── Login User
├── User CRUD Operations
│   ├── Create User
│   ├── Get User by ID
│   ├── Get All Users
│   ├── Update User
│   └── Delete User
└── Negative Test Cases
    ├── Get Non-Existent User
    └── Create User with Invalid Data
```

### Creating Your Own Collection

#### Step 1: Design in Postman App

1. Open Postman application
2. Create a new collection
3. Add requests for your API endpoints
4. Add test scripts for each request
5. Export the collection as JSON

#### Step 2: Add to Framework

```bash
# Copy your collection to the collections folder
cp /path/to/your/collection.json collections/my_api.postman_collection.json
```

#### Step 3: Create npm Script

Add to `package.json`:

```json
{
  "scripts": {
    "test:myapi": "newman run collections/my_api.postman_collection.json -e environments/dev.postman_environment.json -r cli,html,junit --reporter-html-export reports/myapi-report.html"
  }
}
```

#### Step 4: Run Your Collection

```bash
npm run test:myapi
```

### Collection Best Practices

#### 1. Organize by Domain
```
✅ Good Structure:
├── User Management
├── Order Processing
├── Payment Gateway
└── Reporting

❌ Bad Structure:
├── API Tests
├── More Tests
└── Random Tests
```

#### 2. Use Descriptive Names
```
✅ Good Names:
- create_user_with_valid_data
- get_user_by_id_success
- update_user_invalid_email

❌ Bad Names:
- test1
- api_call
- request
```

#### 3. Add Descriptions
Each request should have a clear description:
- What the endpoint does
- What data it expects
- What response it returns

#### 4. Use Variables
Instead of hardcoding values:
```javascript
// ❌ Bad - hardcoded
pm.request.url = "https://api.example.com/v1/users/123"

// ✅ Good - using variables
pm.request.url = "{{base_url}}/{{api_version}}/users/{{user_id}}"
```

---

## Managing Environments

### Understanding Environments

Environments contain variables that change between different setups:
- **Development**: Testing environment
- **QA**: Quality assurance environment  
- **Production**: Live environment

### Environment File Structure

```json
{
  "id": "dev-environment-001",
  "name": "Development Environment",
  "values": [
    {
      "key": "base_url",
      "value": "https://api-dev.example.com",
      "type": "default",
      "enabled": true
    },
    {
      "key": "api_version",
      "value": "v1",
      "type": "default",
      "enabled": true
    },
    {
      "key": "auth_token",
      "value": "",
      "type": "secret",
      "enabled": true
    }
  ]
}
```

### Creating Your Own Environment

#### Step 1: Create Environment File

```bash
# Copy existing environment as template
cp environments/dev.postman_environment.json environments/staging.postman_environment.json
```

#### Step 2: Update Variables

Edit the new environment file:

```json
{
  "key": "base_url",
  "value": "https://api-staging.example.com",
  "type": "default",
  "enabled": true
}
```

#### Step 3: Use Your Environment

```bash
# Run tests with your environment
newman run collections/user_management.postman_collection.json \
  -e environments/staging.postman_environment.json
```

### Environment Best Practices

#### 1. Consistent Variable Names
Use the same variable names across all environments:

```json
// ✅ Good - consistent across environments
"base_url"
"api_version"
"timeout"

// ❌ Bad - different names per environment
"dev_url" / "qa_url" / "prod_url"
```

#### 2. Secure Sensitive Data
Never commit credentials to Git:

```json
// ✅ Good - empty value, set at runtime
{
  "key": "auth_token",
  "value": "",
  "type": "secret"
}

// ❌ Bad - hardcoded credentials
{
  "key": "auth_token", 
  "value": "abc123secret",
  "type": "secret"
}
```

#### 3. Document Environment-Specific Settings
Add comments in your environment files:

```json
{
  "key": "timeout",
  "value": "30000",
  "type": "default",
  "enabled": true,
  "description": "30 second timeout for staging environment"
}
```

---

## Using Test Data

### Understanding Test Data

Test data allows you to run the same tests with different inputs:
- **JSON files**: For complex structured data
- **CSV files**: For tabular data

### JSON Data Format

#### Example: `data/users_data.json`

```json
[
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  },
  {
    "username": "jane_admin",
    "email": "jane.admin@example.com", 
    "password": "AdminPass456!",
    "firstName": "Jane",
    "lastName": "Admin",
    "role": "admin"
  }
]
```

#### Using JSON Data in Tests

In your Postman test scripts:

```javascript
// Get data from current iteration
const username = pm.iterationData.get('username');
const email = pm.iterationData.get('email');

// Use in request body
pm.request.body.raw = JSON.stringify({
  "username": username,
  "email": email,
  "password": pm.iterationData.get('password')
});
```

### CSV Data Format

#### Example: `data/orders_data.csv`

```csv
orderId,customerId,productName,quantity,price,status
ORD-001,CUST-101,Laptop Pro 15,1,1299.99,pending
ORD-002,CUST-102,Wireless Mouse,2,29.99,shipped
ORD-003,CUST-103,USB-C Cable,5,12.99,delivered
```

#### Using CSV Data in Tests

```javascript
// Access CSV data
const orderId = pm.iterationData.get('orderId');
const productName = pm.iterationData.get('productName');
const quantity = pm.iterationData.get('quantity');

// Convert string to number if needed
const quantityNum = parseInt(quantity);
```

### Running Tests with Data

#### Single Iteration (No Data File)
```bash
newman run collections/user_management.postman_collection.json \
  -e environments/dev.postman_environment.json
```

#### Multiple Iterations (With Data File)
```bash
newman run collections/user_management.postman_collection.json \
  -e environments/dev.postman_environment.json \
  -d data/users_data.json
```

#### Specific Number of Iterations
```bash
newman run collections/user_management.postman_collection.json \
  -e environments/dev.postman_environment.json \
  -d data/users_data.json \
  --iteration-count 5
```

### Data Best Practices

#### 1. Use Realistic Data
```json
// ✅ Good - realistic test data
{
  "email": "test.user@example.com",
  "phone": "+1-555-0123"
}

// ❌ Bad - unrealistic data
{
  "email": "test@test.com",
  "phone": "123"
}
```

#### 2. Include Edge Cases
```json
[
  {
    "email": "normal@example.com",
    "testCase": "valid_email"
  },
  {
    "email": "invalid-email-format",
    "testCase": "invalid_email"
  },
  {
    "email": "",
    "testCase": "empty_email"
  }
]
```

#### 3. Keep Data Secure
```json
// ✅ Good - use test credentials
{
  "password": "TestPassword123!"
}

// ❌ Bad - use real credentials
{
  "password": "MyRealPassword456!"
}
```

---

## Understanding Reports

### Types of Reports

The framework generates multiple report formats:

#### 1. Console Output
Real-time feedback during test execution:

```
✓ Status code is 200
✓ Response time is less than 2000ms
✓ Response has field: userId
✗ Field 'email' equals 'expected@email.com'
```

#### 2. HTML Reports
Visual, interactive reports with:
- 📊 Test summary charts
- 📝 Request/response details
- ⏱️ Performance metrics
- 🔍 Failure analysis

#### 3. JUnit XML Reports
CI/CD compatible format for Jenkins:

```xml
<testsuite name="User Management API" tests="15" failures="0" errors="0">
  <testcase name="Create User" time="0.856" />
  <testcase name="Get User by ID" time="0.432" />
</testsuite>
```

### Reading HTML Reports

#### Test Summary Section
- **Total Tests**: Number of test scripts executed
- **Passed**: Number of successful tests
- **Failed**: Number of failed tests
- **Skipped**: Number of skipped tests

#### Request Details Section
For each request, you'll see:
- **Method & URL**: HTTP method and endpoint
- **Status Code**: Response status (200, 404, etc.)
- **Response Time**: How long the request took
- **Test Results**: Which assertions passed/failed

#### Failure Analysis
When tests fail, the report shows:
- **Expected vs Actual**: What was expected vs what was received
- **Error Messages**: Detailed error descriptions
- **Request/Response**: Full request and response data

### Report Best Practices

#### 1. Review Reports After Each Run
Always check the HTML report to understand:
- Which tests passed/failed
- Why tests failed
- Performance bottlenecks

#### 2. Archive Important Reports
```bash
# Create timestamped reports
newman run collections/user_management.postman_collection.json \
  --reporter-html-export "reports/user-tests-$(date +%Y%m%d-%H%M%S).html"
```

#### 3. Share Reports with Team
- Email HTML reports to stakeholders
- Upload to shared drives
- Include in CI/CD notifications

---

## Common Workflows

### Workflow 1: Daily Testing

**Scenario**: Run tests every morning to check API health

```bash
# Quick smoke test
npm run test:dev

# Check reports
open reports/users-report.html
```

### Workflow 2: Before Deployment

**Scenario**: Run full test suite before deploying to production

```bash
# Run all tests on QA environment
npm run test:qa

# If QA passes, run on production
npm run test:prod
```

### Workflow 3: Debugging Failed Tests

**Scenario**: A test is failing and you need to investigate

```bash
# Run with verbose output
newman run collections/user_management.postman_collection.json \
  -e environments/dev.postman_environment.json \
  --verbose

# Run single iteration for debugging
newman run collections/user_management.postman_collection.json \
  -e environments/dev.postman_environment.json \
  --iteration-count 1
```

### Workflow 4: Adding New Tests

**Scenario**: You need to add tests for a new API endpoint

1. **Create in Postman App**:
   - Open Postman
   - Add new request to collection
   - Add test scripts
   - Export collection

2. **Update Framework**:
   ```bash
   # Replace collection file
   cp /path/to/exported/collection.json collections/user_management.postman_collection.json
   ```

3. **Test Your Changes**:
   ```bash
   npm run test:users
   ```

### Workflow 5: Data-Driven Testing

**Scenario**: Test the same endpoint with different data sets

1. **Create Data File**:
   ```json
   // data/test_scenarios.json
   [
     {"email": "valid@example.com", "expected": "success"},
     {"email": "invalid-email", "expected": "error"},
     {"email": "", "expected": "error"}
   ]
   ```

2. **Run with Data**:
   ```bash
   newman run collections/user_management.postman_collection.json \
     -e environments/dev.postman_environment.json \
     -d data/test_scenarios.json
   ```

### Workflow 6: CI/CD Integration

**Scenario**: Automate testing in your deployment pipeline

1. **Configure Jenkins**:
   - Set up Jenkins job
   - Configure Git repository
   - Set build triggers

2. **Run Pipeline**:
   - Tests run automatically on code changes
   - Reports are generated and archived
   - Notifications sent on failures

---

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: "newman: command not found"

**Symptoms**:
```bash
bash: newman: command not found
```

**Solutions**:
```bash
# Option 1: Install globally
npm install -g newman

# Option 2: Use npx (recommended)
npx newman run collections/user_management.postman_collection.json

# Option 3: Use local installation
./node_modules/.bin/newman run collections/user_management.postman_collection.json
```

#### Issue 2: Collection file not found

**Symptoms**:
```bash
Error: Collection file not found
```

**Solutions**:
```bash
# Check if file exists
ls -la collections/

# Use absolute path
newman run "$(pwd)/collections/user_management.postman_collection.json"

# Verify file permissions
chmod 644 collections/user_management.postman_collection.json
```

#### Issue 3: Environment variables not loading

**Symptoms**:
- Tests fail with "undefined" variables
- Requests go to wrong URLs

**Solutions**:
```bash
# Validate JSON syntax
cat environments/dev.postman_environment.json | jq .

# Check variable names match
grep -r "{{base_url}}" collections/

# Test with explicit environment
newman run collections/user_management.postman_collection.json \
  -e "$(pwd)/environments/dev.postman_environment.json"
```

#### Issue 4: Tests timing out

**Symptoms**:
```bash
Error: Request timeout
```

**Solutions**:
```bash
# Increase timeout values
newman run collections/user_management.postman_collection.json \
  --timeout-request 30000 \
  --timeout-script 10000

# Check API connectivity
curl -I https://api-dev.example.com/health

# Verify network settings
ping api-dev.example.com
```

#### Issue 5: Reports not generating

**Symptoms**:
- No HTML files in reports folder
- "Permission denied" errors

**Solutions**:
```bash
# Create reports directory
mkdir -p reports

# Fix permissions
chmod 755 reports

# Run with explicit report path
newman run collections/user_management.postman_collection.json \
  -r html --reporter-html-export reports/test.html
```

#### Issue 6: Data file not being used

**Symptoms**:
- Tests run but don't use iteration data
- Variables show as undefined

**Solutions**:
```bash
# Validate data file format
cat data/users_data.json | jq .

# Check CSV format
head -5 data/orders_data.csv

# Test with single iteration
newman run collections/user_management.postman_collection.json \
  -d data/users_data.json \
  --iteration-count 1
```

### Debugging Tips

#### 1. Use Verbose Output
```bash
newman run collections/user_management.postman_collection.json \
  --verbose
```

#### 2. Run Single Iteration
```bash
newman run collections/user_management.postman_collection.json \
  --iteration-count 1
```

#### 3. Test Individual Requests
Use Postman app to test individual requests before running collections.

#### 4. Check Console Logs
Look for error messages in the console output during test execution.

#### 5. Validate JSON Files
```bash
# Check collection JSON
cat collections/user_management.postman_collection.json | jq .

# Check environment JSON
cat environments/dev.postman_environment.json | jq .

# Check data JSON
cat data/users_data.json | jq .
```

---

## Next Steps

### Immediate Actions

1. **Run Your First Test**
   ```bash
   npm run test:users
   ```

2. **Explore the Reports**
   - Open the HTML report
   - Understand the test results
   - Check request/response details

3. **Modify Test Data**
   - Edit `data/users_data.json`
   - Add your own test scenarios
   - Run tests again

### Short-term Goals (1-2 weeks)

1. **Customize for Your API**
   - Update environment files with your API URLs
   - Modify collections for your endpoints
   - Add your own test data

2. **Learn the Utilities**
   - Review `utils/assertions.js`
   - Understand `utils/env_helper.js`
   - Explore `utils/logger.js`

3. **Create Your Own Tests**
   - Design test scenarios
   - Create new collections
   - Add comprehensive test data

### Medium-term Goals (1-2 months)

1. **Set Up CI/CD**
   - Configure Jenkins pipeline
   - Set up automated triggers
   - Integrate with your deployment process

2. **Expand Test Coverage**
   - Add more API endpoints
   - Include negative test cases
   - Add performance tests

3. **Team Collaboration**
   - Share framework with team
   - Establish testing standards
   - Create documentation

### Long-term Goals (3+ months)

1. **Advanced Features**
   - Parallel test execution
   - Custom reporters
   - Integration with monitoring tools

2. **Framework Evolution**
   - Add new utility functions
   - Improve reporting
   - Optimize performance

3. **Best Practices**
   - Establish coding standards
   - Create training materials
   - Share knowledge with community

### Learning Resources

#### Documentation
- [README.md](../README.md) - Complete framework documentation
- [QUICK_START.md](QUICK_START.md) - Quick start guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contributing guidelines

#### External Resources
- [Postman Learning Center](https://learning.postman.com/)
- [Newman Documentation](https://learning.postman.com/docs/running-collections/using-newman-cli/)
- [JavaScript Testing Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

#### Community
- [Postman Community](https://community.postman.com/)
- [GitHub Issues](https://github.com/<your-username>/postman-api-automation-framework/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/newman)

---

## Support and Help

### Getting Help

1. **Check Documentation**
   - Start with this guide
   - Review README.md
   - Check troubleshooting section

2. **Search Existing Issues**
   - Look for similar problems
   - Check closed issues
   - Review community discussions

3. **Ask for Help**
   - Open a GitHub issue
   - Provide detailed information
   - Include error messages and logs

### Providing Feedback

We welcome your feedback to improve this framework:

- **Bug Reports**: Report issues with detailed steps
- **Feature Requests**: Suggest new functionality
- **Documentation**: Help improve guides and examples
- **Contributions**: Submit code improvements

### Contact Information

- **GitHub**: [Your Repository](https://github.com/<your-username>/postman-api-automation-framework)
- **Issues**: [GitHub Issues](https://github.com/<your-username>/postman-api-automation-framework/issues)
- **Discussions**: [GitHub Discussions](https://github.com/<your-username>/postman-api-automation-framework/discussions)

---

## Conclusion

Congratulations! You now have a comprehensive understanding of the Postman-Newman API Automation Framework. This guide has covered:

✅ **Framework Setup** - Installation and configuration  
✅ **Basic Usage** - Running your first tests  
✅ **Advanced Features** - Collections, environments, data  
✅ **Best Practices** - Industry standards and recommendations  
✅ **Troubleshooting** - Common issues and solutions  
✅ **Next Steps** - Path forward for continued learning  

### Remember

- **Start Simple**: Begin with basic tests and expand gradually
- **Practice Regularly**: Run tests frequently to catch issues early
- **Learn Continuously**: Explore new features and techniques
- **Share Knowledge**: Help others learn and improve the framework

### Final Checklist

Before you start using the framework in production:

- [ ] All tests pass on your local machine
- [ ] You understand how to read and interpret reports
- [ ] You can modify collections and environments
- [ ] You know how to add test data
- [ ] You're familiar with troubleshooting common issues
- [ ] You have a plan for CI/CD integration

**Happy Testing! 🚀**

---

*This guide is part of the Postman-Newman API Automation Framework. For the latest updates and additional resources, visit the [main repository](https://github.com/<your-username>/postman-api-automation-framework).*
