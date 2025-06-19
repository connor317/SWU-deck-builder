
const express = require('express');
const { readFile } = require('fs').promises;
const app = express();
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';


app.set('view engine', 'ejs');

app.get('/', async (request, response) => {
    response.render('index', {
        Cards: [{ frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" },
        { frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid" }]
    });

});

app.get('/search', async (request, response) => {
    const query = request.query.q;
    console.log("Search query:", query);
    if (!query) {
        return response.render('search', { Cards: [] });
    }
    const client = new MongoClient(url);
    try {
        await client.connect();
        const coll = client.db('swu').collection('card');
        const cursor = coll.find({ Name: { $regex: query, $options: 'i' } });
        const results = await cursor.toArray();
        console.log("Search results:", results);
        if (results.length === 0) {
            return response.render('search', { Cards: [] });
        } else {
            return response.render('search', { Cards: results });
        }
    } catch (error) {
        console.error("Database connection error:", error);
        return response.status(500).send("Database connection error");
    } finally {
        await client.close();
    }
    // Simulate a database search
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});