import bcrypt from 'bcrypt';

class Utils {
    async hash(password) {
        const saltRounds = 5;

        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            return hashedPassword;
        } catch (err) {
            console.log('Hash generating error', err);
        }
    }

    async compare(password, hashedPassword) {
        try {
            const match = await bcrypt.compare(password, hashedPassword);

            return match;
        } catch (err) {
            console.log('Password comparing error', err);
        }
    }
}

export default new Utils();
