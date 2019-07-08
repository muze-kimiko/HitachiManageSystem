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

//登录
function login(pars){
	WL.Logger.info(pars);
//	pars._UserName = '';
//	pars._UserPwd = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
//			parameters: {userName: 'lgx02165',password:'Ww123456'},
			parameters: {userName: pars._UserName,password:pars._UserPwd},
			path:'/smartformsAPI/api/bpmauth/login',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//待办列表
function todoList(pars){
	WL.Logger.info(pars);
//	pars._rows = '';
//	pars._page = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
//			parameters: {rows: '10',page:'1',token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTIzIiwiaWF0IjoxNTIxNzM2OTE0LCJzdWIiOiJ7XCJjcmVhdGVUaW1lXCI6MTUyMTE4NTk1ODM4NixcImVtcERlcHRcIjpcImRlcHRpZDozNThhZTkzNC00ZDc0LTQyYjQtOTAwMS1mN2Q1Njc0MTNiZmFcIixcImVtcE5hbWVcIjpcImxneDAyMTY1XCIsXCJlbXBOdW1cIjpcImVtcGlkOjAzMDQ1ZTRlLWIwNGUtNDJkMS1hMTQ3LWQwNmEzODk2MWZmZFwiLFwiZW1wVHlwZVwiOlwibGRhcFwiLFwiam9iTnVtYmVyXCI6XCIwMDAwMjE2NVwiLFwibGRhcE5hbWVcIjpcIm89aGVsY1wiLFwibGRhcFVpZFwiOlwibGd4MDIxNjVcIixcIm5pY2tOYW1lXCI6XCLmnY7lhYnnpaUgMDAwMDIxNjUvaGVsY1wiLFwidXBkYXRlVGltZVwiOjE1MjE1MTg0Mzg2MjJ9IiwiaXNzIjoic29sYXJ0ZWNoIiwiZXhwIjoxNTIxODA4OTE0fQ.HT5-ig9ZlrvI_xO4ZIxOosgQlHOYrCDqD-QRQaspimQ'},
			parameters: {
				rows: pars._rows,
				page:pars._page,
				token:pars._token,
				respType:'2',
				responseValue:pars._responseValue,
				workflowCode:'',
			},
			path:'/smartformsAPI/api/hbpmtask/todoList',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//已办列表
function alreadyDealtList(pars){
	WL.Logger.info(pars);
//	pars._type = '';
//	pars._rows = '';
//	pars._page = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
//			type: '1、已办  2、已完成'
//			parameters: {type: '1',rows: '100',page:'1',token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTIxIiwiaWF0IjoxNTIxNjE4NzY0LCJzdWIiOiJ7XCJjb21wYW55TnVtXCI6XCIxMDUwXCIsXCJjcmVhdGVUaW1lXCI6MTQ2NjE0MTY1NjAwMCxcImVtYWlsXCI6XCIxMzcyMTAwNkBxcS5jb21cIixcImVtcERlcHRcIjpcImRlcHRpZDoxOTk0MTUwNy03ZTc0LTQ2NzQtYmJiMS0zMWY5YjAzMDhmMzNcIixcImVtcE5hbWVcIjpcImxkc1wiLFwiZW1wTnVtXCI6XCJlbXBpZDo4NjM1MjcyMy1kMGI3LTQ5YjItODgyMS0zNjlkZDJjM2UwZjhcIixcImVtcFBvc2l0aW9uXCI6XCIxXCIsXCJlbXBUeXBlXCI6XCJsZGFwXCIsXCJsZGFwTmFtZVwiOlwiY249dXNlcnMsREM9R1pKVEpULERDPUNPTVwiLFwibGRhcFVpZFwiOlwiMTAwMDAwMDAwOTFcIixcIm5pY2tOYW1lXCI6XCLmnpfmrr_nm5tcIixcInRlbmVudElkXCI6XCJ0ZW5lbnRJZDo2OWVkNWYwOC00YTgzLTQ0OTQtYmRkMi02ZjliMWU2MDZjZjlcIixcInVwZGF0ZVRpbWVcIjoxNDkzNzc2NDY0MDAwfSIsImlzcyI6InNvbGFydGVjaCIsImV4cCI6MTUyMTY5MDc2NH0.i9Bf0ky1UDLQynpLSv5S_b416dMhgN5lXCJJcBrBZ6k'},
			parameters: {
				colnames:'Yfs,WtspVersion',
				type:pars._type,
				rows:pars._rows,
				page:pars._page,
				token:pars._token,
				respType:'2',//pars._respType,
				workflowCode:'',
			},
//			path:'/smartformsAPI/api/hbpmtask/alreadyDealtList',
			path:'/smartformsAPI/api/bpmtask/v2/alreadyDealtList',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//获取文档
function getDocumentByDocId(pars){
	WL.Logger.info(pars);
//	pars._docUid = '';
//	pars._taskId = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
			/*
			parameters: {
				params: "{docUid:'docid:b7783650-398c-4d3a-82ed-5e461e727451',taskId:'46'}",
				token:pars._token
			},
			*/
			parameters: {
				params: "{docUid:'"+pars._docUid+"',taskId:'"+pars._taskId+"',respType:'2'}",
				token:pars._token,
			},
			path:'/smartformsAPI/api/datDocument/getDocumentByDocId',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//更新文档
function updateDocument(pars){
	WL.Logger.info(pars);
//	pars._docUid = '';
//	pars._appId = '';
//	pars._docData = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
			/*
			parameters: {
				params: "{docUid:'docid:2e2c3d15-0269-4e17-8d78-c0987982e1f7',appId:'10743',docData:'文档JSON数据格式'}",
				token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTIxIiwiaWF0IjoxNTIxNjIyNjYzLCJzdWIiOiJ7XCJjb21wYW55TnVtXCI6XCIxMDUwXCIsXCJjcmVhdGVUaW1lXCI6MTQ2NjE0MTY1NjAwMCxcImVtYWlsXCI6XCIxMzcyMTAwNkBxcS5jb21cIixcImVtcERlcHRcIjpcImRlcHRpZDoxOTk0MTUwNy03ZTc0LTQ2NzQtYmJiMS0zMWY5YjAzMDhmMzNcIixcImVtcE5hbWVcIjpcImxkc1wiLFwiZW1wTnVtXCI6XCJlbXBpZDo4NjM1MjcyMy1kMGI3LTQ5YjItODgyMS0zNjlkZDJjM2UwZjhcIixcImVtcFBvc2l0aW9uXCI6XCIxXCIsXCJlbXBUeXBlXCI6XCJsZGFwXCIsXCJsZGFwTmFtZVwiOlwiY249dXNlcnMsREM9R1pKVEpULERDPUNPTVwiLFwibGRhcFVpZFwiOlwiMTAwMDAwMDAwOTFcIixcIm5pY2tOYW1lXCI6XCLmnpfmrr_nm5tcIixcInRlbmVudElkXCI6XCJ0ZW5lbnRJZDo2OWVkNWYwOC00YTgzLTQ0OTQtYmRkMi02ZjliMWU2MDZjZjlcIixcInVwZGF0ZVRpbWVcIjoxNDkzNzc2NDY0MDAwfSIsImlzcyI6InNvbGFydGVjaCIsImV4cCI6MTUyMTY5NDY2M30.V1MGUz0O2-bwcYGEMpXuLYDHbTarFa8JhTGW0-_knXc'
			},
			*/
			parameters: {
//				params: "{docUid:'"+pars._docUid+"',appId:'"+pars._appId+"',docData:{Pfz:'"+pars._Wt_pfz+"',ZjAmt:'"+pars._ZjAmt+"',PfAmtBhs:'"+pars._PfAmtBhs+"',PfPercent:'"+pars._PfPercent+"',condi:'"+pars._condi+"'}}",
				params: "{docUid:'"+pars._docUid+"',appId:'"+pars._appId+"',docData:{Pfz:'"+pars._Wt_pfz+"',condi:'"+pars._condi+"',ApproveLevel:'"+pars._ApproveLevel+"'}}",
				token:pars._token
			},
			path:'/smartformsAPI/api/datDocument/updateDocument',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//更新文档（新）
function updateDocument_new(pars){
	WL.Logger.info(pars);
//	pars._docUid = '';
//	pars._appId = '';
//	pars._docData = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
			/*
			parameters: {
				params: "{docUid:'docid:2e2c3d15-0269-4e17-8d78-c0987982e1f7',appId:'10743',docData:'文档JSON数据格式'}",
				token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTIxIiwiaWF0IjoxNTIxNjIyNjYzLCJzdWIiOiJ7XCJjb21wYW55TnVtXCI6XCIxMDUwXCIsXCJjcmVhdGVUaW1lXCI6MTQ2NjE0MTY1NjAwMCxcImVtYWlsXCI6XCIxMzcyMTAwNkBxcS5jb21cIixcImVtcERlcHRcIjpcImRlcHRpZDoxOTk0MTUwNy03ZTc0LTQ2NzQtYmJiMS0zMWY5YjAzMDhmMzNcIixcImVtcE5hbWVcIjpcImxkc1wiLFwiZW1wTnVtXCI6XCJlbXBpZDo4NjM1MjcyMy1kMGI3LTQ5YjItODgyMS0zNjlkZDJjM2UwZjhcIixcImVtcFBvc2l0aW9uXCI6XCIxXCIsXCJlbXBUeXBlXCI6XCJsZGFwXCIsXCJsZGFwTmFtZVwiOlwiY249dXNlcnMsREM9R1pKVEpULERDPUNPTVwiLFwibGRhcFVpZFwiOlwiMTAwMDAwMDAwOTFcIixcIm5pY2tOYW1lXCI6XCLmnpfmrr_nm5tcIixcInRlbmVudElkXCI6XCJ0ZW5lbnRJZDo2OWVkNWYwOC00YTgzLTQ0OTQtYmRkMi02ZjliMWU2MDZjZjlcIixcInVwZGF0ZVRpbWVcIjoxNDkzNzc2NDY0MDAwfSIsImlzcyI6InNvbGFydGVjaCIsImV4cCI6MTUyMTY5NDY2M30.V1MGUz0O2-bwcYGEMpXuLYDHbTarFa8JhTGW0-_knXc'
			},
			*/
			/*
			parameters: {
//				params: "{docUid:'"+pars._docUid+"',appId:'"+pars._appId+"',docData:{Pfz:'"+pars._Wt_pfz+"',ZjAmt:'"+pars._ZjAmt+"',PfAmtBhs:'"+pars._PfAmtBhs+"',PfPercent:'"+pars._PfPercent+"',condi:'"+pars._condi+"'}}",
				params: "{docUid:'"+pars._docUid+"',appId:'"+pars._appId+"',docData:{Pfz:'"+pars._Wt_pfz+"',condi:'"+pars._condi+"',ApproveLevel:'"+pars._ApproveLevel+"'}}",
				token:pars._token
			},
			*/
			parameters:pars._pars,
			path:'/smartformsAPI/api/datDocument/updateDocument',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//获取下个环节信息
function getNextTacheInfo(pars){
	WL.Logger.info(pars);
//	pars._documentId = '';
//	pars._taskId = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
//			parameters: {documentId: 'docid:4afbbbbf-1313-4b69-b8ba-b91c6415bfbc',taskId:'taskId',token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTIxIiwiaWF0IjoxNTIxNjE4NzY0LCJzdWIiOiJ7XCJjb21wYW55TnVtXCI6XCIxMDUwXCIsXCJjcmVhdGVUaW1lXCI6MTQ2NjE0MTY1NjAwMCxcImVtYWlsXCI6XCIxMzcyMTAwNkBxcS5jb21cIixcImVtcERlcHRcIjpcImRlcHRpZDoxOTk0MTUwNy03ZTc0LTQ2NzQtYmJiMS0zMWY5YjAzMDhmMzNcIixcImVtcE5hbWVcIjpcImxkc1wiLFwiZW1wTnVtXCI6XCJlbXBpZDo4NjM1MjcyMy1kMGI3LTQ5YjItODgyMS0zNjlkZDJjM2UwZjhcIixcImVtcFBvc2l0aW9uXCI6XCIxXCIsXCJlbXBUeXBlXCI6XCJsZGFwXCIsXCJsZGFwTmFtZVwiOlwiY249dXNlcnMsREM9R1pKVEpULERDPUNPTVwiLFwibGRhcFVpZFwiOlwiMTAwMDAwMDAwOTFcIixcIm5pY2tOYW1lXCI6XCLmnpfmrr_nm5tcIixcInRlbmVudElkXCI6XCJ0ZW5lbnRJZDo2OWVkNWYwOC00YTgzLTQ0OTQtYmRkMi02ZjliMWU2MDZjZjlcIixcInVwZGF0ZVRpbWVcIjoxNDkzNzc2NDY0MDAwfSIsImlzcyI6InNvbGFydGVjaCIsImV4cCI6MTUyMTY5MDc2NH0.i9Bf0ky1UDLQynpLSv5S_b416dMhgN5lXCJJcBrBZ6k'},
			parameters: {documentId: pars._documentId,taskId:pars._taskId,token:pars._token},
			path:'/smartformsAPI/api/bpmtask/getNextTacheInfo',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//提交流程
function submitTask(pars){
	WL.Logger.info(pars);
//	pars._documentId = '';
//	pars._appId = '';
//	pars._taskId = '';
//	pars._nextOwners = '';
//	pars._nextNodes = '';
//	pars._nextOwnerNames = '';
//	pars._isend = '';
//	pars._note = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
			/*
			parameters: {
				documentId:"docid:38054b51-0f91-4e3f-89ed-b610c4fd6a7c",//--获取文档
				appId:"appid:95be00fc-e61d-45ee-9729-0b81220503a4",//--获取文档
				taskId:"10711",//--待办列表
				nextOwners:"{__nextOwner_0_num:'林殿盛(empid:86352723-d0b7-49b2-8821-369dd2c3e0f8);'}",//--获取下个环节信息
				nextNodes:"{__nextNodeId_0:'bpdid:a897dfe1f8ba3938:4f12a605:162032b4fe0:-7ff1'}",//--获取下个环节信息
				nextOwnerNames:"{__nextOwner_0:'林殿盛;'}",//--获取下个环节信息
				rollbackGroupType:"",
				//isend:'0：同意或保留意见 -1：否决'
				params:"{isend:'0'}",
				autoCommit:"",
				note:"",//提交意见
				token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTIxIiwiaWF0IjoxNTIxNjIyNjYzLCJzdWIiOiJ7XCJjb21wYW55TnVtXCI6XCIxMDUwXCIsXCJjcmVhdGVUaW1lXCI6MTQ2NjE0MTY1NjAwMCxcImVtYWlsXCI6XCIxMzcyMTAwNkBxcS5jb21cIixcImVtcERlcHRcIjpcImRlcHRpZDoxOTk0MTUwNy03ZTc0LTQ2NzQtYmJiMS0zMWY5YjAzMDhmMzNcIixcImVtcE5hbWVcIjpcImxkc1wiLFwiZW1wTnVtXCI6XCJlbXBpZDo4NjM1MjcyMy1kMGI3LTQ5YjItODgyMS0zNjlkZDJjM2UwZjhcIixcImVtcFBvc2l0aW9uXCI6XCIxXCIsXCJlbXBUeXBlXCI6XCJsZGFwXCIsXCJsZGFwTmFtZVwiOlwiY249dXNlcnMsREM9R1pKVEpULERDPUNPTVwiLFwibGRhcFVpZFwiOlwiMTAwMDAwMDAwOTFcIixcIm5pY2tOYW1lXCI6XCLmnpfmrr_nm5tcIixcInRlbmVudElkXCI6XCJ0ZW5lbnRJZDo2OWVkNWYwOC00YTgzLTQ0OTQtYmRkMi02ZjliMWU2MDZjZjlcIixcInVwZGF0ZVRpbWVcIjoxNDkzNzc2NDY0MDAwfSIsImlzcyI6InNvbGFydGVjaCIsImV4cCI6MTUyMTY5NDY2M30.V1MGUz0O2-bwcYGEMpXuLYDHbTarFa8JhTGW0-_knXc'
			},
			*/
			parameters: {
				documentId:pars._documentId,//--获取文档
				appId:pars._appId,//--获取文档
				taskId:pars._taskId,//--待办列表
				nextOwners:"{__nextOwner_0_num:'"+pars._nextOwners+"'}",//--获取下个环节信息
				nextNodes:"{__nextNodeId_0:'"+pars._nextNodes+"'}",//--获取下个环节信息
				nextOwnerNames:"{__nextOwner_0:'"+pars._nextOwnerNames+"'}",//--获取下个环节信息
				rollbackGroupType:"",
				//condi:'0：同意或保留意见 -1：否决'
				params:"{condi:'"+pars._isend+"'}",
				autoCommit:"",
				note:pars._note,//提交意见
				token:pars._token
			},
			path:'/smartformsAPI/api/bpmtaskoperation/submitTask',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//提交流程（新）
function submitTask_new(pars){
	WL.Logger.info(pars);
//	pars._documentId = '';
//	pars._appId = '';
//	pars._taskId = '';
//	pars._nextOwners = '';
//	pars._nextNodes = '';
//	pars._nextOwnerNames = '';
//	pars._isend = '';
//	pars._note = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
			/*
			parameters: {
				documentId:"docid:38054b51-0f91-4e3f-89ed-b610c4fd6a7c",//--获取文档
				appId:"appid:95be00fc-e61d-45ee-9729-0b81220503a4",//--获取文档
				taskId:"10711",//--待办列表
				nextOwners:"{__nextOwner_0_num:'林殿盛(empid:86352723-d0b7-49b2-8821-369dd2c3e0f8);'}",//--获取下个环节信息
				nextNodes:"{__nextNodeId_0:'bpdid:a897dfe1f8ba3938:4f12a605:162032b4fe0:-7ff1'}",//--获取下个环节信息
				nextOwnerNames:"{__nextOwner_0:'林殿盛;'}",//--获取下个环节信息
				rollbackGroupType:"",
				//isend:'0：同意或保留意见 -1：否决'
				params:"{isend:'0'}",
				autoCommit:"",
				note:"",//提交意见
				token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTIxIiwiaWF0IjoxNTIxNjIyNjYzLCJzdWIiOiJ7XCJjb21wYW55TnVtXCI6XCIxMDUwXCIsXCJjcmVhdGVUaW1lXCI6MTQ2NjE0MTY1NjAwMCxcImVtYWlsXCI6XCIxMzcyMTAwNkBxcS5jb21cIixcImVtcERlcHRcIjpcImRlcHRpZDoxOTk0MTUwNy03ZTc0LTQ2NzQtYmJiMS0zMWY5YjAzMDhmMzNcIixcImVtcE5hbWVcIjpcImxkc1wiLFwiZW1wTnVtXCI6XCJlbXBpZDo4NjM1MjcyMy1kMGI3LTQ5YjItODgyMS0zNjlkZDJjM2UwZjhcIixcImVtcFBvc2l0aW9uXCI6XCIxXCIsXCJlbXBUeXBlXCI6XCJsZGFwXCIsXCJsZGFwTmFtZVwiOlwiY249dXNlcnMsREM9R1pKVEpULERDPUNPTVwiLFwibGRhcFVpZFwiOlwiMTAwMDAwMDAwOTFcIixcIm5pY2tOYW1lXCI6XCLmnpfmrr_nm5tcIixcInRlbmVudElkXCI6XCJ0ZW5lbnRJZDo2OWVkNWYwOC00YTgzLTQ0OTQtYmRkMi02ZjliMWU2MDZjZjlcIixcInVwZGF0ZVRpbWVcIjoxNDkzNzc2NDY0MDAwfSIsImlzcyI6InNvbGFydGVjaCIsImV4cCI6MTUyMTY5NDY2M30.V1MGUz0O2-bwcYGEMpXuLYDHbTarFa8JhTGW0-_knXc'
			},
			parameters: {
				documentId:pars._documentId,//--获取文档
				appId:pars._appId,//--获取文档
				taskId:pars._taskId,//--待办列表
				nextOwners:"{__nextOwner_0_num:'"+pars._nextOwners+"'}",//--获取下个环节信息
				nextNodes:"{__nextNodeId_0:'"+pars._nextNodes+"'}",//--获取下个环节信息
				nextOwnerNames:"{__nextOwner_0:'"+pars._nextOwnerNames+"'}",//--获取下个环节信息
				rollbackGroupType:"",
				//condi:'0：同意或保留意见 -1：否决'
				params:"{condi:'"+pars._isend+"'}",
				autoCommit:"",
				note:pars._note,//提交意见
				token:pars._token
			},
			*/
			parameters:pars._pars,
			path:'/smartformsAPI/api/bpmtaskoperation/submitTask',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//获取审批意见列表
function getAuditRecordList(pars){
	WL.Logger.info(pars);
//	pars._documentId = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'post',
			returnedContentType:'json',
			/*
			parameters: {
				documentId:'docid:43e91502-cc23-42f9-a263-54026f641298',//--获取文档
				auditDataSetClsName:'',
				token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTMwIiwiaWF0IjoxNTIyMzkwMDQ3LCJzdWIiOiJ7XCJjcmVhdGVUaW1lXCI6MTUyMTE4NTk1NjczOCxcImVtcERlcHRcIjpcImRlcHRpZDo3ODdlMzllZi1hZDlmLTQ2MjQtYTliZi0xNTBkOGRkM2Q1ZmZcIixcImVtcE5hbWVcIjpcImxjejA0MTc0XCIsXCJlbXBOdW1cIjpcImVtcGlkOjM0MzdhOThkLWY3YTktNGE0NS05MWQ1LTBkZDA5MTRiYTMzYVwiLFwiZW1wVHlwZVwiOlwibGRhcFwiLFwiam9iTnVtYmVyXCI6XCIwMDAwNDE3NFwiLFwibGRhcE5hbWVcIjpcIm89b2F0ZXN0XCIsXCJsZGFwVWlkXCI6XCJsY3owNDE3NFwiLFwibmlja05hbWVcIjpcIuW7luaJv-W_lyAwMDAwNDE3NC9oZWxjXCIsXCJ1cGRhdGVUaW1lXCI6MTUyMTUxODQyNzgzNH0iLCJpc3MiOiJzb2xhcnRlY2giLCJleHAiOjE1MjI0NjIwNDd9.okUsKABwjmcfAbzKuI50HqZ6tRiOpF5wJpXPG9gv2N8'
			},
			*/
			parameters: {
				documentId:pars._documentId,//--获取文档
//				auditDataSetClsName:'com.gzsolartech.smartforms.api.extprop.HitachiAuditRecordDataSet',
				auditDataSetClsName:'com.gzsolartech.smartforms.extproperty.bpm.HitachiMobileCustomAuditRecordDataSet',
				token:pars._token
			},
			path:'/smartformsAPI/api/bpminstance/getAuditRecordList',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//获取维修工号明细列表
function getWXDetailList(pars){
	WL.Logger.info(pars);
	var input = {
			method:'post',
			returnedContentType:'json',
			parameters:pars._pars,
			path:'/smartformsAPI/bpmportal/helc/getSiebel/wx.action',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//获取维改工号明细列表
function getWGDetailList(pars){
	WL.Logger.info(pars);
	var input = {
			method:'post',
			returnedContentType:'json',
			parameters:pars._pars,
			path:'/smartformsAPI/bpmportal/helc/getSiebel/wg.action',
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}

//获取附件数据
/*
function getAttachmentData(pars){
	WL.Logger.info(pars);
//	pars._documentId = '';
//	pars._token = '';
//	WL.Logger.info(pars.toString());
	var input = {
			method:'get',
			returnedContentType:'plain',
			
//			parameters: {
//				documentId:'docid:43e91502-cc23-42f9-a263-54026f641298',//--获取文档
//				auditDataSetClsName:'',
//				token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDE4LTAzLTMwIiwiaWF0IjoxNTIyMzkwMDQ3LCJzdWIiOiJ7XCJjcmVhdGVUaW1lXCI6MTUyMTE4NTk1NjczOCxcImVtcERlcHRcIjpcImRlcHRpZDo3ODdlMzllZi1hZDlmLTQ2MjQtYTliZi0xNTBkOGRkM2Q1ZmZcIixcImVtcE5hbWVcIjpcImxjejA0MTc0XCIsXCJlbXBOdW1cIjpcImVtcGlkOjM0MzdhOThkLWY3YTktNGE0NS05MWQ1LTBkZDA5MTRiYTMzYVwiLFwiZW1wVHlwZVwiOlwibGRhcFwiLFwiam9iTnVtYmVyXCI6XCIwMDAwNDE3NFwiLFwibGRhcE5hbWVcIjpcIm89b2F0ZXN0XCIsXCJsZGFwVWlkXCI6XCJsY3owNDE3NFwiLFwibmlja05hbWVcIjpcIuW7luaJv-W_lyAwMDAwNDE3NC9oZWxjXCIsXCJ1cGRhdGVUaW1lXCI6MTUyMTUxODQyNzgzNH0iLCJpc3MiOiJzb2xhcnRlY2giLCJleHAiOjE1MjI0NjIwNDd9.okUsKABwjmcfAbzKuI50HqZ6tRiOpF5wJpXPG9gv2N8'
//			},
			
			parameters: {
				documentId:pars._documentId,//--获取文档
				auditDataSetClsName:'com.gzsolartech.smartforms.api.extprop.HitachiAuditRecordDataSet',
				token:pars._token
			},
			
			path:pars._url,
			returnedContentEncoding : 'utf-8',
  	};
	
	var result = WL.Server.invokeHttp(input);

	return result;
}
*/