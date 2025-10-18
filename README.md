# 🧩 Postman-Newman API Automation Framework

[![Newman](https://img.shields.io/badge/Newman-v6.1.1-orange.svg)](https://www.npmjs.com/package/newman)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Enterprise-grade API automation framework** using Postman + Newman with complete CI/CD integration via Jenkins

**Author:** Shanaka Fernando  
**LinkedIn:** https://www.linkedin.com/in/shanaka-qe/

## About this framework

This is a production ready framework that I used for one of my clients and sharing this with the community.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Quick Start](docs/quick_start.md)
- [Running Tests](#running-tests)
- [Framework Components](#framework-components)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Reporting](#reporting)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This framework provides a **production-ready, scalable solution** for API test automation using Postman collections executed via Newman CLI. It follows a **code-first approach** with complete version control, supporting multiple environments, data-driven testing, and enterprise CI/CD integration.

### Key Highlights

✅ **100% Code-First** - All collections, environments, and data in Git  
✅ **Modular Architecture** - Reusable utilities and organized test structure  
✅ **Data-Driven Testing** - Support for JSON and CSV data files  
✅ **Multi-Environment** - Separate configs for Dev, QA, and Production  
✅ **CI/CD Ready** - Complete Jenkins pipeline with reporting  
✅ **Rich Reporting** - HTML, JUnit, and Allure report generation  
✅ **Enterprise Security** - Credential management via Jenkins secrets  
✅ **Scalable Design** - Easy to extend for microservices architecture

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           POSTMAN-NEWMAN API AUTOMATION FRAMEWORK               │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   DEVELOPERS    │    │   QA ENGINEERS  │    │   DEVOPS TEAM   │
│                 │    │                 │    │                 │
│ • Write Tests   │    │ • Execute Tests │    │ • CI/CD Setup   │
│ • Create Data   │    │ • Validate APIs │    │ • Monitor Runs  │
│ • Debug Issues  │    │ • Review Reports│    │ • Manage Envs   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                       │                       │
          └───────────────────────┼───────────────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      GIT REPOSITORY       │
                    │  ┌─────────────────────┐  │
                    │  │   📁 collections/   │  │
                    │  │   • user_management │  │
                    │  │   • orders_api      │  │
                    │  └─────────────────────┘  │
                    │  ┌─────────────────────┐  │
                    │  │   🌍 environments/  │  │
                    │  │   • dev.json        │  │
                    │  │   • qa.json         │  │
                    │  │   • prod.json       │  │
                    │  └─────────────────────┘  │
                    │  ┌─────────────────────┐  │
                    │  │   📊 data/          │  │
                    │  │   • users_data.json │  │
                    │  │   • orders_data.csv │  │
                    │  └─────────────────────┘  │
                    │  ┌─────────────────────┐  │
                    │  │   🔧 utils/         │  │
                    │  │   • assertions.js   │  │
                    │  │   • data_loader.js  │  │
                    │  │   • env_helper.js   │  │
                    │  │   • logger.js       │  │
                    │  └─────────────────────┘  │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      NEWMAN CLI           │
                    │  ┌─────────────────────┐  │
                    │  │   📋 Test Runner    │  │
                    │  │   • Load Collections│  │
                    │  │   • Apply Envs      │  │
                    │  │   • Process Data    │  │
                    │  │   • Execute Tests   │  │
                    │  └─────────────────────┘  │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      API ENDPOINTS        │
                    │  ┌─────────────────────┐  │
                    │  │   🔗 Development    │  │
                    │  │   • api-dev.com     │  │
                    │  └─────────────────────┘  │
                    │  ┌─────────────────────┐  │
                    │  │   🔗 QA Environment │  │
                    │  │   • api-qa.com      │  │
                    │  └─────────────────────┘  │
                    │  ┌─────────────────────┐  │
                    │  │   🔗 Production     │  │
                    │  │   • api.com         │  │
                    │  └─────────────────────┘  │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      REPORTING LAYER      │
                    │  ┌─────────────────────┐  │
                    │  │   📊 HTML Reports   │  │
                    │  │   • Visual Charts   │  │
                    │  │   • Request Details │  │
                    │  │   • Test Results    │  │
                    │  └─────────────────────┘  │
                    │  ┌─────────────────────┐  │
                    │  │   📋 JUnit XML      │  │
                    │  │   • CI/CD Compatible│  │
                    │  │   • Jenkins Integration│
                    │  │   • Test Metrics    │  │
                    │  └─────────────────────┘  │
                    │  ┌─────────────────────┐  │
                    │  │   📝 Console Logs   │  │
                    │  │   • Real-time Output│  │
                    │  │   • Debug Info      │  │
                    │  │   • Error Messages  │  │
                    │  └─────────────────────┘  │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      CI/CD PIPELINE       │
                    │  ┌─────────────────────┐  │
                    │  │   🏗️ JENKINS        │  │
                    │  │   • Automated Runs  │  │
                    │  │   • Environment Mgmt│  │
                    │  │   • Report Archiving│  │
                    │  │   • Notifications   │  │
                    │  └─────────────────────┘  │
                    │  ┌─────────────────────┐  │
                    │  │   📧 NOTIFICATIONS  │  │
                    │  │   • Email Alerts    │  │
                    │  │   • Slack Messages  │  │
                    │  │   • Team Updates    │  │
                    │  └─────────────────────┘  │
                    └───────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW DIAGRAM                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   GIT       │───▶│   NEWMAN    │───▶│   API       │───▶│   REPORTS   │
│ Repository  │    │   CLI       │    │ Endpoints   │    │ Generation  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Collections │    │ Environment │    │ HTTP        │    │ HTML        │
│ • Requests  │    │ Variables   │    │ Requests    │    │ Reports     │
│ • Tests     │    │ • base_url  │    │ • GET/POST  │    │ • Charts    │
│ • Scripts   │    │ • auth_token│    │ • PUT/DELETE│    │ • Details   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Test Data   │    │ Utility     │    │ Response    │    │ JUnit       │
│ • JSON      │    │ Functions   │    │ Validation  │    │ XML         │
│ • CSV       │    │ • Assertions│    │ • Status    │    │ • CI/CD     │
│ • Iterations│    │ • Logging   │    │ • Headers   │    │ • Metrics   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              COMPONENT INTERACTIONS                             │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   POSTMAN   │    │   NEWMAN    │    │   JENKINS   │
│ Collections │◄───┤   CLI       │◄───┤   Pipeline  │
│ • Design    │    │ • Execute   │    │ • Schedule  │
│ • Test      │    │ • Report    │    │ • Monitor   │
│ • Debug     │    │ • Validate  │    │ • Notify    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   UTILITIES │    │   REPORTS   │    │   NOTIFY    │
│ • Assertions│    │ • HTML      │    │ • Email     │
│ • Data Load │    │ • JUnit     │    │ • Slack     │
│ • Env Mgmt  │    │ • Console   │    │ • Teams     │
└─────────────┘    └─────────────┘    └─────────────┘
```

---

## ✨ Features

### Testing Capabilities
- 🔄 **CRUD Operations Testing** - Complete lifecycle testing for REST APIs
- 📊 **Data-Driven Tests** - Iterate over JSON/CSV datasets
- ✅ **Comprehensive Assertions** - Reusable validation helpers
- 🔍 **Negative Testing** - Error handling and edge case validation
- ⚡ **Performance Checks** - Response time monitoring
- 🔐 **Authentication Support** - Bearer tokens, API keys, OAuth

### Automation Features
- 🤖 **Automated Execution** - Jenkins pipeline with scheduling
- 📈 **Visual Reports** - HTML dashboards and JUnit XML
- 🔔 **Notifications** - Email/Slack alerts on test failures
- 🌍 **Environment Management** - Dynamic env variable handling
- 📝 **Logging** - Structured logging with multiple levels
- 🧹 **Clean Architecture** - Modular and maintainable code

---

## 🛠️ Tech Stack

| Component | Purpose | Version |
|-----------|---------|---------|
| **Postman** | API design & test scripting | Latest |
| **Newman** | CLI test execution | 6.1.1 |
| **Node.js** | Runtime environment | 18+ |
| **npm** | Package management | 6+ |
| **Jenkins** | CI/CD automation | 2.x |
| **HTML Reporter** | Visual test reports | Latest |
| **JUnit Reporter** | CI-friendly XML reports | Latest |
| **Git** | Version control | 2.x |

---

## 📁 Project Structure

```
postman-api-automation-framework/
│
├── collections/                           # Postman collection JSON files
│   ├── user_management.postman_collection.json    # User API tests
│   └── orders_api.postman_collection.json         # Orders API tests
│
├── environments/                          # Environment configuration files
│   ├── dev.postman_environment.json      # Development environment
│   ├── qa.postman_environment.json       # QA environment
│   └── prod.postman_environment.json     # Production environment
│
├── data/                                  # Test data files
│   ├── users_data.json                   # User test data (JSON format)
│   └── orders_data.csv                   # Orders test data (CSV format)
│
├── utils/                                 # Utility JavaScript modules
│   ├── assertions.js                     # Reusable assertion functions
│   ├── data_loader.js                    # Data loading utilities
│   ├── env_helper.js                     # Environment variable helpers
│   └── logger.js                         # Logging utilities
│
├── reports/                               # Generated test reports (git-ignored)
│   ├── *.html                            # HTML reports
│   ├── *.xml                             # JUnit XML reports
│   └── logs/                             # Test execution logs
│
├── jenkins/                               # Jenkins CI/CD configuration
│   ├── Jenkinsfile                       # Declarative pipeline definition
│   └── newman_run.sh                     # Standalone shell script runner
│
├── docs/                                  # Documentation files
│   ├── quick_start.md                    # Quick start guide
│   └── user_guide.md             # Detailed user guide
│
├── package.json                           # Node.js dependencies
├── newman-config.json                     # Newman global configuration
├── .gitignore                            # Git ignore rules
└── README.md                             # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   node --version  # Should show v18.x.x or higher
   ```

2. **npm** (v6 or higher)
   ```bash
   npm --version  # Should show v6.x.x or higher
   ```

3. **Git** (v2 or higher)
   ```bash
   git --version  # Should show v2.x.x or higher
   ```

### Optional (for CI/CD)

4. **Jenkins** (v2.x) - For automated pipeline execution
5. **Docker** (optional) - For containerized execution

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/postman-api-automation-framework.git
cd postman-api-automation-framework
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `newman` - Newman CLI test runner
- `newman-reporter-html` - HTML report generator
- `newman-reporter-htmlextra` - Enhanced HTML reports
- `newman-reporter-junit` - JUnit XML reports
- `newman-reporter-allure` - Allure report integration (optional)

### 3. Verify Installation

```bash
npx newman --version
```

You should see the Newman version (e.g., `6.1.1`)

---

## ⚡ Quick Start

For a quick start guide with step-by-step instructions, see [docs/quick_start.md](docs/quick_start.md).

For a comprehensive user guide with detailed explanations, see [docs/user_guide.md](docs/user_guide.md).

---

## 🧪 Running Tests

### Using npm Scripts (Recommended)

```bash
# Run user management tests
npm run test:users

# Run orders API tests
npm run test:orders

# Run all test suites
npm run test:all

# Run tests on specific environment
npm run test:dev    # Development
npm run test:qa     # QA
npm run test:prod   # Production

# Clean old reports
npm run clean:reports
```

### Using Newman CLI Directly

```bash
# Basic execution
newman run collections/user_management.postman_collection.json \
  -e environments/dev.postman_environment.json

# With data file and reports
newman run collections/user_management.postman_collection.json \
  -e environments/dev.postman_environment.json \
  -d data/users_data.json \
  -r cli,html,junit \
  --reporter-html-export reports/test-report.html \
  --reporter-junit-export reports/test-results.xml

# With iterations (data-driven testing)
newman run collections/orders_api.postman_collection.json \
  -e environments/qa.postman_environment.json \
  -d data/orders_data.csv \
  --iteration-count 5
```

### Using Shell Script

```bash
# Run with shell script (provides more control)
./jenkins/newman_run.sh \
  -c user_management.postman_collection.json \
  -e dev \
  -d users_data.json \
  -i 3

# Display help
./jenkins/newman_run.sh --help
```

---

## 🧩 Framework Components

### 1. Collections Layer

**Location:** `collections/`

Each business domain has a dedicated collection:

- **`user_management.postman_collection.json`**
  - Authentication (Login)
  - User CRUD operations
  - Negative test cases
  - Field validations

- **`orders_api.postman_collection.json`**
  - Order creation
  - Order retrieval
  - Status management
  - Negative test cases

**Collection Features:**
- Pre-request scripts for data setup
- Test scripts with assertions
- Environment variable management
- Dynamic data handling

### 2. Test Data Layer

**Location:** `data/`

#### JSON Format (`users_data.json`)
```json
[
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }
]
```

#### CSV Format (`orders_data.csv`)
```csv
orderId,customerId,productName,quantity,price,status
ORD-001,CUST-101,Laptop Pro 15,1,1299.99,pending
```

**Usage in Postman:**
```javascript
// Access iteration data in pre-request or test scripts
const username = pm.iterationData.get('username');
const email = pm.iterationData.get('email');
```

### 3. Utilities Layer

**Location:** `utils/`

#### `assertions.js` - Reusable Assertions
```javascript
// Example usage in Postman tests:
eval(pm.collectionVariables.get('assertions'));
assertStatusCode(pm, 200);
assertFieldExists(pm, 'userId');
assertResponseTime(pm, 2000);
```

#### `env_helper.js` - Environment Management
```javascript
// Store response data
extractAndStoreFromResponse(pm, 'data.id', 'user_id');

// Generate unique IDs
generateAndStoreUniqueId(pm, 'order_id');
```

#### `data_loader.js` - Data Loading (Node.js)
```javascript
const { loadJsonData } = require('./utils/data_loader');
const testData = loadJsonData('./data/users_data.json');
```

#### `logger.js` - Structured Logging
```javascript
const { logInfo, logError } = require('./utils/logger');
logInfo('Starting test execution');
logError('Test failed', error);
```

### 4. Environment Layer

**Location:** `environments/`

Each environment file contains:
- `base_url` - API base URL
- `api_version` - API version
- `auth_token` - Authentication token (empty, populated at runtime)
- `timeout` - Request timeout
- Environment-specific configurations

**Switching Environments:**
```bash
# Use -e flag to specify environment
newman run collections/user_management.postman_collection.json \
  -e environments/qa.postman_environment.json
```

### 5. Reporting Layer

**Location:** `reports/`

Generated reports include:

- **HTML Reports** - Human-readable test results with charts
- **JUnit XML** - CI/CD compatible format for Jenkins
- **Console Logs** - Terminal output during execution
- **Log Files** - Persistent logs in `reports/logs/`

---

## 🔄 CI/CD Integration

### Jenkins Pipeline

**Location:** `jenkins/Jenkinsfile`

#### Pipeline Stages

1. **Checkout** - Clone repository
2. **Setup** - Install Newman and dependencies
3. **Run Tests** - Execute collections with Newman
4. **Publish Reports** - Archive HTML and JUnit reports
5. **Test Summary** - Generate execution summary
6. **Notifications** - Send email/Slack alerts

#### Pipeline Parameters

- `ENVIRONMENT` - Select environment (dev/qa/prod)
- `TEST_SUITE` - Choose test suite (all/users/orders/smoke)
- `SKIP_TESTS` - Skip test execution (for debugging)
- `CLEAN_WORKSPACE` - Clean workspace before build

#### Setting Up Jenkins Job

1. **Create New Pipeline Job:**
   - Jenkins Dashboard → New Item → Pipeline

2. **Configure SCM:**
   - Pipeline → Definition: "Pipeline script from SCM"
   - SCM: Git
   - Repository URL: `https://github.com/<your-username>/postman-api-automation-framework.git`
   - Script Path: `jenkins/Jenkinsfile`

3. **Configure Build Triggers:**
   - Poll SCM: `H/15 * * * *` (every 15 minutes)
   - Or use GitHub webhooks for instant triggers

4. **Configure Credentials:**
   - Manage Jenkins → Credentials
   - Add API keys, tokens as secret text
   - Reference in Jenkinsfile via `credentials('credential-id')`

5. **Install Required Plugins:**
   - HTML Publisher Plugin
   - JUnit Plugin
   - Email Extension Plugin
   - Slack Notification Plugin (optional)

#### Running Pipeline

```bash
# Trigger via Jenkins UI with parameters
# Or via Jenkins CLI
java -jar jenkins-cli.jar -s http://jenkins-url/ build 'API-Tests' \
  -p ENVIRONMENT=qa \
  -p TEST_SUITE=all
```

### Standalone Shell Script Execution

```bash
# Execute from any CI/CD tool (GitLab CI, GitHub Actions, etc.)
./jenkins/newman_run.sh \
  -c user_management.postman_collection.json \
  -e qa \
  -d users_data.json \
  -i 3 \
  -r cli,html,junit
```

---

## 📊 Reporting

### HTML Reports

Beautiful, interactive HTML reports with:
- Test summary (pass/fail counts)
- Detailed request/response logs
- Response time charts
- Iteration results
- Failure screenshots (if applicable)

**Open Report:**
```bash
open reports/users-report.html
```

### JUnit XML Reports

Compatible with CI/CD systems for test result tracking:

```xml
<testsuite name="User Management API" tests="15" failures="0" errors="0" time="5.234">
  <testcase name="Create User" time="0.856" />
  <testcase name="Get User by ID" time="0.432" />
</testsuite>
```

### Console Output

Real-time test execution logs in terminal:

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
│      prerequest-scripts │       15 │        0 │
├─────────────────────────┼──────────┼──────────┤
│              assertions │       90 │        0 │
└─────────────────────────┴──────────┴──────────┘
```

---

## 🏆 Best Practices

### ✅ Code-First Mindset
- Maintain all collections, environments, and data in Git
- Never make manual edits in Postman IDE for production collections
- Export collections after each change

### ✅ Naming Conventions
- Collections: `domain_api.postman_collection.json`
- Requests: `action_resource_scenario` (e.g., `create_user_valid`)
- Variables: `snake_case` format

### ✅ Reusability
- Use utility functions from `utils/` folder
- Keep assertions and validations modular
- Avoid code duplication across collections

### ✅ Parameterization
- Use Postman variables instead of hardcoding values
- Leverage iteration data for data-driven tests
- Store dynamic values in environment variables

### ✅ Security
- Never commit credentials in environment files
- Use Jenkins credentials or environment variables for secrets
- Mark sensitive variables as "secret" type in Postman

### ✅ Environment Segregation
- Maintain separate environment files for each stage
- Use consistent variable names across environments
- Document environment-specific configurations

### ✅ Versioning
- Tag collections with semantic versions (v1.0.0)
- Maintain changelog for API evolution
- Create branches for major API changes

### ✅ Reporting
- Use timestamped report directories
- Archive reports as build artifacts
- Clean old reports periodically

### ✅ Scalability
- One collection per business domain/microservice
- Share utility scripts across collections
- Use folder-level scripts for common setup/teardown

### ✅ Documentation
- Maintain README for each collection
- Document API endpoints and dependencies
- Include sample requests and responses

### ✅ CI Discipline
- Run smoke tests on every pull request
- Schedule full regression suites nightly
- Block merges on test failures

---

## 🐛 Troubleshooting

### Issue: Newman not found

**Solution:**
```bash
# Install Newman globally
npm install -g newman

# Or use npx to run without global install
npx newman run collections/user_management.postman_collection.json
```

### Issue: Collection file not found

**Solution:**
- Verify file path is correct
- Ensure you're in the project root directory
- Use absolute paths if relative paths fail

```bash
# Verify file exists
ls -la collections/

# Use absolute path
newman run "$(pwd)/collections/user_management.postman_collection.json"
```

### Issue: Environment variables not loading

**Solution:**
- Check environment file syntax (valid JSON)
- Verify file path in `-e` flag
- Ensure variable names match in collection

```bash
# Validate JSON
cat environments/dev.postman_environment.json | jq .

# Test with explicit environment
newman run collections/user_management.postman_collection.json \
  -e "$(pwd)/environments/dev.postman_environment.json"
```

### Issue: Data file not being used

**Solution:**
- Verify data file format (JSON array or CSV with headers)
- Check file path in `-d` flag
- Access data using `pm.iterationData.get('field')`

```bash
# Validate JSON data
cat data/users_data.json | jq .

# Test with explicit data file
newman run collections/user_management.postman_collection.json \
  -d "$(pwd)/data/users_data.json" \
  --iteration-count 1
```

### Issue: Reports not generating

**Solution:**
- Ensure reports directory exists
- Check write permissions
- Verify reporter names are correct

```bash
# Create reports directory
mkdir -p reports

# Fix permissions
chmod 755 reports

# List available reporters
newman run --reporters
```

### Issue: Jenkins pipeline fails

**Solution:**
1. Check Jenkins console output for errors
2. Verify Node.js is installed on Jenkins agent
3. Ensure Git credentials are configured
4. Check workspace permissions

```bash
# Test on Jenkins agent
ssh jenkins-agent "node --version && npm --version"

# Manual test on Jenkins
cd /var/jenkins/workspace/API-Tests
npm install
npx newman run collections/user_management.postman_collection.json
```

### Issue: Tests timeout

**Solution:**
- Increase timeout values in newman-config.json
- Check network connectivity to API endpoints
- Verify API is responsive

```bash
# Test API connectivity
curl -I https://api-dev.example.com/v1/health

# Run with increased timeout
newman run collections/user_management.postman_collection.json \
  --timeout-request 30000 \
  --timeout-script 10000
```

---

## 📚 Additional Resources

### Official Documentation
- [Newman Documentation](https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/)
- [Postman Learning Center](https://learning.postman.com/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)

### Tutorials
- [Postman API Testing Tutorial](https://www.postman.com/api-platform/api-testing/)
- [Newman CLI Guide](https://blog.postman.com/newman-run-and-test-your-collections-from-the-command-line/)
- [CI/CD with Newman](https://learning.postman.com/docs/running-collections/using-newman-cli/continuous-integration/)

### Community
- [Postman Community](https://community.postman.com/)
- [Stack Overflow - Newman](https://stackoverflow.com/questions/tagged/newman)
- [GitHub Issues](https://github.com/postmanlabs/newman/issues)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   npm run test:all
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards
- Follow existing code style
- Add comments for complex logic
- Update documentation for new features
- Include tests for new functionality

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - Initial work

---

## 🙏 Acknowledgments

- Postman team for the excellent API platform
- Newman contributors for the CLI runner
- Jenkins community for CI/CD excellence

---

## 📞 Support

For support, email your-email@example.com or open an issue in the GitHub repository.

---

<div align="center">

**[⬆ back to top](#-postman-newman-api-automation-framework)**

Made with ❤️ by the QA Team

</div>

