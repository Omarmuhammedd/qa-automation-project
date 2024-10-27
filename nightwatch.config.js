const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: './reports',
  reportFilename: 'UITest-report.html',
  themeName: 'default',
  uniqueFilename: true
});

module.exports = {
  test_settings: {
    default: {
      launch_url: 'http://automationpractice.multiformis.com',
      selenium: {
        start_process: true,
        server_path: require('chromedriver').path,
        port: 9515,
      },
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--headless', // Optional: run in headless mode
          ],
        },
      },
    },
  },
};