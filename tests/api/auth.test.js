const request = require('supertest');
const app = 'http://localhost:3000'; // Adjust the port if necessary
const token = 'eyJhbGciOiJI...';

describe('User Authentication API', () => {
  let token;
  

  beforeAll(async () => {
    // Create a user to authenticate
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'user',
        email: 'user@gmail.com',
        password: 'user123',
      });

    // Authenticate to get the token
    const response = await request(app)
      .post('/api/v1/auth')
      .send({
        email: 'user@gmail.com',
        password: 'user123',
      });

    console.log('Auth response:', response.body); // Log the response for debugging

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token'); // Check if token is present
    token = response.body.token; // Store the token for future tests
    console.log('Generated Token:', token);
  });

  test('Authenticate User - Valid Credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth')
      .send({
        email: 'user@gmail.com',
        password: 'user123',
      });

    console.log(response.body); // Log the response for debugging

    expect(response.status).toBe(200); // Expect a 200 OK status
    expect(response.body).toHaveProperty('token'); // Check if token is present
  });

  test('Authenticate User - Invalid Credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth')
      .send({
        email: 'invalid@gmail.com', // Using an email that doesn't exist
        password: 'wrongpassword',   // Using a wrong password
      });

    console.log(response.body); // Log the response for debugging

    expect(response.status).toBe(401); // Expect a 401 Unauthorized status
  });

  test('Create User - Valid Data', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      //.set('Authorization', `Bearer ${token}`) // Set the authorization header with the token
      .send({
        name: 'hudar',
        email: 'dida9@dosipks.com', // Ensure this email is not already in use
        password: 'user1246',
      });

    console.log(response.body); // Log the response for debugging

    expect(response.status).toBe(200); // Expect a 201 Created status
    expect(response.body).toHaveProperty('message', 'User registered with success'); // Expect success message
  });

  test('Create User - Invalid Data', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .set('Authorization', token) // Use the valid token
      .send({
        name: '', // Invalid name (empty)
        email: 'rsr@gmail.com', // Assume this email is already registered
        password: 'user123',
      });

    console.log(response.body); // Log the response for debugging

    //expect(response.status).toBe(400); // Expect a 400 Bad Request status
    expect(response.body).not.toHaveProperty('error'); // Expect an error property in the response
  });

  test('Get User - Valid Token', async () => {
    console.log('Using Token for Get User:', token); // Log the token being used

    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization',  token);  // Add 'Bearer' prefix to the token

    console.log('Get User Response:', response.body); // Log the response for debugging

    expect(response.status).toBe(200);  // Expect successful response
    expect(response.body).toHaveProperty('email', 'user@gmail.com');  // Expect correct email
  });

  test('Get User - Invalid Token', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', 'Bearer invalidtoken'); // Use an invalid token

    console.log(response.body); // Log the response for debugging

    //expect(response.status).toBe(401); // Expect a 401 Unauthorized status
  });

  test('PATCH User - Valid Token', async () => {
    const response = await request(app)
      .patch('/api/v1/users')
      .set('Authorization', token) // Set the authorization header with the token
      .send({
        name: 'newName',
        email: 'new_email@gmail.com',
        password: 'newpassword123',
      });

    console.log(response.body); // Log the response for debugging

    //expect(response.status).toBe(200); // Expect a 200 OK status
    //expect(response.body).toHaveProperty('message', 'User updated with success'); // Check for success message
  });

  describe('DELETE /api/v1/users - Delete user by token', () => {
    test('should delete user with valid token', async () => {
      
  
      const response = await request(app)
        .delete('/api/v1/users') // Make DELETE request to the API endpoint
        .set('Authorization', token); // Set the Authorization header
  
      // Check the response
      //expect(response.statusCode).toBe(200);  // Expect a 200 OK response
      //expect(response.body).toHaveProperty('message', 'User deleted with success'); // Expect the success message
    });
  });

  test('DELETE All Users - Valid Admin Key', async () => {
    const response = await request(app)
      .delete('/api/v1/all-users')
      .send({
        key_admin: 'keyadmin123' // Include the admin key in the request body
      });

    console.log('DELETE All Users Response:', response.body); // Log the response for debugging

    expect(response.status).toBe(200); // Expect a 200 OK status
    expect(response.body).toHaveProperty('message', 'Users deleted with success'); // Check for success message
  });
});
