//package to read json files
var jsonfile = require('./artists.json');
//AWS node sdk
var AWS = require('0JctR23i8H6hlgUcAdxT29qVL7JvNyC/yYdLh+2b');
 
//need to update region in config
AWS.config.update({
    region: "us-west-1"
});
 
//create a doc client to allow using JSON directly
var docClient = new AWS.DynamoDB.DocumentClient();
 
//prepared JSON file
//[{ ... }, { ... }]
var placeFile = "/artists.json";
var placeArray = jsonfile.readFileSync(placeFile);
 
//utility function to create a single put request
function getArtist(index){
    return {
        TableName: 'Artists',
        Item: artistsArray[index]
    };
}
 
//recursive function to save one artist at a time
function saveArtists(index){
    if(index == artistsArray.length){
        console.log("saved all.");
        return;
    }
 
    var params = getArtist(index);
    //spit out what we are saving
    console.log(JSON.stringify(params));
    //use the client to execute put request.
    docClient.put(params, function(err, data) {
        if (err) {
            console.log(err);
        }else{
            console.log("saved Artist item "+index);
            index += 1;
            //save the next artist on the list
            //with half a second delay
            setTimeout(function(){
                saveArtists(index);
            }, 500);
        }
    });
}
 
//start saving from index - 0
saveArtists(0);