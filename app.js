const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const app_id = "80b4824f";
    const app_key = "13464b92d4a05b4551fc37844f1fa85d";
    const wordId = req.body.wordSearch;
    const fields = "definitions";
    const strictMatch = "false";
    
    const option = {
        host: "od-api.oxforddictionaries.com",
        port: "443",
        path: "/api/v2/entries/en-gb/" + wordId + "?fields=" + fields + "&strictMatch=" + strictMatch,
        method: "GET",
        headers: {
            "app_id": app_id,
            "app_key": app_key
        }
    };
    
    https.get(option, function(response){

        response.on("data", function(data){
            const dictionaryData = JSON.parse(data);
            const def = dictionaryData.results[0].lexicalEntries[0].entries[0].senses[0].definitions;
            res.send("<h1>The definition gotten is: " + def + "</h1>");
        });
    });
    
});





app.listen(3000, function(){
    console.log("Server started at Port 3000");
});




// const app_id = "80b4824f"; // insert your APP Id
//     const app_key = "13464b92d4a05b4551fc37844f1fa85d"; // insert your APP Key
//     const wordId = req.body.wordSearch;
//     const fields = "pronunciations";
//     const strictMatch = "false";

//     const options = {
//     host: 'od-api.oxforddictionaries.com',
//     port: '443',
//     path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
//     method: "GET",
//     headers: {
//         'app_id': app_id,
//         'app_key': app_key
//         }
//     };

//     https.get(options, (resp) => {
//         let body = '';
//         resp.on('data', (d) => {
//         body += d;
//         });
//         resp.on('end', () => {
//             let parsed = JSON.stringify(body);

//             console.log(parsed);
//         });
//     });