const names = require('./04-names.js');
console.log('=== top secret ===');
console.log();
console.log('My name is:', names);
console.log('First Name:', names.firstName);
console.log('Last Name:', names.lastName);
console.log();

const sayHi = require('./05-utils.js');
console.log('Say hi to me:', sayHi(names.firstName));
console.log();

console.log('Things I love');
const altFlavor = require('./06-alternative-flavor.js');
console.log('Books:', altFlavor.items);
console.log('P.S.', altFlavor.str);
console.log();

// Load 07-mind-grenade.js (demonstrates code execution on require)
require('./07-mind-grenade.js');
console.log();

console.log('=== All modules loaded successfully! ===');