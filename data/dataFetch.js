let mainData;

function getData(){    
    fetch("/data/data.json")
    // fetch("/data/data.json")
    .then(function(response) {
        return response.json();
    }).then(function(myJson) {
        // console.log(myJson);
        mainData = myJson;
    });
    
    setTimeout(function(){
        // console.log(mainData[0].id);
        insertData(mainData, 20);
    }, 450);
};