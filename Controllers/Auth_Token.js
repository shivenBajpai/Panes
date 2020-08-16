var jwt = require("jsonwebtoken");
const jwtExpirySeconds = 1000000000;

var sin = function (email,res,jwtKey){
  const token = jwt.sign({email:email}, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	});
	console.log("token:", token);

  return res.cookie("token", token, { maxAge: 2 * jwtExpirySeconds});

}




var ver = function(res,req,jwtKey){
  const token = req.cookies.token;

  if (!token) {
		return 401;
	}

  var payload;
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      res.clearCookie('token');
			return 401;
		}
    res.clearCookie('token');
		return 400;
}
console.log('verified token'+ token);
return 200;
}


var decode = function(req, jwtKey) {
  return jwt.decode(req.cookies.token,{json:true,complete: true})
}



var ref = function(res,req,jwtKey){
  const token = req.cookies.token;

  if (!token) {
		res.status(401).end()
	}

  var payload;
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) res.status(401).end()
		res.status(400).end()
  }
  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})

	// Set the new token as the users `token` cookie
	res.cookie("token", newToken, { maxAge: jwtExpirySeconds * 1000 , path: '/refresh'});
  res.end();
}

module.exports = {
  signin:sin,
  refresh:ref,
  verify:ver,
  decode:decode
}
