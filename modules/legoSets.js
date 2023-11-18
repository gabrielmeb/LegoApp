/** @format */

require("dotenv").config();
const Sequelize = require("sequelize");

// Set up Sequelize to point to our PostgreSQL database
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  }
);

// Define Theme model
const Theme = sequelize.define(
  "Theme",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

// Define Set model
const Set = sequelize.define(
  "Set",
  {
    set_num: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: Sequelize.STRING,
    year: Sequelize.INTEGER,
    num_parts: Sequelize.INTEGER,
    theme_id: Sequelize.INTEGER,
    img_url: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

// Establish association between Set and Theme models
Set.belongsTo(Theme, { foreignKey: "theme_id" });

// Function to initialize the database
function initialize() {
  return new Promise(async (resolve, reject) => {
    try {
      await sequelize.sync();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// Function to get all sets with themes
const getAllSets = async () => {
  return Set.findAll({ include: [Theme] });
};

// Function to get a set by set_num with its theme
const getSetByNum = async (setNum) => {
  return Set.findOne({
    where: { set_num: setNum },
    include: [Theme],
  });
};

// Function to get sets by theme
const getSetsByTheme = async (theme) => {
  return Set.findAll({
    where: { "$Theme.name$": { [Sequelize.Op.iLike]: `%${theme}%` } },
    include: [Theme],
  });
};

// Function to add a new set
const addSet = async (setData) => {
  return Set.create(setData);
};

// Function to get all themes
const getAllThemes = async () => {
  return Theme.findAll();
};

// Function to edit a set
function editSet(setNum, setData) {
  return Set.update(setData, {
    where: {
      set_num: setNum,
    },
  });
}

// Function to delete a set
function deleteSet(setNum) {
  return Set.destroy({
    where: {
      set_num: setNum,
    },
  });
}

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
  addSet,
  getAllThemes,
  editSet,
  deleteSet,
};
