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