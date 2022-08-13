var express = require("express");
var app = express.Router();
var mysql =require("mysql");
var username;
var filename = "usericon.jpg";
var aboutdata  = "sample";
var hostel = "sample";
var location = "sample";
var dept = "sample";
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "digitalslambook"
})

var fileupload = require("express-fileupload");

app.use(fileupload());
app.get("/",function(req,res){
    username = req.data;
    console.log(username);
    res.render("editprofile");
})
app.post("/",function(req,res){
    console.log("ok here")
    if(req.files && Object.keys(req.files).length!=0){
        var filetobeuploaded = req.files.uploadedfile;
        filename = filetobeuploaded.name;
        var filepath = __dirname+"/uploads/"+filetobeuploaded.name;
        console.log(filetobeuploaded.name);
        con.query("update logindetails set dp = '"+filetobeuploaded.name+"' where username = '"+username.name+"';",function(err,result){
            if(err){
                return console.log(err);
            }
            console.log("successfully added");
        })
        filetobeuploaded.mv(filepath,function(err){
            if(err){
                return console.log(err);
            }
            
        })
    }
    if(req.body.addabout){
        aboutdata = req.body.addabout;
        con.query("update logindetails set about = '"+aboutdata+"' where username ='"+ username.name+"';",function(err,result){
            if(err){
                console.log(err);
            }
        })
    }
    if(req.body.dept){
        dept = req.body.dept;
        con.query("update logindetails set dept = '"+dept+"' where username ='"+ username.name+"';",function(err,result){
            if(err){
                console.log(err);
            }
        })
    }
    if(req.body.hostel){
        hostel = req.body.hostel;
        con.query("update logindetails set hostelname = '"+hostel+"' where username ='"+ username.name+"';",function(err,result){
            if(err){
                console.log(err);
            }
        })
    }
    if(req.body.location){
        location = req.body.location;
        con.query("update logindetails set location = '"+location+"' where username ='"+ username.name+"';",function(err,result){
            if(err){
                console.log(err);
            }
        })
    }
    con.query("update temp set dept = '"+dept+"', about = '"+ aboutdata+"', dp = '"+ filename+"', hostelname = '"+ hostel+"', location = '"+ location+"';",function(err,result){
        if(err){
            return console.log(err);
        }
    })
    res.redirect("/editprofile");
    
        
    
})

module.exports = app;