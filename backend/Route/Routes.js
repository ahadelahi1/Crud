let all = require("../Func/Logics");

let exp = require("express");

let r = exp.Router();

r.post("/Reg", all.Register);


module.exports = r