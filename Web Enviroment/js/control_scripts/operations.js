// This file contains some basic operations that are used through the whole site

async function getSigfoxHistory() { // This operations gets all data from the Dynamo Database calling a AWS Lambda Function
    var miInit = {
        method: 'GET',
    };

    return await fetch('READ_DATA_URI', miInit)
        .then(function (response) {
            return (response.json());
        })
        .then(function (data){
            return data.Items.sort(function(a,b){
                return new Date(b.Date) - new Date(a.Date);
              });
        });
}

async function getLastNodesLecture(sigfoxList){ // This operations returns the last entries of all the nodes conected to the system
    let lastItemsSigfoxList=[];
    let length = sigfoxList.length
    for(var i=0; i<length; i++){
        if(lastItemsSigfoxList.find(element => element.sigfoxId === sigfoxList[i].sigfoxId) === undefined){
            sigfoxList[i].status = stablishAlertState(sigfoxList[i].Temperature,sigfoxList[i].Gas,sigfoxList[i].Fire);
            console.log(sigfoxList[i]);
            lastItemsSigfoxList.push(sigfoxList[i]);
        }
    }
    return lastItemsSigfoxList;
}

function stablishAlertState(temperature, gas, fire){ // This operations returns the alert states based on temperatur, carbon monoxide and fire existance
    if(temperature <= 45){
        if( gas < 70 ){
            if(fire == 0 ){
                return "yellow";
            } else {
                return "orange";
            }
        } else{
            return "orange";
        }
    } else if (temperature <= 60 && temperature > 45){
        if( gas <= 70 ){
            if(fire == 0 ){
                return "yellow";
            } else {
                return "orange";
            }
        } else if (gas > 70 && gas <=100 ){
            return "orange";
        } else if(gas > 100){
            if(fire == 0 ){
                return "orange";
            } else {
                return "red";
            }
        }

    } else if (temperature > 60){
        if( gas <= 70 ){
            if(fire == 0 ){
                return "orange";
            } else {
                return "red";
            }
        } else if (gas > 70 && gas <=100 ){
            if(fire == 0 ){
                return "orange";
            } else {
                return "red";
            }
        } else if(gas > 100){
            return "red";
        }
    }
}