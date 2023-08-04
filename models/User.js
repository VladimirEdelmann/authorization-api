import mongoose from 'mongoose';

const User = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isEmailConfirmed: { type: Boolean, required: true, default: false },
    confirmationToken: { 
        type: String, 
        required: function () { 
            return !this.isEmailConfirmed.required;
        }, 
        unique: true
    },
    resetToken: { type: String, unique: true },
    refreshToken: { type: String, unique: true },
    role: { type: String, required: true }
});

export default mongoose.model('User', User);
