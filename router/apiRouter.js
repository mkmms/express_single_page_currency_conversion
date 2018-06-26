const router = require('express').Router();

const {
  getRates,
  getSymbols,
  getHistoricalRate
} = require('../lib/fixer-service');
const {
  convertCurrency
} = require('../lib/free-currency-service');
const errorHandler = require('../lib/errorHandler');

// Fetch Latest Currency Rates
router.get('/rates', async (req, res) => {
  try {
    const data = await getRates();
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Fetch Symbols
router.get('/symbols', async (req, res) => {
  try {
    const data = await getSymbols();
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Convert Currency
router.post('/convert', async (req, res) => {
  try {
    const {
      from,
      to
    } = req.body;
    const data = await convertCurrency(from, to);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Fetch Currency Rates by date
router.post('/historical', async (req, res) => {
  try {
    const {
      date
    } = req.body;
    const data = await getHistoricalRate(date);
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (error) {
    errorHandler(error, req, res);
  }
});


module.exports = router;