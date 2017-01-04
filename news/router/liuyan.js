var express=require("express");
var mysql=require("./../mysql");
var router=express.Router();
router.use("/liuyanInput",function(req,res,next){
    if(req.signedCookies.login){
        var con=req.query.con;
        var aid=req.query.aid;
        var time=req.query.time;
        var username=req.signedCookies.username;
        mysql.query(`insert into liuyan (con,aid,username,time) values ('${con}',${aid},'${username}','${time}')`,function (error,result) {
            if(error){
                res.redirect("/message/mysqlerror");
            }else{
                res.send("yes");
            }
        })
    }else{
        res.send("no");
    }
})


module.exports=router;