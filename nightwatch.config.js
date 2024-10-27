const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: './reports',   // Ensure this directory exists
  reportFilename: 'UITest-report.html',
  themeName: 'default',
  uniqueFilename: true
});


module.exports = {
  src_folders: ['tests'],
  page_objects_path: ['page_objects'],
  webdriver: {
    start_process: true,
    server_path: require('chromedriver').path,
    port: 9515,
    cli_args: [],
    log_path: './webdriver-logs',  // Specify the path to store webdriver logs
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
