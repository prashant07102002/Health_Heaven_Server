import { Schema, model } from 'mongoose';
const userSchema = Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})
export default model('user', userSchema);