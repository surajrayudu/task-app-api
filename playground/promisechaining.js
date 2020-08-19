require('../src/db/mongoose')
const User=require('../src/models/users')


//update an user using his id with findByIdAndUpdate and can also use findOneAndUpdate
//to update and return number of objects with same age
/*
User.findByIdAndUpdate('5f336ea2b01b9320782e3ab8',{age:24}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:24})

}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
}) */
//using async await method

const updateAndCount= async(id,age)=>{
    const user= await User.findByIdAndUpdate(id,{age})
    const count= await User.countDocuments({age})
    return count
}
updateAndCount('5f336ea2b01b9320782e3ab8',25).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})