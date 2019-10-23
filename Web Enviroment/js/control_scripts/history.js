var sigfoxList;

function createHistoryTemplate(sigfoxData) {
    sigfoxData.Date = new Date(sigfoxData.Date).toISOString();
    let template = $("#history-data-template")[0].innerHTML;
    return Mustache.render(template, sigfoxData);
}
function showDetailedData(id){
    historyData = sigfoxList.find(element => element.sigId == id);
    $("#sigfoxDetails").html(JSON.stringify(historyData,null,3));  
}
async function listSigfoxData() {
    sigfoxList = await getSigfoxHistory();
    if (sigfoxList !== undefined) {
        $("#sigfoxHistory tbody tr").remove();
        let table = $("#sigfoxHistory tbody");
        sigfoxList.forEach(doc => {
            table.append(createHistoryTemplate(doc));
        });
    }
}

$(document).ready(function () {
    listSigfoxData();
});