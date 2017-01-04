var read=require("./read.js");
var write=require("./write.js");
var async=require("async");
var mysql=require("./mysql");
var path=require("path");
var categoryInfo;
var listInfo=[];
module.exports=function(){
    async.series([
        //1. 写栏目
        function(cb){
            write.writeCategory("http://news.ifeng.com/",function(data){
                categoryInfo=data;
                cb();
            })
        },

        //[{url:[111],cid:}]
        //2.  读列表
        function (cb){
            async.each(categoryInfo,function(obj,cb1){
                read.readList(obj.curl,function(list){
                    var obj1={};
                    obj1.url=list;
                    obj1.cid=obj.cid;
                    listInfo.push(obj1);
                    cb1();

                })
            },function(){
                cb();
            })
        },

        //3 写内容
        function(cb){
            var i=0;
            async.each(listInfo,function(obj,cb1){
                async.each(obj.url,function(url,cb2){
                    write.writeArc(url,function(data){
                        var basename="";
                        var imgArr=data.aimg.split(";");
                        for(var i=0;i<imgArr.length;i++){
                            basename+=path.basename(imgArr[i])+";";
                        }
                        basename=basename.slice(0,-1);
                        mysql.query(`replace into article (atitle,acon,aimg,cid) values ('${data.atit}','${data.acon}','${basename}',${obj.cid})`,function(error){
                            // console.log(error+"mysql"+(++i));
                            cb2();
                        })
                    })
                },function(error){
                    console.log(error);
                    console.log(2);
                    cb1();
                })

            },function(error){
                console.log(error);
                console.log(1);
                cb();
            })
        }

    ],function(){
        console.log("over!!")
    })
}








