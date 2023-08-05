const PORT = 5000;
const DB_URL = `mongodb+srv://vladimiredelmann:gotsanN123J@cluster0.sgnzh67.mongodb.net/?retryWrites=true&w=majority`;

const confirmationTokenExpiration = 60 * 60 * 1000; // 1 hour

const EMAIL_SERVICE = 'Outlook';
const EMAIL_USERNAME = 'vladimiredelmann@hotmail.com';
const EMAIL_PASSWORD = 'gotsanN123J';

const JWT_SECRET_KEY = 'df3g4vgw74g0v0dh86';
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
