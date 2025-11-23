const path = require('path');

const joinedPath = path.join('Users', 'LilyMeyer', 'node-express-course', '01-node-tutorial', 'answers');
console.log('Joined path:', joinedPath);

console.log('Path separator on this OS:', path.sep);
console.log('Path delimiter on this OS:', path.delimiter);

const relativePath = path.join('.', 'content', 'subfolder', 'test.txt');
console.log('Relative path:', relativePath);

const absolutePath = path.join('C:', 'Users', 'lyly2', 'OneDrive', 'Desktop');
console.log('Absolute-style path:', absolutePath);

console.log('Current platform:', process.platform);
console.log('On Windows: uses backslash (\\)');
console.log('On Mac/Linux: uses forward slash (/)');