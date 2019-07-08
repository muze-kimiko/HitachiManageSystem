/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var LoginStr = 'UserName=PDA&Password=PDA';//测试
//var LoginStr = 'UserName=PDA&Password=PDAPDA';//正式

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

//工号查询
function QueryAssetNumber(parameters){
	WL.Logger.info(parameters);
//	parameters.AssetNumber = '';
//	parameters.PersonId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:QueryAssetNumber_Input>'+
	         '<chk:AssetNumber>'+parameters.AssetNumber+'</chk:AssetNumber>'+
	         '<chk:PersonId>'+parameters.PersonId+'</chk:PersonId>'+
	      '</chk:QueryAssetNumber_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:QueryAssetNumber"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//头信息新增
function InsertCheckHeader(parameters){
	WL.Logger.info(parameters);
//	parameters.PDAUserId = '';
//	parameters.AgreementItemId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:InsertCheckHeader_Input>'+
	         '<chk:PDAUserId>'+parameters.PDAUserId+'</chk:PDAUserId>'+
	         '<chk:AgreementItemId>'+parameters.AgreementItemId+'</chk:AgreementItemId>'+
//	         '<chk:YearOfJob>?</chk:YearOfJob>'+
	      '</chk:InsertCheckHeader_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:InsertCheckHeader"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//维保人员查询
function QueryMaintenancePerson(parameters){
	WL.Logger.info(parameters);
//	parameters.PersonName = '';
//	parameters.DivisionId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:QueryMaintenancePerson_Input>'+
	         '<chk:PersonName>'+parameters.PersonName+'</chk:PersonName>'+
	         '<chk:DivisionId>'+parameters.DivisionId+'</chk:DivisionId>'+
	      '</chk:QueryMaintenancePerson_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:QueryMaintenancePerson"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//不良检查项目查询
function QueryCheckList(parameters){
	WL.Logger.info(parameters);
//	parameters.ElevatorType = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:QueryCheckList_Input>'+
	         '<chk:ElevatorType>'+parameters.ElevatorType+'</chk:ElevatorType>'+
	      '</chk:QueryCheckList_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:QueryCheckList"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//行信息以及附件新增
function InsertCheckLineAndAtt(parameters){
	WL.Logger.info(parameters);
//	parameters.ElevatorType = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA" xmlns:hel="http://www.siebel.com/xml/HEL%20CHK%20Att%20InOut">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:InsertCheckLineAndAtt_Input>'+
	      	 '<chk:ChkElevatorId>'+parameters.ChkElevatorId+'</chk:ChkElevatorId>'+
	      	 '<chk:ChkCheckListId>'+parameters.ChkCheckListId+'</chk:ChkCheckListId>'+
//	      	 '<chk:Code>'+parameters.Code+'</chk:Code>'+
//	      	 '<chk:PoorJudgmentStandard>'+parameters.PoorJudgmentStandard+'</chk:PoorJudgmentStandard>'+
//	         '<!--备注说明:-->'+
	         '<chk:Comments>'+parameters.Comments+'</chk:Comments>'+
//	         '<!--整改时间:-->'+
	         '<chk:FixDate>'+parameters.FixDate+'</chk:FixDate>'+
//	         '<!--不良项目说明:-->'+
	         '<chk:PoorJudgmentComments>'+parameters.PoorJudgmentComments+'</chk:PoorJudgmentComments>'+
//	         '<!--责任分类:-->'+
	         '<chk:RespType>'+parameters.RespType+'</chk:RespType>'+
//	         '<!--是否A级不良:-->'+
	         '<chk:PoorJudgmentFlag>'+parameters.PoorJudgmentFlag+'</chk:PoorJudgmentFlag>'+
//	         '<!--整改情况:-->'+
	         '<chk:FixStatus>'+parameters.FixStatus+'</chk:FixStatus>'+
//	         '<!--附件:-->'+
	         
	         '<hel:ListOfHelChkAttInOut>'+
	         /*
	            '<!--Zero or more repetitions:-->'+
	            '<hel:HelChkAttInOut>'+
	               '<!--Optional:-->'+
	               '<hel:Id>'+parameters.Att.Id+'</hel:Id>'+
//	               '<!--文件名称:-->'+
	               '<hel:FileName>'+parameters.Att.FileName+'</hel:FileName>'+
//	               '<!--文件内容(Base64):-->'+
	               '<hel:FileContent>'+parameters.Att.FileContent+'</hel:FileContent>'+
//	               '<!--文件类别:-->'+
	               '<hel:FileType>'+parameters.Att.FileType+'</hel:FileType>'+
//	               '<!--文件说明:-->'+
	               '<hel:Comments>'+parameters.Att.Comments+'</hel:Comments>'+
//	               '<!--文件扩展名:-->'+
	               '<hel:FileExt>'+parameters.Att.FileExt+'</hel:FileExt>'+
	            '</hel:HelChkAttInOut>'+
	            */
	         '</hel:ListOfHelChkAttInOut>'+
	      '</chk:InsertCheckLineAndAtt_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:InsertCheckLineAndAtt"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//行信息以及附件更新
function UpdateCheckLineAndAtt(parameters){
	WL.Logger.info(parameters);
//	parameters.ElevatorType = '';
	var att_info = '';
	if(parameters.Att){
		att_info = '<hel:HelChkAttInOut>'+
			        '<!--Optional:-->'+
			        '<hel:Id>'+parameters.Att.Id+'</hel:Id>'+
			//        '<!--文件名称:-->'+
			        '<hel:FileName>'+parameters.Att.FileName+'</hel:FileName>'+
			//        '<!--文件内容(Base64):-->'+
			        '<hel:FileContent>'+parameters.Att.FileContent+'</hel:FileContent>'+
			//        '<!--文件类别:-->'+
			        '<hel:FileType>'+parameters.Att.FileType+'</hel:FileType>'+
			//        '<!--文件说明:-->'+
			        '<hel:Comments>'+parameters.Att.Comments+'</hel:Comments>'+
			//        '<!--文件扩展名:-->'+
			        '<hel:FileExt>'+parameters.Att.FileExt+'</hel:FileExt>'+
			     '</hel:HelChkAttInOut>';
	}
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA" xmlns:hel="http://www.siebel.com/xml/HEL%20CHK%20Att%20InOut">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:UpdateCheckLineAndAtt_Input>'+
	      	 '<chk:ChkElevatorItemId>'+parameters.ChkElevatorItemId+'</chk:ChkElevatorItemId>'+
	      	 '<chk:ChkCheckListId>'+parameters.ChkCheckListId+'</chk:ChkCheckListId>'+
//	      	 '<chk:Code>'+parameters.Code+'</chk:Code>'+
//	      	 '<chk:PoorJudgmentStandard>'+parameters.PoorJudgmentStandard+'</chk:PoorJudgmentStandard>'+
//	         '<!--备注说明:-->'+
	         '<chk:Comments>'+parameters.Comments+'</chk:Comments>'+
//	         '<!--整改时间:-->'+
	         '<chk:FixDate>'+parameters.FixDate+'</chk:FixDate>'+
//	         '<!--不良项目说明:-->'+
	         '<chk:PoorJudgmentComments>'+parameters.PoorJudgmentComments+'</chk:PoorJudgmentComments>'+
//	         '<!--责任分类:-->'+
	         '<chk:RespType>'+parameters.RespType+'</chk:RespType>'+
//	         '<!--是否A级不良:-->'+
	         '<chk:PoorJudgmentFlag>'+parameters.PoorJudgmentFlag+'</chk:PoorJudgmentFlag>'+
//	         '<!--整改情况:-->'+
	         '<chk:FixStatus>'+parameters.FixStatus+'</chk:FixStatus>'+
//	         '<!--附件:-->'+
	         '<hel:ListOfHelChkAttInOut>'+ att_info + '</hel:ListOfHelChkAttInOut>'+
	      '</chk:UpdateCheckLineAndAtt_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:UpdateCheckLineAndAtt"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//头信息和行信息范围查询接口
function QueryCheckHeaderAndLineRange(parameters){
	WL.Logger.info(parameters);
//	parameters.ElevatorType = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:QueryCheckHeaderAndLineRange_Input>'+
	         '<chk:PDAPersonId>'+parameters.PDAPersonId+'</chk:PDAPersonId>'+
	         '<chk:QCEngineer>'+parameters.QCEngineer+'</chk:QCEngineer>'+
	         '<chk:AssetDomainName>'+parameters.AssetDomainName+'</chk:AssetDomainName>'+
	         '<chk:Status>'+parameters.Status+'</chk:Status>'+
	         '<chk:AssetNumber>'+parameters.AssetNumber+'</chk:AssetNumber>'+
	         '<chk:Created>'+parameters.Created+'</chk:Created>'+
	      '</chk:QueryCheckHeaderAndLineRange_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:QueryCheckHeaderAndLineRange"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//头信息和行信息查询接口
function QueryCheckHeaderAndLine(parameters){
	WL.Logger.info(parameters);
//	parameters.ElevatorType = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:QueryCheckHeaderAndLine_Input>'+
	         '<chk:Id>'+parameters.Id+'</chk:Id>'+
	      '</chk:QueryCheckHeaderAndLine_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:QueryCheckHeaderAndLine"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//头信息更新
function UpdateCheckHeader(parameters){
	WL.Logger.info(parameters);
//	parameters.YearOfJob = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:UpdateCheckHeader_Input>'+
	         '<chk:MaintenanceLeader>'+parameters.MaintenanceLeader+'</chk:MaintenanceLeader>'+
	         '<chk:ActualCheckDate>'+parameters.ActualCheckDate+'</chk:ActualCheckDate>'+
	         '<chk:AgreementItemId>'+parameters.AgreementItemId+'</chk:AgreementItemId>'+
	         '<chk:QCEngineerId>'+parameters.QCEngineerId+'</chk:QCEngineerId>'+
	         '<chk:ChkElevatorId>'+parameters.ChkElevatorId+'</chk:ChkElevatorId>'+
	         '<chk:YearOfJob>'+parameters.YearOfJob+'</chk:YearOfJob>'+
	      '</chk:UpdateCheckHeader_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:UpdateCheckHeader"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//附件查询
function QueryCheckAtt(parameters){
	WL.Logger.info(parameters);
//	parameters.ChkElevatorItemId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:QueryCheckAtt_Input>'+
	         '<chk:ChkElevatorItemId>'+parameters.ChkElevatorItemId+'</chk:ChkElevatorItemId>'+
	      '</chk:QueryCheckAtt_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:QueryCheckAtt"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//附件删除
function DeleteCheckAtt(parameters){
	WL.Logger.info(parameters);
//	parameters.Id = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:DeleteCheckAtt_Input>'+
	         '<chk:Id>'+parameters.Id+'</chk:Id>'+
	      '</chk:DeleteCheckAtt_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:DeleteCheckAtt"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//头信息提交
function SubmitCheckHeader(parameters){
	WL.Logger.info(parameters);
//	parameters.ChkElevatorId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:SubmitCheckHeader_Input>'+
	         '<chk:ChkElevatorId>'+parameters.ChkElevatorId+'</chk:ChkElevatorId>'+
	      '</chk:SubmitCheckHeader_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:SubmitCheckHeader"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//头信息删除
function DeleteCheckHeader(parameters){
	WL.Logger.info(parameters);
//	parameters.ChkElevatorId = 'a1a1a1';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:DeleteCheckHeader_Input>'+
	         '<chk:ChkElevatorId>'+parameters.ChkElevatorId+'</chk:ChkElevatorId>'+
	      '</chk:DeleteCheckHeader_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:DeleteCheckHeader"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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

//查询上次检查信息
function QueryLastCheckInfo(parameters){
	WL.Logger.info(parameters);
//	parameters.ChkElevatorId = 'a1a1a1';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:chk="http://siebel.com/Sales/CHKPDA">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<chk:QueryLastCheckInfo_Input>'+
	         '<chk:AssetNumber>'+parameters.AssetNumber+'</chk:AssetNumber>'+
	      '</chk:QueryLastCheckInfo_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/CHKPDA:QueryLastCheckInfo"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
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