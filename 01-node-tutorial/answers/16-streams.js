const fs = require('fs');

const readStream = fs.createReadStream('../content/big.txt', {
    encoding: 'utf8',
    highWaterMark: 200
});

let chunkCounter = 0;

readStream.on('data', (chunk) => {
    chunkCounter++;
    console.log(`Chunk ${chunkCounter} received`);
    console.log(chunk);
    console.log();
});

readStream.on('end', () => {
    console.log(`number of chunks received: ${chunkCounter}`);
});

readStream.on('error', (error) => {
    console.error('error:', error);
});