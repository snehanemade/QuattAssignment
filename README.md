# Playwright Test Automation Framework
This repository contains a **Test Automation Framework** built using [Playwright](https://playwright.dev/) for UI and API testing.

## Project Structure
Folders:

- **helpers**: This folder contains utility functions and helper methods for API calls and test data preparation.
- **test_data**: This folder contains test data required for API tests.
- **page_objects**: This folder contains all the page objects required for UI tests.
- **tests**: This folder contains tests for UI and API both in `ui` and `api` folders respectively.

## Installation 
### **Prerequisites**
- Install **Node.js**
- Install **Git**

### **Clone the Repository**
```sh
git clone https://github.com/snehanemade/QuattAssignment.git
cd QuattAssignment
```

### **Install Dependencies**
1. Execute from the root folder: `npm install`
2. Run `npx playwright install`
3. Generate a token on https://gorest.co.in/ and update the same in the `/helpers/apiHelper.js`.<br />

## How to run tests

1. npx playwright test - To run all the tests<br />
2. npx playwright test --debug - To run tests in debug mode<br />
3. npx playwright test specName.spec.ts - To run specific file<br />
4. npx playwright show-report - To open playwright default test report locally

## CI/CD
You can find GitHub configuration file in the folder : `.github/workflows/playwright.yml`

## TODO and Improvements:

1. Current test suit does not cover all the possible UI tests. There are more test cases that can be added.
2. The base URLs for UI and API both are either in the test file or helper functions. Those can be defined using Environment variables in the config file. 
3. UI test can be run on multiple browsers in parallel.

## Bugs:

1. You can place an order even you don't have any product in the cart.
2. The total amount is mentioned without unit $ (dollar) on the place order dialog.
3. The date of purchase on the confirmation dialogue is always same which is 25/2/2025.
4. When you delete an item from the cart, the page reloads lazily, causing a blank screen for a few seconds before displaying the remaining products. This behavior can be improved for a smoother experience.

## Note: 
There is a test failing for UI for potential bug #1.