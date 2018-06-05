let mainData;

function getData(){
    // short test version of data
    // fetch("/data/dataShort.json")
    fetch("https://api.coinmarketcap.com/v1/ticker/?limit=2000")
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