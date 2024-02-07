// Import necessary modules
const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

// Create Redis client
const client = redis.createClient();

// Promisify Redis functions
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Data: list of products
const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, stock: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, stock: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, stock: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to get item by ID from the list of products
function getItemById(id) {
    return listProducts.find(item => item.itemId === id);
}

// Express applications
const app = express();
const PORT = 1245;

// Middleware to parse JSON requests
app.use(express.json());

// Route: GET /list_products
app.get('/list_products', (req, res) => {
    res.json(listProducts.map(item => ({
        itemId: item.itemId,
        itemName: item.itemName,
        price: item.price,
        initialAvailableQuantity: item.stock
    })));
});

// Function to reserve stock by item ID
async function reserveStockById(itemId, stock) {
    await setAsync(`item_${itemId}`, stock);
}

// Function to get current reserved stock by item ID
async function getCurrentReservedStockById(itemId) {
    const reservedStock = await getAsync(`item_${itemId}`);
    return reservedStock ? parseInt(reservedStock) : 0;
}

// Route: GET /list_products/:itemId
app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const item = getItemById(itemId);

    if (!item) {
        return res.json({ status: 'Product not found' });
    }

    const currentReservedStock = await getCurrentReservedStockById(itemId);
    const currentQuantity = item.stock - currentReservedStock;

    res.json({
        itemId: item.itemId,
        itemName: item.itemName,
        price: item.price,
        initialAvailableQuantity: item.stock,
        currentQuantity: currentQuantity
    });
});

// Route: GET /reserve_product/:itemId
app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const item = getItemById(itemId);

    if (!item) {
        return res.json({ status: 'Product not found' });
    }

    const currentReservedStock = await getCurrentReservedStockById(itemId);
    const currentQuantity = item.stock - currentReservedStock;

    if (currentQuantity <= 0) {
        return res.json({ status: 'Not enough stock available', itemId: itemId });
    }

    await reserveStockById(itemId, currentReservedStock + 1);
    return res.json({ status: 'Reservation confirmed', itemId: itemId });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});
