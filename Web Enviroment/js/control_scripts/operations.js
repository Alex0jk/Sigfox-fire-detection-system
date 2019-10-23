async function getSigfoxHistory() {
    var miInit = {
        method: 'POST',
    };

    return await fetch(' https://ofamvvl6re.execute-api.us-east-2.amazonaws.com/default/readDynamo', miInit)
        .then(function (response) {
            return (response.json());
        })
        .then(function (data){
            return data.Items.sort(function(a,b){
                return new Date(b.Date) - new Date(a.Date);
              });
        });
}

async function getLastNodesLecture(sigfoxList){
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

function stablishAlertState(temperature, gas, fire){
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