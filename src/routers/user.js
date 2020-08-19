const express = require('express')
const User = require('../models/users')
const auth=require('../middleware/auth')
const router = new express.Router()
const multer= require('multer')
const sharp=require('sharp')
const { sendWelcomeEmails , sendDeleteEmails}= require('../emails/accounts')

//using async await method
//change app to router as we are using router from now 
router.post('/users', async(req,res)=>{
    const user =new User(req.body)
    try{
await user.save()
sendWelcomeEmails(user.email,user.name)
const token= await user.generateAuthToken()
res.status(201).send({user , token})
    }catch(e){
        res.status(400).send(e)
    }
})

//to provide a specific login credentials

router.post('/users/login', async (req, res)=>{
    try{
const user= await User.findByCredentials(req.body.email, req.body.password)
const token = await user.generateAuthToken()
res.send({user , token})
    }
    catch(e){
res.status(400).send(e)
    }
})

// to logout (user)
router.post('/users/logout',auth,async(req,res)=>{
try{
req.user.tokens= req.user.tokens.filter((token)=> {
    return token.token !== req.token
})
await req.user.save()
    res.send()
}
catch(e){
res.status(500).send()
}
})

//to logout all (tokens) at a time

router.post('/users/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens= []
        await req.user.save()
        res.send()
        
    }
    catch(e){
        res.status(500).send()
    }
})
//to read users existing
//using async await method 
//to get user details 

router.get('/users/me',auth,async (req,res)=>{
 res.send(req.user)
})


//can read single user by other details like name or age with the help of findOne instead of findById
//to update an existing user using id

router.patch('/users/me',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowdedupdates=['name','email','password','age']
    const isValidOperation=updates.every((update)=> allowdedupdates.includes(update))
    if(!isValidOperation){
        res.status(400).send({error:'invalid update'})
    }
    try{

updates.forEach((update)=> req.user[update]=req.body[update])
await  req.user.save()
res.send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//to delete a user
 // to remove the autheticated user 
router.delete('/users/me',auth,async (req,res)=>{
    try{   
await req.user.remove()
sendDeleteEmails(req.user.email,req.user.name)
res.send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
})
//to upload files into user like images,pdf  etc

const upload=multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
        cb(new Error('please upload only specified documents'))
    }
cb(undefined,true)
    }
})
router.post('/users/me/avatar',auth, upload.single('avatar'), async (req,res)=>{
    const buffer=  await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
 req.user.avatar= buffer
 await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({
        error: error.message
    })
}) 

//to delete the user profile picture
router.delete('/users/me/avatar',auth, upload.single('avatar'), async (req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

//to fetch the user profile picture from a url 

router.get('/users/:id/avatar', async(req,res)=>{
    try{
const user =await User.findById(req.params.id)

if(!user|| !user.avatar){
    throw new Error()
}
res.set('Content-Type','image/png')
res.send(user.avatar)
    }catch(e){
        res.status(400).send()
    }
})
module.exports=router