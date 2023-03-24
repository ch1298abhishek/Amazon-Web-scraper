const { response } = require('express');
const express = require('express');
const request = require('request-promise');

const app = express();

const PORT = process.env.PORT || 5000;

const apikey = 'e6bbade47bcdcca381a2250416270549';
const baseUrl = `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`;

app.use(express.json());
 
// first route
app.get('/', (req, res) => {
    res.send('WELOCME TO AMAZON WEB SCRAPING');
});

// GET PRODUCT DETAILS
app.get('/products/:productId', async (req, res) =>{
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
        
    }
})

// GET PRODUCT REVIEWS
app.get('/products/:productId/review', async (req, res) =>{
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/product-review/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
        
    }
})

// GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req, res) =>{
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
        
    }
})

// GET SEARCH OFFERS

app.get('/search/:searchquery', async (req, res) =>{
    const { searchquery } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/s?k=${searchquery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
        
    }
})

// ............................................................................... //




app.listen(PORT, ()=> console.log(`server is running at port ${PORT} `));
