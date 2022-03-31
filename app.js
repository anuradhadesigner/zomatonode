let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// const mongoUrl = "mongodb://localhost:27017"
const mongoUrl = "mongodb+srv://developer:developer123@cluster0.r3psx.mongodb.net/zomato-node?retryWrites=true&w=majority"
const dotenv = require('dotenv');
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
let port = process.env.PORT || 8230;
var db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

//get req
app.get('/',(req,res) =>{
    res.send("Welcome to express")
})
//location
app.get('/location',(req,res) =>{
    db.collection('location').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
    // res.send("Get Location")
})

//restaurant as per location
/*app.get('/restaurants/:id',(req,res) =>{ 
    let restId = Number(req.params.id)
    console.log(">>>>restId",restId)
    db.collection('restaurants').find({state_id:restId}).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})*/

//with query params
app.get('/restaurants',(req,res) =>{ 
    let stateId = Number(req.query.state_id)
    let mealId = Number(req.query.meal_id)
    let query = {};
    if(stateId && mealId){
        query = {"mealTypes.mealtype_id":mealId,state_id:stateId}
    }
    else if(stateId){
        query = {state_id:stateId}
    }
    else if(mealId){
        query = {"mealTypes.mealtype_id":mealId}
    }
    console.log(">>>>restId",stateId)
    db.collection('restaurants').find(query).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})
//filters
app.get('/filter/:mealId',(req,res) =>{
    let sort = {cost: 1}
    let mealId = Number(req.params.mealId)
    let cuisineId = Number(req.query.cuisine)
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let query = {}
    if(req.query.sort){
        sort = {cost:req.query.sort}
    }
    if(cuisineId&lcost&hcost){
        query = {
                "cuisines.cuisine_id":cuisineId,
                "mealTypes.mealtype_id":mealId,
                $and:[{cost:{$gt:lcost,$lt:hcost}}]
            }
    }
    else if(cuisineId){
        query = {"cuisines.cuisine_id":cuisineId,"mealTypes.mealtype_id":mealId}
    }
    else if(lcost&hcost){
        query = {$and:[{cost:{$gt:lcost,$lt:hcost}}],"mealTypes.mealtype_id":mealId}
    }
    db.collection('restaurants').find(query).sort(sort).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//mealType
app.get('/mealtype',(req,res) =>{
    db.collection('mealtype').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//restaurants details
app.get('/details/:id',(req,res) =>{ 
    let restId = Number(req.params.id)
    // let restId = mongo.ObjectId(req.params.id)
    db.collection('restaurants').find({restaurant_id:restId}).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})
//menu wrt restaurants
app.get('/menu/:id',(req,res) =>{ 
    let restId = Number(req.params.id)
    db.collection('menu').find({restaurant_id:restId}).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})
//menu on basis of user selection
//get orders
app.get(`/orders`,(req,res) =>{ 
    let email = req.query.email
    let query = {};
    if(email){
        query = {"email":email}
    }
//     console.log(">>>>restId",stateId)
    db.collection('orders').find(query).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})
//place order(post)
app.post('/placeOrder',(req,res) => {
    // console.log(req.body)
    db.collection('orders').insertOne(req.body,(err, result) =>{
        if(err) throw err;
        res.send('Order Added')
    })
})
//menuItem (post)
app.post('/menuItem',(req,res) => {
     console.log(req.body)
     db.collection('menu').find({menu_id:{$in:req.body}}).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//delete data
app.delete('/deleteOrder',(req,res) => {
    db.collection('orders').remove({},(err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//update data
app.put('/updateOrder/:id',(req,res) => {
    let ordId = mongo.ObjectId(req.params.id)
    let status = req.query.status?req.query.status:'Pending'
    db.collection('orders').updateOne(
        {_id:ordId},
        {$set: {
            "status":status,
            "bank_name":req.body.bank_name,
            "bank_status":req.body.bank_status
        }},(err, result)=>{
            if(err) throw err;
            res.send(`Status updated to ${status}`)
        }
    )
})




// connecting with mongodb
MongoClient.connect(mongoUrl,(err,connection) =>{
    if(err) console.log('Error while connecting');
    db = connection.db('zomato-node');
    app.listen(port,() =>{
        console.log(`Listing to the port ${port}`)
    })
})

