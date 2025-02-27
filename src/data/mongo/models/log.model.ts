import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    origin: {
        type: String,
    },
});

export const LogModel = mongoose.model('Log', logSchema);
