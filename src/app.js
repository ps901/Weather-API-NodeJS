const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast=require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirPath=path.join(__dirname, "../public");
const viewsPath=path.join(__dirname, "../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");


//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req,res) => {
    res.render("index", {title: "Weather App", name: "ps901"});
});

app.get("/about", (req,res) => {
    res.render("about", {
        title: "Weather App",
        name: "ps901"
    })
})

app.get("/help", (req,res) => {
    res.render("help", {
        message: "kal aana",
        title: "Help",
        name: "ps901"
    })
})


app.get("/weather", (req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "Please enter your address"
        })
    }
    geocode(req.query.address, (error, data={}) => {
        if(error) {
            return res.send({error: error })
        } 
        forecast(data.lat,data.lon, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})




app.get("/help/*",(req,res) => {
    res.render("error",{
        error: "Help article not found",
        title: "404",
        name: "ps901"
    });
})

app.get("*", (req,res) => {
    res.render("error",{
        error: "Page not found",
        title: "404",
        name: "ps901"
    });
})                                                

app.listen(port, () => {
    console.log("Server Started on port "+port);
})
