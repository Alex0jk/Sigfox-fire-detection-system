var sigfoxLastData;

function createTemplate(sigfoxData) {
    sigfoxData.Date = new Date(sigfoxData.Date).toISOString();
    let template = $("#data-template")[0].innerHTML;
    return Mustache.render(template, sigfoxData);
}
async function listSigfoxLastData() {
    sigfoxLastData = await  getLastNodesLecture(await getSigfoxHistory());
    if (sigfoxLastData !== undefined) {
        $("#lastStateData tbody tr").remove();
        let table = $("#lastStateData tbody");
        sigfoxLastData.forEach(doc => {
            table.append(createTemplate(doc));
        });
    }
}

$(document).ready(function () {
    listSigfoxLastData();
});