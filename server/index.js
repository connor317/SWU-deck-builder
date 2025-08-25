
const express = require('express');
const { readFile } = require('fs').promises;
const app = express();
const { MongoClient } = require('mongodb');
const cors = require("cors")

const url = 'mongodb://localhost:27017/';

app.use(cors())
app.get('/api', async (request, response) => {
    response.render("This is the api for the Deck Builder")
});

app.get('/api/search', async (request, response) => {
    const query = request.query.q;
    console.log("Search query:", query);
    const client = new MongoClient(url);
    try {
        await client.connect();
        const coll = client.db('swu').collection('card');

        // TODO: Add abitlity to sort by release date.
        // Currently sorting by Set but this is alphabetical not by relase order.
        const sort = {
            'Set': -1,
            'Number': 1
        };
        search = {
            $or: [
                { Name: { $regex: query, $options: 'i' }},
                { FrontText: { $regex: query, $options: 'i' } },
                { BackText: { $regex: query, $options: 'i' } },
                { Subtitle: { $regex: query, $options: 'i'} }
            ],
            VariantType: "Normal"
        };

        const leadersCursor = coll.find({ ...search, Type: "Leader" }, { sort });
        const deckCursor = coll.find({ ...search,  Type: {$in: ["Unit", "Event", "Upgrade"]} }, { sort });
        const basesCursor = coll.find({ ...search, Type: "Base" }, { sort });

        const leaderResults = await leadersCursor.toArray();
        const deckResults = await deckCursor.toArray();
        const baseResults = await basesCursor.toArray();
        
        return response.json({ LeaderCards: leaderResults, DeckCards: deckResults, BaseCards: baseResults, q: request.query.q });
    } catch (error) {
        console.error("Database connection error:", error);
        return response.status(500).send("Database connection error");
    } finally {
        await client.close();
    }
});

// Take in a set abreviation and number and return the card that matches
app.get('/api/card', async (request, response) => {
    const set = request.query.set
    const number = request.query.number
    const client = new MongoClient(url);
    try {
        await client.connect();
        const coll = client.db('swu').collection('card');
        search = {$and: [{Set: set}, {Number: number}]}
        console.log(search)
        const result = await coll.findOne({ ...search})
        console.log(result)
        return response.json(result)
    } catch (error) {
        console.error("Database connection error:", error);
        return response.status(500).send("Database connection error");
    } finally {
        console.log("closing client")
        await client.close();
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});