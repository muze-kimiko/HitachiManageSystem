Ext.define("HelcBPM.controller.install.INSMainCtrl", {
	extend : "HelcBPM.controller.ApplicationController",
	config : {
		control : {
			"button#btn_INSapprove_back":{
				tap:'btn_INSapprove_back'
			},
			"button#btn_INSapprove_refresh":{
				tap:'btn_INSapprove_refresh'
			},
			"button#btn_PdfView_back":{
				tap:'btn_PdfView_back'
			},
			"button#btn_INSapprove_agree":{
				tap:'btn_INSapprove_agree'
			},
			"button#btn_INSapprove_reservations":{
				tap:'btn_INSapprove_reservations'
			},
			"button#btn_INSapprove_reject":{
				tap:'btn_INSapprove_reject'
			},
			"textfield#Wt_pfz" : {
//				blur : 'onWt_pfzChange',
				change : 'onWt_pfzChange',
			},
		}
	},
	
	btn_INSapprove_refresh:function(obj, e, opt){
//		console.log('btn_INSapprove_refresh');
		var _wthtid = Ext.getCmp('h_WthtID').getValue();
		console.log('_wthtid',_wthtid);
		
		var getResult = function(res){
			console.log('btn_INSapprove_refresh',res);
		}
		
		var parameters = {
			adapter	:'HttpAdapter_BPM_AWH',
			procedure : 'refreshAZD',
			isLoading : true,
			_pars		: {
				jsonString:"{WthtID:'"+_wthtid+"'}",
			},
		};
							
		MainCtr.getDataFromServer(getResult,parameters);
	},
	
	onWt_pfzChange: function(Obj, newValue, oldValue, eOpts) {
		var this_func = this;
		if(Ext.getCmp('Main_List').getActiveItem().getId() != 'ctn_approvling')return;
		if(newValue == oldValue)return;
		if(Ext.getCmp("Wt_pfz").getReadOnly())return;
		var _Wt_spz = Ext.getCmp("Wt_spz").getValue();
		var _Wt_pfz = Ext.getCmp("Wt_pfz").getValue();
		var _Wt_spbzje = Ext.getCmp("Wt_spbzje").getValue();
		var _Wt_spje = Ext.getCmp("Wt_spje").getValue();
		var _h_Se = Ext.getCmp("h_Se").getValue();
		var _GchtAmt = Ext.getCmp("GchtAmt").getValue();
		var _stepId = Ext.getCmp('h_stepId').getValue();
		var _FgsSpMax = Number(Ext.getCmp('h_FgsSpMax').getValue());
		var _BzSpMax = Number(Ext.getCmp('h_BzSpMax').getValue());
		var _ZjlSpMax = Number(Ext.getCmp('h_ZjlSpMax').getValue());
		var _FzcSpMax = Number(Ext.getCmp('h_FzcSpMax').getValue());
		var _ZcSpMax = Number(Ext.getCmp('h_ZcSpMax').getValue());
		console.log('_Wt_pfz',_Wt_pfz);
		console.log('_Wt_spz',_Wt_spz);
		if(Ext.String.trim(_Wt_pfz) == ''){
			Ext.getCmp("Wt_pfhtje").setValue("");
			Ext.getCmp("Wt_zjje").setValue("");
			Ext.getCmp("Wt_pfcbl").setValue("");
			//批复预估成本率
			Ext.getCmp("PfYgCbPercent").setValue("");
			return ;
		}else if(isNaN(_Wt_pfz)){
			Ext.Msg.alert("温馨提示", "批复值只能填写数字！");
			Ext.getCmp("Wt_pfhtje").setValue("");
			Ext.getCmp("Wt_zjje").setValue("");
			Ext.getCmp("Wt_pfcbl").setValue("");
			//批复预估成本率
			Ext.getCmp("PfYgCbPercent").setValue("");
			return ;
		}else{
			switch (_stepId){
				case '600':
					if(Number(_Wt_pfz) > Number(_FgsSpMax)){
						Ext.Msg.alert("温馨提示", '“批复值”（'+_Wt_pfz+'） 大于层级最高 “审批值”（'+_FgsSpMax+'），请重新填写！');
						Ext.getCmp("Wt_pfz").setValue("");
						Ext.getCmp("Wt_pfhtje").setValue("");
						Ext.getCmp("Wt_zjje").setValue("");
						Ext.getCmp("Wt_pfcbl").setValue("");
						//批复预估成本率
						Ext.getCmp("PfYgCbPercent").setValue("");
						return ;
					}else{
						this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
					}
					break;
				case '700':
//					if(Number(_Wt_pfz) > Number(_BzSpMax)){
//						Ext.Msg.alert("温馨提示", '“批复值”（'+_Wt_pfz+'） 大于层级最高 “审批值”（'+_BzSpMax+'），请重新填写！');
//						Ext.getCmp("Wt_pfz").setValue("");
//						Ext.getCmp("Wt_pfhtje").setValue("");
//						Ext.getCmp("Wt_zjje").setValue("");
//						Ext.getCmp("Wt_pfcbl").setValue("");
//						return ;
//					}else{
//						this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
//					}
					this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
					break;
				case '800':
//					if(Number(_Wt_pfz) > Number(_ZjlSpMax)){
//						Ext.Msg.alert("温馨提示", '“批复值”（'+_Wt_pfz+'） 大于层级最高 “审批值”（'+_ZjlSpMax+'），请重新填写！');
//						Ext.getCmp("Wt_pfz").setValue("");
//						Ext.getCmp("Wt_pfhtje").setValue("");
//						Ext.getCmp("Wt_zjje").setValue("");
//						Ext.getCmp("Wt_pfcbl").setValue("");
//						return ;
//					}else{
//						this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
//					}
					this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
					break;
				case '900':
//					if(Number(_Wt_pfz) > Number(_FzcSpMax)){
//						Ext.Msg.alert("温馨提示", '“批复值”（'+_Wt_pfz+'） 大于层级最高 “审批值”（'+_FzcSpMax+'），请重新填写！');
//						Ext.getCmp("Wt_pfz").setValue("");
//						Ext.getCmp("Wt_pfhtje").setValue("");
//						Ext.getCmp("Wt_zjje").setValue("");
//						Ext.getCmp("Wt_pfcbl").setValue("");
//						return ;
//					}else{
//						this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
//					}
					this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
					break;
				default:
					this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
		            break;
			}
		}
		
		/*
		if(Number(_Wt_pfz) > Number(_Wt_spz)){
			Ext.Msg.alert("温馨提示", '“批复值”（'+_Wt_pfz+'） 大于 “审批值”（'+_Wt_spz+'），请重新填写！');
			Ext.getCmp("Wt_pfz").setValue("");
			Ext.getCmp("Wt_pfhtje").setValue("");
			Ext.getCmp("Wt_zjje").setValue("");
			Ext.getCmp("Wt_pfcbl").setValue("");
			return ;
			/*
			Ext.Msg.show({
				title: '温馨提示',
				message: '注意：“批复值” 大于 “审批值”！',
				width: 300,
				buttons: [{text:'取消', itemId:'cancel'},{text:'确认', itemId:'ok'}],
				fn: function(buttonId) {
					if(buttonId=='cancel'){ 
						Ext.getCmp("Wt_pfz").setValue("");
						Ext.getCmp("Wt_pfhtje").setValue("");
						Ext.getCmp("Wt_zjje").setValue("");
						Ext.getCmp("Wt_pfcbl").setValue("");
						return ;
					}else{
						this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
					}
				}
			});
			
		}else{
			this_func._pfzChange(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt);
		}
		*/
		
		/*
		//批复合同金额不含税 = 批复值（%）* 审批标准金额
		if(Number(_Wt_pfz)/100*Number(_Wt_spbzje) >= 0) {
	   		var amt_info = "批复值（%）× 审批标准金额 = 批复合同金额不含税<br>"
	   		var _Wt_pfhtjebhs = Number(_Wt_pfz)/100*Number(_Wt_spbzje);
	   		amt_info += Number(_Wt_pfz)+' / 100 × '+ Number(_Wt_spbzje) +'= '+parseFloat(_Wt_pfhtjebhs).toFixed(2)+'<br><br>';
	   		console.log('_Wt_pfhtjebhs',_Wt_pfhtjebhs);
	   		Ext.getCmp("Wt_pfhtje").setValue(parseFloat(_Wt_pfhtjebhs).toFixed(2));
	   		//增减金额 = 批复合同金额不含税 - 审批金额
	   		var _Wt_zjje = parseFloat(_Wt_pfhtjebhs).toFixed(2) - Number(_Wt_spje);
	   		amt_info += "批复合同金额不含税 - 审批金额 = 增减金额<br>";
	   		amt_info += parseFloat(_Wt_pfhtjebhs).toFixed(2)+" － "+Number(_Wt_spje)+" = "+parseFloat(_Wt_zjje).toFixed(2)+"<br><br>";
	   		console.log('_Wt_zjje',_Wt_zjje);
			Ext.getCmp("Wt_zjje").setValue(parseFloat(_Wt_zjje).toFixed(2));
			//批复成本率 = (批复合同金额不含税 * (1+税率)) / 工程合同价额 * 100%
			var _Wt_pfcbl = (Number(_Wt_pfhtjebhs) * (1+Number(_h_Se))) / _GchtAmt * 100
			amt_info += "(批复合同金额不含税 × (1+税率)) / 工程合同价额 × 100% = 批复成本率<br>";
	   		amt_info += "("+parseFloat(_Wt_pfhtjebhs).toFixed(2)+" × (1＋"+Number(_h_Se)+")) / "+_GchtAmt+" × 100 = "+parseFloat(_Wt_pfcbl).toFixed(2);
			console.log('_Wt_pfcbl',_Wt_pfcbl);
			Ext.getCmp("Wt_pfcbl").setValue(parseFloat(_Wt_pfcbl).toFixed(2));
			Ext.Msg.show({
				title:'温馨提示',
				message:amt_info,
				maxWidth:'30em',
				buttons:Ext.MessageBox.OK
			});
	   }else{
			Ext.Msg.show({
				title:'温馨提示',
				message:'批复合同金额不含税 = 批复值（%）× 审批标准金额  (结果不能少于0)<br>请重新输入批复价',
				maxWidth:'30em',
				buttons:Ext.MessageBox.OK
			});
			Ext.getCmp("Wt_pfz").setValue("");
			Ext.getCmp("Wt_pfhtje").setValue("");
			Ext.getCmp("Wt_zjje").setValue("");
			Ext.getCmp("Wt_pfcbl").setValue("");
			return ;
	   }
	   */
	},
	
	_pfzChange : function(_Wt_spz, _Wt_pfz, _Wt_spbzje, _Wt_spje, _h_Se, _GchtAmt){
		//批复合同金额不含税 = 批复值（%）* 审批标准金额
		if(Number(_Wt_pfz)/100*Number(_Wt_spbzje) >= 0) {
	   		var amt_info = "批复值（%）× 审批标准金额 = 批复合同金额不含税<br>"
	   		var _Wt_pfhtjebhs = Number(_Wt_pfz)/100*Number(_Wt_spbzje);
	   		amt_info += Number(_Wt_pfz)+' / 100 × '+ Number(_Wt_spbzje) +'= '+parseFloat(_Wt_pfhtjebhs).toFixed(2)+'<br><br>';
	   		console.log('_Wt_pfhtjebhs',_Wt_pfhtjebhs);
	   		Ext.getCmp("Wt_pfhtje").setValue(parseFloat(_Wt_pfhtjebhs).toFixed(2));
	   		//增减金额 = 批复合同金额不含税 - 审批金额
	   		var _Wt_zjje = parseFloat(_Wt_pfhtjebhs).toFixed(2) - Number(_Wt_spje);
	   		amt_info += "批复合同金额不含税 - 审批金额 = 增减金额<br>";
	   		amt_info += parseFloat(_Wt_pfhtjebhs).toFixed(2)+" － "+Number(_Wt_spje)+" = "+parseFloat(_Wt_zjje).toFixed(2)+"<br><br>";
	   		console.log('_Wt_zjje',_Wt_zjje);
			Ext.getCmp("Wt_zjje").setValue(parseFloat(_Wt_zjje).toFixed(2));
			//批复成本率 = (批复合同金额不含税 * (1+税率)) / 工程合同价额 * 100%
			var _Wt_pfcbl = (Number(_Wt_pfhtjebhs) * (1+Number(_h_Se))) / _GchtAmt * 100
			amt_info += "(批复合同金额不含税 × (1+税率)) / 工程合同价额 × 100% = 批复成本率<br>";
	   		amt_info += "("+parseFloat(_Wt_pfhtjebhs).toFixed(2)+" × (1＋"+Number(_h_Se)+")) / "+_GchtAmt+" × 100 = "+parseFloat(_Wt_pfcbl).toFixed(2);
			console.log('_Wt_pfcbl',_Wt_pfcbl);
			Ext.getCmp("Wt_pfcbl").setValue(parseFloat(_Wt_pfcbl).toFixed(2));
			//批复预估成本率 = 其他成本费率+批复成本率
			var _QtcbPercent = Ext.getCmp("QtcbPercent").getValue();
			_Wt_pfcbl = Ext.getCmp("Wt_pfcbl").getValue();
			var _PfYgCbPercent = Number(_QtcbPercent)+Number(_Wt_pfcbl);
			console.log('_PfYgCbPercent',_PfYgCbPercent);
			Ext.getCmp("PfYgCbPercent").setValue(parseFloat(_PfYgCbPercent).toFixed(2));
			Ext.Msg.show({
				title:'温馨提示',
				message:amt_info,
				maxWidth:'30em',
				buttons:Ext.MessageBox.OK
			});
	   }else{
			Ext.Msg.show({
				title:'温馨提示',
				message:'批复合同金额不含税 = 批复值（%）× 审批标准金额  (结果不能少于0)<br>请重新输入批复价',
				maxWidth:'30em',
				buttons:Ext.MessageBox.OK
			});
			Ext.getCmp("Wt_pfz").setValue("");
			Ext.getCmp("Wt_pfhtje").setValue("");
			Ext.getCmp("Wt_zjje").setValue("");
			Ext.getCmp("Wt_pfcbl").setValue("");
			//批复预估成本率
			Ext.getCmp("PfYgCbPercent").setValue("");
			return ;
	   }
	},
	
	btn_INSapprove_back:function(obj, e, opt){
		viewUtil.goLast();
	},
	
	btn_PdfView_back:function(obj, e, opt){
		viewUtil.goLast();
	},
	
	//同意
	btn_INSapprove_agree:function(obj, e, opt){
		this.Submit('0');
	},
	
	//保留意见
	btn_INSapprove_reservations: function(obj, e, opt){
		this.Submit('1');
	},
	
	//拒绝
	btn_INSapprove_reject: function(obj, e, opt){
		this.Submit('-1');
	},
	
	Submit:function(type){
		var _type = type == '-1'?'-1':'0';
		var _Wt_pfz = Ext.getCmp("Wt_pfz").getValue();
		var _Wt_note = Ext.getCmp("Wt_note").getValue();
		var _ZjAmt = Ext.getCmp("Wt_zjje").getValue();
		var _PfAmtBhs = Ext.getCmp("Wt_pfhtje").getValue();
		var _PfPercent = Ext.getCmp("Wt_pfcbl").getValue();
		var _nextOwners = Ext.getCmp('h_nextOwners').getValue();
		var _nextNodes = Ext.getCmp('h_nextNodes').getValue();
		var _nextOwnerNames = Ext.getCmp('h_nextOwnerNames').getValue();
		var _stepId = Ext.getCmp('h_stepId').getValue();
		var _nextActivityData = h_nextActivityData;
		var _Wt_spz = Ext.getCmp('Wt_spz').getValue();
		var _spznew = Number(Ext.getCmp('h_SpzNew').getValue());
		var _FgsSpMax = Number(Ext.getCmp('h_FgsSpMax').getValue());
		var _BzSpMax = Number(Ext.getCmp('h_BzSpMax').getValue());
		var _ZjlSpMax = Number(Ext.getCmp('h_ZjlSpMax').getValue());
		var _FzcSpMax = Number(Ext.getCmp('h_FzcSpMax').getValue());
		var _ZcSpMax = Number(Ext.getCmp('h_ZcSpMax').getValue());
		var _JumpBpdID = Ext.getCmp('h_JumpBpdID').getValue();
		var _JumpFlag = Ext.getCmp('h_JumpFlag').getValue();
		var _JumpLevel = Number(Ext.getCmp('h_JumpLevel').getValue());
		var _JumpStepID = Number(Ext.getCmp('h_JumpStepID').getValue());
		var _LsApproveLevelPfz = Ext.getCmp('h_LsApproveLevelPfz').getValue();
		var _Pfz = Ext.getCmp('h_Pfz').getValue();
		var _IsEdited = false;
		var Mem = {
			'_ZjAmt':_ZjAmt,
			'_PfAmtBhs':_PfAmtBhs,
			'_PfPercent':_PfPercent,
			'type//按钮送过来：0同意、1保留意见、-1否决':type,
			'_type//定义送过去的参数：0同意&保留意见、-1否决':_type,
			'_spznew':_spznew,
			'_FgsSpMax':_FgsSpMax,
			'_BzSpMax':_BzSpMax,
			'_ZjlSpMax':_ZjlSpMax,
			'_FzcSpMax':_FzcSpMax,
			'_ZcSpMax':_ZcSpMax,
			'_JumpBpdID':_JumpBpdID,
			'_JumpFlag':_JumpFlag,
			'_JumpLevel':_JumpLevel,
			'_JumpStepID':_JumpStepID,
			'_LsApproveLevelPfz':_LsApproveLevelPfz,
			'_IsEdited':_IsEdited,
		};
		console.log('Mem',Mem);
		
		if(_Wt_note == "" || _Wt_note == null || _Wt_note == undefined){
			Ext.Msg.alert("温馨提示", "请输入审批意见！");
			return ;
		}
		
		_Wt_pfz = Ext.String.trim(_Wt_pfz);
		var _confirmText = '';
		
		if(_Wt_pfz !=''){
			_IsEdited = true;
			if(type == '-1'){
				_Wt_note = '【否决，批复值：'+_Wt_pfz+'】'+_Wt_note;
			}
		}
		/*
		//20180603 czq add
		if(type == '-1' && _Wt_pfz !=''){
			//否决时，有批复值则显示在审批意见中
			_Wt_note = '【否决，批复值：'+_Wt_pfz+'】'+_Wt_note;
		}
		*/
		
//		var NoticeText = '<font color="#FF0000" size="3"><b>注意</b></font>：';
		var NoticeText = '注意：';
		//去掉同意结束时，没有填写批复值，将使用审批值作为批复值的逻辑，改为任何情况下180418
//		if(index == _nextActivityData.length-2){//同意结束
		if(type != '-1'){//非否决时
			if(_Wt_pfz == ''){//没有填写批复值
				if(_Pfz != ''){
					_Wt_pfz = _Pfz;
					_confirmText += NoticeText + '没有填写“批复值”，<br>将使用“上一环节批复值（'+_Pfz+'）”作为“批复值”提交！<br><br>';
				}else if(_LsApproveLevelPfz != ''){
					_Wt_pfz = _LsApproveLevelPfz;
					_confirmText += NoticeText + '没有填写“批复值”，<br>将使用“历史最高审批批复值（'+_LsApproveLevelPfz+'）”作为“批复值”提交！<br><br>';
				}else{
					_Wt_pfz = _Wt_spz;
					_confirmText += NoticeText + '没有填写“批复值”，<br>将使用“审批值（'+_Wt_spz+'）”作为“批复值”提交！<br><br>';
				}
			}else if(isNaN(_Wt_pfz)){
//				if (isNaN(_Wt_pfz) || _Wt_pfz == "" || _Wt_pfz == null || _Wt_pfz == undefined) {
//				if (isNaN(_Wt_pfz) || _Wt_pfz == null || _Wt_pfz == undefined) {
					Ext.Msg.alert("温馨提示", "批复值只能填写数字！");
					Ext.getCmp("Wt_pfz").setValue("");
					Ext.getCmp("Wt_pfhtje").setValue("");
					Ext.getCmp("Wt_zjje").setValue("");
					Ext.getCmp("Wt_pfcbl").setValue("");
					return ;
			}
		}
			
//		if(Number(_Wt_pfz) > Number(_Wt_spz))_confirmText += '注意：“批复值”（'+_Wt_pfz+'） 大于 “审批值”（'+_Wt_spz+'）！<br><br>';
		
		if(Number(_stepId) >= 700){
			//700以下的环节意见，不需要加【批复值：xxxx】
			if(type == '-1'){
				//否决时，意见中不显示批复值
//				_Wt_note = '【' + (type == '0'?'同意':(type == '1'?'保留意见':'否决'))+'】'+_Wt_note;
			}else{
				_Wt_note = '【' + (type == '0'?'同意':(type == '1'?'保留意见':'否决'))+'，批复值：'+_Wt_pfz+'】'+_Wt_note;
			}
		}
		
		if(_Wt_note.length > 200){
			Ext.Msg.alert("温馨提示", "审批意见不能超200字！");
			return ;
		}
		console.log('_Wt_note',_Wt_note);
		console.log('_Wt_note.lenght',_Wt_note.length);
		

		
		var index = 0;//下一环节
		var _ApproveLevel = '10';
		
		switch (_stepId){
			case '600':
				if(type == '-1'){//否决时
					if(_JumpBpdID == ''){
						index = _nextActivityData.length-1
					}else{
						for(var i = 0;i < _nextActivityData.length;i++){
							if(_nextActivityData[i].activityName == '否决'){
								index = i;
							}
						}
					}
					_Wt_pfz = '';//600时清空批复值传给ERP
				}else{
					if(_spznew <= _FgsSpMax){
						if(_JumpBpdID == ''){
							index = _nextActivityData.length-2;//符合审批权限，同意结束
						}else{
							for(var i = 0;i < _nextActivityData.length;i++){
								if(_nextActivityData[i].activityName == '结束'){
									index = i;
								}
							}
						}
						_type = '1';
					}else{
						//下一环节，需跳级时
						if(_JumpBpdID != ''){
							for(var i = 0;i < _nextActivityData.length;i++){
								if(_nextActivityData[i].activityBpdId == _JumpBpdID){
									index = i;
								}
							}
							if(_JumpStepID > 700){
								_type = _JumpFlag;
							}
						}
					}
				} 
				break;
			case '700':
				if(type == '-1'){//否决时
					//20180627改为700、800、900时只有否决及有输入批复值时才校验批复值是否大于层级最高审批值
					if(_IsEdited){
						if(Number(_Wt_pfz) > Number(_BzSpMax)){
							Ext.Msg.alert("温馨提示", '“批复值”（'+_Wt_pfz+'） 大于层级最高 “审批值”（'+_BzSpMax+'），请重新填写！');
							Ext.getCmp("Wt_pfz").setValue("");
							Ext.getCmp("Wt_pfhtje").setValue("");
							Ext.getCmp("Wt_zjje").setValue("");
							Ext.getCmp("Wt_pfcbl").setValue("");
							return ;
						}
					}
					index = _nextActivityData.length-1
				}else{
					if(_spznew <= _BzSpMax){
						index = _nextActivityData.length-2;
						_type = '1';
					}
				}
				_ApproveLevel = '20';
				break;
			case '800':
				if(type == '-1'){//否决时
					if(_IsEdited){
						if(Number(_Wt_pfz) > Number(_ZjlSpMax)){
							Ext.Msg.alert("温馨提示", '“批复值”（'+_Wt_pfz+'） 大于层级最高 “审批值”（'+_ZjlSpMax+'），请重新填写！');
							Ext.getCmp("Wt_pfz").setValue("");
							Ext.getCmp("Wt_pfhtje").setValue("");
							Ext.getCmp("Wt_zjje").setValue("");
							Ext.getCmp("Wt_pfcbl").setValue("");
							return ;
						}
					}
					index = _nextActivityData.length-1
				}else{
					if(_spznew <= _ZjlSpMax){
						index = _nextActivityData.length-2;
						_type = '1';
					}
				}
				_ApproveLevel = '30';
				break;
			case '900':
				if(type == '-1'){//否决时
					if(_IsEdited){
						if(Number(_Wt_pfz) > Number(_FzcSpMax)){
							Ext.Msg.alert("温馨提示", '“批复值”（'+_Wt_pfz+'） 大于层级最高 “审批值”（'+_FzcSpMax+'），请重新填写！');
							Ext.getCmp("Wt_pfz").setValue("");
							Ext.getCmp("Wt_pfhtje").setValue("");
							Ext.getCmp("Wt_zjje").setValue("");
							Ext.getCmp("Wt_pfcbl").setValue("");
							return ;
						}
					}
					index = _nextActivityData.length-1
				}else{
					if(_spznew <= _FzcSpMax){
						index = _nextActivityData.length-2;
						_type = '1';
					}
				}
				_ApproveLevel = '40';
				break;
			default:
				if(type == '-1'){//否决时
					index = _nextActivityData.length-1
				}else{
					if(Number(_stepId) == 1100){
						_type = '1';
					}
				}
				if(Number(_stepId) > 900){
					_ApproveLevel = '50';
				}
	            break;
		}
		
		/*旧审批逻辑
		if(type == '-1'){//否决时
			index = _nextActivityData.length-1
		}else{
//			_Wt_spz = 100;
			switch (_stepId){
				case '600':
					if(_spznew <= 110){
						index = _nextActivityData.length-2;//符合审批权限，同意结束
						_type = '1';
					}
					break;
				case '700':
					if(_spznew <= 112){
						index = _nextActivityData.length-2;
						_type = '1';
					}
					break;
				case '800':
					if(_spznew <= 125){
						index = _nextActivityData.length-2;
						_type = '1';
					}
					break;
				case '900':
					if(_spznew <= 130){
						index = _nextActivityData.length-2;
						_type = '1';
					}
					break;
				default:
		            break;
			}
		}
		*/
		
		_nextOwners = _nextActivityData[index].nextIdField;
		_nextOwnerNames = _nextActivityData[index].nextNameField;
		_nextNodes = _nextActivityData[index].activityBpdId;
		var NextNodesInfo = {
			'_stepId':_stepId,
			'_nextOwners':_nextOwners,
			'_nextOwnerNames':_nextOwnerNames,
			'_nextNodes':_nextNodes,
			'_type//定义送过去的参数：0同意&保留意见、-1否决':_type,
		}
		console.log('NextNodesInfo',NextNodesInfo);
		
		Ext.Msg.show({
			title: '温馨提示',
			message: _confirmText += '确认要提交吗？',
			maxWidth:'30em',
//			buttons: [{text:'<font color="#FF0000">否</font>', itemId:'no'},{text:'是', itemId:'yes'}],
			buttons: [{text:'否', itemId:'no'},{text:'是', itemId:'yes'}],
			fn: function(buttonId) {
				if(buttonId == 'yes'){
					var getResult = function(res){
					var resp = res;
					console.log(resp);
					if(resp.code == 200){
						var getResult_1 = function(res){
							var resp = res;
							console.log(resp);
							if(resp.code == 200){
								Ext.toast('提交成功！',2000);
								viewUtil.goLast(); // 回待审批列表界面
								HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List();
								HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List_YB();
								HelcBPM.app.getController('HelcBPM.controller.CommonCtr').Init_List_YWC();
							}else{
								Ext.Msg.alert('温馨提示', '提交出错！('+resp.msg+')');
								return ;
							}
						}
				
						var parameters_1 = {
							adapter			: 'HttpAdapter_BPM_AWH',
							procedure		: 'submitTask',
							isLoading		: true,
							_documentId		: Ext.getCmp('h_docUid').getValue(),
							_appId			: Ext.getCmp('h_appId').getValue(),
							_taskId			: Ext.getCmp('h_taskId').getValue(),
							_nextOwners		: _nextOwners,
							_nextNodes		: _nextNodes,
							_nextOwnerNames	: _nextOwnerNames,
							_isend			: _type,
							_note			: _Wt_note,
							_token			: token
						};
											
						MainCtr.getDataFromServer(getResult_1,parameters_1);
					}else{
						Ext.Msg.alert('温馨提示', '保存出错！('+resp.msg+')');
						return ;
					}
				}
		
				var parameters = {
					adapter	:'HttpAdapter_BPM_AWH',
					procedure : 'updateDocument',
					isLoading : true,
					_docUid   : Ext.getCmp('h_docUid').getValue(),
					_appId    : Ext.getCmp('h_appId').getValue(),
					_Wt_pfz   : _Wt_pfz,
					_ZjAmt 	  : _ZjAmt,
					_PfAmtBhs : _PfAmtBhs,
					_PfPercent: _PfPercent,
					_condi	  : _type,
					_ApproveLevel	:	_ApproveLevel,
					_token    : token
				};
									
				MainCtr.getDataFromServer(getResult,parameters);
				}
			}
		});
	},
});

