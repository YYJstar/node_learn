const currency = require("./currency")
console.log('50 Canadian dollars equals this amount of US dollars:'); 
console.log(currency.canadianToUS(50)); 
console.log('30 US dollars equals this amount of Canadian dollars:'); 
console.log(currency.USToCanadian(30));

// node test-currency.js输出：
//50 Canadian dollars equals this amount of US dollars:
// 45.5
// 30 US dollars equals this amount of Canadian dollars:
// 32.97