// Declaration :
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./models");
// require("dotenv").config();
// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./client"));

const colorRoutes = require("./contorller/api/color-route");
app.use(colorRoutes);
const userRoutes = require("./contorller/api/user-routes");
app.use(userRoutes);
const clientRoutes = require("./contorller/client/html-route");
app.use(clientRoutes);

// Connection with the database:
db.sequelize.authenticate().then(() => {
    app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
}).catch(err => console.log('Unable to connect to the database:', err));