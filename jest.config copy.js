// jest.config.js
module.exports = {
  reporters: [
    "default",
    ["jest-html-reporter", {
      "pageTitle": "Test Report",
      "outputPath": "./reports/APITest-report.html",
      "includeFailureMsg": true,
      "includeConsoleLog": true
    }]
  ]
};
