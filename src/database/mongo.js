const mongoose = require('mongoose')
const validator= require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/taskapp-api',{
    useNewUrlParser: true,
    useCreateIndex:true
})

const User= mongoose.model('User',{
    name:{
        type:String,
        required: true,
        trim: true
    }, age:{
type: Number,
validate(value) {
if(value<18){
    throw new Error('you should be 18+ to enter!')
}
}
},
email:{
type: String,
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
   minlenght:7,
   validate(value){
       if(value.includes('password')){
           throw new Error('password cannot be password!')
       }
   } 
}
})


 /*
const me= new User({
    name:'bunty',
    age:24,
    email: 'surajrayudu@gmail.com',
    password: '287bsr???sw?'

})

me.save().then(()=>{
console.log(me)
}).catch((error)=>{
console.log('Error!',error)
})
*/
 
const Tasks= mongoose.model('Tasks',{
    event:{
type:String,
trim: true,
required:true,

    },
    status:{
type: Boolean,
default:false,
trim:true
    }
})
/*
const tasks= new Tasks({
    event:'list', 
    status: true
})

tasks.save().then(()=>{
console.log(tasks)
}).catch((error)=>{
    console.log('Error!',error)
}) */