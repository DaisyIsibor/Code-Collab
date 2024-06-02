//User model
const mongoose = require('mongoose');


//creating user model with Schema 

const userSchema = new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        email:{
            type: String,
            require:true,
            unique:true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'],
        },
        
        username:{
            type:String,
            unique:true,
            require:true,
            trim:true
        },
        password: { type: String, required: true },

        bio: String,

        codingLanguages: [String],

        location: String,

        photo: String, // Store the path to the uploaded photo

        // included enum to make sure only the field specified are inputed and it throws error if not 
        meetingPreference: { type: String, enum: ['in person', 'online'] },

        // save in the data base as id to enable scalable date helps with data consistency,reduced data sixe and flexibility and easy to make queries, though in the controller connections, we will fetch the is for related information but display it in user-friendly way, works for the REVIEWS as well.

        connectionHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Store IDs of connected users

        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Store IDs of reviews
        
            // included enum to make sure only the field specified are inputed and it throws error if not 
        role: { type: String, enum: ['none', 'observer', 'study buddy', 'mentor', 'collaborator'], default: 'none' }
        }, { timestamps: true });
    
        const User = mongoose.model('User', userSchema);
        module.exports = User;