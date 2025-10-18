# Contributing to Postman API Automation Framework

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title describing the problem
- Detailed steps to reproduce the issue
- Expected vs actual behavior
- Environment details (OS, Node.js version, Newman version)
- Screenshots or error logs if applicable

### Suggesting Enhancements

For feature requests or enhancements:
- Check if a similar request already exists
- Provide clear use case and benefits
- Include examples or mockups if possible
- Explain why this would be useful to most users

### Pull Request Process

1. **Fork and Clone**
   ```bash
   git clone https://github.com/<your-username>/postman-api-automation-framework.git
   cd postman-api-automation-framework
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   npm install
   npm run test:all
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature" 
   # or
   git commit -m "fix: resolve bug in xyz"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots if applicable
   - Wait for review and address feedback

## 📝 Coding Standards

### Collection Development
- Use descriptive names for requests and folders
- Add detailed descriptions for each request
- Include pre-request and test scripts where needed
- Use Postman variables instead of hardcoding values

### JavaScript Code
- Use clear, descriptive variable names
- Add comments for each major step
- Follow modular programming principles
- Use ES6+ syntax where appropriate

### Test Scripts
- Write comprehensive assertions
- Test both positive and negative scenarios
- Include meaningful test names
- Log important information for debugging

### Documentation
- Update README.md for new features
- Add inline comments for complex logic
- Include usage examples
- Keep documentation up-to-date

## 🔧 Development Setup

### Prerequisites
- Node.js v18+
- npm v6+
- Git v2+

### Local Setup
```bash
# Clone repository
git clone <repository-url>
cd postman-api-automation-framework

# Install dependencies
npm install

# Run tests
npm run test:users
```

## 🧪 Testing Guidelines

### Before Submitting PR
- Run all test suites
- Verify reports are generated
- Check for console errors
- Test on multiple environments (dev, qa)

### Test Coverage
- Add tests for new features
- Update existing tests if behavior changes
- Include both positive and negative test cases

## 📚 Commit Message Guidelines

Use conventional commit format:

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add order cancellation endpoint tests

Add comprehensive tests for order cancellation including:
- Happy path scenario
- Invalid order ID handling
- Authorization checks

Closes #123
```

```
fix: resolve environment variable loading issue

Fixed bug where environment variables were not being loaded
properly in pre-request scripts.

Fixes #456
```

## 🔍 Code Review Process

1. **Automated Checks** - CI pipeline must pass
2. **Peer Review** - At least one approval required
3. **Testing** - All tests must pass
4. **Documentation** - Changes must be documented

### Review Criteria
- Code quality and readability
- Test coverage
- Documentation completeness
- Adherence to standards
- Performance considerations

## 🎯 Areas for Contribution

We welcome contributions in:

### High Priority
- Additional API collection examples
- More utility functions
- Enhanced reporting features
- Performance optimizations

### Medium Priority
- Additional CI/CD integrations (GitHub Actions, GitLab CI)
- Mock server implementations
- Parallel test execution
- Docker containerization

### Documentation
- Tutorial videos
- Best practices guides
- Troubleshooting guides
- Architecture diagrams

## 💬 Communication

- **Issues** - For bugs and feature requests
- **Pull Requests** - For code contributions
- **Discussions** - For questions and ideas
- **Email** - For private concerns

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive experience for everyone.

### Expected Behavior
- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

### Enforcement
Violations may result in temporary or permanent ban from the project.

## 🏆 Recognition

Contributors will be:
- Listed in the AUTHORS file
- Mentioned in release notes
- Credited in documentation

## 📞 Getting Help

If you need help:
1. Check existing documentation
2. Search closed issues
3. Open a new discussion
4. Contact maintainers

## ✅ Checklist Before Submitting

- [ ] Code follows project style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] All tests pass locally
- [ ] Commit messages follow convention
- [ ] PR description is clear and complete
- [ ] Related issues are linked

Thank you for contributing! 🎉

