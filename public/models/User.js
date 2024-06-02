//User model
const mongoose = require('mongoose');


//creating user model with Schema 

const userSchema = new mongoose.Schema(
    {
        first:String,
        last:String,
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

        location: String,

        role: { type: String, enum: ['none', 'observer', 'study buddy', 'mentor', 'collaborator'], default: 'none' }
        }, { timestamps: true });
    
        const User = mongoose.model('User', userSchema);
        module.exports = User;