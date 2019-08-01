const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js")
// Routes

// Root route
app.get("/", async function(req, res) {
  var imageURLs = await tools.getRandomImages("", 1);
  console.log("imageURLS using Promises:" + imageURLs);
  res.render("index", {imageURLs: imageURLs});
});

// Search route
app.get("/search", async function (req, res) {
  var keyword = req.query.keyword;
  
  var imageURLs = await tools.getRandomImages(keyword, 9);
  //console.log("imageURL using Promises:" + imageURLs);
  res.render("results", {imageURLs: imageURLs, keyword: keyword});
});

app.get("/api/updateFavorites", (req, res) => {
  var conn = tools.createConnection();

  var sql;
  var sqlParams;

  if (req.query.action == "add") {
    sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?);"
    sqlParams = [req.query.imageURL, req.query.keyword];
  } else {
    sql = "DELETE FROM favorites WHERE imageURL = ?"
    sqlParams = [req.query.imageURL];
  }
  conn.connect(function(err) {
    if (err) throw err;
    conn.query(sql, sqlParams, function(err, result) {
      console.log(result);
      conn.end();
    });
  });

  
  res.send("it works");
})

app.get("/displayKeywords", async function(req, res) {
    var imageURLs = await tools.getRandomImages("", 1);
    var conn = tools.createConnection();
    var sql = "SELECT DISTINCT keyword FROM favorites ORDER BY keyword";

    conn.connect(function(err) {
        if (err) throw err;
        conn.query(sql, function(err, results) {
            if (err) throw err;
            res.render("favorites", {rows: results, imageURLs: imageURLs});
            conn.end();
        });
    });

    

}); //displayKeywords

app.get("/api/displayFavorites", function(req, res) {
    var conn = tools.createConnection();
    var sql = "SELECT imageURL FROM favorites WHERE keyword = ?"
    var sqlParams = [req.query.keyword];

    conn.connect(function(err) {
        if (err) throw err;
        conn.query(sql, sqlParams, function(err, results) {
            if (err) throw err;
            res.send(results);
            conn.end();
        });
    });

})

// Start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Running express server');
  });