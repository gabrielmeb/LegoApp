/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Gabriel Mebratu 
* Student ID: 144000205 
* Date: October 13, 2023
*
* Published URL: https://talented-swimsuit-lamb.cyclic.app
*
********************************************************************************/

const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public')); // Set static folder

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

// Serve the about page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

// Retrieve LEGO sets by theme
app.get('/lego/sets', async (req, res) => {
  const theme = req.query.theme;

  try {
    if (theme) {
      const data = await legoData.getSetsByTheme(theme);
      res.json(data);
    } else {
      const data = await legoData.getAllSets();
      res.json(data);
    }
  } catch (err) {
    res.status(404).send(`404 - ${err}`);
  }
});

// Retrieve a LEGO set by setNum
app.get('/lego/sets/:id', async (req, res) => {
  const setNum = req.params.id;

  try {
    const data = await legoData.getSetByNum(setNum);
    res.json(data);
  } catch (err) {
    res.status(404).send(`404 - ${err}`);
  }
});

// 404 error handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

// Initialize LEGO data and start the server
legoData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => console.log(`Server listening on: ${HTTP_PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
