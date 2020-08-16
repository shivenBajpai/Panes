var at = require('./Auth_Token.js');
const jwt_key = "Yakhi_Raju"

var db;

var a = function(fs,app,path){
    fs.readFile(path,(err,data) => {
      db = JSON.parse(data);
    });

    app.post('/auth',(req,res) => {
      for(var i = 0;i < db.length; i++){
        if(db[i].Email == req.body.email && db[i].Password == req.body.password)
        {
          at.signin(db[i].Email,res,jwt_key);
          return res.redirect('/my_profile');
        }
      }
    return res.redirect('login/E');
    });

    //app.post('refresh',(req,res) => {
      //at.refresh(res,req,jwt_key);
    //});

    app.post('/auth/new',(req,res) => {
      for(var i = 0;i < db.length; i++)
      {
        if(db[i].Email == req.body.email) {
          console.log("Signin denied: Email in use " + req.body.email);
          console.log(req.body);
          return res.redirect('/Signup/E');}
      }
      console.log("Signin intiated " + req.body.email);
      db.push({"Name":req.body.name,"Email":req.body.email,"Password":req.body.password});
      console.log(req.body);
      console.log(db);
      fs.writeFile(path, JSON.stringify(db,null,2),(err) => {if (err) throw err});
      at.signin(req.body.email,res,jwt_key);
      res.redirect('/my_profile');
    });





}

module.exports = a
