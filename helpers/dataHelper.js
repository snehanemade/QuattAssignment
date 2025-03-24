const testData = require('../test_data/userData.json');

export const createUser = () => {

    // Generate dynamic value for email here
    const randomNumber = Math.floor(Math.random() * 1000);

    const user = {
        ...testData[0], 
        email: testData[0].email.replace('{{randomNumber}}', randomNumber)
    };
    
    return user;    
};

export const createUserTestData = () => {

    // Generate dynamic value for email here
    const randomNumber = Math.floor(Math.random() * 1000);

    const user = {
        ...testData[0], 
        email: testData[0].email.replace('{{randomNumber}}', randomNumber)
    };
    return user;    
};

export const createUserInvalidTestData = () => {

    // Generate dynamic value for email here
    const randomNumber = Math.floor(Math.random() * 1000);

    const user = {
        ...testData[1], 
        email: testData[1].email.replace('{{randomNumber}}', randomNumber)
    };
    return user;    
};

export const createUserDuplicateTestData = () => {

    // Generate dynamic value for email here
    const randomNumber = Math.floor(Math.random() * 1000);

    const user = {
        ...testData[1], 
        email: testData[1].email.replace('{{randomNumber}}', randomNumber)
    };
    return user;    
};

export const createUserTestDataForUpdate = () => {

    // Generate dynamic value for email here
    const randomNumber = Math.floor(Math.random() * 1000);

    const user = {
        ...testData[2], 
        email: testData[2].email.replace('{{randomNumber}}', randomNumber)
    };
    return user;    
};

export const createPartialTestData = () => {

    return testData[3];    
};