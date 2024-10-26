module.exports = {
  'Test Contact Us - Valid Submission (Customer Service)': function (browser) {
    const contactUs = browser.page.contactUsPage();

    contactUs
      .navigate()
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@emailField', 'test@example.com')
      .setValue('@orderReference', '12345')
      .setValue('@messageField', 'This is a test message.')
      .click('@submitButton')
      .pause(1500)
      .waitForElementVisible('@successAlert', 10000)
      .assert.textContains('@successAlert', 'Your message has been successfully sent to our team.')
      .end();
  },

  'Test Contact Us - Valid Submission (Webmaster)': function (browser) {
    const contactUs = browser.page.contactUsPage();

    contactUs
      .navigate()
      .setValue('@subjectHeading', 'Webmaster')
      .setValue('@emailField', 'test@example.com')
      .setValue('@orderReference', '12345')
      .setValue('@messageField', 'This is a test message.')
      .click('@submitButton')
      .pause(1500)
      .waitForElementVisible('@successAlert', 10000)
      .assert.textContains('@successAlert', 'Your message has been successfully sent to our team.')
      .end();
  },

  'Test Contact Us - File Upload': function (browser) {
    const contactUs = browser.page.contactUsPage();

    contactUs
      .navigate()
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@emailField', 'test1@example.com')
      .setValue('@orderReference', '12345')
      .setValue('@messageField', 'This is a test message.')
      .uploadFile('@fileInput', 'C:/Users/EGYPT_LAPTOP/qa_automation_project/tests/file.txt')
      .click('@submitButton')
      .pause(1500)
      .waitForElementVisible('@successAlert', 10000)
      .assert.textContains('@successAlert', 'Your message has been successfully sent to our team.')
      .end();
  },

  'Test Contact Us - Empty Subject Heading': function (browser) {
    const contactUs = browser.page.contactUsPage();

    contactUs
      .navigate()
      .setValue('@subjectHeading', '')
      .setValue('@emailField', 'test1@example.com')
      .setValue('@orderReference', '12345')
      .setValue('@messageField', 'This is a test message.')
      .uploadFile('@fileInput', 'C:/Users/EGYPT_LAPTOP/qa_automation_project/tests/file.txt')
      .click('@submitButton')
      .pause(1500)
      .waitForElementVisible('@errorAlert', 10000)
      .assert.containsText('@errorAlert', 'Please select a subject from the list provided.')
      .end();
  },

  'Test Contact Us - Invalid Email': function (browser) {
    const contactUs = browser.page.contactUsPage();

    contactUs
      .navigate()
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@emailField', 'test1@')
      .setValue('@orderReference', '12345')
      .setValue('@messageField', 'This is a test message.')
      .uploadFile('@fileInput', 'C:/Users/EGYPT_LAPTOP/qa_automation_project/tests/file.txt')
      .click('@submitButton')
      .pause(1500)
      .waitForElementVisible('@errorAlert', 10000)
      .assert.containsText('@errorAlert', 'Invalid email address.')
      .end();
  },

  'Test Contact Us - Empty Message': function (browser) {
    const contactUs = browser.page.contactUsPage();

    contactUs
      .navigate()
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@emailField', 'test1@example.com')
      .setValue('@orderReference', '12345')
      .setValue('@messageField', '')
      .uploadFile('@fileInput', 'C:/Users/EGYPT_LAPTOP/qa_automation_project/tests/file.txt')
      .click('@submitButton')
      .pause(1500)
      .waitForElementVisible('@errorAlert', 10000)
      .assert.containsText('@errorAlert', 'The message cannot be blank.')
      .end();
  },

  'Test Contact Us - Empty Order Reference': function (browser) {
    const contactUs = browser.page.contactUsPage();

    contactUs
      .navigate()
      .setValue('@subjectHeading', 'Customer service')
      .setValue('@emailField', 'test1@example.com')
      .setValue('@orderReference', '')
      .setValue('@messageField', 'This is a test message.')
      .uploadFile('@fileInput', 'C:/Users/EGYPT_LAPTOP/qa_automation_project/tests/file.txt')
      .click('@submitButton')
      .pause(1500)
      .waitForElementVisible('@successAlert', 10000)
      .assert.containsText('@successAlert', 'Your message has been successfully sent to our team.')
      .end();
  },
  
'Search Test': function (browser) {
    const homePage = browser.page.homePageSearch();
    
    homePage
      .navigate()
      .setValue('@searchBox', 'dress')
      .click('@searchButton')
      .pause(1000); // Optional: wait for search results to load

    // Assert that search results are visible
    browser.assert.visible(homePage.elements.searchResults.selector)
      .end(); // Make sure to end the browser session after the test
  }
};
