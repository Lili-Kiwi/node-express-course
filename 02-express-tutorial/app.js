const express = require('express');
const { products } = require('./data');
const app = express();
app.use(express.static('./public'));

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