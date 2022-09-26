// import some modules that are required for the application
const http = require("http")

// if the client do a GET req this will be called
const getReq = (req, res, url) => {
    // look for url the client did go to
    switch(url){
    // if client just requested the index
    case "/": {
	
    }
    }
};

// if the client do a POST req this will be called
const postReq = (req, res, url) => {
    // look for url the client did go to
    switch(url){
    // if client just requested the index
    case "/": {
	
    }
    }
};

// this parses the url the client requested
const parseUrl = (req) => {
    const urlSplit = req.url.split('');
    return urlSplit[-1] != "/" ? urlSplit.push("/").toString() : req.url;
};

// here it handles requests
const handler = (req, res) => {
    // parse the url and store it in url var
    let url = parseUrl(req);
    // what type of req the client make
    if(req.method == "GET"){
	// and call the method handler for that method
	getReq(req, res, url);
    } else if(req.method == "POST"){
	// same goes for this one
	postReq(req, res, url);
    }
};

// here it creates the server and try to bind it on 0.0.0.0:3001
const server = http
      .createServer(handler) // creates the server
      // start listen on 0.0.0.0:3001
      .listen(3001, (err) => {
	  console.log(
	      err ? "An error occurred when trying to bind... ERROR: " + err // if the was an error print the error
		  : "The server successfully bound on 0.0.0.0:3001" // else it worked
	  )
      })

