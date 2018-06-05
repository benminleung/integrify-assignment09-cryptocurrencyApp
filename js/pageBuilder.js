let tempData = [];
// Sort by name
// Sort by price
// Sort by rank


function buildPage() {
    document.body.innerHTML += 
        `<div class="wrapper">

            <section class='secHeader'>
                <div><h1 class='header'>Cryptopedia</h1></div>
            </section>
            <section class='secSearch'>
                <input class='searchBar' type='text' id='searchBar' placeholder='Search'></input>
                <div class='sortBar' id='sortBar'>
                    <div>Sort by</div>
                    <label class='sortBtn btnShadow active' id=sortByrank>Rank</label>
                    <label class='sortBtn btnShadow' id='sortByname'>Name</label>
                    <label class='sortBtn btnShadow' id='sortByprice_usd'>Price</label>
                    <label class='sortBtn btnShadow' id='sortBypercent_change_24h'>Change</label>
                </div>
            </section>
            <section class='secBody' id='secBody'>

            </section>

            <section class='secFooter'>
                <div>Footer</div>
            </section>

            <section>
                All rights reserved. Designed by Pok Tik Benjamin Leung.
            </section>
        </div>`
    ;


    //implements searchbar
    searchBar();
    sortBar();
}

// Calls passes filtered list to insertData function each time the an 'input' event occurs.
function searchBar() {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', (e) => {
        const input = e.target.value.toLowerCase();
        // if input equals '', skips filtering.
        runSearch(input);
    });
}

function runSearch(input){
    if (input) {
        return insertData(mainData.filter((item) => 
            item.name.toLowerCase().includes(input) || item.symbol.toLowerCase().includes(input)
        ));
    } else {
        return insertData(mainData, 20);
    }
}

function sortBar() {
    const sortBar = document.getElementById('sortBar');

        const title = document.createElement('div');

        //event listener
        sortBar.addEventListener('click', (e) => {
            const click = e.target;
            // console.dir(click);
            
            if (e.target.classList.contains('sortBtn')) {
                // console.log(e.target);
                // changes active class
                sortBar.getElementsByClassName('active')[0].classList.remove('active');
                e.target.classList.add('active');
                
                //gets property of 
                const key = e.target.id.slice(6);
                // console.log(key);
                sortProcess(key);
                // mainData.forEach((item) => console.log(item.name));
                runSearch(document.getElementById('searchBar').value.toLowerCase());
            }
            //runs funciton to sort mainData
        });
}

// Builds all item elements and data.
// Takes a items list as parameter, and also the number of items to print.
// ran by dataProcess.js and other functions.
// Often used with number set to 20.
function insertData (data, number){
// console.log('data', data)
    // If number is undefined, number will equal length of list-1, meaning printing all items on list.
    // const insertAmount = number-1 || data.length-1;
    const insertAmount =  data.length-1;

    let i = 0;
    //Creates Items on list
    const elMainContent = document.createElement('div');
    elMainContent.className = 'mainContent';
    elMainContent.id = 'mainContent';

            const elSupply = document.createElement('p');
            elSupply.className = 'key';            
            elSupply.innerText = 'Supply';

            const elPrice = document.createElement('p');
            elPrice.className = 'key';
            elPrice.innerText = `PriceUSD`;

            const elRank = document.createElement('p');
            elRank.className = 'key';
            elRank.innerText = 'Rank';

            const elChange = document.createElement('p');
            elChange.className = 'key';
            elChange.innerText = 'Change 7 days';

    // loops while number inserted is less than or equal to insertAmount;
    while (i <= insertAmount){
        const item = data[i];
        
            const name = `${i+1}. ${item.name}`;
            const supply = numberProcess(item.total_supply);
            const id = item.id;
            const price = priceProcess(item.price_usd);
            const rank = item.rank;
            const change24h = parseFloat(item.percent_change_24h);

            const symbol = item.symbol;

            const elItem = document.createElement('div');
            elItem.className = 'item btnShadow'
            elItem.id = id;

                const elName = document.createElement('h3');
                elName.className = 'name';
                elName.innerText = `${name}`;

                const elSymbol = document.createElement('p');
                elSymbol.className = 'symbol';
                elSymbol.innerText = `(${symbol})`;
                
                // const elSupply = document.createElement('p');
                // elSupply.className = 'key';            
                // elSupply.innerText = 'Supply';
                const elSupplyValue = document.createElement('p');
                elSupplyValue.className = 'value';
                elSupplyValue.innerText = supply;

                
                const elPriceValue = document.createElement('p');
                elPriceValue.className = 'value';
                elPriceValue.innerText = `$${price}`;
                

                const elRankValue = document.createElement('p');
                elRankValue.className = 'value';
                elRankValue.innerText = rank;


                const elChangeValue = document.createElement('p');
                elChangeValue.className = 'value';
                elChangeValue.innerText = `${change24h}%`;
                //changes color of change24h
                elChangeValue.style.color = change24h < 0 ? 'red': 'darkgreen';          

                elItem.appendChild(elName);
                elItem.appendChild(elSymbol);
                elItem.appendChild(elSupply.cloneNode(true));
                elItem.appendChild(elSupplyValue);
                elItem.appendChild(elPrice.cloneNode(true));
                elItem.appendChild(elPriceValue);
                elItem.appendChild(elRank.cloneNode(true));
                elItem.appendChild(elRankValue);
                elItem.appendChild(elChange.cloneNode(true));
                elItem.appendChild(elChangeValue);

                // console.log(name);

            elMainContent.appendChild(elItem);

            i++;
    }

     
    try {
        document.getElementById('mainContent').remove();
        // console.log(`MainC exists`);
    } catch {
        // console.log(`MainC Doesnt Exist`);
    }

    // if (i < data.length - 1) {
    //     const showMore = document.createElement('label');
    //     showMore.id = 'showMore';
    //     showMore.className = 'showMore';
    //     showMore.innerText = `---SHOW ALL ${data.length} RESULTS---`;
    //     // showMore.addEventListener('click', (data) => {showAllBtn(data);});
    //     elMainContent.appendChild(showMore);
    // }

    document.getElementById('secBody').appendChild(elMainContent);
}

// (function showAllBtn (data){
//     try {
//         document.getElementById('showMore').
//     } catch {
//         console.log('didnt find show all btn')
//     }
//     insertData(data);
// })();