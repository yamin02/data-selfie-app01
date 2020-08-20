const express = require('express');
const Datastore = require('nedb');

const app = express();
const port = process.env.PORT || 3000 ;
//listen to local host 3000 and do the below
app.listen(port, () =>{
    console.log('life is starting babes');
});
app.use(express.static('public'));
app.use(express.json({limit :'1mb'}));

console.log('okay');
const database = new Datastore('database1.db');
database.loadDatabase();

// database.find({input : 'life'}, function (err , data4){
//     //console.log(data4);
//     if(err){
//         response.end();
//         console.log('not okay');
//     }else{
//         //response.json(data);
//         console.log(data4);
//     }
// });

app.get('/api',(request,response) => {
    database.find({}, (err , data) =>{
        if(err){
            response.end();
        }else{
            response.json(data);
        } 
    });
    console.log(request.body);
});

//get the response from index.html and give back response
app.post('/api', (request,response) => {
    // console.log(request.body);
    console.log('i gotta request');
    const timenow = Date.now();
    const data = request.body;
    
    console.log(data);
    database.insert(data);
    
    response.json({
        status : "success",
        lat : data.lat,
        long : data.long,
        time : data.timenow,
    })
});

app.post('/api2', (request,response) => {
    // console.log(request.body);
    console.log('New one');
    const timenow = Date.now();
    const data0 = (request.body);
    
    console.log(data0);
    database.find(data0, function (err , data4){
        //console.log(data4);
        if(err){
            response.end();
            console.log('not okay');
        }else{
            response.json(data4);
            console.log(data4);
        }
    });
    // response.json({
    //     status : "success",
    //     lat : data.lat,
    //     long : data.long,
    //     time : data.timenow,
    // })
});