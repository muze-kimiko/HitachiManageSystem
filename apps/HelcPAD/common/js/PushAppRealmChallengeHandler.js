/*
*
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

*/

var pushAppRealmChallengeHandler = WL.Client.createChallengeHandler("PushAppRealm");

pushAppRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || response.responseText === null) {
        return false;
    }
    var indicatorIdx = response.responseText.search('j_security_check');

    if (indicatorIdx >= 0){
		return true;
	}  
	return false;
};

pushAppRealmChallengeHandler.handleChallenge = function(response) {
//	$('#AppBody').hide();
//	$('#AuthBody').show();
//	$('#passwordInputField').val('');
	console.log("pushAppRealmChallengeHandler.handleChallenge,需要输入用户名");
};

pushAppRealmChallengeHandler.submitLoginFormCallback = function(response) {
	console.log("pushAppRealmChallengeHandler.submitLoginFormCallback");
    var isLoginFormResponse = pushAppRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	console.log("isLoginFormResponse is obj");
    	pushAppRealmChallengeHandler.handleChallenge(response);
    } else {
//		$('#AppBody').show();
//		$('#AuthBody').hide();
    	console.log("pushAppRealmChallengeHandler.submitSuccess()");
		pushAppRealmChallengeHandler.submitSuccess();
		//订阅动作
//        doSubscribe();
    }
};
