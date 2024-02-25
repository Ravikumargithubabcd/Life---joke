import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));

const api = "https://v2.jokeapi.dev/joke/";


app.get("/",  async (req,res) => {
    try {
        const response = await axios.get(`${api}any`);
        res.render("index.ejs", { joke : response.data.joke , setup : response.data.setup , delivery : response.data.delivery});
    } catch (error) {
        console.log(error.message);
    }
});


app.post("/submit", async (req,res) => {
    var jokeType = req.body.jokeType;
    if (typeof(jokeType) === "undefined") {
        jokeType = "any";
    }
    try {
        const response = await axios.get(`${api}${jokeType}`);
        res.render("index.ejs" , { joke : response.data.joke , setup : response.data.setup , delivery : response.data.delivery});
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port , () => {
    console.log(`server is running on port ${port}`);
});
 