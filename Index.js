const express = require("express")
const dotenv = require("dotenv")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors")
const app = express()
dotenv.config()

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;
app.use(cors())
app.use(express.json())

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
    const bookingCollection = db.collection('bookings')
    app.post('/destination', async (req, res) => {
      const newDestination = req.body;
      const result = await destinationCollection.insertOne(newDestination)
      res.json(result)
    })
    app.get('/destination', async (req, res) => {
      const result = await destinationCollection.find().toArray()
      res.send(result)
    })
    app.get('/destination/:id', async (req, res) => {
      const id = req.params.id;
      const result = await destinationCollection.findOne({ _id: new ObjectId(id) })
      res.send(result)
    })
    app.patch('/destination/:id', async (req, res) => {
      const id = req.params.id;
      const updatedDestination = req.body;
      const result = await destinationCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedDestination }
      )
      res.send(result)
    })
    app.delete('/destination/:id', async (req, res) => {
      const id = req.params.id;
      const result = await destinationCollection.deleteOne({ _id: new ObjectId(id) })
      res.send(result)
    })
    app.post('/bookings', async (req, res) => {
      const newBooking = req.body;
      const result = await bookingCollection.insertOne(newBooking);
      res.json(result)
    })
    app.get('/bookings', async (req, res) => {
      const id = req.params.id;
      const result = await bookingCollection.find().toArray()
      res.send(result)
    })
    app.get('/bookings/:userId', async (req, res) => {
      const userId = req.params.userId;
      const result = await bookingCollection.find({
        userId: { $eq: userId }
      }).toArray()
      res.send(result)
    })
    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const result = await bookingCollection.deleteOne({
        _id : new ObjectId(id)
      })
      res.send(result)
    })



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send("hello world")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})