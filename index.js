
const express = require('express');
const { readFile } = require('fs').promises;
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (request, response) => {
    response.render('index', { Cards: [{frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}, {frontImage: "https://cdn.swu-db.com/images/cards/SOR/059.png", name: "2-1B Surgical Droid"}] });
    
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});