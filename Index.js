const express = require("express")
const dotenv = require("dotenv")
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
dotenv.config()

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {

    await client.connect();
    const db = client.db('wandertust')
    const destinationCollection = db.collection('destination')
    app.post('/destination' , async(req , res) =>{
        const newDestination = req.body;
       const result = await destinationCollection.insertOne(newDestination)
       res.json(result)
    })







    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    await client.close();
  }
}
run().catch(console.dir);
app.get('/' ,(req ,res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})