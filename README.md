# QA Automation Project

This repository contains automated UI and API tests for [Siemens Task SDET 2024 ].

## Project Structure

- **.circleci**: Contains CircleCI configuration files.
- **tests**: Contains UI and API tests.
  - **api**: API tests for authentication.
  - **ui**: UI tests for user interactions.
- **page_objects**: Page object models for UI tests.
- **reports**: Reports generated from test runs.
- **jest.config.js**: Configuration file for Jest.
- **nightwatch.config.js**: Configuration file for Nightwatch.js.

## Getting Started


Project Overview
This project is a comprehensive QA automation suite for testing both UI and API functionalities. The main objectives include automating key user scenarios, verifying API endpoints, and establishing a CI/CD pipeline through CircleCI.

The project consists of two primary sections:

UI Tests: Automating the user interactions on My Store using NightwatchJS.
API Tests: Validating authentication and authorization workflows using the mock-user-auth module with Supertest.
Tech Stack
UI Automation: NightwatchJS
API Testing: Supertest
Test Runner: Jest
CI/CD: CircleCI
Project Structure
graphql
Copy code
qa-automation-project
├── .circleci
│   └── config.yaml           # CircleCI configuration for CI/CD
├── page_objects               # Page Object Models for UI tests
├── reports                    # Test reports for both UI and API tests
├── tests
│   ├── api
│   │   └── auth.test.js       # API tests for authentication
│   └── ui
│       └── ui.test.js         # UI tests for specific user scenarios
├── jest.config.js             # Jest configuration for API tests
├── nightwatch.config.js       # Nightwatch configuration for UI tests
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/OmarMuhammedd/qa-automation-project.git
Install dependencies:
bash
Copy code
cd qa-automation-project
npm install
Running Tests
UI Tests
To run UI tests with NightwatchJS:

bash
Copy code
npm run test:ui
API Tests
To run API tests with Supertest:

bash
Copy code
npm run test:api
Continuous Integration
This project uses CircleCI for continuous integration. Each push to the repository triggers:

UI Tests: Executes NightwatchJS tests on CircleCI.
API Tests: Runs Supertest-based API tests.
CircleCI Badge
The current build status can be seen with the badge at the top of this README.

Reporting
After each test run, reports are generated in the reports directory. These include HTML reports for UI tests and, if configured, XML/HTML reports for API tests.

Contributing
Feel free to open issues or create pull requests if you have suggestions to improve the test cases or project setup.

License
This project is licensed under the MIT License.
