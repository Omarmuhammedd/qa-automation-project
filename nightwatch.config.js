const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: './reports',
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
    cli_args: []
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
          
            '--no-sandbox',      // Disables the sandbox for all process types
            '--disable-dev-shm-usage'  // Overcomes limited resource problems
          ]
        }
      },
      globals: {
        reporter: reporter.fn
      }
    }
  }
};
