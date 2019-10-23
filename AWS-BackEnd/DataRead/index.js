console.log('function starts')

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = function(event, context, callback){

    let scanningParameters =  {
        TableName: 'PruebaSigfox',
        Limit: 1000
    };

    docClient.scan(scanningParameters, function(err,data){
        if(err) {
            callback(err, null)
        }else{
            callback(null, data)
        }
    });

}