var express=require("express");
var router=express.Router();
router.use("/error",function (req,res,next) {
    res.render("error",{title:"错误消息",con:"用户名或密码错误",url:"/user/reg"});
})
router.use("/mysqlerror",function (req,res,next) {
    res.render("error",{title:"错误消息",con:"数据处理错误",url:"/user/reg"});
})
router.use("/regsuccess",function (req,res,next) {
    res.render("error",{title:"注册成功",con:"welcome to login",url:"/user/login"});
})
router.use("/loginerror",function (req,res,next) {
    res.render("error",{title:"登录失败",con:"再次登录",url:"/user/login"});
})
router.use("/loginerror2",function (req,res,next) {
    res.render("error",{title:"登录成功",con:"返回首页",url:"/home/"});
})
/*router.use("/liuyan",function (req,res,next) {
 res.render("error",{title:"留言成功",con:"返回首页",url:"/"});
 })*/
router.use("/liuyanLogin",function (req,res,next) {
    res.render("error",{title:"留言请登录",con:"进入登录页面",url:"/user/login"});
})
module.exports=router;

