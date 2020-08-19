require('../src/db/mongoose')
const User=require('../src/models/tasks')
const Tasks = require('../src/models/tasks')

//to remove an task by id and to return number of tasks in false state 
/*
Tasks.findByIdAndRemove('5f337aebb2bb371f9861862c').then((tasks)=>{
console.log(tasks)
return Tasks.countDocuments({status:false})
}).then((result)=>{
console.log(result)
}).catch((e)=>{
    console.log(e)
}) */
//using async await method

const deleteAndCount= async(id)=>{
    const task=await Tasks.findByIdAndDelete(id)
    const count =await Tasks.countDocuments({status:false})
    return count
}
deleteAndCount('5f34c2a497a4b12b804e5f5f').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
