let mainData;

function getData(){    
    fetch("/data/data.json")
    // fetch("/data/data.json")
    .then(function(response) {
        return response.json();
    }).then(function(myJson) {
        // console.log(myJson);
        mainData = myJson;
        insertData(myJson, 20);     
    }).catch(()=>console.log('error with fetch'));
    
    // setTimeout(function(){
    //     // console.log(mainData[0].id);
    //     insertData(mainData, 20);
    // }, 450);
};