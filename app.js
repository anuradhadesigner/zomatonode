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

//city 
// app.get('/city',(req,res) => {
//     res.send("This is from city")
// })

//location----------------------return all the city
app.get('/location',(req,res) => {
    db.collection('location').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
//hotels as per city
app.get('/hotels',(req,res) => {
    let city = Number(req.params.city)
    let query = {};
    if(city){
        query = {city: city}
    }
    console.log(">>>>hotelId",city)
    db.collection('hotels').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
    
})
//restaurants as per location
app.get('/restaurants',(req,res) => {
    let stateId = Number(req.params.state_id)
    let query = {};
    if(stateId){
        query = {state_id: stateId}
    }
    console.log(">>>>restId",stateId)
    db.collection('restaurants').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
    
})

// // return all the mealType
// app.get('/mealType',(req,res) => {
//     db.collection('mealType').find().toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })
// return all the restaurants
// app.get('/restaurants',(req,res) => {
//     db.collection('restaurants').find().toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })


// app.get('/city',(req,res) => {
//     res.send(city)
// })



// connecting with mongodb
MongoClient.connect(mongoUrl,(err,connection) =>{
    if(err) console.log('Error while connecting');
    db = connection.db('zomato-node');
    app.listen(port,() =>{
        console.log(`Listing to the port ${port}`)
    })
})

