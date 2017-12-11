const btcurl = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=EUR'
const bchurl = 'https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/?convert=EUR'
const ltcurl = 'https://api.coinmarketcap.com/v1/ticker/litecoin/?convert=EUR'
const ethurl = 'https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'

const injectData = function(coins) {
  let heads = '';
  let usds = '';
  let euros = '';
  for (coin of coins) {
    heads += `<td><h1>${coin.symbol}</h1></td>`
    usds += `<td><h2>$${Math.floor(coin.price_usd)}</h2></td>`
    euros += `<td><h2>&euro;${Math.floor(coin.price_eur)}</h2></td>`
  }
  const html = `
    <table>
      <tr>
        ${heads}
      </tr>
      <tr>
        ${usds}
      </tr>
      <tr>
        ${euros}
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
