let exp = require("express");
let rot = require("./Route/Routes");
let db = require("./Connection")

let cor = require("cors")



require("dotenv").config();
let pp = exp()
let port = process.env.PORT || 4000
pp.use(cor())
pp.use(exp.json())
pp.use("/ht/" , rot);

db().then(()=> {
    pp.listen(port,function(){
        console.log(`ser strat at http://localhost:${port}/ht/`)
})

}).catch((e) => {
    console.log(e)
})




