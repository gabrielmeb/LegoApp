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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
    daisyui: {
      themes: ["light", "dark", "ocean"],
  },
  plugins: [],
  purge: ['./**/*.ejs'],
  plugins: [
    require('@tailwindcss/typography'), require('daisyui'),
  ],
}
