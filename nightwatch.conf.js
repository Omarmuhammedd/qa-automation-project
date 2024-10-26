const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
  openBrowser: false,                     // Set to true to open report after test completion
  reportsDirectory: './reports',          // Directory to save reports
  reportFilename: 'UITest-report.html',     // Name of the report file
  themeName: 'default',                   // Theme for the report
  uniqueFilename: true                    // Generate a unique report for each run
});


module.exports = {
  src_folders: ['tests'],                // Path to your test files
  page_objects_path: ['page_objects'],   // Path to your page object files
  webdriver: {
    start_process: true,
    server_path: require('chromedriver').path,
    port: 9515,
    cli_args: []
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: []
        }
      },
      globals: {
        reporter: reporter.fn // Integrate the reporter with Nightwatch
      }
    }
  }
};
