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
function getStories_oa(path,interest) {
	var input = {
		    method : 'post',
		    returnedContentType : 'json', 
		    returnedContentEncoding : 'utf-8',
		    path : '/miss/wl/'+path,
		    parameters : {'content' : interest}

		};
	
	
	return WL.Server.invokeHttp(input);
}

function getStories_datas(path) {
	var input = {
		    method : 'post',
		    returnedContentType : 'plain', 
		    returnedContentEncoding : 'utf-8',
		    path : path,
		    parameters : {}

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
	    returnedContentEncoding : 'utf-8',
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
function getStories(name,password) {
//	path = getPath(interest);
	
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    returnedContentEncoding : 'utf-8',
	  //  path : '/names.nsf?login&username=lgx02165&password=123&redirectto=/unioa/processdata.nsf/pdaindex?readform'

	    path : '/names.nsf?login&username='+name+'&password='+password+'&redirectto=/unioa/processdata.nsf/pdaindex?readform'
	  //  path : '/names.nsf?login&username=lgx02165&password=0123&redirectto=/unioa/processdata.nsf/pdaindex?readform'
	};
	
	return WL.Server.invokeHttp(input);
}


//出差申请，填写工号带出该工号数据
function GetygbhData(params){
	var input = {
		    method : 'get',
		    returnedContentType : 'html',
		    returnedContentEncoding : 'GBK',
		    path : '/unioa/processdata.nsf/gethr?openagent&unid='+params+'&_dc=&callback='
		};
		return WL.Server.invokeHttp(input);
}

//出差申请，是否存在项目
function ProjectNoInfo(params){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/oa/pdaweb.nsf/bpmGetprojectname?openagent&pcode='+params+'&_dc=&callback='
	};
	return WL.Server.invokeHttp(input);
}

//境外出差申请，出差费用等信息
function OverseasFree(pcode){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path: pcode
	};
	return WL.Server.invokeHttp(input);
}

//出差申请，费控
function FreeControl(pcode){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path: '/oa/pdaweb.nsf/bpmValidatebudget?openagent&pcode='+pcode+'&callback=',
	};
	return WL.Server.invokeHttp(input);
}

//规章制度
function CheckRegime(wdbh){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/Isodoc/gswd0002.nsf/bpmgetwdbh?openagent&dep='+wdbh
	};
	return WL.Server.invokeHttp(input);
}

//三包申请报告，查找物资代码信息
function GetPartsInfo(parts){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/oa/rdbms.nsf/bpmagentforsbbycode?openagent&gh='+parts+'&_dc=&callback='
	};
	return WL.Server.invokeHttp(input);
}

//三包申请报告，查找工号信息
function GetElevator_no_Info2(scgh){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/oa/rdbms.nsf/bpmagentforsb?openagent&gh='+scgh+'&_dc=&callback='
	};
	return WL.Server.invokeHttp(input);
}


//开箱补缺件流程，检测是否为重点项目
function GetImportant(ygh){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/unioa/processdata.nsf/getimportant?openagent&unid='+ygh
	};
	return WL.Server.invokeHttp(input);
}

//开箱补缺件流程，查找工号信息
function GetElevator_no_Info(scgh){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/oa/rdbms.nsf/bpmagentforbl?openagent&gh='+scgh+'&_dc=&callback='
	};
	return WL.Server.invokeHttp(input);
}

//开箱补缺件流程，获取编号
function GetNo(){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/oa/rdbms.nsf/bpmgetblfileno?openagent&unid=*'
	};
	return WL.Server.invokeHttp(input);
}


//会议申请检查是否有符合资源的会议室
function CheckMeetSocure(unid,hytj,addr){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/unioa/processdata.nsf/bpmfindmeeting?openagent&unid='+unid+'&hytj='+hytj+'&addr='+addr+'&_dc=&callback='
	};
	return WL.Server.invokeHttp(input);
}
//会议室申请查找匹配会议室
function CheckMeetRoom(piid){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/oa/meetingmanage.nsf/bpmselclass?openform&fn=meetclass*processdata&wdid='+piid+'&seltype=fh'
	};
	return WL.Server.invokeHttp(input);
}
//上海会议申请检查是否有符合资源的会议室
function SHCheckMeetSocure(unid,hytj,addr){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/unioa/processdata.nsf/bpmshfindmeeting?openagent&unid='+unid+'&hytj='+hytj+'&addr='+addr+'&_dc=&callback='
	};
	return WL.Server.invokeHttp(input);
}
//上海会议室申请查找匹配会议室
function SHCheckMeetRoom(piid){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/oa/shmeetingmanage.nsf/bpmselclass?openform&fn=meetclass*processdata&wdid='+piid+'&seltype=fh'
	};
	return WL.Server.invokeHttp(input);
}
//井道图变更申请获取信息
function jdt(tno,newno){
	WL.Logger.error("TNO: " + tno);
	WL.Logger.error("NEWO: " + newno);
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/oa/rdbms.nsf/bpmagentforjdt?openagent&tno='+tno+'&newno='+newno+'&_dc=&callback='
	};
	return WL.Server.invokeHttp(input);
}

