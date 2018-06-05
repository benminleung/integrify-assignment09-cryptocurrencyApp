//creates data to be printed. Activated via multiple channels, including search 'input' and sort 'click' listeners.
function creatData (){

}

function sortProcess(key, data=mainData){
    switch (key) {
        case 'rank':
        case 'price_usd':
        case 'percent_change_24h':
            data.sort((a,b) => {
                // console.log(a[key] + " ---vs--- " + b[key]);
                return a[key] - b[key];
            });
            break;
        case 'name':
            // console.log(data.slice(0), ' dataSlice');
            const sortedData = data.slice(0).sort((a,b) => {
                const first = a[key].toLowerCase();
                const second = b[key].toLowerCase();
                // console.log(first + " ---vs--- " + second);
                if (first < second){
                    return -1;
                } else if (first > second){
                    return 1;
                } else {
                    return 0;
                }
            });
            // console.log(sortedData, " sortedData");
            mainData = sortedData;
            insertData(sortedData);
            break;
    }  
}

// Parses string and returns a shortened string representing the number
function numberProcess(num){
    let number = num;
    if (number > 1000000) {
        number = Math.round(number / 1000000);
        if (number > 1000){
            return `${number.toString().slice(0,-3)},${number.toString().slice(-3)}M`
        }
        return `${number}M`;
    }
    return `${number}`;
}

function priceProcess(num){
    return parseFloat(num).toFixed(2);
}