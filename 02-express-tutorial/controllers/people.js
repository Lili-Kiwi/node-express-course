let { people } = require("../data");

const getPeople = (req, res) => {
    res.json(people);
};

const addPerson = (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }
    const newPerson = { id: people.length + 1, name: req.body.name };
    people.push(newPerson);
    res.status(201).json({ success: true, name: req.body.name });
};

module.exports = { addPerson, getPeople };
