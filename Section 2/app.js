// browsers vs Node
// window vs global

//global objects
console.log();
setInterval();
clearInterval();
setTimeout(() => {}, timeout);

// yes they set to global but no need to prefix
global.console.log();

// not added to global -> undefined
var message = "";
global.message;
