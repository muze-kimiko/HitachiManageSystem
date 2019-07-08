/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *
 *  	// Optional
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"
 *  	returnedContentEncoding : 'encoding',
 *  	parameters: {name1: value1, ... },
 *  	headers: {name1: value1, ... },
 *  	cookies: {name1: value1, ... },
 *  	body: {
 *  		contentType: 'text/xml; charset=utf-8' or similar value,
 *  		content: stringValue
 *  	},
 *  	transformation: {
 *  		type: 'default', or 'xslFile',
 *  		xslFile: fileName
 *  	}
 *  }
 */

//关键件扫描
function KeyPartScanOperation(parameters){
	WL.Logger.info(parameters);
//	parameters.UserName = '';
//	parameters.UserPwd = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<tem:KeyPartScanOperation>'+
	         '<tem:jsonTemp>[{"barcode":"'+parameters.Barcode+'","loggedpersons95id":"'+parameters.Id+
	         '","workCenterId":"'+parameters.WorkCenterId+'","shopOrder":"'+parameters.ShopOrder+'"}]</tem:jsonTemp>'+
	      '</tem:KeyPartScanOperation>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'SOAPAction':'"http://tempuri.org/IEmbededService/KeyPartScanOperation"'},
			path:'',
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);

	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//工序报工
function OrderScanOperation(parameters){
	WL.Logger.info(parameters);
//	parameters.UserName = '';
//	parameters.UserPwd = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<tem:OrderScanOperation>'+
	         '<tem:jsonTemp>[{"barcode":"'+parameters.Barcode+'","loggedpersons95id":"'+parameters.Id+'","workCenterId":"'+parameters.WorkCenterId+'","type":"'+parameters.Type+'"}]</tem:jsonTemp>'+
	      '</tem:OrderScanOperation>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'SOAPAction':'"http://tempuri.org/IEmbededService/OrderScanOperation"'},
			path:'',
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);

	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//用户登录
function UserLogin(parameters){
	WL.Logger.info(parameters);
//	parameters.UserName = '';
//	parameters.UserPwd = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<tem:UserLogin>'+
	         '<tem:jsonTemp>[{"username":"' + parameters.UserName + '","userpass":"' + parameters.UserPwd + '"}]</tem:jsonTemp>'+
	      '</tem:UserLogin>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'SOAPAction':'"http://tempuri.org/IEmbededService/UserLogin"'},
			path:'',
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);

	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

/**
 * @param tag
 *            must be either MobileFirst_Platform or MobileFirst_Playground
 * @returns json list of items
 */
function getFeed(tag) {
	path = getPath(tag);

	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path
	};


	return WL.Server.invokeHttp(input);
}
/**
 *
 * @param tag
 *            must be either MobileFirst_Platform or MobileFirst_Playground
 * @returns json list of items
 */
function getFeedFiltered(tag) {
	path = getPath(tag);

	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path,
	    transformation : {
		    type : 'xslFile',
		    xslFile : 'filtered.xsl'
	    }
	};

	return WL.Server.invokeHttp(input);
}



function getPath(tag) {
	var path;
	if (tag === undefined || tag === '') {
		path = '/feed';
	}else {
		path = '/tag/' + tag + '/feed';
	}
	return 'mobilefirstplatform' + path;
}
