const express= require('express')
const auth= require('../middleware/auth')
const Tasks= require('../models/tasks')
const router= new express.Router()
//change app to router as we are using routers from now
//using async and await method 
//to create a task

router.post('/tasks',auth, async(req,res)=>{
    const task=new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try{
await task.save()
res.status(200).send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})
//to read existing tasks of the authenticated user
//to get only required type of tasks
//GET/tasks?status=true/fasle 
//to create pagination in search results //GET/tasks?limit=10(number of search results in one page)&skip=0(to get the first 10results &to get the next page results skip value should be incremented by value of limit)
//to sort results data //GET/tasks?sortBy=createdAt:asc(for ascending order and dsc for descending order)

router.get('/tasks',auth,async(req,res)=>{
    const match={}
    const sort={}
if(req.query.status){
  match.status=req.query.status==='true'
    }
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc' ? -1:1
    }
    try{
await req.user.populate({
    path:'tasks',
    match,
    options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
    }
}).execPopulate()
res.send(req.user.tasks)
    }
    catch (e){
        res.status(400).send(e)
    }
})
//to read task by event and can also be done using id(findtaskbyid)
router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
const task= await Tasks.findOne({ _id , owner:req.user.id})
if(!task){
    return res.status(404).send()
}
res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})
//to update a task
router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowdedupdates=['event','status']
    const isValidOperation=updates.every((update)=> allowdedupdates.includes(update))
    if(!isValidOperation){
        res.status(400).send({error:'invalid update'})
    }
    try{
        const task= await Tasks.findOne({_id:req.params.id , owner:req.user.id})
if(!task){
    return res.status(404).send()
}
updates.forEach((update)=>task[update]=req.body[update])
await task.save()
res.send(task)
    }
    catch(e){
        res.status(400).send(e)
    }
})

//to delete a task
router.delete('/tasks/:id',auth,async (req,res)=>{
    try{
const task = await Tasks.findOneAndDelete({_id:req.params.id , owner:req.user._id})
if(!task){
    return res.status(404).send()
}
    res.send(task)
}
    catch (e){
        res.status(400).send(e)
    }
})

module.exports=router