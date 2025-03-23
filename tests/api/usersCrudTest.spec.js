const {test, expect} = require('@playwright/test');
const { use } = require('../../playwright.config');

const apiBaseUrl = "https://gorest.co.in/public/v2/users";
const token = 'd0ed1643690dcd1160720ca3db9d8cd251ffe6c7a276048861ac44a65a9cd4b7';

test.describe.serial('User API CRUD Operations', () => {

    let userId;

    test('Should fetch user details by Id successfully', async ({ request }) => {

        userId = 7790731;

        // Make API request for GET method
        const response = await request.get(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Check if user creation is successful
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', 7790731);

        // Check response details
        userId = responseBody.id;
        expect(responseBody).toHaveProperty('name', 'Tom Hunks');
        expect(responseBody).toHaveProperty('email', 'tom.hunks@hunking.play');
        expect(responseBody).toHaveProperty('gender', 'male');
        expect(responseBody).toHaveProperty('status', 'active');
    });


    test('Should return 404 for non existing user', async ({ request }) => {

        userId = 123;
    
        // Make API request for GET method
        const response = await request.get(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            }
        });

        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', "Resource not found");
    });

    test('Should create a new user successfully', async ({ request }) => {

        // Test Data
        const name = 'Neha Seventh';
        const email = 'neha.seventh@example.com';
        const gender = 'female';
        const status = 'active';

         // Make API request for POST method
        let response = await request.post(apiBaseUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                name: `${name}`,
                email: `${email}`,
                gender: `${gender}`,
                status: `${status}`,
            }
        });

        // Check if user creation is successful
        expect(response.status()).toBe(201);

        let responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');

        // Check response details
        userId = responseBody.id;
        expect(responseBody).toHaveProperty('name', name);
        expect(responseBody).toHaveProperty('email', email);
        expect(responseBody).toHaveProperty('gender', gender);
        expect(responseBody).toHaveProperty('status', status);

        // Make API request for GET method
        response = await request.get(`${apiBaseUrl}/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
        });

        // Check if user creation is successful
        expect(response.status()).toBe(200);

        responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', userId);

        // Check response details
        expect(responseBody).toHaveProperty('name', name);
        expect(responseBody).toHaveProperty('email', email);
        expect(responseBody).toHaveProperty('gender', gender);
        expect(responseBody).toHaveProperty('status', status);
    });
    
    test('Should not create user with invalid data', async ({ request }) => {

        // Make API request for POST method
        const response = await request.post(apiBaseUrl, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            data: {
                name: 'Neha Nemo',
                email: 'nemo@example.com',
                gender: 'female',
                status: 'processed' 
            }
        });

        expect(response.status()).toBe(422);
        const responseBody = await response.json();

        // Status field accepts only active or inactive values
        expect(responseBody[0]).toEqual({
            field: "status",
            message: "can\'t be blank"
        });
    });

    test('Should not create user with duplicate data', async ({ request }) => {

        // Make API request for POST method
        const response = await request.post(apiBaseUrl, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            data: {
                name: 'Tom Hunks',
                email: 'tom.hunks@hunking.play',
                gender: 'male',
                status: 'active' 
            }
        });

        expect(response.status()).toBe(422);
        const responseBody = await response.json();

        // Check error message in the response. Email Id should be unique.
        expect(responseBody[0]).toEqual({
            field: "email",
            message: "has already been taken"
        });
    });

    test('Should update user details successfully', async ({ request }) => {

        // Make API request for PUT method
        const response = await request.put(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            data: {
                name: 'Neha attempt1',
                email: 'nehaa.attempt1@example.com',
                gender: "female",
                status: "inactive"
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        // Check response details
        expect(responseBody).toHaveProperty('name', 'Neha attempt1');
        expect(responseBody).toHaveProperty('email', 'nehaa.attempt1@example.com');
        expect(responseBody).toHaveProperty('status', 'inactive');
    });

    test('Should return 404 for invalid update data', async ({ request }) => {

        // Make API request for PUT method
        const response = await request.put(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            data: {
                name: 'Neha changed',
                email: 'nehaa@example.com',
                gender: "female",
                status: "updated"
            }
        });

        expect(response.status()).toBe(422);
        const responseBody = await response.json();

        // Status field accepts only active or inactive values
        expect(responseBody[0]).toEqual({
            field: "status",
            message: "can\'t be blank"
        });
    });

    test('Should return 404 for updating non existing user', async ({ request }) => {

        // Make API request for PUT method
        const response = await request.put(`${apiBaseUrl}/123`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            data: {
                name: 'Neha changed',
                email: 'nehaa@example.com',
                gender: "female",
                status: "updated"
            }
        });

        expect(response.status()).toBe(404);
        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('message', "Resource not found");
    });

    test('Should update user details uisng patch', async ({ request }) => {

        // Make API request for PUT method
        const response = await request.patch(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            data: {
                name: 'Neha patchUpdate',
                gender: "male"
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        // Check response details
        expect(responseBody).toHaveProperty('name', 'Neha patchUpdate');
        expect(responseBody).toHaveProperty('gender', 'male');
    });

    test('Should delete user successfully', async ({ request }) => {

        // Make API request for DELETE method
        let response = await request.delete(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            }
        });

        expect(response.status()).toBe(204);

        // Make API request for GET method to verify if user is deleted
        response = await request.get(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Check if user does not exist
        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Resource not found');
    });

    test('Should return 404 for deleting non existing user', async ({ request }) => {

        userId = 123;
        // Make API request for DELETE method
        let response = await request.delete(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            }
        });

        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Resource not found');
    });

});