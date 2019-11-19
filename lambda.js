'use strict';

var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 

exports.writeArtist = function(event, context, callback){
	var params = {
		Item : {
			"artist_id" : 157,
			"name" : 'Taylor Swift'
		},
		TableName : process.env.artists
	};
	documentClient.put(params, function(err, data){
        callback(err, data)
    }
}