const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({
    reviewerName: String,
    review: String,
    movie: String,
  });

const Item = mongoose.model('Item', itemSchema);

app.post("/api/newReview", async (req, res) => {
    console.log("New Review");
    const item = new Item({
        reviewerName: req.body.reviewerName,
        review: req.body.review,
        movie: req.body.movie
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put("/api/update/:movie/:name", async (req, res) => {
    try {
        let item = await Item.findOne({
            movie: req.params.movie,
            reviewerName: req.params.name
        });
        item.review = req.body.review;
        item.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete("/api/delete/:reveiw", async (req, res) => {
    console.log("Delete " + req.params.movie);
    try{
        await Item.deleteOne({
            review: req.body.review,
        });
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get("/api/get/:movie", async (req,res) => {
    console.log("Get");
    try {
        let items = await Item.find({
            movie: req.params.movie,
        });
        res.send(items);
    } catch(error) {
        console.log(error);
        sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));