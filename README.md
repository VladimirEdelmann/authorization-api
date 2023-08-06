# authorization-api
This is backend application that allows users to register, log in, confirm their email addresses, and reset their passwords securely. It's built with JavaScript and utilizes a MongoDB database for data storage.


## Installation
To get started follow these steps:

1. Clone the repository:

```bash
git clone git@github.com:VladimirEdelmann/authorization-api.git
cd authorization-api
```
2. Install the required dependencies:

```bash
npm install

```

3. Use and adjust your atlas mongodb cloud service
4. Add constants.js file with your secure data:

```js
// Replace 'your-db-url' with the URL of your MongoDB database
const DB_URL = 'your-db-url';

const PORT = 5000;

// Token expiration time in milliseconds (e.g., 1 hour)
const confirmationTokenExpiration = 60 * 60 * 1000;

// Replace 'your-email-service', 'your-email-username', and 'your-email-password'
// with the details of the email service you are using
const EMAIL_SERVICE = 'your-email-service';
const EMAIL_USERNAME = 'your-email-username';
const EMAIL_PASSWORD = 'your-email-password';

// Replace 'your-jwt-secret-key' with a secure and unique key for JWT token
const JWT_SECRET_KEY = 'your-jwt-secret-key';

// Token expiration time for access tokens (e.g., '24h' for 24 hours)
const ACCESS_TOKEN_EXPIRATION = '24h';

export {
    PORT,
    DB_URL,
    confirmationTokenExpiration,
    EMAIL_SERVICE,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
    JWT_SECRET_KEY,
    ACCESS_TOKEN_EXPIRATION,
};
```

## Run

```bash
npm start

```
