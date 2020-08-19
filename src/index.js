const express= require('express')
require('./db/mongoose')
const multer=require('multer')
const userRouter= require('./routers/user')
const taskRouter= require('./routers/task')
const jwt = require('jsonwebtoken')

const { get } = require('request')
const e = require('express')
const { findByIdAndDelete } = require('./models/users')
const Tasks = require('./models/tasks')
const User = require('./models/users')
const app=express()
const port= process.env.PORT
app.use(express.json())
//to use diff routers for diff documents(users,tasks,etc)to have structured files
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('server is up on port'+port)
})
