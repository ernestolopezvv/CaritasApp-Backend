const { notEqual } = require("assert")
const express = require("express")
const mongoose = require("mongoose")
const Router = require("./routes")
const app = express()
var Data = require("./donationsSchema")

app.use(express.json());

const MONGODB_URI = 'mongodb+srv://caritasdb:caritasdb@dbcluster.y2ft3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI || 'mongodb://localhost/CaritasDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open",  () => {
    
    console.log("Conected to Caritas DB!")

}).on("error", (error) => {

    console.log("Failed to connect " +  error)
})

app.use(Router);

app.listen(8081, () => {
    console.log("Server is running at port 8081");
  });


// Create donation
// POST request

app.post("/createdonation", (req, res) => {

    var donation = new Data ({

        receptionState: req.get("receptionState"),
        billState: req.get("billState"),
        creationDate: req.get("creationDate"),
        receptionDate: req.get("receptionDate"),
        weightKg: req.get("weightKg"),
        destination: req.get("destination")

    })

    donation.save().then(() => {

        if (donation.isNew == false) {
            
            console.log("Save data!")
            res.send("Saved data!")
        }
        else {

            console.log("Failed to save data!")
        }
    })
})

// http://192.168.1.71:8081/createdonation


// Fetch all donations
// GET request

app.get("/fetchdonation", (req, res) => {
    Data.find({}).then((DBitems) => {

        res.send(DBitems)
    })
})

// Delete donation
// POST request
app.post("/deletedonation", (req, res) => {

    Data.findOneAndRemove({
        _id: req.get("id")
    },(error) => {
        console.log("Failed " + error)
    })

    res.send("Deleted!")
})

// Update donation
// POST request

app.post("/updatedonation", (req, res) => {
    
    Data.findOneAndUpdate({

        _id: req.get("id")

    }, {

        receptionState: req.get("receptionState"),
        billState: req.get("billState"),
        creationDate: req.get("creationDate"),
        receptionDate: req.get("receptionDate"),
        weightKg: req.get("weightKg"),
        destination: req.get("destination")
        

    }, (error) => {
        console.log("Failded to Update " + error)
    })

    res.send("Updated!")
    
})