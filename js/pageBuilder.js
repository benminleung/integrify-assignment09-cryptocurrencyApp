let tempData = [];
// Sort by name
// Sort by price
// Sort by rank


function buildPage() {
  document.body.innerHTML += `
    <div class="wrapper">

        <section class='secHeader'>
            <div><h1 class='header'>Cryptopedia</h1></div>
        </section>

        <section class='secBody' id='secBody'>
            <input class='searchBar' type='text' id='searchBar' placeholder='Search'></input>
            <div class='filters'>Sort Sort Sort</div>
        </section>

        <section class='secFooter'>
            <div>Footer</div>
        </section>

    </div>
    `;

    //implements searchbar
    searchBar();
}

// Calls passes filtered list to insertData function each time the an 'input' event occurs.
function searchBar (){
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', (e) => {
        const input = e.target.value.toLowerCase();
        // if input equals '', skips filtering.
        if (input) {
            return insertData(mainData.filter((item) => 
                item.name.toLowerCase().includes(input) || item.symbol.toLowerCase().includes(input)
            ));
        } else {
            return insertData(mainData, 20);
        }
    });
}

// Builds all item elements and data.
// Takes a items list as parameter, and also the number of items to print.
// ran by dataProcess.js and other functions.
// Often used with number set to 20.
function insertData (data, number){

    // If number is undefined, number will equal length of list, meaning printing all items on list.
    const insertAmount = number || data.length-1;

    let i = 0;
    //Creates Items on list
    const elMainContent = document.createElement('div');
    elMainContent.className = 'mainContent';
    elMainContent.id = 'mainContent';

    for (let i = 0; i < insertAmount; i++){
        const item = data[i];
        
            const name = item.name;
            const supply = numberProcess(item.total_supply);
            const id = item.id;
            const price = priceProcess(item.price_usd);
            const rank = item.rank;
            const change24h = parseFloat(item.percent_change_24h);

            const symbol = item.symbol;

            const elItem = document.createElement('div');
            elItem.className = 'item'
            elItem.id = id;

                const elName = document.createElement('h3');
                elName.className = 'name';
                elName.innerText = `${name}`;

                const elSymbol = document.createElement('p');
                elSymbol.className = 'symbol';
                elSymbol.innerText = `(${symbol})`;
                
                const elSupply = document.createElement('p');
                elSupply.className = 'key';            
                elSupply.innerText = 'Supply'
                const elSupplyValue = document.createElement('p');
                elSupplyValue.className = 'value';
                elSupplyValue.innerText = supply;
                
                const elPrice = document.createElement('p');
                elPrice.className = 'key';
                elPrice.innerText = `PriceUSD`;
                const elPriceValue = document.createElement('p');
                elPriceValue.className = 'value';
                elPriceValue.innerText = `$${price}`;
                
                const elRank = document.createElement('p');
                elRank.className = 'key';
                elRank.innerText = 'Rank';
                const elRankValue = document.createElement('p');
                elRankValue.className = 'value';
                elRankValue.innerText = rank;

                const elChange = document.createElement('p');
                elChange.className = 'key';
                elChange.innerText = 'Change 7 days';
                const elChangeValue = document.createElement('p');
                elChangeValue.className = 'value';
                elChangeValue.innerText = `${change24h}%`;
                if (change24h < 0){
                    elChangeValue.style.color = 'red';
                } else {
                    elChangeValue.style.color = 'darkgreen';                
                }

                elItem.appendChild(elName);
                elItem.appendChild(elSymbol);
                elItem.appendChild(elSupply);
                elItem.appendChild(elSupplyValue);
                elItem.appendChild(elPrice);
                elItem.appendChild(elPriceValue);
                elItem.appendChild(elRank);
                elItem.appendChild(elRankValue);
                elItem.appendChild(elChange);
                elItem.appendChild(elChangeValue);

                console.log(i); 

            elMainContent.appendChild(elItem);
    }

     
    try {
        document.getElementById('mainContent').remove();
        console.log(`MainC exists`);
    } catch {
        console.log(`MainC Doesnt Exist`);
    }

    if (i < data.length - 1) {
        const showMore = document.createElement('label');
        showMore.className = 'showMore';
        showMore.innerText = `---SHOW ALL ${data.length - 1} RESULTS---`;
        // showMore.addEventListener('click', insertData(mainData));
        elMainContent.appendChild(showMore);
    }

    document.getElementById('secBody').appendChild(elMainContent);
}