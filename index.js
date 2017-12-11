const btcurl = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/'
const bchurl = 'https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/'
const ltcurl = 'https://api.coinmarketcap.com/v1/ticker/litecoin/'
const ethurl = 'https://api.coinmarketcap.com/v1/ticker/ethereum/'

const injectData = function(coins) {
  let heads = '';
  let values = '';
  for (coin of coins) {
    heads += `<td><h1>${coin.symbol}</h1></td>`
    values += `<td><h2>${Math.floor(coin.price_usd)}</h2></td>`
  }
  const html = `
    <table>
      <tr>
        ${heads}
      </tr>
      <tr>
        ${values}
      </tr>
    </table>
  `;
  document.getElementById("content").innerHTML = html;
};

const fetchPrices = async function() {
  const responses = [await fetch(btcurl), await fetch(bchurl), await fetch(ethurl), await fetch(ltcurl)]
  let json = []
  for (let resp of responses) {
    const body = await resp.json()
    json = json.concat(body)
  }
  injectData(json);
};

const updateTimeleft = function(timeleft) {
  document.getElementById("timer").innerHTML = timeleft;
};

let timeleft = 15;
setInterval(function() {
  timeleft--
  updateTimeleft(timeleft);
  if (timeleft === 0) {
    fetchPrices();
    timeleft = 16;
  }
}, 1000);
fetchPrices();
