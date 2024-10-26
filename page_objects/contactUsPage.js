module.exports = {
  url: 'http://automationpractice.multiformis.com/index.php?controller=contact',
  elements: {
    subjectHeading: 'select#id_contact',
    emailField: 'input#email',
    orderReference: 'input#id_order',
    messageField: 'textarea#message',
    submitButton: 'button#submitMessage',
    fileInput: 'input#fileUpload',
    successAlert: '.alert.alert-success',   // Success alert selector
    errorAlert: '.alert.alert-danger',      // Error alert selector (for form submission errors)
  }
};
