let all = require("../Func/Logics");

let exp = require("express");

let r = exp.Router();

r.post("/Reg", all.Register);
r.get("/get", all.Read);
r.delete("/delete/:a", all.DeleteRe);
r.put("/update/:a", all.EditRe);

module.exports = r