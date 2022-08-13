var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mul = require("multer");
var XMLHttpRequest = require('xhr2');
var request = require("request");
var http = require("http");
var querystr = require("querystring");
var nodemailer = require("nodemailer");
var upload = mul();
var alerting = require("alert");
var popup = require("node-popup/dist/cjs.js")
var path = require("path");
var bus = require("busboy");
var fs = require("fs");
var os = require("os");
var depttobefiltered;
var xhttp = new XMLHttpRequest();
var hosteltobefiltered;
var locationtobefiltered;
var touploadimage = require("./sample.js")
var forgotpwdotp;
var first ;
var newpassword;
var state1 ; 
var authcode;
var searchresult;
var toemailid;
var image;
var dauthstate;
var temproll = " ";
var dauthaccesstoken;
var imagepath;
var pwdstrength = {"strength": " "}
var myprofiledict = {};
var profileusername ;
var newcom;
var tempresponse;
var profiledetails = {};
var dict = {"field" : [0,0]}
var timeup = "no";
var emailidforchangingpwd;
var userdetails = [0,0,0,0,0,0,0,0,0,0];
var otheruserdetails = [0,0,0,0,0,0,0,0]
var empty = [0]
var empty2 = [0]
var data = {};
var newabt;
var searchedcontacts = {};
var transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    auth: {
        user: "whipsmartnanthana2003@gmail.com",
        pass: "sloppvkrixfyacls"
    }
})
var l = [0,0,0];
var n = [0,0,0,0,0,0,0,0,0,0]
var values = [0];
var mysql = require("mysql");
const busboy = require("busboy");
const { resolve } = require("path");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "digitalslambook"
})
app.use("/editprofile",function(req,res,next){
    req.data = {
        name: userdetails[1]
    }
    next();
},touploadimage);
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
app.get("/login", function(req,res){
    res.render("loginpage");
})
app.get("/otpforgotpwd",function(req,res){
    timeup = "no";
    res.render("otpverificationforforgotpwd");
    forgotpwdotp = Math.floor(Math.random()*899999)+100000;
    var mailoption = {
        from: "whipsmartnanthana2003@gmail.com",
        to: toemailid,
        subject: "setting new password",
        text: "Your otp for logging into the digital slambook is : "+forgotpwdotp
    }
    transporter.sendMail(mailoption,function(err,info){
        if(err){
            return console.log(err);
        }
        else{
            console.log("message sent");
            console.log(info);
        }
    })
    
    setTimeout(function(){
        timeup = "yes";
    },120000)
    
})
app.post("/otpforgotpwd", function(req,res){
    if(forgotpwdotp == req.body.otpforregistration && timeup == "no"){
        con.query("update logindetails set password = ? where emailid= ? ",[newpassword,emailidforchangingpwd],function(err,result){
            
            if(err){
                return console.log(err);
            }
        })
        userdetails[4] = newpassword;
        alerting("password changed successfully");
        res.redirect("/login");
    }
    else if(timeup == "yes" ){
        timeup = "no";
        alerting("Time's up")
    }
    else{
        alerting("OTP is wrong");
        res.redirect("/login");
    }
    timeup = "no";
    
})
app.get("/forgotpwd",function(req,res){
    res.render("forgotpwd");
})
app.post("/forgotpwd", function(req,res){
    newpassword = req.body.password;
    toemailid = req.body.emailid;
    emailidforchangingpwd = req.body.emailid;
    con.query("select * from logindetails where emailid = ?",[toemailid],function(err,result){
        userdetails[0] = result[0].rollno;
        userdetails[1] = result[0].username;
        userdetails[2] = result[0].emailid;
        userdetails[3] = result[0].phoneno;
        userdetails[5] = result[0].dept;
        userdetails[6] = result[0].about;
        userdetails[7] = result[0].dp;
        userdetails[8] = result[0].hostelname;
        userdetails[9] = result[0].location;
    })
    res.redirect("/otpforgotpwd");
})
//app.get("https://auth.delta.nitt.edu/authorize?client_id=x0nfyfunXcNTKHo_&redirect_uri=http%3A%2F%2Flocalhost%3A1270%2Fwelcome&response_type=code&grant_type=authorization_code&state=sdafsdghb&scope=email&nonce=bscsbascbadcsbasccabs",function(req,res){
      //      if(err){
         //       return console.log(err);
         //   }
          //  console.log(req.body.code);
          //  console.log(req.body.authorization_code);
          //  console.log(req.body.state);
          //  console.log(req.authorization_code)

        //})