function hclick(){
	if(document.getElementById('gcrow1').style.display == 'none'){
		document.getElementById('gcrow1').style.display = '';
		document.getElementById('gcrow2').style.display = '';
		document.getElementById('gcrow3').style.display = '';
		document.getElementById('gcrow4').style.display = '';
		document.getElementById('xjrow').cells[0].innerHTML = '<a onclick="hclick()" >&nbsp;－&nbsp;</a>';
	}else{
		document.getElementById('gcrow1').style.display = 'none';
		document.getElementById('gcrow2').style.display = 'none';
		document.getElementById('gcrow3').style.display = 'none';
		document.getElementById('gcrow4').style.display = 'none';
		document.getElementById('xjrow').cells[0].innerHTML = '<a onclick="hclick()" >&nbsp;＋&nbsp;</a>';
	}
}

function attclick(_url){
	viewUtil.goNext('PdfView','HelcBPM.view.PdfView',_url);
	/*
	//获取附件
	var getResult = function(res){
		console.log('getAttachmentData',res);
	}
	
	var parameters = {
		adapter		:'HttpAdapter_BPM_AWH',
		procedure	: 'getAttachmentData',
		isLoading	: true,
		_url	: _url,
	};
	
	MainCtr.getDataFromServer(getResult,parameters);
	//获取附件
	*/
}

