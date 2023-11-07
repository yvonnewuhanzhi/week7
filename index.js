let express = require('express');
let app = express();

//db1 connect to the mongodb
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Yvonne:Zhizhi010731@cluster0.4wiymf1.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Database connected!");
});
db.connect();

app.use('/',express.static('public'));
app.use(express.json());



// app.get('/',(req,res)=>{
//     res.send('this is the main page');
// })


//POST2. add a route on server, that is listening for a post request
app.post('/quotes',(req,res)=>{
    console.log(req.body);
    let obj = {
        quote: req.body
    }

    //db2 add values to the db
    db.push('quoteTrackerData',obj);

    // coffeeTracker.push(obj);
    // console.log(coffeeTracker);
    res.json({task:'success'});
})





//add route to get all the track information
app.get('/getQuotes',(req,res)=>{
    //db3 fetch from the db
    db.get('quoteTrackerData').then(quoteData=>{
        let obj={data:quoteData};
        res.json(obj);

    })


    // let obj = {data:quoteTracker};
    // res.json(obj);
})

app.listen(5000,()=>{
    console.log('listening at localhost:5000');
})