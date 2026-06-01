# ⚡ Quick Start Guide

Get up and running with the Postman API Automation Framework in 5 minutes!

## 🚀 Installation (2 minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/shanaka-qe/postman-newman-api-automation-framework.git
cd postman-newman-api-automation-framework
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs Newman and all required reporters.

---

## 🧪 Run Your First Test (1 minute)

### Quick Test Run

```bash
npm run test:users
```

This command will:
- ✅ Run the User Management API collection
- ✅ Execute tests against the dev environment
- ✅ Use test data from `data/users_data.json`
- ✅ Generate HTML and JUnit reports

### View the Report

```bash
# On macOS
open reports/users-report.html

# On Linux
xdg-open reports/users-report.html

# On Windows
start reports/users-report.html
```

---

## 📊 Available Commands

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

---

## 🎯 Understanding the Output

### Console Output

You'll see a summary table like this:

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

**What it means:**
- **iterations**: Number of times the collection ran (data-driven)
- **requests**: Total API requests executed
- **test-scripts**: Total test scripts run
- **assertions**: Total validation checks performed

### HTML Report

The HTML report includes:
- 📊 Test summary with pass/fail counts
- 🕐 Response times for each request
- 📝 Request and response details
- ✅ Individual assertion results
- ❌ Failure details with error messages

---

## 🛠️ Customizing Your Tests

### 1. Change Environment

Edit environment files in `environments/` folder:

```bash
# Edit dev environment
nano environments/dev.postman_environment.json
```

Update the `base_url` to point to your API:

```json
{
  "key": "base_url",
  "value": "https://your-api.example.com",
  "enabled": true
}
```

### 2. Add Test Data

Edit data files in `data/` folder:

```bash
# Edit user test data
nano data/users_data.json
```

Add your test data:

```json
[
  {
    "username": "your_user",
    "email": "your.email@example.com",
    "password": "YourPassword123!"
  }
]
```

### 3. Modify Collections

Collections are in `collections/` folder:

- `user_management.postman_collection.json` - User API tests
- `orders_api.postman_collection.json` - Orders API tests

**Important:** After modifying in Postman app, export and replace these files.

---

## 🔧 Advanced Usage

### Run with Custom Options

```bash
# Run with specific iteration count
newman run collections/user_management.postman_collection.json \
  -e environments/dev.postman_environment.json \
  -d data/users_data.json \
  --iteration-count 5

# Run with custom timeout
newman run collections/orders_api.postman_collection.json \
  -e environments/qa.postman_environment.json \
  --timeout-request 30000

# Run without data file
newman run collections/user_management.postman_collection.json \
  -e environments/prod.postman_environment.json
```

### Use the Shell Script

```bash
# Make script executable (first time only)
chmod +x jenkins/newman_run.sh

# Run with script
./jenkins/newman_run.sh \
  -c user_management.postman_collection.json \
  -e dev \
  -d users_data.json \
  -i 3

# View help
./jenkins/newman_run.sh --help
```

---

## 🐛 Troubleshooting

### Issue: "newman: command not found"

**Solution:**
```bash
# Install Newman globally
npm install -g newman

# Or use npx
npx newman run collections/user_management.postman_collection.json
```

### Issue: "Cannot find module..."

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tests failing with connection errors

**Solution:**
1. Check if the API is accessible:
   ```bash
   curl -I https://api-dev.example.com/health
   ```
2. Verify the `base_url` in your environment file
3. Check network connectivity and firewall settings

### Issue: No reports generated

**Solution:**
```bash
# Create reports directory
mkdir -p reports

# Check write permissions
chmod 755 reports

# Run with explicit report path
newman run collections/user_management.postman_collection.json \
  -r html --reporter-html-export reports/test.html
```

---

## 📚 Next Steps

### 1. Explore the Framework

- **Collections**: Check `collections/` for example API tests
- **Utilities**: Review `utils/` for reusable functions
- **Jenkins**: Examine `jenkins/Jenkinsfile` for CI/CD setup

### 2. Read Documentation

- **README.md**: Comprehensive framework documentation
- **CONTRIBUTING.md**: Guidelines for contributing
- **CHANGELOG.md**: Version history and updates

### 3. Customize for Your Project

- Update collections with your API endpoints
- Modify environment files with your URLs
- Add your test data files
- Configure Jenkins for your CI/CD

### 4. Set Up CI/CD

See [CI/CD Integration](README.md#cicd-integration) section in README.

---

## 💡 Tips for Success

### 1. Start Small
Begin with a single endpoint and expand gradually.

### 2. Use Descriptive Names
Name your tests clearly: `create_user_valid_data`, `get_user_not_found`

### 3. Organize by Domain
Keep related endpoints in the same collection.

### 4. Version Control Everything
Commit collections, environments, and data to Git.

### 5. Run Tests Often
Execute tests after every change to catch issues early.

### 6. Review Reports
Always check HTML reports to understand failures.

### 7. Use Data Files
Leverage JSON/CSV files for data-driven testing.

### 8. Keep Secrets Safe
Never commit credentials; use environment variables or Jenkins secrets.

---

## 🎓 Learning Resources

### Framework Documentation
- [README.md](README.md) - Full framework documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guidelines

### Postman & Newman
- [Postman Learning Center](https://learning.postman.com/)
- [Newman Documentation](https://learning.postman.com/docs/running-collections/using-newman-cli/command-line-integration-with-newman/)
- [Writing Tests in Postman](https://learning.postman.com/docs/writing-scripts/test-scripts/)

### JavaScript for Testing
- [JavaScript Basics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Chai Assertion Library](https://www.chaijs.com/) (used by Postman)

---

## 📞 Need Help?

1. Check the [README.md](README.md) for detailed documentation
2. Review [Troubleshooting](README.md#troubleshooting) section
3. Search existing [GitHub Issues](https://github.com/shanaka-qe/postman-newman-api-automation-framework/issues)
4. Open a new issue with details

---

## ✅ Success Checklist

Before moving to production:

- [ ] All tests pass on dev environment
- [ ] Tests run successfully on qa environment
- [ ] Reports are generated correctly
- [ ] Jenkins pipeline is configured
- [ ] Team members can run tests locally
- [ ] Documentation is up to date
- [ ] Test data is properly managed
- [ ] Credentials are secured

---

## 🎉 Congratulations!

You're now ready to use the Postman API Automation Framework!

For detailed information, refer to [README.md](README.md)

---

**Happy Testing! 🚀**

