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
********************************************************************************/

const setData = require("../data/setData");
const themeData = require("../data/themeData");

const initialize = async () => {
  const sets = setData.map((set) => {
    const theme = themeData.find((theme) => theme.id === set.theme_id);
    return { ...set, theme: theme.name };
  });

  if (sets.length > 0) {
    return sets;
  } else {
    throw new Error("Unable to read data");
  }
};

const getAllSets = async () => {
  const sets = await initialize();
  if (sets.length > 0) {
    return sets;
  } else {
    throw new Error("No sets found");
  }
};

const getSetByNum = async (setNum) => {
  const sets = await initialize();
  const set = sets.find((s) => s.set_num === setNum);
  if (set) {
    return set;
  } else {
    throw new Error("Unable to find requested set");
  }
};

const getSetsByTheme = async (theme) => {
  const sets = await initialize();
  const input = theme.toLowerCase();
  const filteredSets = sets.filter((set) => set.theme.toLowerCase().includes(input));
  if (filteredSets.length > 0) {
    return filteredSets;
  } else {
    throw new Error("Unable to find requested sets");
  }
};

module.exports = { 
  initialize, 
  getAllSets, 
  getSetByNum, 
  getSetsByTheme 
};
