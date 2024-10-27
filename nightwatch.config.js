const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: './reports',
  reportFilename: 'UITest-report.html',
  themeName: 'default',
  uniqueFilename: true
});

module.exports = {
  src_folders: ['tests/ui'],
  test_settings: {
    default: {
      start_process: true,
      server_path: require('chromedriver').path,
      port: 9515,
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
        }
      },
      test_timeout: 30000 // Adjust as needed
    }
  }
};