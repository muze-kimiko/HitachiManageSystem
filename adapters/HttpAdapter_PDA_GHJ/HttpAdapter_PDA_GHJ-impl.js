/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

//正式
var path='eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1&UserName=PDA&Password=PDAPDA';
//测试
//var path='eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1';
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

//更换件查询
function getReplaceListQuery(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	  /*'<UsernameToken xmlns="http://siebel.com/webservices">PDA</UsernameToken>'+
	  '<PasswordText xmlns="http://siebel.com/webservices">PDA</PasswordText>'+*/
	  '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	    '<ReplaceListQuery_Input xmlns="http://siebel.com/Sales/ReplaceList">'+
	      '<SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	      '<ViewMode>'+param.ViewMode+'</ViewMode>'+
	    '</ReplaceListQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("更换件查询:"+request.toString());
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/ReplaceList:ReplaceListQuery"'},
			//path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			path:path,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

//更换件详细信息
function getReplaceDetQuery(param){
	/*虽然都可以用但我还是用新的吧   var request='<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
				  '<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
				  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
				  '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
				  '<soap:Body>'+
				    '<ReplaceDetQuery_Input xmlns="http://siebel.com/Service/ReplaceDetail">'+
				      '<ListOfHelReplaceDetail xmlns="http://www.siebel.com/xml/HEL%20Replace%20Detail">'+
				        '<ListOfHelReplace>'+
				          '<HelReplace Operation="">'+
				            '<Id>'+param.Id+'</Id>'+
				          '</HelReplace>'+
				        '</ListOfHelReplace>'+
				      '</ListOfHelReplaceDetail>'+
				    '</ReplaceDetQuery_Input>'+
				  '</soap:Body>'+
				'</soap:Envelope>';*/
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	  '<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	  '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	    '<ReplaceDetQuery_Input xmlns="http://siebel.com/Service/ReplaceDetail">'+
	      '<ListOfHelReplaceDetail xmlns="http://www.siebel.com/xml/HEL%20Replace%20Detail">'+
	        '<ListOfHelReplace>'+
	          '<HelReplace Operation="">'+
	          '<Id>'+param.Id+'</Id>'+
	          '</HelReplace>'+
	        '</ListOfHelReplace>'+
	      '</ListOfHelReplaceDetail>'+
	    '</ReplaceDetQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	
	WL.Logger.error("更换件详细信息:"+request.toString());
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Service/ReplaceDetail:ReplaceDetQuery"'},
			//path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			path:path,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}


function getQueryPageAssetInf(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	  '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	    '<QueryPageAssetInf_Input xmlns="http://siebel.com/Sales/AssetInfor">'+
	      '<NewQuery>'+param.NewQuery+'</NewQuery>'+
	      '<SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	      '<PageSize>'+param.PageSize+'</PageSize>'+
	      '<SortSpec>Created(DESCENDING)</SortSpec>'+
	      '<ViewMode>Sub-Organization</ViewMode>'+ /*All*/
	      '<StartRowNum>'+param.StartRowNum+'</StartRowNum>'+
	    '</QueryPageAssetInf_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("分页查询工号信息:"+request.toString());
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AssetInfor:QueryPageAssetInf"'},
			//path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			path:path,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}


function getReplaceRegain(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	  '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	    '<ReplaceRegain_Input xmlns="http://siebel.com/Sales/ReplaceList">'+
	      '<ReplaceId>'+param.Id+'</ReplaceId>'+
	      '<ComponentId>'+param.ComponentId+'</ComponentId>'+
	    '</ReplaceRegain_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("收回:"+request.toString());
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/ReplaceList:ReplaceRegain"'},
			//path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			path:path,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

function getReplaceSubmit(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	    '<ReplaceSubmit_Input xmlns="http://siebel.com/Sales/ReplaceList">'+
	      '<ReplaceId>'+param.Id+'</ReplaceId>'+
	      '<ComponentId>'+param.ComponentId+'</ComponentId>'+
	    '</ReplaceSubmit_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("提交"+request.toString());
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/ReplaceList:ReplaceSubmit"'},
			//path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			path:path,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

function getReplaceDetUpdate(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
		'<soap:Body>'+
	    '<ReplaceDetUpdate_Input xmlns="http://siebel.com/Service/ReplaceDetail">'+
	      '<ListOfHelReplaceDetail xmlns="http://www.siebel.com/xml/HEL%20Replace%20Detail">'+
	        '<ListOfHelReplace>'+
	          '<HelReplace Operation="109">'+
	            '<Id>'+param.Id+'</Id>'+  //必须的
	            '<ReplaceBy>'+param.ReplaceBy+'</ReplaceBy>';
	            
				if(param.Type!=null&&param.Type!=''){//1
	            	request+='<Type>'+param.Type+'</Type>';
	            };
	            
	            if(param.RunTime!=null&&param.RunTime!=''){//1
	            	request+='<RunTime>'+param.RunTime+'</RunTime>';
	            };
	            
	            request+='<UsedQuantity>'+param.UsedQuantity+'</UsedQuantity>';
	            request+='<ReplaceDate>'+param.ReplaceDate+'</ReplaceDate>';
				
				if(param.SRNumber!=''){
					request+='<SRNumber>'+param.SRNumber+'</SRNumber>'+
					'<SRId>'+param.SRId+'</SRId>';
				};
				
				if(param.PreventiveReplaceFlg!=null&&param.PreventiveReplaceFlg!=''){
					request+='<PreventiveReplaceFlg>'+param.PreventiveReplaceFlg+'</PreventiveReplaceFlg>';
				};
	            
				if(param.FaultReason!=null&&param.FaultReason!=''){//1
					request+='<FaultReason>'+param.FaultReason+'</FaultReason>';
				};
	            
	            if(param.CostExplanation!=null&&param.CostExplanation!=''){
	            	request+='<CostExplanation>'+param.CostExplanation+'</CostExplanation>';
	            };
	            
	            if(param.ResponsibilityDivision!=null&&param.ResponsibilityDivision!=''){
	            	request+='<ResponsibilityDivision>'+param.ResponsibilityDivision+'</ResponsibilityDivision>';
	            };
	            
	            if(param.ElevatorType!=null&&param.ElevatorType!=''){
	            	request+='<ElevatorType>'+param.ElevatorType+'</ElevatorType>';
	            };
	            
	            //主要是为了下拉列表
	            if(param.Parts!=null&&param.Parts!=''){
	            	request+='<Parts>'+param.Parts+'</Parts>';
	            };

	            //物料编码
	            /*if(param.ComponentName!=null&&param.ComponentName!=''){
	            	request+='<ComponentName>'+param.ComponentName+'</ComponentName>';
	            };*/
	            
	            if(param.Floor!=null&&param.Floor!=''){//1
	            	request+='<Floor>'+param.Floor+'</Floor>';
	            };
	            
	            if(param.HighTemperature!=null&&param.HighTemperature!=''){//1
	            	request+='<HighTemperature>'+param.HighTemperature+'</HighTemperature>';
	            }
	            
	            if(param.Wet!=null&&param.Wet!=''){//1
	            	request+='<Wet>'+param.Wet+'</Wet>';
	            }
	            
	            if(param.Wind!=null&&param.Wind!=''){//1
	            	request+='<Wind>'+param.Wind+'</Wind>';
	            }
	            
	            if(param.HighBasicity!=null&&param.HighBasicity!=''){//1
	            	request+='<HighBasicity>'+param.HighBasicity+'</HighBasicity>';
	            }
	            if(param.AirPollution!=null&&param.AirPollution!=''){//1
	            	request+='<AirPollution>'+param.AirPollution+'</AirPollution>';
	            }
	            if(param.Other!=null&&param.Other!=''){//1
	            	request+='<Other>'+param.Other+'</Other>';
	            }
	            if(param.Normal!=null&&param.Normal!=''){//1
	            	request+='<Normal>'+param.Normal+'</Normal>';
	            }
	            if(param.AssetNumber!=null&&param.AssetNumber!=''){//1
	            	request+='<AssetNumber>'+param.AssetNumber+'</AssetNumber>';
	            }
	            if(param.AssetDomainName!=null&&param.AssetDomainName!=''){//1
	            	request+='<AssetDomainName>'+param.AssetDomainName+'</AssetDomainName>';
	            }
	            if(param.AssetEdificeName!=null&&param.AssetEdificeName!=''){//1
	            	request+='<AssetEdificeName>'+param.AssetEdificeName+'</AssetEdificeName>';
	            }
	            if(param.AssetAddress!=null&&param.AssetAddress!=''){//1
	            	request+='<AssetAddress>'+param.AssetAddress+'</AssetAddress>';
	            }
	            if(param.AgreementNumber!=null&&param.AgreementNumber!=''){//1
	            	request+='<AgreementNumber>'+param.AgreementNumber+'</AgreementNumber>';
	            }
	            if(param.ProductName!=null&&param.ProductName!=''){//1
	            	request+='<ProductName>'+param.ProductName+'</ProductName>';
	            }
	            if(param.ProductPart!=null&&param.ProductPart!=''){//1
	            	request+='<ProductPart>'+param.ProductPart+'</ProductPart>';
	            }
	            if(param.ElevatorMark!=null&&param.ElevatorMark!=''){//1
	            	request+='<ElevatorMark>'+param.ElevatorMark+'</ElevatorMark>';
	            }
	            if(param.AgreementBusinessType!=null&&param.AgreementBusinessType!=''){//1
	            	request+='<AgreementBusinessType>'+param.AgreementBusinessType+'</AgreementBusinessType>';
	            }
	            if(param.TechRegisteredDate!=null&&param.TechRegisteredDate!=''){//1
	            	request+='<TechRegisteredDate>'+param.TechRegisteredDate+'</TechRegisteredDate>';
	            }
	            if(param.HandoverToAccountDate!=null&&param.HandoverToAccountDate!=''){//1
	            	request+='<HandoverToAccountDate>'+param.HandoverToAccountDate+'</HandoverToAccountDate>';
	            }
	            if(param.HandoverToMDate!=null&&param.HandoverToMDate!=''){//1
	            	request+='<HandoverToMDate>'+param.HandoverToMDate+'</HandoverToMDate>';
	            }
	            
	            /*request+='<CompanyOrganization>'+param.CompanyOrganization+'</CompanyOrganization>';*/
	            
	            /*---------<ListOfHELReplace_Organization>
	              <HELReplace_Organization IsPrimaryMVG="108">
	                <Organization>106</Organization>
	                <OrganizationId>107</OrganizationId>
	              </HELReplace_Organization>
	            </ListOfHELReplace_Organization>*/
	           
	            request+='</HelReplace>'+
	        '</ListOfHelReplace>'+
	      '</ListOfHelReplaceDetail>'+
	    '</ReplaceDetUpdate_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	/*var request='<?xml version="1.0" encoding="utf-8"?>
		<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	  <soap:Body>
	    <ReplaceDetUpdate_Input xmlns="http://siebel.com/Service/ReplaceDetail">
	      <ListOfHelReplaceDetail xmlns="http://www.siebel.com/xml/HEL%20Replace%20Detail">
	        <ListOfHelReplace>
	          <HelReplace Operation="109">
	            <Id>1</Id>
	            <Created>2</Created>
	            <CreatedBy>3</CreatedBy>
	            <Updated>4</Updated>
	            <UpdatedBy>5</UpdatedBy>
	            <Searchspec>6</Searchspec>
	            
	            <AgreementHeaderId>8</AgreementHeaderId>
	            <AgreementItemId>9</AgreementItemId>
	            
	            
	            <Applicant>12</Applicant>
	            <ApplicantDate>13</ApplicantDate>
	            <ApprovalQuantity>14</ApprovalQuantity>
	            <AreaId>15</AreaId>
	            
	            
	            <AssetAddressId>18</AssetAddressId>
	            <AssetDomainId>19</AssetDomainId>
	            
	            <AssetEdificeId>21</AssetEdificeId>
	            
	            <AssetId>23</AssetId>
	            
	            <CompQuantity>25</CompQuantity>
	            <CompanyId>26</CompanyId>
	            
	            <CompanyOrganizationId>28</CompanyOrganizationId>
	            <ComponentAliasName>29</ComponentAliasName>
	            <ComponentAreaId>30</ComponentAreaId>
	            <ComponentAreaName>31</ComponentAreaName>
	            <ComponentAssetDomainId>32</ComponentAssetDomainId>
	            <ComponentAssetDomainName>33</ComponentAssetDomainName>
	            <ComponentAssetEdificeId>34</ComponentAssetEdificeId>
	            <ComponentAssetEdificeName>35</ComponentAssetEdificeName>
	            <ComponentAssetId>36</ComponentAssetId>
	            <ComponentAssetNumber>37</ComponentAssetNumber>
	            <ComponentBackupQuantity>38</ComponentBackupQuantity>
	            <ComponentCode>39</ComponentCode>
	            <ComponentComments>40</ComponentComments>
	            <ComponentComp>41</ComponentComp>
	            <ComponentCompDescription>42</ComponentCompDescription>
	            <ComponentCompFoundFlag>43</ComponentCompFoundFlag>
	            <ComponentCompId>44</ComponentCompId>
	            <ComponentCompUnit>45</ComponentCompUnit>
	            <ComponentCompanyOrganization>46</ComponentCompanyOrganization>
	            <ComponentCompanyOrganizationId>47</ComponentCompanyOrganizationId>
	            <ComponentCreated>48</ComponentCreated>
	            <ComponentDataSource>49</ComponentDataSource>
	            <ComponentDispatchedQuantity>50</ComponentDispatchedQuantity>
	            <ComponentEBSContractNumber>51</ComponentEBSContractNumber>
	            <ComponentFoundFlag>52</ComponentFoundFlag>
	            <ComponentGroupId>53</ComponentGroupId>
	            <ComponentGroupName>54</ComponentGroupName>
	            <ComponentId>55</ComponentId>
	            
	            <ComponentOrderNumber>57</ComponentOrderNumber>
	            <ComponentOutboundDate>58</ComponentOutboundDate>
	            <ComponentPrimaryOrganizationId>59</ComponentPrimaryOrganizationId>
	            <ComponentQuantity>60</ComponentQuantity>
	            <ComponentReceiptor>61</ComponentReceiptor>
	            <ComponentReturnFlag>62</ComponentReturnFlag>
	            <ComponentShipmentNumber>63</ComponentShipmentNumber>
	            <ComponentStatus>64</ComponentStatus>
	            <ComponentSubmitedQuantity>65</ComponentSubmitedQuantity>
	            <ComponentUsefulQuantity>66</ComponentUsefulQuantity>
	            
	            <DispatchQuantity>68</DispatchQuantity>
	            
	            
	            
	            
	            <GroupId>73</GroupId>
	            <HELUsePDAFlag>75</HELUsePDAFlag>
	            <HighTemperature>79</HighTemperature>
	            <LastStatus>81</LastStatus>
	            <OutBoundDate>84</OutBoundDate>
	            <PrimaryOrganizationId>87</PrimaryOrganizationId>
	            <ProductId>88</ProductId>
	            <RecordedByFullName>91</RecordedByFullName>
	            <ReserveQuantity>94</ReserveQuantity>
	            
	            
	            <Status>99</Status>
	            <WaitingQuantity>103</WaitingQuantity>
	          </HelReplace>
	        </ListOfHelReplace>
	      </ListOfHelReplaceDetail>
	    </ReplaceDetUpdate_Input>
	  </soap:Body>
	</soap:Envelope>';
*/	
	WL.Logger.error("保存/修改"+request.toString());
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Service/ReplaceDetail:ReplaceDetUpdate"'},
			//path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			path:path,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

function getServRepQueryPage(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	    '<soap:Body>'+
	    '<ServRepQueryPage_Input xmlns="http://siebel.com/Service/ServReq">'+
	      '<NewQuery>'+param.NewQuery+'</NewQuery>'+
	      '<PageSize>'+param.PageSize+'</PageSize>'+
	      '<SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	      '<SortSpec>Start Time(DESCENDING)</SortSpec>'+
	      '<ViewMode>All</ViewMode>'+
	      '<StartRowNum>'+param.StartRowNum+'</StartRowNum>'+
	    '</ServRepQueryPage_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("服务请求："+request.toString());
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Service/ServReq:ServRepQueryPage"'},
			//path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			path:path,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}


