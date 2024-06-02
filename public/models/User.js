const { Schema,model} = require('mongoose');

//creating user model with Schema 

const userSchema = new Schema(
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
        }
        }
    
)