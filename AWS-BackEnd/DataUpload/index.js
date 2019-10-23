console.log('function starts')

const AWS = require('aws-sdk')
const uuidv1 = require('uuid/v1');
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = function(event, context, callback){
    console.log('processing event: ' + JSON.stringify(event, null, 2))

    //guardar datos
    let params =  {
        
        Item: {
            Date: Date.now(),
            Temperature: event.temperature/100,
            Pressure: event.pressure,
            Gas: event.gas/1000,
            Fire: event.fire/100,
            sigId: uuidv1()+"",
            sigfoxId: event.sigfoxId,
            latitude: event.latitude,
            longitude: event.longitude
        },

        TableName: 'PruebaSigfox'
    };

    docClient.put(params, function(err,data){
        if(err) {
            callback(err, null)
        }else{
            callback(null, data)
        }
    });

}