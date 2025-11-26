const os = require('os');
const user = os.userInfo();
console.log('User:', user);

console.log(`System Uptime (seconds): ${os.uptime()}`);