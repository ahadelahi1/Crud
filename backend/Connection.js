let mongo = require("mongoose");
require("dotenv").config();

let dburl = process.env.URL;

let DBConnect = async function(){
    if (!dburl) {
        console.log("Url Not Found")
    } else {
        try {
            mongo.connect(dburl);
            console.log("database connect")
        }
        catch (error) {
       console.log(error)
        }
    }
}

module.exports = DBConnect; 