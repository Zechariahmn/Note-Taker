// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// setting up server
const app = express();
const PORT = process.env.PORT || 1706;

