import { test, expect } from '@playwright/test';
import { createUserTestData, createUserInvalidTestData, createUserTestDataForUpdate, createPartialTestData } from '../../helpers/dataHelper';
import { apiHelper } from '../../helpers/apiHelper';


test.describe.serial('User API CRUD Operations', () => {

    let userId;

    test('Should fetch user details by Id successfully', async ({ request }) => {

        // Generate test data
        const user = createUserTestData();
        let response = await apiHelper.createUser(request, user);
        expect(response.status()).toBe(201);
        let responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');

        // Get userId 
        userId = responseBody.id;

        // Call API GET method to retrieve details of non existing user
        response = await apiHelper.getUser(request, userId);
        expect(response.status()).toBe(200);

        responseBody = await response.json();
        expect(responseBody).toHaveProperty('id', userId);

        // Check response details
        userId = responseBody.id;
        expect.soft(responseBody.name).toBe(user.name);
        expect.soft(responseBody.email).toBe(user.email);
        expect.soft(responseBody.gender).toBe(user.gender);
        expect.soft(responseBody.status).toBe(user.status);

        // Final assert to fail test if any soft assertion fails
        expect(responseBody).toBeTruthy();
    });


    test('Should return 404 for non existing user', async ({ request }) => {

        // Call API GET method to retrieve details of non existing user
        let response = await apiHelper.getUser(request, 123);

        expect(response.status()).toBe(404);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', "Resource not found");
    });

    test('Should create a new user successfully', async ({ request }) => {

        // Generate test data
        const user = createUserTestData();

        // Call API POST method to create a user
        let response = await apiHelper.createUser(request, user);

        // Check if user creation is successful
        expect(response.status()).toBe(201);

        let responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');

        // Check response details
        userId = responseBody.id;
        expect.soft(responseBody.name).toBe(user.name);
        expect.soft(responseBody.email).toBe(user.email);
        expect.soft(responseBody.gender).toBe(user.gender);
        expect.soft(responseBody.status).toBe(user.status);

        // Final assert to fail test if any soft assertion fails
        expect(responseBody).toBeTruthy();

        // Check if user is created by calling API GET method 
        response = await apiHelper.getUser(request, userId);
        expect(response.status()).toBe(200);

        responseBody = await response.json();
        expect(responseBody.id).toBe(userId);

        // Check details of created user
        expect.soft(responseBody.name).toBe(user.name);
        expect.soft(responseBody.email).toBe(user.email);
        expect.soft(responseBody.gender).toBe(user.gender);
        expect.soft(responseBody.status).toBe(user.status);

        expect(responseBody).toBeTruthy();
    });

    test('Should not create user with invalid data', async ({ request }) => {

        // Generate test data
        const user = createUserInvalidTestData();

        // Call API POST method to create a user
        let response = await apiHelper.createUser(request, user);
        expect(response.status()).toBe(422);

        const responseBody = await response.json();

        // status field accepts only active or inactive values
        expect(responseBody[0]).toEqual({
            field: "status",
            message: "can\'t be blank"
        });
    });

    test('Should not create user with duplicate data', async ({ request }) => {

        // Generate test data 
        const user = createUserTestData();
        let response = await apiHelper.createUser(request, user);
        expect(response.status()).toBe(201);

        // Call API POST method to create a user with duplicate data
        response = await apiHelper.createUser(request, user);

        expect(response.status()).toBe(422);
        const responseBody = await response.json();

        // Check error message in the response. Email Id should be unique.
        expect(responseBody[0]).toEqual({
            field: "email",
            message: "has already been taken"
        });
    });

    test('Should update user details successfully', async ({ request }) => {

        // Generate test data
        const user = createUserTestData();
        let response = await apiHelper.createUser(request, user);
        expect(response.status()).toBe(201);
        let responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');

        // Get userId 
        userId = responseBody.id;

        const updatedUserData = createUserTestDataForUpdate();

        // Call API PUT method to update all the user data
        response = await apiHelper.updateUser(request, userId, updatedUserData);
        expect(response.status()).toBe(200);

        responseBody = await response.json();

        // Check if uesr details are updated
        expect.soft(responseBody.name).toBe(updatedUserData.name);
        expect.soft(responseBody.email).toBe(updatedUserData.email);
        expect.soft(responseBody.gender).toBe(updatedUserData.gender);
        expect.soft(responseBody.status).toBe(updatedUserData.status);

        expect(responseBody).toBeTruthy();
    });

    test('Should return 422 for invalid update data', async ({ request }) => {

        // Generate test data 
        const user = createUserTestData();
        let response = await apiHelper.createUser(request, user);
        expect(response.status()).toBe(201);
        let responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');

        // Get userId 
        userId = responseBody.id;

        const invalidUpdateData = createUserInvalidTestData();

        // Call API PUT method to create a user with duplicate data
        response = await apiHelper.updateUser(request, userId, invalidUpdateData);
        expect(response.status()).toBe(422);

        responseBody = await response.json();

        // Status field accepts only active or inactive values
        expect(responseBody[0]).toEqual({
            field: "status",
            message: "can\'t be blank"
        });
    });

    test('Should return 404 for updating non existing user', async ({ request }) => {

        // Generate test data
        const user = createUserTestData();
        let response = await apiHelper.createUser(request, user);
        expect(response.status()).toBe(201);

        const updatedUserData = createUserTestDataForUpdate();

        // Call API PUT method to create a user with duplicate data
        response = await apiHelper.updateUser(request, 123, updatedUserData);

        expect(response.status()).toBe(404);
        const responseBody = await response.json();

        expect(responseBody).toHaveProperty('message', "Resource not found");
    });

    test('Should update user details uisng patch', async ({ request }) => {

        // Generate test data
        const user = createUserTestData();
        let response = await apiHelper.createUser(request, user);
        expect(response.status()).toBe(201);
        let responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');

        // Get userId 
        userId = responseBody.id;

        const partialUserData = createPartialTestData();

        // Call API PATCH method to update gender and status of a user
        response = await apiHelper.updateUserPartial(request, userId, partialUserData);
        expect(response.status()).toBe(200);
        responseBody = await response.json();

        // Check if uesr data is updated
        expect.soft(responseBody.gender).toBe(partialUserData.gender);
        expect.soft(responseBody.status).toBe(partialUserData.status);

        expect(responseBody).toBeTruthy();
    });

    test('Should delete user successfully', async ({ request }) => {

        // Generate test data 
        const user = createUserTestData();
        let response = await apiHelper.createUser(request, user);
        expect(response.status()).toBe(201);
        let responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');

        // Get userId 
        userId = responseBody.id;

        // Call API DELETE method to delete a user
        response = await apiHelper.deleteUser(request, userId);
        expect(response.status()).toBe(204);

        // Check if user is deleted by calling API GET method
        response = await apiHelper.getUser(request, userId);

        // Check if user does not exist
        expect(response.status()).toBe(404);

        responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Resource not found');
    });

    test('Should return 404 for deleting non existing user', async ({ request }) => {

        // Call API DELETE method to delete non existing user
        const response = await apiHelper.deleteUser(request, 123);
        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('message', 'Resource not found');
    });
});