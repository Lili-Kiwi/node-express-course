const { writeFile, readFile } = require("fs").promises;

writeFile('temp.txt', 'Line 1\n')
    .then(() => {
        console.log('then1...');
        return writeFile('temp.txt', 'Line 2\n', { flag: 'a' });
    })
    .then(() => {
        console.log('then2...');
        return writeFile('temp.txt', 'Line 3\n', { flag: 'a' });
    })
    .then(() => {
        console.log('then3...');
        return readFile('temp.txt', 'utf8');
    })
    .then((data) => {
        console.log('then4...');
        console.log('Reading...');
        console.log(data);
    })
    .catch((error) => {
        console.log("error", error);
    });