const { expect } = require('@playwright/test');

const apiBaseUrl = "https://gorest.co.in/public/v2/users";
const token = 'd0ed1643690dcd1160720ca3db9d8cd251ffe6c7a276048861ac44a65a9cd4b7';

export const apiHelper = {

    async GetUser(request, userId) {
        const response = await request.get(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        // Return response for further validation
        return response;
    },

    async createUser(request, userData) {

        const response = await request.post(apiBaseUrl, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            data: userData
        });

        // Return response for further validation
        return response;
    },

    async updateUser(request, userId, userData) {
        const response = await request.put(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: userData
        });

        // Return response for further validation
        return response;
    },

    async updateUserPartial(request, userId, userData) {
        const response = await request.patch(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: userData
        });

        // Return response for further validation
        return response;
    },

    async deleteUser(request, userId) {
        const response = await request.delete(`${apiBaseUrl}/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        // Return response for further validation
        return response;
    }
  };