app.get("https://auth.delta.nitt.edu/api/oauth/token",function(req,res){
    if(err){
        return console.log(err)
    }
})
app.post("/login",function(req,res){
    if(req.body.auth == "dauth"){
        first = 0;
        return res.redirect("https://auth.delta.nitt.edu/authorize?client_id=x0nfyfunXcNTKHo_&redirect_uri=http%3A%2F%2Flocalhost%3A1270%2Fwelcome&response_type=code&grant_type=authorization_code&state=sdafsdghb&scope=user&nonce=bscsbascbadcsbasccabs");
    }
    l[0] = req.body.name;
    l[1] = req.body.password;
    con.query("select * from logindetails where username = ?",[l[0]],function(err,result){
        if(result.length!=0){
        userdetails[0] = result[0].rollno;
        userdetails[1] = result[0].username;
        userdetails[2] = result[0].emailid;
        userdetails[3] = result[0].phoneno;
        userdetails[4] = result[0].password;
        userdetails[5] = result[0].dept;
        userdetails[6] = result[0].about;
        userdetails[7] = result[0].dp;
        userdetails[8] = result[0].hostelname;
        userdetails[9] = result[0].location;
        
        if(err){
            return console.log(err);
        }
        
        if(result[0].password==l[1]){
            res.redirect("/welcome");
        }
        else{
            alerting("password is incorrect");
            return res.redirect("/login");
        }
    }
    else{
        alerting("You haven't registered yet");
        return res.redirect("/login");
    }
    })
})
function postrequest(){
    var serveroptions = {
        uri: "https://auth.delta.nitt.edu/api/oauth/token?client_id=x0nfyfunXcNTKHo_&client_secret=tUMCMagj.1pvt6RwYD~0m9KA3qYHfSZt&grant_type=authorization_code&code="+authcode+"&redirect_uri=http%3A%2F%2Flocalhost%3A1270%2Fwelcome",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
    request(serveroptions,function(err,res){
        if(err){
            return console.log(err);
        }
        console.log(res.id_token);
        console.log(res.access_token);
    })
}
app.get("/welcome",function(req,res){
    if(first==0){
    state1 = req.query.state;
    authcode = req.query.code;
    
    console.log(req.query.code);
    console.log(req.query.state);
    return new Promise(function(resolve,reject){ 
        xhttp.open("POST","https://auth.delta.nitt.edu/api/oauth/token",true);
        
        xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhttp.send("client_id=x0nfyfunXcNTKHo_&client_secret=m9Ak2md0~AgjfXjCvb4k4~TpINkvOxtW&grant_type=authorization_code&code="+authcode+"&redirect_uri=http%3A%2F%2Flocalhost%3A1270%2Fwelcome")
        xhttp.onreadystatechange = function(){
            if(this.readyState==4 && this.status==200){
                console.log(this.responseText);
                dauthaccesstoken = JSON.parse(this.responseText);
                console.log(dauthaccesstoken.access_token);
                resolve("ok");
            }
        }}).then(function(){

            return new Promise(function(resolve,reject){
        
        
        console.log("entered");
        xhttp.open("POST","https://auth.delta.nitt.edu/api/resources/user",true)
        xhttp.setRequestHeader("Authorization","Bearer "+dauthaccesstoken.access_token);
        xhttp.send();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log(this.response);
                tempresponse = JSON.parse(this.response);
                var tempemail = tempresponse["email"];
                console.log(tempemail)
                var next = 0;
                while(tempemail[next]!="@"){
                    temproll+=tempemail[next];
                    next++;
                }
                console.log(temproll);
                first++;
                resolve("ok")
            }
        }
})}).then(function(){
    return new  Promise (function(resolve,reject){

    con.query("select * from logindetails where emailid = '"+tempresponse.email+"';",function(err,result){
        if(err){
            return console.log(err);
        }
        if(result.length==0){
            con.query("insert into logindetails values ('"+temproll+"','"+tempresponse.name+"','"+tempresponse.email+"','"+tempresponse.phoneNumber+"',' ',' ',' ','usericon.jpg',' ',' ');",function(err,result){
                if(err){
                    return console.log(err);
                }
                userdetails[0] = temproll;
                userdetails[1] = tempresponse.name;
                userdetails[2] = tempresponse.email;
                userdetails[3] = tempresponse.phoneNumber;
                userdetails[4] = " ";
                userdetails[5] = " ";
                userdetails[6] = " ";
                userdetails[7] = "usericon.jpg";
                userdetails[8] = " ";
                userdetails[9] = " ";
                resolve(userdetails[9]);
            })

        }
        else{
            userdetails[0] = result[0].rollno;
            userdetails[1] = result[0].username;
            userdetails[2] = result[0].emailid;
            userdetails[3] = result[0].phoneno;
            userdetails[4] = result[0].password;
            userdetails[5] = result[0].dept;
            userdetails[6] = result[0].about;
            userdetails[7] = result[0].dp;
            userdetails[8] = result[0].hostelname;
            userdetails[9] = result[0].location;
            resolve(userdetails[9]);
        }
        
})})}).then(function(){
    res.render("welcome",{name: userdetails[1],dp: userdetails[7]});
})}
    con.query("select * from temp;",function(err,result){
        if(err){
            return console.log(err);
        }
        if(result[0].hostelname!="sample" ){
            userdetails[8] = result[0].hostelname;
        }
        if( result[0].dp!="sample"){
            userdetails[7] = result[0].dp;
        }
        if(result[0].location!="sample"){
            userdetails[9] = result[0].location;
        }
        if(result[0].about!="sample"){
            userdetails[6] = result[0].about;
        }
        if(result[0].dept!="sample"){
            userdetails[5] = result[0].dept;
        }
    })
    con.query("update temp set dept='sample',about='sample', dp='sample',hostelname='sample', location='sample';",function(err,result){
        if(err){
            return console.log(err);
        }
    })
    setTimeout(function(){
        res.render("welcome",{name: userdetails[1],dp: userdetails[7]});
    },4000)
    
    

    
    
    
})
app.post("/welcome",function(req,res){
    searchresult = req.body.search;
    res.redirect("/searchresults");
        
    
})
app.get("/searchresults",function(req,res){
    console.log(searchresult);
    return new Promise(function(resolve,reject){
        if(depttobefiltered==undefined && hosteltobefiltered==undefined && locationtobefiltered==undefined){
            con.query("select username from logindetails where (username like '"+searchresult+"%' || username like '%"+searchresult+"' || username like '%"+searchresult+"%') && username!='"+userdetails[1]+"'",function(err,result){
                if(err){
                    return console.log(err);
                }
                searchedcontacts["name"] = userdetails[1];
                searchedcontacts["results"] = result;
            })
        }
        else if(depttobefiltered!=undefined){
            con.query("select username from logindetails where (username like '"+searchresult+"%' || username like '%"+searchresult+"' || username like '%"+searchresult+"%') && username!='"+userdetails[1]+"' && dept='"+depttobefiltered+"';",function(err,result){
                if(err){
                    return console.log(err);
                }
                searchedcontacts["name"] = userdetails[1];
                searchedcontacts["results"] = result;
                depttobefiltered = undefined;
            })
        }
        else if(hosteltobefiltered!=undefined){
            con.query("select username from logindetails where (username like '"+searchresult+"%' || username like '%"+searchresult+"' || username like '%"+searchresult+"%') && username!='"+userdetails[1]+"' && hostelname='"+hosteltobefiltered+"';",function(err,result){
                if(err){
                    return console.log(err);
                }
                searchedcontacts["name"] = userdetails[1];
                searchedcontacts["results"] = result;
                hosteltobefiltered = undefined;
            })
        }
        else if(locationtobefiltered!=undefined){
            con.query("select username from logindetails where (username like '"+searchresult+"%' || username like '%"+searchresult+"' || username like '%"+searchresult+"%') && username!='"+userdetails[1]+"' && location='"+locationtobefiltered+"';",function(err,result){
                if(err){
                    return console.log(err);
                }
                searchedcontacts["name"] = userdetails[1];
                searchedcontacts["results"] = result;
                locationtobefiltered = undefined;
            })
        }
        
        con.query("select distinct dept from logindetails order by dept;",function(err,result){
            if(err){
                return console.log(err);
            }
            searchedcontacts["dept"] = result;
        })
        con.query("select distinct location from logindetails order by location;", function(err,result){
            if(err){
                return console.log(err);
            }
            searchedcontacts["location"] = result;
        })
        con.query("select distinct hostelname from logindetails order by hostelname;", function(err,result){
            if(err){
                return console.log(err);
            }
            searchedcontacts["hostel"] = result;
            resolve(searchedcontacts["name"]);
        })
    }).then(function(){
        console.log(searchedcontacts)
        res.render("searchresults",{data: searchedcontacts});
        })
    
})
app.post("/searchresults",function(req,res){
    if(req.body.filterdept!=undefined){
        depttobefiltered = req.body.filterdept;
        return res.redirect("/searchresults");
    }
    else if(req.body.filterlocation!=undefined){
        locationtobefiltered = req.body.filterlocation;
        return res.redirect("/searchresults");
    }
    else if(req.body.filterhostel!=undefined){
        hosteltobefiltered = req.body.filterhostel;
        return res.redirect("/searchresults");
    }
    else if(req.body.buttonpressed!=undefined){
        profileusername = req.body.buttonpressed;
        return res.redirect("/profilepage");
    }
    
    
    
})
app.get("/profilepage",(req,res) => {
    profiledetails["name"] = profileusername;
    profiledetails["comments"] = [];
    let i = 0;
    function two(){
        return new Promise((resolve,reject) => {
            con.query("select * from logindetails where username = ?",[profileusername],function(err,result){
                
                if(err){
                    return console.log(err);
                }
                profiledetails["rollno"] = result[0].rollno;
                profiledetails["password"] = result[0].password;
                profiledetails["dept"] = result[0].dept;
                profiledetails["phoneno"] = result[0].phoneno;
                profiledetails["emailid"] = result[0].emailid;
                profiledetails["about"] = result[0].about;
                profiledetails["dp"] = result[0].dp;
                profiledetails["hostelname"] = result[0].hostelname;
                profiledetails["location"] = result[0].location;
                
                
            })
    con.query("select * from comment where commentedon = ?",[profileusername],function(err,result){
        
        result.forEach((element) => {
            profiledetails["comments"].push([element.username,element.comment]); 
            i++;
        });
        
            
        })
        setTimeout(function(){
        if(profiledetails["comments"][0]!=0){
            console.log("done");
            resolve();}
        },1000);
    })}
    two().then(function(){
        res.render("profilepage",{profiledetails : profiledetails});
    })
})
app.post("/profilepage",function(req,res){
    newcom = req.body.commentbar;
    deletecom = req.body.deletebutton;
    return new Promise(function(resolve,reject){
        if(deletecom!=undefined){
            con.query("delete from comment where comment = '"+deletecom+ "' && username = '"+userdetails[1]+"' && commentedon = '"+profiledetails["name"]+"';",function(err,result){
                if(err){
                    return console.log(err);
                }
                console.log("deleted");
                console.log(deletecom);
                console.log(userdetails[1]);
                console.log(profiledetails["name"]);
                resolve("ok");
            })
        }
        else if(newcom!=undefined){
        con.query("insert into comment values('"+userdetails[1]+"','"+profiledetails.name+"','"+newcom+"');",function(err,result){
            if(err){
                return console.log(err);
            }
            resolve("ok");
        })}
    }).then(function(){
        res.redirect("/profilepage");
    })

})
app.get("/myprofile",function(req,res){
    return new Promise(function(resolve,reject){
        myprofiledict["rollno"] = userdetails[0];
        myprofiledict["name"] = userdetails[1];
        myprofiledict["emailid"] = userdetails[2];
        myprofiledict["phoneno"] = userdetails[3];
        myprofiledict["password"] = userdetails[4];
        myprofiledict["dept"] = userdetails[5];
        myprofiledict["about"] = userdetails[6];
        myprofiledict["dp"] = userdetails[7];
        myprofiledict["hostelname"] = userdetails[8];
        myprofiledict["location"] = userdetails[9];
        myprofiledict["comments"] = [];
    con.query("select * from comment where commentedon = ?",[userdetails[1]],function(err,result){
        if(err){
            return console.log(err);
        }
        result.forEach((element) => {
            myprofiledict["comments"].push([element.username,element.comment]); 
        });
        resolve("all ok")
        
    })}).then(function(){
        res.render("myprofile",{myprofiledetails: myprofiledict});
    })
    
})
app.listen(1270, function(){
    console.log("server is running");
})
app.get("/registration", function(req,res){
    res.render("registration",{data:pwdstrength});
})
app.post("/registration",function(req,res) {
    var passwordstrength;
    var nalpha = 0
    var ndigit = 0
    var nspecial = 0;
    n[0] = req.body.rollno;
    n[1] = req.body.name;
    n[2] = req.body.emailid;
    n[3] = req.body.phoneno;
    n[4] = req.body.password;
    n[5] = req.body.dept;
    n[6] = " ";
    n[7] = "usericon.jpg";
    n[8] = req.body.hostel;
    n[9] = req.body.location;
    userdetails[0] = n[0];
    userdetails[1] = n[1];
    userdetails[2] = n[2];
    userdetails[3] = n[3];
    userdetails[4] = n[4];
    userdetails[5] = n[5];
    userdetails[6] = " ";
    userdetails[7] = "usericon.jpg"
    userdetails[8] = n[8];
    userdetails[9] = n[9];
    for(let k of n[4]){
        if(/[a-z]/g.test(k) || /[A-Z]/g.test(k)){
            nalpha++;
        }
        else if(/[0-9]/g.test(k)){
            ndigit++;
        }
        else{
            nspecial++;
        }
    }
    if(nalpha<6 || ndigit<2 || nspecial<1){
        passwordstrength = "notok";
    }
    con.query("select * from logindetails where username = '"+n[1]+"' || emailid = '"+n[2]+"';",function(err,result){
        if(err){
            return console.log(err);
        }
        if(passwordstrength == "notok"){
            pwdstrength["strength"] = "Password must have atleast 6 letters, 2 digits and 1 special character";
            return res.redirect("/registration");
        }
        if(result.length==0){
            values[0] = n
            empty[0] = userdetails[1];
            empty2[0] = empty;
            con.query("insert into logindetails values ?", [values], function(err,result){
                alerting(" Details added ");
                return res.redirect("/welcome");
            })
        }
        else{
            alerting("username or emailid already exists");
            pwdstrength["strength"] = "username or emailid already exists";
            return res.redirect("/registration");
        }
    })
    
})
