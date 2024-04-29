const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_TOUR}:${process.env.BD_PASSE}@cluster0.8ibeotr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    const data = client.db("tourDB");
    const tourCollection = data.collection("tourCollection")
    app.post('/touristsSpots', async(req, res) => {
        const touristsSpots = req.body;
        console.log(touristsSpots);
        const result = await tourCollection.insertOne(touristsSpots);
        console.log('Inserted document:', result);
        res.send(result);
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('make server')
})
app.listen(port, ()=>{
    console.log('server is running')
})
