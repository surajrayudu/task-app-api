const mongoose = require('mongoose')
const validator= require('validator')

const taskSchema= new mongoose.Schema({
    event:{
type:String,
trim: true,
required:true,
    },
    status:{
type: Boolean,
default:false,
trim:true
    },
    owner:{
       type: mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'User'

    }
},{
    timestamps:true
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

const Tasks= mongoose.model('Tasks',taskSchema)

module.exports= Tasks