var express=require("express");
var mysql=require("./mysql");
var async=require("async");
var body=require("body-parser");
var app=express();
app.listen(8899);
app.use(body.urlencoded({ extended: false }));
var child_process=require("child_process");
//child_process.fork("pachong.js");
var cookie = require('cookie-parser');
app.use(cookie("admin"));

app.set("views","./views");
app.set("view engine","ejs");
app.use(express.static('public'));


app.use(function(req,res,next){
    var login=req.signedCookies.login;
    var username=req.signedCookies.username;
    res.locals.login=login;
    res.locals.username=username;
    next();
})
app.get("/",function(req,res){
    mysql.query("select * from category",function(error,rows){
        res.render("index",{categorys:rows})
    })
})

app.get("/home/",function(req,res){
   /* var login=req.signedCookies.login;
    var username=req.signedCookies.username;*/
    mysql.query("select * from article",function(error,rows){
        res.render("home",{lists:rows/*,login:login,username:username*/})
    })
})
app.get("/list/:id",function(req,res){
    var cid=req.params.id;
    mysql.query("select * from article where cid="+cid+" limit 0,5",function(error,rows){
        res.render("list",{lists:rows})
    })
})
app.get("/listUid",function(req,res){
    mysql.query("select * from article where uid=1",function(error,rows){
        res.render("listUid",{lists:rows})
    })
})
app.get("/listHid",function(req,res){
    mysql.query("select * from article where hid=1",function(error,rows){
        res.render("listUid",{lists:rows})
    })
})
app.get("/search",function(req,res){
    var search=req.query.search;
    mysql.query("select * from article where atitle like '%"+search+"%'",function(error,rows){
        if(error){
            res.send("no")
        }else{
            console.log(rows.length);
            res.render("search",{lists:rows})
        }

    })
})


app.get("/show/:id",function(req,res){
    var id=req.params.id;
    mysql.query("select * from article where id="+id,function(error,rows){
        mysql.query("select * from liuyan where aid="+id+" limit 0,3",function(error,rows1){
            res.render("show",{shows:rows,liuyan:rows1});
        })

    })
})
app.get("/list-video/",function(req,res){
    mysql.query("select * from article order by id desc limit 0,5",function(error,rows){
        res.render("list-video",{lists:rows})
    })
})
app.get("/pe/",function(req,res){
    mysql.query("select * from category",function(error,rows){
        res.render("pe",{categorys:rows})
    })
})
app.get("/about-me/",function(req,res){
    mysql.query("select * from category",function(error,rows){
        res.render("about-me",{categorys:rows})
    })
})
/*
app.use("/header.ejs",function (req,res,next) {
    var login=req.signedCookies.login;
    res.render("header",{login:login});
})
*/




app.post("/ajax",function(req,res){
    var cid=req.body.cid;
    var num=req.body.num*5;
    mysql.query("select * from article where cid="+cid+" limit "+num+",5",function(error,rows){
        if(!error){
            console.log(rows)
            res.send(rows);
        }

    })
})
app.get("/add-uid",function(req,res){
    var uid=req.query.uid;
    var id=req.query.id;
    mysql.query("update article set uid="+uid+" where id="+id,function(error,rows){
        if(!error){
            console.log(rows)
            res.send("yes");
        }

    })
})
app.get("/add-hid",function(req,res){
    var hid=req.query.hid;
    var id=req.query.id;
    mysql.query("update article set hid="+hid+" where id="+id,function(error,rows){
        if(!error){
            console.log(rows);
            res.send("yes");
        }else{
            console.log("hid失败");
            res.send("no");
        }

    })
})


var router=require("./router/user.js");
app.use("/user",router);
var message=require("./router/message.js");
app.use("/message",message);
var liuyan=require("./router/liuyan.js");
app.use("/liuyan",liuyan);
