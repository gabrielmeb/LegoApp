/********************************************************************************
* WEB322 – Assignment 05
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Gabriel Mebratu 
* Student ID: 124911223
* Date: November 18, 2023
*
* Published URL:
********************************************************************************/


const express = require("express");
const path = require("path");

const legoData = require("./modules/legoSets");

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/lego/sets", async (req, res) => {
  try {
    let data;

    if (req.query.theme) {
      data = await legoData.getSetsByTheme(req.query.theme);
    } else {
      data = await legoData.getAllSets();
    }

    res.render("sets", { sets: data });
  } catch (err) {
    res.status(404).render("404", {
      message: req.query.theme
        ? "No Sets found for a matching theme"
        : "I'm sorry, we're unable to find what you're looking for",
    });
  }
});

app.get("/lego/sets/:id", async (req, res) => {
  try {
    const data = await legoData.getSetByNum(req.params.id);
    res.render("set", { set: data });
  } catch (err) {
    res.status(404).render("404", {
      message: "No Sets found for a specific set num",
    });
  }
});

app.get("/lego/addSet", async (req, res) => {
  try {
    const themeData = await legoData.getAllThemes();
    res.render("addSet", { themes: themeData });
  } catch (err) {
    res.status(404).render("404", {
      message: `${err.message}`,
    });
  }
});

app.post("/lego/addSet", (req, res) => {
  legoData
    .addSet(req.body)
    .then(() => res.redirect("/lego/sets"))
    .catch((err) =>
      res.render("500", {
        message: `I'm sorry, but we have encountered the following error: ${err}`,
      })
    );
});

app.get("/lego/editSet/:num", async (req, res) => {
  try {
    const setData = await legoData.getSetByNum(req.params.num);
    const themeData = await legoData.getAllThemes();
    res.render("editSet", { themes: themeData, set: setData });
  } catch (err) {
    res.status(404).render("404", {
      message: "No Sets found for a specific set num",
    });
  }
});

app.post("/lego/editSet", (req, res) => {
  legoData
    .editSet(req.body.set_num, req.body)
    .then(() => res.redirect("/lego/sets"))
    .catch((err) =>
      res.render("500", {
        message: `I'm sorry, but we have encountered the following error: ${err}`,
      })
    );
});

app.get("/lego/deleteSet/:num", (req, res) => {
  legoData
    .deleteSet(req.params.num)
    .then(() => res.redirect("/lego/sets"))
    .catch((err) =>
      res.render("500", {
        message: `I'm sorry, but we have encountered the following error: ${err}`,
      })
    );
});

app.use((req, res) => {
  res.status(404).render("404", {
    message: "No view matched for a specific route",
  });
});

legoData
  .initialize()
  .then(() => app.listen(PORT, () => console.log(`listening on port ${PORT}`)))
  .catch((error) => console.log(`Failed to listen on port ${PORT}`));
//done