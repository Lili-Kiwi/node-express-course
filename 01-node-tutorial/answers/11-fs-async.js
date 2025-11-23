const { writeFile, readFile } = require("fs");

console.log("at start");

writeFile("./temporary/fileB.txt", "This is line 1\n", (err) => {
    console.log("at point 1");
    if (err) {
        console.log("Error writing first line: ", err);
    } else {
        console.log("First line completed successfully");
        writeFile("./temporary/fileB.txt", "This is line 2\n", { flag: "a" }, (err) => {
            console.log("at point 2");
            if (err) {
                console.log("Error writing second line: ", err);
            } else {
                console.log("Second line completed successfully");
                writeFile("./temporary/fileB.txt", "This is line 3\n", { flag: "a" }, (err) => {
                    console.log("at point 3");
                    if (err) {
                        console.log("Error writing third line: ", err);
                    } else {
                        console.log("File written successfully");
                    }
                })
            }
        })
    }
});
console.log("at end");