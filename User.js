import mongoose from 'mongoose';

const User = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true }
});

export default mongoose.model('User', User);
