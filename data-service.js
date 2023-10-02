const fs = require("fs");

var vehicles = [];
var brands = [];

//------------------------------------------------------------------------------------------
// FUNCTION INITIALIZE
// loads JSON data into global arrays
//------------------------------------------------------------------------------------------
module.exports.initialize = function () {

    var promise = new Promise((resolve, reject) => {
       
        fs.readFile('./data/vehicles.json', (err, vehicleData) => {
            if (err) {
                console.error("INITIALIZE - Error loading vehicles:", err);
                reject("Unable to read file");
            } else {
                try {
                    vehicles = JSON.parse(vehicleData);
                    console.log("INITIALIZE - Loaded vehicles.");
                    
                    fs.readFile('./data/brands.json', (err, brandData) => {
                        if (err) {
                            console.error("INITIALIZE - Error loading brands:", err);
                            reject("Unable to read file");
                        } else {
                            try {
                                brands = JSON.parse(brandData);
                                console.log("INITIALIZE - Loaded brands.");
                                resolve("INITIALIZE - SUCCESS.");
                            } catch (ex) {
                                console.error("INITIALIZE - Error parsing brands data:", ex);
                                reject("Unable to parse brands data");
                            }
                        }
                    });
                } catch (ex) {
                    console.error("INITIALIZE - Error parsing vehicles data:", ex);
                    reject("Unable to parse vehicles data");
                }
            }
        });
    });

    return promise;
};

//------------------------------------------------------------------------------------------
// FUNCTION GETALLVEHICLES
// passes the array of vehicles
//------------------------------------------------------------------------------------------
module.exports.getAllVehicles = function () {

    var promise = new Promise((resolve, reject) => {
        
        if (vehicles.length === 0) {
            reject("No results returned");
        } else {
            resolve(vehicles);
        }
    });

    return promise;
};

//------------------------------------------------------------------------------------------
// FUNCTION GET2023VEHICLES
// passes an array of vehicles whose year property is 2023
//------------------------------------------------------------------------------------------
module.exports.get2023Vehicles = function () {

    var promise = new Promise((resolve, reject) => {
        const year2023Vehicles = vehicles.filter(vehicle => vehicle.year === 2023);
        if (year2023Vehicles.length === 0) {
            reject("No results returned");
        } else {
            resolve(year2023Vehicles);
        }
    });

    return promise;
};

//------------------------------------------------------------------------------------------
// FUNCTION GETBRANDS
// passes the array of brands
//------------------------------------------------------------------------------------------
module.exports.getBrands = function () {

    var promise = new Promise((resolve, reject) => {
        if (brands.length === 0) {
            reject("No results returned");
        } else {
            resolve(brands);
        }
    });

    return promise;
};
