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
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "javascript", "plain", "xml", "html"  
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

/**
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getStories(interest) {
	path = getPath(interest);
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path
	};
	
	
	return WL.Server.invokeHttp(input);
}
/**
 * 
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getStoriesFiltered(interest) {
	path = getPath(interest);
	
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



function getPath(interest) {
	if (interest == undefined || interest == '') {
		interest = '';
	}else {
		interest = '_' + interest;
	}
	return 'rss/edition' + interest + '.rss';
}

//拿用户 （不再使用）
function GetAllUsers(AppID){
	var request='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>'
    +'<GetAllUsers xmlns="http://usermanager.service.ums.com/">'
    +'<AppID xmlns="urn:DefaultNamespace">'+AppID+'</AppID>'
    +'</GetAllUsers>'
    +'</soap:Body>'
    +'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/ums/services/UserManagerData',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;

}

//验证登陆
function CheckUser(UserID,Password,AppID){
	var request='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
      +'<soap:Body>'
	  +'<CheckUser xmlns="http://usermanager.service.ums.com/">'
	  +'<UserID xmlns="">'+UserID +'</UserID>'
	  +'<Password xmlns="">'+Password +'</Password>'
	  +'<AppID xmlns="" >'+AppID+'</AppID>'
	  +'</CheckUser>'
	  +'</soap:Body>'
	  +'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/ums/services/UserManagerData',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}

//修改密码
function ChangePassword(userID,oldPW,newPW){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
				'<soap:Body>'+
				'<ChangePassword xmlns="http://usermanager.service.ums.com/">'+
				'<UserID xmlns="">'+userID+'</UserID>'+
				'<OldPassword xmlns="">'+oldPW+'</OldPassword>'+
				'<NewPassword xmlns="">'+newPW+'</NewPassword>'+
				'</ChangePassword>'+
				'</soap:Body>'+
				'</soap:Envelope>';
	
	WL.Logger.error("测试2:"+request);

	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/ums/services/UserManagerData',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	}
//拿pda信息 （不再使用）
function GetPDAInfo(UserID,IPAddress,AppVersion,UUID,IMEI,IMSI,Baseband_Version,Android_Version,Phone_Model,Kernel_Version,IsUpdateLog){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<GetPDAInfo xmlns="http://usermanager.service.ums.com/">'+
	      '<UserID xmlns="">'+UserID+'</UserID>'+
	      '<IPAddress xmlns="">'+IPAddress+'</IPAddress>'+
	      '<AppVersion xmlns="">'+AppVersion+'</AppVersion>'+
	      '<UUID xmlns="">'+UUID+'</UUID>'+
	      '<IMEI xmlns="">'+IMEI+'</IMEI>'+
	      '<IMSI xmlns="">'+IMSI+'</IMSI>'+
	      '<Baseband_Version xmlns="">'+Baseband_Version+'</Baseband_Version>'+
	      '<Android_Version xmlns="">'+Android_Version+'</Android_Version>'+
	      '<Phone_Model xmlns="">'+Phone_Model+'</Phone_Model>'+
	      '<Kernel_Version xmlns="">'+Kernel_Version+'</Kernel_Version>'+
	      '<IsUpdateLog xmlns="">'+IsUpdateLog+'</IsUpdateLog>'+
	    '</GetPDAInfo>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/ums/services/UserManagerData',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}