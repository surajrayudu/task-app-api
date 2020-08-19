//CRUD == create read update and delete

/* general structure to call 
const mongodb= require('mongodb')
const MongoClient=mongodb.MongoClient
const ObjectID= mongodb.ObjectID
 */

 //destructuring method to call

  const {MongoClient, ObjectID}= require('mongodb')
const e = require('express')


const connectionURL='mongodb://127.0.0.1:27017'
const databasename='task-app'

/* to create an object id
const id= new ObjectID()
console.log(id)
console.log(id.getTimestamp())
*/
MongoClient.connect(connectionURL,{ useNewUrlParser: true},(error,client)=>{
    if(error){
       return console.log('unable to connect the database')
    }
const db= client.db(databasename)
/* to insert one document into a collection
db.collection('users').insertOne({
    _id:id,
    name:'vikram',
    age:24
},(error,result)=>{
if(error){
    return console.log('unable to connect')
}
console.log(result.ops)
}) */

 /* to insert many documents into a collection
db.collection('users').insertMany([
    {
        name:'bunty',
        age:21
    }, {
        name:'pruthvi',
        age:26
    }
], (error, result) => {
    if(error){
    return console.log('unable to connect')
    }
console.log(result.ops)
}) */

/*
db.collection('tasks').insertMany([
    {
        description:'going to shop',
        status: true
    },{
        description:'sleeping',
        status:false
    },{
        description:'reading',
        status:true
    }
],(error, result) =>{
    if(error){
        return console.log('unable to connect')
    }
    console.log(result.ops)
  }) */


// to read the documents
/*
db.collection('users').findOne({name:'suraj',age: 1},(error,user)=>{
if(error){
    return console.log('unable to fetch data')
}
console.log(user)
})*/
//to find multiple documents
/*
db.collection('users').find({age:22}).toArray((error,users)=>{
    if(error){
        return console.log('unable to fetch data')
    }
    console.log(users)
})
//to know the count of documents found
db.collection('users').find({age:22}).count((error, count)=>{
    if(error){
        return console.log('unable to fetch data')
    }
    console.log(count)
})*/
//update documents
/*
const updatePromise=db.collection('users').updateOne({
    _id: new ObjectID("5f323361cc099f37d85c8200")
},{
    // to set value of any field
    $set:{
name:'poorna'
    }
    //to increment values
    $inc:{
        age:2
    }
})

updatePromise.then((result)=>{
console.log(result)
}).catch((error)=>{
console.log(error)
}) */

//to update many documents
/*
db.collection('tasks').updateMany({
    status:false
}, {
    $set:{
        status:true
    }
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
}) */

//deleting multiple documents 
/*
db.collection('users').deleteMany({
    age:24
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
}) */
//deleting one document 
db.collection('tasks').deleteOne({
    description:"sleeping"
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)

})
})