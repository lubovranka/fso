import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    favouriteGenre: {
        type: String,
        required: true,
        minlength: 1,
    },
});

export default mongoose.model('User', schema);
