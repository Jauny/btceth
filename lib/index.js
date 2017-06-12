"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var injectData = function injectData(_ref) {
  var BTC = _ref.BTC,
      ETH = _ref.ETH;

  var html = "\n    <table>\n      <tr>\n        <td colspan=\"2\"><h1>BTC</h1></td>\n        <td colspan=\"2\"><h1>ETH</h1></td>\n      </tr>\n      <tr>\n        <td><h2>&dollar;" + BTC.USD + "</h2></td>\n        <td>&euro;" + BTC.EUR + "</td>\n        <td><h2>&dollar;" + ETH.USD + "</h2></td>\n        <td>&euro;" + ETH.EUR + "</td>\n      </tr>\n    </table>\n  ";
  document.getElementById("content").innerHTML = html;
};

var fetchPrices = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var response, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR");

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            json = _context.sent;

            injectData(json);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchPrices() {
    return _ref2.apply(this, arguments);
  };
}();

var updateTimeleft = function updateTimeleft(timeleft) {
  document.getElementById("timer").innerHTML = timeleft;
};

var timeleft = 15;
setInterval(function () {
  timeleft--;
  updateTimeleft(timeleft);
  if (timeleft === 0) {
    fetchPrices();
    timeleft = 16;
  }
}, 1000);
fetchPrices();