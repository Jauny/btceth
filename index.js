const btceur = 'https://api.gdax.com/products/BTC-EUR/ticker';
const btcusd = 'https://api.gdax.com/products/BTC-USD/ticker';
const ltceur = 'https://api.gdax.com/products/LTC-EUR/ticker';
const ltcusd = 'https://api.gdax.com/products/LTC-USD/ticker';
const etheur = 'https://api.gdax.com/products/ETH-EUR/ticker';
const ethusd = 'https://api.gdax.com/products/ETH-USD/ticker';
const bchusd = 'https://api.gdax.com/products/BCH-USD/ticker';

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
  const json = [{
    symbol: 'BTC',
    price_usd: (await (await fetch(btcusd)).json()).price,
    price_eur: (await (await fetch(btceur)).json()).price
  }, {
    symbol: 'BCH',
    price_usd: (await (await fetch(bchusd)).json()).price,
    price_eur: 0
  }, {
    symbol: 'ETH',
    price_usd: (await (await fetch(ethusd)).json()).price,
    price_eur: (await (await fetch(etheur)).json()).price
  }, {
    symbol: 'LTC',
    price_usd: (await (await fetch(ltcusd)).json()).price,
    price_eur: (await (await fetch(ltceur)).json()).price
  }];
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
