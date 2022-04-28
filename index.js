
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware //
app.use(cors());
app.use(express.json());

// mongo DB server connection// 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.053o8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('newdatabase').collection('apidata');

        app.get('/apidata', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query);
            const product = await cursor.toArray();
            res.send(product);

        })
    }

    finally { }

};

run().catch(console.log('MongoDB API Connected'));


app.get('/', (req, res) => {
    res.send('Runing server');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
