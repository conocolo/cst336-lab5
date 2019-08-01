const request = require("request");
const mysql = require("mysql");

module.exports = {
  getRandomImages_cb: function (keyword, imageCount, callback) {
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&orientation=landscape&client_id=4114fcbf809b1ce6a494582cd3c43f8365e5c03a95f47a9ceaaba41f0b533509";
    request(requestURL, function (error, response, body) {
      if (!error) {
        var parsedData = JSON.parse(body);
        var imageURLs = [];
  
        for (let i = 0; i < 9; i++) {
          imageURLs.push(parsedData[i].urls.regular);
        }
        callback(imageURLs);
      } else {
        console.log("error", error);
      }
    }); // request
  },
  
  getRandomImages: function(keyword, imageCount) {
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&orientation=landscape&client_id=4114fcbf809b1ce6a494582cd3c43f8365e5c03a95f47a9ceaaba41f0b533509";
  
    return new Promise(function(resolve, reject) {
      request(requestURL, function (error, response, body) {
        if (!error) {
          var parsedData = JSON.parse(body);
          var imageURLs = [];
    
          for (let i = 0; i < imageCount; i++) {
            imageURLs.push(parsedData[i].urls.regular);
          }
          resolve(imageURLs);
        } else {
          console.log("error", error);
        } //request
      });//promise
    });
  
  },

  createConnection: function() {
    var conn = mysql.createConnection({
      host: "us-cdbr-iron-east-02.cleardb.net",
      user: "be113011300ec7",
      password: "a2027429",
      database: "heroku_f8cc751771be68e"
    });
    return conn;
  }
}