// UserApp.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3010;

const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // MongoDB localHost

app.get('/:username', async (req, res) => {
    const dbName = 'User'; 
    const collectionName = 'UserDetail'; 
    const username = req.params.username; 

    try {
        // Connect to localHostMongoDB
        const client = await MongoClient.connect(uri);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const document = await collection.findOne({ username });

        if (document) {
            res.send(document); 
        } else {
            res.status(404).send(' 404 Error!Document not found!'); 
        }

        client.close();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Starting ther server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
