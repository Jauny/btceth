const injectData = function({BTC, ETH}) {
  const html = `
    <table>
      <tr>
        <td colspan="2"><h1>BTC</h1></td>
        <td colspan="2"><h1>ETH</h1></td>
      </tr>
      <tr>
        <td><h2>&dollar;${BTC.USD}</h2></td>
        <td>&euro;${BTC.EUR}</td>
        <td><h2>&dollar;${ETH.USD}</h2></td>
        <td>&euro;${ETH.EUR}</td>
      </tr>
    </table>
  `;
  document.getElementById("content").innerHTML = html;
};

const fetchPrices = async function() {
  const response = await fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR");
  const json = await response.json();
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