function wthclick(){
	if(document.getElementById('wtgcrow1').style.display == 'none'){
		document.getElementById('wtgcrow1').style.display = '';
		document.getElementById('wtgcrow2').style.display = '';
		document.getElementById('wtgcrow3').style.display = '';
		document.getElementById('wtgcrow4').style.display = '';
		document.getElementById('wtxjrow').cells[0].innerHTML = '<a onclick="wthclick()" >&nbsp;－&nbsp;</a>';
	}else{
		document.getElementById('wtgcrow1').style.display = 'none';
		document.getElementById('wtgcrow2').style.display = 'none';
		document.getElementById('wtgcrow3').style.display = 'none';
		document.getElementById('wtgcrow4').style.display = 'none';
		document.getElementById('wtxjrow').cells[0].innerHTML = '<a onclick="wthclick()" >&nbsp;＋&nbsp;</a>';
	}
}

function isTouchDevice(){
    try{
        document.createEvent("TouchEvent");
        return true;
    }catch(e){
        return false;
    }
}

function touchScroll(id){
	
    if(isTouchDevice()){ //if touch events exist...
        var el=document.getElementById(id);
        var scrollStartPos=0;
        var scrollStartPosY=0;
        
        el.style.width = window.screen.width;
       //el.style.height = window.screen.height;

        el.addEventListener("touchstart", function(event) {
            scrollStartPos=this.scrollLeft + event.touches[0].pageX;
            scrollStartPosY=this.scrollTop + event.touches[0].pageY;
            event.preventDefault();
        },false);

        el.addEventListener("touchmove", function(event) {
            this.scrollLeft = scrollStartPos - event.touches[0].pageX;
            this.scrollTop = scrollStartPosY - event.touches[0].pageY;
            event.preventDefault();
        },false);
        
        var jgmx= document.getElementById("jgmx");
    	jgmx.addEventListener("touchstart",function(event){
    		document.getElementById("mxinfo").style.display='block';
            event.preventDefault();
    	},false);
        
    }
}
