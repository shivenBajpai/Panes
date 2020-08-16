var at = require("./Auth_Token.js");
const jwt_key = "Yakhi_Raju"
module.exports = function(pane_data,app,dir){

  //Home page
  app.get('/',function(req,res){
    res.set('Cache-Control', 'no-store')
  	res.sendFile(dir + '/views/index.html');
  	console.log('Request was made to:' + req.url);
  });

  //Login Page
  app.get('/login',function(req,res){
    res.set('Cache-Control', 'no-store')
  	res.sendFile(dir + '/views/login.html');
  	console.log('Request was made to:' + req.url);
  });

  //Login Page (E)
  app.get('/login/E',function(req,res){
    res.set('Cache-Control', 'no-store')
  	res.sendFile(dir + '/views/login.html');
  	console.log('Request was made to:' + req.url);
  });

  //Profile Page
  app.get('/my_profile' ,function (req,res){
  res.set('Cache-Control', 'no-store')
  const stat = at.verify(res,req,jwt_key);
  res.status(stat);
  if (stat === 200){
    let mail = at.decode(req).payload.email;
    res.render('profile' , {name: pane_data[mail].Name ,
                            pro_pic: mail,
                            intro: pane_data[mail].intro,
                            about: pane_data[mail].about,
                            contact: pane_data[mail].contact
                          });
    console.log('Request was made to:' + req.url);
  } else if (stat === 401) {
    res.redirect('/login');
    console.log('Unauthorized request was made to:' + req.url);
  }
  res.end()
  });

  //Sign Up
  app.get('/Signup', function (req,res){
    res.set('Cache-Control', 'no-store')
  	res.sendFile(dir + '/views/Sign_Up.html');
    console.log('Request was made to:' + req.url);
  });

  //Sign Up Username Error
  app.get('/Signup/E', function (req,res){
    res.set('Cache-Control', 'no-store')
  	res.sendFile(dir + '/views/Sign_Up.html');
    console.log('Request was made to:' + req.url);
  });

};
