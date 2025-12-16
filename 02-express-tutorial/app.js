const express = require('express');
const cookieParser = require('cookie-parser');
const { products, people } = require('./data');
const peopleRouter = require('./routes/people');
const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const auth = (req, res, next) => {
    if (req.cookies.name) {
        req.user = req.cookies.name;
        next();
    } else {
        res.status(401).json({ success: false, message: "unauthorized" });
    }
};

app.use(express.static('./methods-public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.post('/logon', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }
    res.cookie("name", req.body.name);
    res.status(201).json({ success: true, message: `Hello, ${req.body.name}!` });
});

app.delete('/logoff', (req, res) => {
    res.clearCookie("name");
    res.status(200).json({ success: true, message: "User logged off" });
});

app.get('/test', auth, (req, res) => {
    res.status(200).json({ success: true, message: `Welcome, ${req.user}!` });
});

app.use('/api/v1/people', peopleRouter);

app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" });
});

app.get('/api/v1/products', (req, res) => {
    res.json(products);
});

app.get('/api/v1/products/:productID', (req, res) => {
    const searchID = parseInt(req.params.productID);
    const product = products.find((p) => p.id === searchID);
    if (!product) {
        return res.status(404).json({ message: "no products found." });
    }
    res.json(product);
});

app.get('/api/v1/query', (req, res) => {
    let sortedProducts = [...products];
    if (req.query.search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(req.query.search);
        });
    }
    if (sortedProducts.length < 1) {
        return res.status(200).send('no products found');
    }
    if (req.query.limit) {
        const limit = parseInt(req.query.limit);
        sortedProducts = sortedProducts.slice(0, limit);
    }
    res.json(sortedProducts);
});

app.all('*', (req, res) => {
    return res.status(404).send("page not found.");
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
});