require("dotenv").config();
const express = require('express');
const session = require("express-session")
const flash = require("express-flash");
const path = require("path");
const db = require("./config/db.config");
const app = express();
const PORT = parseInt(process.env.PORT) || 8080;
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/admin.routes");

// Configurations

// connect database
db.connect((error)=>{
    if(error) throw error;
    console.log("Connected to Database");
});

// set the static path 
app.use(express.static(path.join(__dirname, 'public')));

// setup view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'public/views'));

// setup sessions
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: process.env.SECRET_KEY,
    cookie:{
        maxAge: 300000
    }
}));

app.use(flash());



// Routes
app.use("/", indexRoutes);
app.use("/auth/", authRoutes);

app.listen(PORT,()=>{
    console.log("Server listening on port ",PORT)
})