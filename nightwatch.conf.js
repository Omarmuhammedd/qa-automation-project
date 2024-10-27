const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: './reports',
  reportFilename: 'UITest-report.html',
  themeName: 'default',
  uniqueFilename: true
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
          args: [
            '--headless',        // Run in headless mode
            '--no-sandbox',      // Bypass OS security model
            '--disable-dev-shm-usage', // Overcome limited resource problems
            '--disable-gpu',     // Disable GPU hardware acceleration
            '--window-size=1920,1080', // Set window size
          ],
        },
      },
      globals: {
        reporter: reporter.fn // Integrate the reporter with Nightwatch
      }
    }
  }
};

