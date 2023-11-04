/********************************************************************************
* WEB322 – Assignment 04
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
* Published URL: 
********************************************************************************/

const legoData = require("./modules/legoSets");
const express = require('express');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static('public'));

legoData.initialize()
  .then(() => {
    app.get('/', (req, res) => {
      res.render("home");
    });

    app.get('/about', (req, res) => {
      res.render("about");
    });

    app.get('/lego/sets', (req, res) => {
      if (req.query.theme) {
        legoData.getSetsByTheme(req.query.theme)
          .then(sets => res.render("sets", { sets }))
          .catch(error => res.status(404).render('404', { message: "No sets found for the specified theme." }));
      } else {
        legoData.getAllSets()
          .then(sets => res.render("sets", { sets }))
          .catch(error => res.status(404).render('404', { message: "Unable to load sets." }));
      }
    });

    app.get('/lego/sets/:set_num', (req, res) => {
      legoData.getSetByNum(req.params.set_num)
        .then(set => res.render("set", { set }))
        .catch(error => res.status(404).render('404', { message: "No sets found for the specified set number." }));
    });

    app.use((req, res) => {
      res.status(404).render('404', { message: "I'm sorry, we're unable to find what you're looking for" });
    });

    app.listen(HTTP_PORT, () => {
      console.log(`Server is running at http://localhost:${HTTP_PORT}`);
    });
  })
  .catch(error => {
    console.error('Initialization failed:', error);
  });