//供应商首批供货流程
function FirstSupply(gysdm){
	var input = {
			method : 'get',
			returnedContentType : 'html',
			returnedContentEncoding : 'GBK',
			path : '/unioa/processdata.nsf/getgyscodes?openagent&unid='+gysdm+'&_dc=&callback='
	};
	return WL.Server.invokeHttp(input);
}

//已结束流程
function Getenddoc(GH) {
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
				  '<soap:Body>'+
				    '<GH xmlns="urn:DefaultNamespace">'+GH+'</GH>'+
				  '</soap:Body>'+
				'</soap:Envelope>';

		var input = {
				method:'post',
				returnedContentType:'xml',
				returnedContentEncoding : 'utf-8',
				path:'/unioa/webser.nsf/Getenddoc?wsdl',
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;

}

//判断是否有OA账号
function CheckOaAcCount(unid) {
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	    '<soap:Body>'+
	    '<YGBH xmlns="urn:DefaultNamespace">'+unid+'</YGBH>'+
	    '<CFLAG xmlns="urn:DefaultNamespace" />'+
	    '</soap:Body>'+
	    '</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			path:'/unioa/webser.nsf/Getenddoc?wsdl',
			returnedContentEncoding : 'utf-8',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}


//公告列表
function GetGSGGList(unid) {
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'  <soap:Body>'+
	'    <CSNUM xmlns="urn:DefaultNamespace">'+unid+'</CSNUM>'+
	'  </soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/unioa/webser.nsf/Getenddoc?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}

//公告详细内容
function GetGSGGDoc(unid) {
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'  <soap:Body>'+
	'   <GGDOCID xmlns="urn:DefaultNamespace">'+unid+'</GGDOCID>'+
	'  </soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/unioa/webser.nsf/Getenddoc?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}
 
//一周活动
function GetWeekMeetList() {
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<soap:Body>'+
			'<CS1 xmlns="urn:DefaultNamespace" />'+
		'</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/unioa/webser.nsf/Getenddoc?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}

//一周活动详细
function GetWeekMeetDoc(unid) {
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'  <soap:Body>'+
	'   <WEEKDOCID xmlns="urn:DefaultNamespace">'+unid+'</WEEKDOCID>'+
	'  </soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/unioa/webser.nsf/Getenddoc?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}

//人员查询 
function staffQuery(USER) {
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
				  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
				    '<soap:Body>'+
				      '<USER xmlns="urn:DefaultNamespace">'+USER+'</USER>'+
				    '</soap:Body>'+
				  '</soap:Envelope>';

		var input = {
				method:'post',
				returnedContentType:'xml',
				returnedContentEncoding : 'utf-8',
				path:'/oa/pdaweb.nsf/pdainterface?wsdl',
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;

}


//公司规章制度获取目录
function GetURLObj(params){
	var input = {
		    method : 'get',
		    returnedContentType : 'html',
		    returnedContentEncoding : 'GBK',
		    path : "/Isodoc/"+params+"/bpmtree1?openform"
		};
		return WL.Server.invokeHttp(input);
}

//境外出差申请获得国家信息
function GetcountryData(params){
var input = {
	    method : 'get',
	    returnedContentType : 'html',
	    returnedContentEncoding : 'GBK',
	    path : "/unioa/processdata.nsf/getccbts?openagent&unid="+params
	};
	return WL.Server.invokeHttp(input);
}


function addTwoIntegers(a,b){
	return{
		result:com.worklight.customcode.Calculator1.addTwoIntegers(a,b)
	};
}

function fujian(data){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	    '<soap:Body>'+
	      '<nr xmlns="urn:DefaultNamespace">'+data+'</nr>'+
	    '</soap:Body>'+
	  '</soap:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'unioa/webser.nsf/savepdaattach?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
//	var input = {
//		    method : 'post',
//		    returnedContentType : 'plain',
//		    returnedContentEncoding : 'GBK',
//		    //parameters:{'data':"{'piid':'xjj123','pdafiles':[{'filename':'1.jpg','filecode':'/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAdACkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6prldT+IPhTStan0nVPEOmWGowIskkN3cLDtDcjliBkgg4znBBxXVVw3jT4U+DvGmppqPiLRY7q+VBH5yzSxMVHTOxhnHvmgC3/wsnwR/0OHhz/waQf8AxVfPfxd8Twah+0J4d1Dwj4o0CCSLRZIo9Tnuo5LS3lK3XDsCVBIZQAc8svB6HuvEPwu+Cvh+5W31bS0gnYbvLF3eOQPUhXOPxrynxN4R+H0HxO0q50jTmuPBMdmftlrHNOJJZz5oG0yMGGMwnhgMD61nKrTi7OSO2jluLrpSpUpNPZ2dvv2PZv2c/HmveK28T6T4nvLDUrrRZ4kTUbEoY7hX8wZBQBSP3eQQBw3IBFezfLXz78OfE3gDwVqV7/wjGjapYQ6isEcsbEygMjSYb5pGbkSYwPTpX0HRGpCXwszxOCr4VpV4ON9roK5fx14MsfGNtbQahcXcCQMzr9ncDOQOoIIPT0rp6XtVSipKz2MaVadGaqU3ZrZnA+GfhV4b0RpWa3OpNJgA3wWQIPYYA/SvKvhjbTeOfjgfFOi6SdH8I6AktpCvleULmYq6ElePmxISeOAqg8mvpOmhQBwKUYRj8KNK2Lr15OVWbbfmPoooqzA//9k='}]}"},
//		    //parameters:{'piid':'xjj123','pdafiles':"[{'filename':'1.jpg','filecode':'/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAdACkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6prldT+IPhTStan0nVPEOmWGowIskkN3cLDtDcjliBkgg4znBBxXVVw3jT4U+DvGmppqPiLRY7q+VBH5yzSxMVHTOxhnHvmgC3/wsnwR/0OHhz/waQf8AxVfPfxd8Twah+0J4d1Dwj4o0CCSLRZIo9Tnuo5LS3lK3XDsCVBIZQAc8svB6HuvEPwu+Cvh+5W31bS0gnYbvLF3eOQPUhXOPxrynxN4R+H0HxO0q50jTmuPBMdmftlrHNOJJZz5oG0yMGGMwnhgMD61nKrTi7OSO2jluLrpSpUpNPZ2dvv2PZv2c/HmveK28T6T4nvLDUrrRZ4kTUbEoY7hX8wZBQBSP3eQQBw3IBFezfLXz78OfE3gDwVqV7/wjGjapYQ6isEcsbEygMjSYb5pGbkSYwPTpX0HRGpCXwszxOCr4VpV4ON9roK5fx14MsfGNtbQahcXcCQMzr9ncDOQOoIIPT0rp6XtVSipKz2MaVadGaqU3ZrZnA+GfhV4b0RpWa3OpNJgA3wWQIPYYA/SvKvhjbTeOfjgfFOi6SdH8I6AktpCvleULmYq6ElePmxISeOAqg8mvpOmhQBwKUYRj8KNK2Lr15OVWbbfmPoooqzA//9k='}]"},
//		    //parameters:{'piid':piid,'pdafiles':pdafiles},
//		    parameters:{'nr':'hehe'},
//		    path : "unioa/webser.nsf/savepdaattach?",
//		};
//		return WL.Server.invokeHttp(input);
}

function fujian_ck(id){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	    '<soap:Body>'+
	      '<id xmlns="urn:DefaultNamespace">'+id+'</id>'+
	    '</soap:Body>'+
	  '</soap:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'unioa/webser.nsf/Oaattachfile?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;

}
function yuyuedocbyjdr(yh){
	WL.Logger.error("yh: " + yh );
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<YH xmlns="urn:DefaultNamespace">'+yh+'</YH>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'unioa/webser.nsf/yuyuedocbyjdr?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

function yuyuejd(fileno,flag,data){
	//WL.Logger.error("yh: " + yh );
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<FILENO xmlns="urn:DefaultNamespace">'+fileno+'</FILENO>'+
	    '<FLAG xmlns="urn:DefaultNamespace">'+flag+'</FLAG>'+
	    '<DATA xmlns="urn:DefaultNamespace">'+data+'</DATA>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'unioa/webser.nsf/yuyuedocbyjdr?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

function getdoc(phonenum){
	request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	   '<GH xmlns="urn:DefaultNamespace">'+phonenum+'</GH>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/unioa/webser.nsf/Reservation?wsdl',
			
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
	
	
}

function ttmsg(fileno,flag){
	request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	    '<soap:Body>'+
	    '<fileno xmlns="urn:DefaultNamespace">'+fileno+'</fileno>'+
	    '<flag xmlns="urn:DefaultNamespace">'+flag+'</flag>'+
	    '</soap:Body>'+
	    '</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/unioa/webser.nsf/yysendmsg?wsdl',
			
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
	
	
}
