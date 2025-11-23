const { writeFile, read, readFile } = require("fs");
console.log("at start");
writeFile("./temporary/output.txt", "This is line 1\n", (err, result) => {
    console.log("at point 1");
    if (err) {
        console.log("This error happened: ", err);
    } else {
        const first = result;
        writeFile("./temporary/output.txt", "This is line 2\n", { flag: "a" }, (err, result) => {
            console.log("at point 2");
            if (err) {
                console.log("This error happened: ", err);
            } else {
                const second = result;
                writeFile("./temporary/output.txt", "This is line 3\n", { flag: "a" }, (err, result) => {
                    console.log("at point 3");
                    if (err) {
                        console.log("This error happened: ", err);
                    } else {
                        console.log("File written successfully");
                    }
                })
            }
        })
    }
});
console.log("at end");