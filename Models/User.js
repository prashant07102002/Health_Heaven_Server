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
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    activityLevel: {
        type: String,
    },
    calculatedCalories: {
        type: Number,
    }
})
export default model('user', userSchema);