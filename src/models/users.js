const mongoose = require('mongoose')
const validator= require('validator')
const bycrpt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const Tasks=require('./tasks')
//inorder to use middleware advantages we should convert the model into schema 
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    }, age:{
        default:0,
type: Number,
validate(value) {
if(value<0){
    throw new Error('you should be 18+ to enter!')
}
}
},
email:{
type: String,
unique:true,
required:true,
trim: true,
lowercase: true,
validate(value) {
if(!validator.isEmail(value)){
throw new Error('email is not valid ')
}
}
},
password:{
   type: String,
   required: true,
   trim: true,
   minlength:7,
   validate(value){
       if(value.includes('password')){
           throw new Error('password cannot be password!')
       }
   } 
},
tokens:[{
    token:{
        type: String,
        required:true
    }
}], 
avatar:{
    type:Buffer
}
},{
    timestamps:true
})
//to connect users and their created tasks

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})


// to hide important credentials

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
 delete userObject.avatar
    return userObject
}
// to generate authentication tokens for users

userSchema.methods.generateAuthToken = async function(){
    const user=this
    const token= jwt.sign({_id: user._id.toString()}, process.env.JWT_TOKEN)
    user.tokens=user.tokens.concat({ token:token})
    await user.save()
    return token
}

//to create a function for accessing login credentials
userSchema.statics.findByCredentials = async(email,password)=>{
    const user= await User.findOne({ email})
    if(!user ){
        throw new Error('email id not found')
    }
    const isMatch = await bycrpt.compare(password, user.password)
    if(!isMatch){
        throw new Error('unable to login')
    }
return user
}

//to set the middleware using schema
//to convert password into a hash code
userSchema.pre('save',async function (next){
const user=this
if(user.isModified('password')){
    user.password= await bycrpt.hash(user.password, 8)
}

next() //to indicate that we are done calling this function and if we dont use next the function will never stop executing
})
 
//to delete the user tasks when authenticated user is removed

userSchema.pre('remove',async function(next){

    const user=this
 await Tasks.deleteMany({owner: user._id})

    next()
})

const User= mongoose.model('User',userSchema)

module.exports= User 