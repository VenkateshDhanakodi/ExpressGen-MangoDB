var express = require('express');
var router = express.Router();
const {mongodb, dbName, dbUrl, Mongoclient } = require('../Config/dbConfig');

router.get('/', async(req, res)=>{
    const client = new Mongoclient(dbUrl);
    client.connect();
    try {
        let db = client.db(dbName);
        let users = await db.collection('users').find().toArray(); //Using find method and converting into an Array.
        res.status(200).send({ 
            statusCode : 200,
            message : "Get Data Successfull",
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error", error)
    } finally {
        client.close();
    }
})

router.get('/:id', async(req, res)=>{
    const client = new Mongoclient(dbUrl);
    client.connect();
    try {
        let db = client.db(dbName);
        let users = await db.collection('users').findOne({_id:new mongodb.ObjectId(req.params.id)}); //Using findOne to get by ObjectId
        console.log(users);
        res.status(200).send({
            statusCode : 200,
            message : "Get Data by ID Successfull",
            users
        })
    } catch (error) {
        console.log(error);
        res.status(200).send("Internal Error", error)
    } finally {
        client.close();
    }
})

router.post('/', async(req, res)=>{
    const client = new Mongoclient(dbUrl);
    client.connect();
    try {
        let db = client.db(dbName);
        let users = await db.collection('users').insertOne(req.body); //Inserting one data into users collection by using insertOne
        console.log(users);
        res.status(201).send({
            statusCode : 200,
            message : "Posted Successfully",
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error", error)
    } finally {
        client.close();
    }
})

router.put('/:id', async(req, res)=>{
    const client = new Mongoclient(dbUrl);
    client.connect();
    try {
        let db = client.db(dbName);
        let users = await db.collection('users').updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set:(req.body)});//Updating the selected ObjectId data using updateOne
        console.log(users);
        res.status(201).send({
            statusCode : 200,
            message : "Get Edited Successfully",
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error", error)
    } finally {
        client.close();
    }
})

router.delete('/:id', async(req, res)=>{
    const client = new Mongoclient(dbUrl);
    client.connect();
    try {
        let db = client.db(dbName);
        let users = await db.collection('users').deleteOne({_id:new mongodb.ObjectId(req.params.id)}); //deleting the selected ObjectId data using DeleteOne
        console.log(users);
        res.status(201).send({
            statusCode : 200,
            message : "Deleted Successfully",
            users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error", error)
    } finally {
        client.close();
    }})

module.exports = router;
