
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
                { BackText: { $regex: query, $options: 'i' } }
            ],
            VariantType: "Normal"
        };

        const leadersCursor = coll.find({ ...search, Type: "Leader" }, { sort });
        const deckCursor = coll.find({ ...search,  Type: {$in: ["Unit", "Event", "Upgrade"]} }, { sort });
        const basesCursor = coll.find({ ...search, Type: "Base" }, { sort });

        const leaderResults = await leadersCursor.toArray();
        const deckResults = await deckCursor.toArray();
        const baseResults = await basesCursor.toArray();
        
        return response.render('search', { LeaderCards: leaderResults, DeckCards: deckResults, BaseCards: baseResults });
    } catch (error) {
        console.error("Database connection error:", error);
        return response.status(500).send("Database connection error");
    } finally {
        await client.close();
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});