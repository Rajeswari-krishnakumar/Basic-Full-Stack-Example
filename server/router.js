function route(handler, pathName, response, postData){
	if(typeof handler[pathName] === "function"){
		console.log("From router",postData);
		handler[pathName](response,postData);
	}else{
		console.log("No request handler found for path", pathName);
		return "No handler found";
	}
}

exports.route = route;