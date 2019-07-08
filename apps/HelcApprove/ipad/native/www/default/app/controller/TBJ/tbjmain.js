
/* JavaScript content from app/controller/TBJ/tbjmain.js in folder common */
window.onload = function() {
   toSPLChange();
}
function toSPLChange() {
     //安装期望价达到安装SPL
    var toSPL = $("input[id$='toSPL']").val();
    //服务费需增加
    var feeToAdd = $("input[id$='feeToAdd']");
//    if(toSPL == null || toSPL=="") {
//        $(feeToAdd).val(null);
//        return;
//    }
    //工程SPL价
    var pSPL = $("span[id$='pSPL']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    //工程期望价
    var pPrice = $("span[id$=':pprice']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    //设备期望价
    var dPrice = $("span[id$='dpriceValue']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    
    //服务费需增加=(工程SPL*95%-工程期望价)/设备期望价
    if(toSPL != null && toSPL != "" && Number(pSPL)*(Number(toSPL)/100)-Number(pPrice) >= 0) {
        $("input[id$='toSPL']").val(formatPercent(toSPL,2));
        $(feeToAdd).val(formatPercent((Number(pSPL)*(Number(toSPL)/100)-Number(pPrice))/Number(dPrice) *100,2));
    } else {
         $(feeToAdd).val(null);
    }
}
function feeToAddChange() {
      //安装期望价达到安装SPL
    var toSPL = $("input[id$='toSPL']");
    //服务费需增加
    var feeToAdd = $("input[id$='feeToAdd']").val();
//    if(feeToAdd == null || feeToAdd == "") {
//        $(toSPL).val(null);
//        return;
//    }
    //工程SPL价
    var pSPL = $("span[id$='pSPL']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    //工程期望价
    var pPrice = $("span[id$=':pprice']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    //设备期望价
    var dPrice = $("span[id$='dpriceValue']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    if(feeToAdd != null && feeToAdd !="") {
        $("input[id$='feeToAdd']").val(formatPercent(feeToAdd,2));
        $(toSPL).val(formatPercent(((Number(feeToAdd)/100*Number(dPrice) + Number(pPrice))/Number(pSPL))*100,2));
    } 
//    else {
//        $(toSPL).val(null);
//    }
}

function changeAcceptedFee(element) {
    $(element).addClass("hm-font-red");
    var acceptedFeeInputs = $("input[id$='acceptedFeeInput']");
    var addedFees = $("span[id$='addedFee']");
    var gpoints = $("input[id$='gpointInput']");

    var acceptedFeeSumVal = 0.0;
    for(var i=0; i<acceptedFeeInputs.length; i++) {
        if(checkNumber(acceptedFeeInputs[i].value + "")) {
            if(acceptedFeeInputs[i].value+"" != "") {
                acceptedFeeInputs[i].value = formatPercent(acceptedFeeInputs[i].value+"",2);
                acceptedFeeSumVal += Number(acceptedFeeInputs[i].value);
            }
        } else {
            alert("请将第 "+i+" 个建议点数修改为数字");
            acceptedFeeInputs[i].value=null;
            acceptedFeeInputs[i].focus();
//            return;
        }
    }
    console.log("acceptedFeeSum:"+acceptedFeeSumVal);
    $("span[id$='acceptedFeeSum']").html(formatPercent(acceptedFeeSumVal+"",2)+"%");
    //修改gpoint的值
    for(var j = 0; j<gpoints.length; j++) {
        gpoints[j].value = formatPercent((Number(acceptedFeeInputs[j].value) - Number(addedFees[j].innerHTML))+"",2);
        console.log("gpoints: "+gpoints[j].value);
    }
    changeGpointColor();
}
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function changeGpointColor(){
//    $("input[id$='gpointInput']").addClass("hm-font-red");
    
    var gpoints=$("input[id$='gpointInput']"); //TBJ批复
    var acceptedFeeInputs = $("input[id$='acceptedFeeInput']"); //服务费批复总点数
    var dprice=$("span[id$='dpriceValue']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    var dspl=$("span[id$='dSPLValue']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    var adspriceSum = 0.0;
    for(var i=0; i<gpoints.length; i++) {
        if(checkNumber(gpoints[i].value + "")) {
            if(gpoints[i].value+"" != "") {
                gpoints[i].value = formatPercent(gpoints[i].value+"",2);
                adspriceSum += Number(gpoints[i].value);
            }
        } else {
            alert("请将第 "+i+" 个建议点数修改为数字");
            gpoints[i].value=null;
            gpoints[i].focus();
//            return;
        }
    }
    var result1 = gpointChange(acceptedFeeInputs,dprice,dspl);
    $("span[id$='adsprice_txt']").text(formatPercent(adspriceSum+"",2)+"%"); //建议服务费合计保留2位小数
    $("span[id$='d_rate2_txt']").text(formatPercent(result1[1]+"",2)+"%");
    
    var itemPrices = $("span[id$='itemSPL_txt']");
    var paramItemPrices = new Array();
    for(var i=0 ; i<itemPrices.length; i++){
        paramItemPrices[i]=itemPrices[i].innerHTML.replace("￥ ","").replace(new RegExp(",","gm"),"");
    }
    
    var itemSPLs = $("span[id$='itemPrice_txt']");
    var paramItemSPLs = new Array();
    for(var i=0; i<itemSPLs.length; i++) {
        paramItemSPLs[i] = itemSPLs[i].innerHTML.replace("￥ ","").replace(new RegExp(",","gm"),"");
    }
    var result2 = adspriceChange(result1[0],paramItemPrices,paramItemSPLs);
    var itemArgC2 = $("span[id$='argC2_txt']");
    for(var i=0; i<result2.length; i++) {
        itemArgC2[i].innerHTML = formatPercent(Number(result2[i])*100+"",2)+"%";
    }
}
function changeAdpriceColor() {
    var dspl=$("span[id$='dSPLValue']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    var adprice = $("input[id$='adprice_txt']").get(0);
    var arate_field = $("input[id$='arate_txt']").get(0);
    if(adprice.value == null || adprice.value == "") {
        $(adprice).val(null);
        $(arate_field).val(null);
        return;
    }
    if(checkNumber(adprice.value+"")){
        adprice.value = formatPercent(adprice.value+"",1);
    } else {
        alert("请将 建议营业设备期望价 改为数字");
        $(adprice).val(null);
        $(arate_field).val(null);
        adprice.focus();
        
        return;
    }
    var arate = adprice.value/dspl - 1;
    arate_field.value = formatPercent(arate*100+"",2);
    
}
function changeArateColor() {
     var dspl=$("span[id$='dSPLValue']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
     var arate = $("input[id$='arate_txt']").get(0);
     var adprice_field = $("input[id$='adprice_txt']").get(0);
     if(arate.value == null || arate.value == "") {
         $(arate).val(null);
         $(adprice_field).val(null);
         return;
     }
     if(checkNumber(arate.value)) {
         var temp = formatPercent(arate.value/100+"",4);
     } else {
         alert("请将 建议设备价浮率 改为数字");
         $(arate).value=null;
         $(adprice_field).value=null;
         arate.focus();
         return;
     }
     
    var adprice = dspl*(1+Number(temp));
    arate.value = formatPercent(temp*100+"",2);
    adprice_field.value = formatPercent(adprice,2);
}
function changeAdtpriceColor() {
     var spl=$("span[id$='tSPL']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
    var adtprice = $("input[id$='atprice_txt']").get(0);
    var adtrate_field = $("input[id$='atrate']").get(0);
    if(adtprice.value == null || adtprice.value == "") {
        $(adtprice).val(null);
        $(adtrate_field).val(null);
        return;
    }
    if(spl == null || spl == "" || spl == 0) {
        adtrate_field.value=formatPercent("0",2);
        return;
    }
    
    if(checkNumber(adtprice.value+"")){
        adtprice.value = formatPercent(adtprice.value+"",1);
    } else {
        alert("请将 建议运输期望价 改为数字");
        $(adtprice).val(null);
        $(adtrate_field).val(null);
        adtprice.focus();
        
        return;
    }
    var adtrate = adtprice.value/spl - 1;
    adtrate_field.value = formatPercent(adtrate*100+"",2);
}

function changeAdtRateColor() {
      var spl=$("span[id$='tSPL']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");
     var adtrate = $("input[id$='atrate']").get(0);
     var adtprice_field = $("input[id$='atprice_txt']").get(0);
     if(adtrate.value == null || adtrate.value == "") {
         $(adtrate).val(null);
         $(adtprice_field).val(null);
         return;
     }
      if(spl == null || spl == "" || spl == 0) {
        adtprice_field.value=formatPercent("0",2);
        return;
    }
    
     if(checkNumber(adtrate.value)) {
         var temp = formatPercent(adtrate.value/100+"",4);
     } else {
         alert("请将 建议运输浮率 改为数字");
         $(adtrate).val(null);
         $(adtprice_field).val(null);
         adtrate.focus();
         return;
     }
     
     var adtprice = spl*(1+Number(temp));
     adtrate.value = formatPercent(temp*100+"",2);
     adtprice_field.value = formatPercent(adtprice,2);
}
/**
 *服务费批复总点数改变时候计算服务费批复总点数合计 和 设备平均浮率（含建议费）
 * @param acceptedFeeInputs: 服务费批复总点数数组
 * @param dprice: 设备期望价
 * @param dSPL: 设备SPL价
 * @return result 数组[服务费批复总点数合计,设备平均浮率（含建议费）]
 */
function gpointChange(acceptedFeeInputs,dprice,dSPL) {
    var result = new Array();
    var len = acceptedFeeInputs.length;
    var acceptedFeeSum = 0;
    for(var i=0; i < len; i++) {
        acceptedFeeSum += Number(acceptedFeeInputs[i].value);
    }
    result[0] = acceptedFeeSum;
    var drate2 = (Number(dprice)*(1-acceptedFeeSum/100)/Number(dSPL)) - 1;
    console.log(dprice+"*(1-"+acceptedFeeSum/100+")/"+dSPL+"-1");
    result[1] = drate2*100;
    return result;
}
/**
 * 服务费批复总点数合计改变的时候计算设备平均浮率(扣建议)
 * @param changeTo: 服务费批复总点数合计改变后的值
 * @param itemPrices:梯种浮率中的营业期望价数组
 * @param itemSPLs:梯种浮率中的设备SPL价数组
 * @return 梯种浮率中的设备平均浮率(扣建议)数组
 */
function adspriceChange(changeTo,itemPrices, itemSPLs) {
    var result = new Array();
    for(var i=0; i<itemPrices.length; i++) {
        result[i] = itemSPLs[i]*(1-changeTo/100)/itemPrices[i]-1;
    }
    return result;
}

/**
 *建议营业设备期望价变化后自动计算建议设备价浮率
 *@param changeTo: 用户当前输入的建议营业设备期望价
 *@return 建议设备价浮率
 */

function adpriceChange(changeTo) {
    
}
/**
 *建议设备价浮率变化后自动计算建议营业设备期望价
 *@param changeTo:用户当前输入的建议设备价浮率
 *@return 建议营业设备期望价
 */
function arateChange(changeTo) {
    
}

//校验建议比例是否为数字
function validatePricepro(element) {
    value = $(element).val();
    if(!checkNumber(value+"")) {
        $(element).val(null);
        $(element).focus();
        alert("请确认填写的 建议比例 为数字！");
    }
    
}
/*===审批逻辑===*/

//校验建议服务点数
function validateGpoints(){
    var gpoints=$("input[id$='gpointInput']");
    for(var i=0; i<gpoints.length; i++) {
        var value = gpoints[i].value;
        if(value == null || value=="") {
            gpoints[i].focus();
            return true;
        }
    }
    return  false; 
}


//审批同意操作时的数据检验
function passVaildateAndSubmit(){
    var allAvalible = true;
    var errorMessage = "";
    //建议服务点数不能为空
    if(allAvalible && validateGpoints()) {
        allAvalible = false
        errorMessage="“服务建议点数”不能为空！";
    }
    
    //建议设备价，建议设备浮率，建议运输期望价，建议运输浮率，付款比例都不能有值
    var adprice=$("input[id$='adprice_txt']").val().trim();//建议设备价
    var adpoint=$("input[id$='arate_txt']").val().trim();//建议设备浮率
    var atprice=$("input[id$='atprice_txt']").val().trim();//建议运输期望价
    var atpoint=$("input[id$='atrate']").val().trim();//建议运输浮率
    var pricepro=$("input[id$='pricepro_txt']");//建议付款比例
    if(allAvalible) {
        if(adprice != null && adprice!="") allAvalible =false;
        if(adpoint != null && adpoint!="") allAvalible =false;
        if(atprice != null && atprice!="") allAvalible =false;
        if(atpoint != null && atpoint!="") allAvalible =false;
        //检查建议付款比例是否被填写，同意申请时不应该填写建议付款比例
        for(var i=0; i<pricepro.length; i++) {
            var value = pricepro[i].value.trim();
            if(value != null && value!="") {
                allAvalible = false;
                break;
            }
        }
        if ( !allAvalible ) errorMessage="“同意申请时，不应填写建议设备/运费的价格及浮率、建议付款比例！”";   
    }
    
    if(allAvalible) {
        comfirmDialog.show();
    }
    else {
        alert(errorMessage);
        return false;
    }
}

//审批拒绝操作时的数据检验
function refuseVaildateAndSubmit(){
    var allAvalible = true;
    var errorMessage = "";
    //建议服务点数不能为空
    if(allAvalible && validateGpoints()) {
        allAvalible = false
        errorMessage="“服务建议点数”不能为空！";
    }
     
    //建议设备价，建议设备浮率，建议运输期望价，建议运输浮率、付款比例或审批意见必须有一个有值
    var dpriceValue = $("span[id$='dpriceValue']").text().replace("￥ ","").replace(new RegExp(",","gm"),"");//设备期望价
    var tpriceValue = $("span[id$='tprice']");
    tpriceValue = tpriceValue[0].innerHTML.replace("￥ ","").replace(new RegExp(",","gm"),"");//运输期望价
    var adprice=$("input[id$='adprice_txt']").val().trim();//建议设备价
    var adpoint=$("input[id$='arate_txt']").val().trim();//建议设备浮率
    var atprice=$("input[id$='atprice_txt']").val().trim();//建议运输期望价
    var atpoint=$("input[id$='atrate']").val().trim();//建议运输浮率
    var pricepro=$("input[id$='pricepro_txt']");//建议付款比例
    var tbjnote=$("input[id$='tbjnote']").val().trim();//TBJ审批意见
    var ctypes = $("span[id$='ctype']"); //合同类型
    var proportions = $("span[id$='proportion']"); //付款比例
    var pricepro_txts = $("input[id$='pricepro_txt']");
    
    
    if(allAvalible) {
        var hasValue = false;
        var hasDiff = false;
        if(adprice != null && adprice!="") {
            hasValue =true;
            //建议设备价格和设备价格不同
        }
        if(adpoint != null && adpoint!="") {
            hasValue =true;
        }
        if(atprice != null && atprice!="") {
            hasValue =true;
        }
        if(atpoint != null && atpoint!="") {
            hasValue =true;
        }
        if(tbjnote != null && tbjnote!="") hasValue =true;
        for(var i=0; i<pricepro.length; i++) {
            var value = pricepro[i].value.trim();
            if(value != null && value!="") {
                hasValue = true;
                break;
            }
        }

        allAvalible = hasValue;
        if ( !allAvalible ) errorMessage="“拒绝申请时，必须填写建议设备/运费的价格及浮率、建议付款比例或审批意见！”";   
    }
    
    if(allAvalible) {
        var ctypeSum = {};
        //检查哪些pricepro被填写过，如果填写过就记录下这一行对应的合同类型
        for(var i=0; i<pricepro_txts.length; i++) {
            if(pricepro_txts[i].value != null && pricepro_txts[i].value != "") {
                ctypeSum[ctypes[i].innerHTML] = 0;
            }
        }
        //检查被填过值得合同类型的建议点数总和是否为100
        for(var i=0; i<ctypes.length; i++) {
           if(ctypeSum[ctypes[i].innerHTML] != null) {
               ctypeSum[ctypes[i].innerHTML] += Number(pricepro_txts[i].value);
           }
        }
        errorMessage="“拒绝申请时， "
        var sumAllRight = true;
        //检查已经填值得合同类型总和是否为100
        for(var key in ctypeSum) {
            if(ctypeSum[key] != 100) {
                errorMessage += " "+key+" ";
                sumAllRight =  false;
            }
        }
        if(sumAllRight == false) {
            errorMessage += "建议比例之和不等于100！”";
            allAvalible = false;
        } else {       
            //检查所填的付款比例是否有与原比例不同的。若没有不同的项则提示错误
            var hasDiff = false;
            var allEmpty = true;
            for(var key in ctypeSum) {
                //建议付款比例未被填过
                allEmpty = false;
                break;
            }
            //付款比例有被修改过，则需要满足至少有一项与原比例不同
            if(!allEmpty) {
                  for(var i=0; i<proportions.length; i++) {
                   if(pricepro_txts[i].value != null && pricepro_txts[i].value != "" && Number(pricepro_txts[i].value) != Number(proportions[i].innerHTML)) {
                       hasDiff = true;
                       break;
                   }
                }
            }

            if(!allEmpty && !hasDiff) {
                allAvalible = false;
                errorMessage += "建议付款比例至少有一项和原比例不同！”";
            }
        }
        
    }   
    if(allAvalible) {
        $("button[id$='refuseHideButton']").click();
    }
    else {
         alert(errorMessage);
         return false;
    }
}

//审批保留意见操作时的数据检验
function reserveVaildateAndSubmit(){
    var allAvalible = true;
    //建议服务点数不能为空
    if(allAvalible && validateGpoints()) {
        allAvalible = false
        alert("“服务建议点数”不能为空！");
    }
    if(allAvalible) reserveDialog.show();
}
var currentGDetailId;
function popForGDetail(element) {
 var itemId = $(element).children("span").attr("id");
 //将当前编辑的批复说明的值初始化给dialog编辑器
 var oldValue = $(element).children("span").html();
 $("textarea[id$='gdetailDlgValue']").val(oldValue);
 currentGDetailId = itemId;
 gdetailDlg.show();
 //alert(itemId);
}
function setDlgValueToGdetail() {
    var gdetailDlgValue = $("textarea[id$='gdetailDlgValue']").val();
    var gdetailDivs = $("span[id$='sfeegdetail']");
    var gdetailHiddens = $("input[id$='sfeegdetailHidden']")//form:sfee_table:0:sfeegdetailHidden
    //alert("hello"+gdetailDlgValue+"==="+currentGDetailId+"==="+gdetailDivs[0].innerHTML);
    var detailIdComponents = currentGDetailId.split(":");
    if(currentGDetailId != null) {
        var currentIndex = Number(detailIdComponents[2]);
        //将输入的值赋给div显示以及赋给hidden域传给后台 
        gdetailDivs[currentIndex].innerHTML = gdetailDlgValue;
        gdetailHiddens[currentIndex].value = gdetailDlgValue;
    }
    
}
