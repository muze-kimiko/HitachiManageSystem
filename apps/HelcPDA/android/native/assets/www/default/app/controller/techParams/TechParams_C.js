
/* JavaScript content from app/controller/techParams/TechParams_C.js in folder common */
Ext.define('HelcPDA.controller.techParams.TechParams_C',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			"button#btn_techParams_Search":{
				tap:'btn_techParams_Search'
			},
			"button#buttonTechParams":{
				tap:'buttonTechParams'
			},
			"button#backToTechParams":{
				tap:'backToTechParams'
			},
			"button#show_WLLC":{
				tap:'show_WLLC'
			},
			"list#TechParamsList":{
				itemtap:'TechParamsList'
			},
		}
	},

	//点击list进入具体楼层
	TechParamsList : function(obj,index,target,record,e,eOpts){
		var obj = this;
		obj.NextView('techParams_Wllc_V','HelcPDA.view.techParams.TechParams_Wllc_V');
		var WL_TPS=WL.JSONStore.get(collectionName);
		var TechParamsStore = obj.getStore("TechParamsStore","HelcPDA.store.techParams.TechParamsStore");
		var ELV_FLOOR_PARAM_ID=TechParamsStore.getAt(index).get('ELV_FLOOR_PARAM_ID'); 
		var query={tcode:'TechParams',tid:ELV_FLOOR_PARAM_ID};
		WL_TPS.find(query).then(function(res){
			var info = res[0].json.stext;
			Ext.getCmp('tpw_ELEVATOR_NUMBER').setValue(info.ELEVATOR_NUMBER);
			Ext.getCmp('tpw_WLLC').setValue(info.WLLC);
			Ext.getCmp('tpw_XSLC').setValue(info.XSLC);
			Ext.getCmp('tpw_CG').setValue(info.CG);
			Ext.getCmp('tpw_JZ').setValue(info.JZ);
			Ext.getCmp('tpw_BNC').setValue(info.BNC);
			Ext.getCmp('tpw_BTC').setValue(info.BTC);
			Ext.getCmp('tpw_MT').setValue(info.MT);
			if(info.CHJZS ==""){
				Ext.getCmp('tpw_CHJZS').setValue(info.CHJZS);
			}else{
				Ext.getCmp('tpw_CHJZS').setValue(info.CHJZS+'mm');
			}
			if(info.MBGD ==""){
				Ext.getCmp('tpw_MBGD').setValue(info.MBGD);
			}else{
				Ext.getCmp('tpw_MBGD').setValue(info.MBGD+'mm');
			}
			Ext.getCmp('tpw_TJLX').setValue(info.TJLX);
			Ext.getCmp('tpw_WZAN').setValue(info.WZAN);
			Ext.getCmp('tpw_CJRZHX').setValue(info.CJRZHX);
			Ext.getCmp('tpw_CJRWZAN').setValue(info.CJRWZAN);
			Ext.getCmp('tpw_TWZCQ').setValue(info.TWZCQ);
			Ext.getCmp('tpw_TWXHD').setValue(info.TWXHD);
			Ext.getCmp('tpw_TWBZZD').setValue(info.TWBZZD);
			Ext.getCmp('tpw_BZDZWZ').setValue(info.BZDZWZ);
			Ext.getCmp('tpw_MTREMARK').setValue(info.MTREMARK);
			Ext.getCmp('tpw_TWCHXMEMO').setValue(info.TWCHXMEMO);
			Ext.getCmp('tpw_TWZCQMEMO').setValue(info.TWZCQMEMO);
		});
	},
	
	//返回到技术附页
	backToTechParams : function(){
		this.showBackView('techParams_Search_V','HelcPDA.view.techParams.TechParams_Search_V');
	},
	
	//进入技术附页
	buttonTechParams : function(){
		this.NextView('techParams_Search_V','HelcPDA.view.techParams.TechParams_Search_V');
		Ext.getCmp('formpanel_FT').setHidden(true);
		Ext.getCmp('formpanel_ZT').setHidden(true);
	},
	
	//搜索工号
	btn_techParams_Search : function(){
		var obj = this;
		var elevator_number = Ext.getCmp('techParams_GH').getValue();
		var content="{'elevator_number':'"+elevator_number+"'}";
		if(elevator_number ==""){
			WL.Toast.show("请输入精确电梯工号");
		}else{
			var getResult=function(res){
				if(!res.item){
					WL.Toast.show("找不到对应数据");
				}else{
					var info= res.item.rows[0];
					if(typeof(info.FTXH) !="undefined"){
						Ext.getCmp('formpanel_FT').setHidden(false);
						Ext.getCmp('formpanel_ZT').setHidden(true);
						Ext.getCmp('tps_ELEVATOR_NUMBER_FT').setValue(info.ELEVATOR_NUMBER);
						Ext.getCmp('tps_FTXH').setValue(info.FTXH);
						Ext.getCmp('tps_GCKD').setValue(info.GCKD);
						Ext.getCmp('tps_JD').setValue(info.JD);
						Ext.getCmp('tps_FTTSGD').setValue(info.FTTSGD);
						Ext.getCmp('tps_SYHJ').setValue(info.SYHJ);
						Ext.getCmp('tps_FTKZFS').setValue(info.FTKZFS);
						Ext.getCmp('tps_FTSPJS').setValue(info.FTSPJS);
						Ext.getCmp('tps_EDSD').setValue(info.EDSD);
						Ext.getCmp('tps_FHFS').setValue(info.FHFS);
						Ext.getCmp('tps_TJLX').setValue(info.TJLX);
						Ext.getCmp('tps_SCLX').setValue(info.SCLX);
						Ext.getCmp('tps_FSDYS').setValue(info.FSDYS);
						Ext.getCmp('tps_QBLX').setValue(info.QBLX);
						Ext.getCmp('tps_JSP').setValue(info.JSP);
						Ext.getCmp('tps_LCBYCQK').setValue(info.LCBYCQK);
						Ext.getCmp('tps_NGBLX').setValue(info.NGBLX);
						Ext.getCmp('tps_NGBHD').setValue(info.NGBHD);
						Ext.getCmp('tps_WGBLX').setValue(info.WGBLX);
						Ext.getCmp('tps_WGBHD').setValue(info.WGBHD);
						Ext.getCmp('tps_FTQTPZ').setValue(info.FTQTPZ);
						Ext.getCmp('tps_ZJZCS').setValue(info.ZJZCS);
						Ext.getCmp('tps_FTDKKD').setValue(info.FTDKKD);
						Ext.getCmp('tps_FTDKCD').setValue(info.FTDKCD);
						Ext.getCmp('tps_FTDKSD').setValue(info.FTDKSD);
						Ext.getCmp('tps_ZJZCJLM1').setValue(info.ZJZCJLM1);
						Ext.getCmp('tps_ZJZCJLM2').setValue(info.ZJZCJLM2);
						Ext.getCmp('tps_ZJZCJLM3').setValue(info.ZJZCJLM3);
						Ext.getCmp('tps_ZJZCJLM4').setValue(info.ZJZCJLM4);
						Ext.getCmp('tps_ZJZCJLM5').setValue(info.ZJZCJLM5);
						Ext.getCmp('tps_ZJZCJLM5SL').setValue(info.ZJZCJLM5SL);
						Ext.getCmp('tps_FHGN').setValue(info.FHGN);
						Ext.getCmp('tps_WGBFPZZSL').setValue(info.WGBFPZZSL);
						Ext.getCmp('tps_WGBFPZZ').setValue(info.WGBFPZZ);
					}else{
						Ext.getCmp('formpanel_ZT').setHidden(false);
						Ext.getCmp('formpanel_FT').setHidden(true);
						Ext.getCmp('tps_ELEVATOR_NUMBER_ZT').setValue(info.ELEVATOR_NUMBER);
						Ext.getCmp('tps_DTXH').setValue(info.DTXH);
						Ext.getCmp('tps_FWFS').setValue(info.FWFS);
						Ext.getCmp('tps_ZZ').setValue(info.ZZ);
						Ext.getCmp('tps_SD').setValue(info.SD);
						Ext.getCmp('tps_KMS').setValue(info.KMS);
						Ext.getCmp('tps_C').setValue(info.C);
						Ext.getCmp('TechParamsList').setHeight(0);
						Ext.getCmp('tps_DZFZ').setValue(info.DZFZ);
						Ext.getCmp('tps_DCGD').setValue(info.DCGD);
						Ext.getCmp('tps_DKSD').setValue(info.DKSD);
						Ext.getCmp('tps_DTTSGD').setValue(info.DTTSGD);
						Ext.getCmp('tps_JDZG').setValue(info.JDZG);
						Ext.getCmp('tps_JNKD').setValue(info.JNKD);
						Ext.getCmp('tps_JNSD').setValue(info.JNSD);
						Ext.getCmp('tps_KMKD').setValue(info.KMKD);
						Ext.getCmp('tps_KMGD').setValue(info.KMGD);
						Ext.getCmp('tps_Z').setValue(info.Z);
						Ext.getCmp('tps_M').setValue(info.M);
						Ext.getCmp('tps_LTDCJG').setValue(info.LTDCJG);
						Ext.getCmp('tps_LTDKJS').setValue(info.LTDKJS);
						Ext.getCmp('tps_LTTSGD').setValue(info.LTTSGD);
						Ext.getCmp('tps_LTCS').setValue(info.LTCS);
						Ext.getCmp('tps_LTZS').setValue(info.LTZS);
						Ext.getCmp('tps_LTMS').setValue(info.LTMS);
						Ext.getCmp('tps_LTJDZG').setValue(info.LTJDZG);
						Ext.getCmp('tps_TSJXZSSM').setValue(info.TSJXZSSM);
						Ext.getCmp('tps_JXTH').setValue(info.JXTH);
						Ext.getCmp('tps_THGD').setValue(info.THGD);
						Ext.getCmp('tps_QBCZB').setValue(info.QBCZB);
						Ext.getCmp('tps_MDHL').setValue(info.MDHL);
						Ext.getCmp('tps_CQB').setValue(info.CQB);
						Ext.getCmp('tps_CZB').setValue(info.CZB);
						Ext.getCmp('tps_CHB').setValue(info.CHB);
						Ext.getCmp('tps_CSB').setValue(info.CSB);
						Ext.getCmp('tps_CBFJ').setValue(info.CBFJ);
						Ext.getCmp('tps_CB').setValue(info.CB);
						Ext.getCmp('tps_HB').setValue(info.HB);
						Ext.getCmp('tps_FSLS').setValue(info.FSLS);
						Ext.getCmp('tps_FS').setValue(info.FS);
						Ext.getCmp('tps_JM').setValue(info.JM);
						Ext.getCmp('tps_DB').setValue(info.DB);
						Ext.getCmp('tps_YLDBHD').setValue(info.YLDBHD);
						Ext.getCmp('tps_CZX').setValue(info.CZX);
						Ext.getCmp('tps_FCZX').setValue(info.FCZX);
						Ext.getCmp('tps_CZXAN').setValue(info.CZXAN);
						Ext.getCmp('tps_JNMP').setValue(info.JNMP);
						Ext.getCmp('tps_JNZCQ').setValue(info.JNZCQ);
						Ext.getCmp('tps_JNZCQWZ').setValue(info.JNZCQWZ);
						Ext.getCmp('tps_JNZCQ2').setValue(info.JNZCQ2);
						Ext.getCmp('tps_JNZCQ2WZ').setValue(info.JNZCQ2WZ);
						Ext.getCmp('tps_GJAZWZ').setValue(info.GJAZWZ);
						Ext.getCmp('tps_CJRCZX').setValue(info.CJRCZX);
						Ext.getCmp('tps_CJRCZXAN').setValue(info.CJRCZXAN);
						Ext.getCmp('tps_YLZSZL').setValue(info.YLZSZL);
						Ext.getCmp('tps_YLTWICKJK').setValue(info.YLTWICKJK);
						Ext.getCmp('tps_TWDKQKKFZ').setValue(info.TWDKQKKFZ);
						Ext.getCmp('tps_TWICKKKSM').setValue(info.TWICKKKSM);
						Ext.getCmp('tps_TSICKSM').setValue(info.TSICKSM);
						Ext.getCmp('tps_AQMTG').setValue(info.AQMTG);
						Ext.getCmp('tps_TWSM').setValue(info.TWSM);
						Ext.getCmp('tps_GNSM').setValue(info.GNSM);
						Ext.getCmp('tps_ZTQTPZ').setValue(info.ZTQTPZ);
						Ext.getCmp('tps_FI100QGLKZGN').setValue(info.FI100QGLKZGN);
						Ext.getCmp('tps_FI10QGLKZGN').setValue(info.FI10QGLKZGN);
						Ext.getCmp('tps_FI16ZNXQGLKZGN').setValue(info.FI16ZNXQGLKZGN);
						Ext.getCmp('tps_FI320ZNXXXQGLKZGN').setValue(info.FI320ZNXXXQGLKZGN);
						Ext.getCmp('tps_FI340GZNXXXQGLKZGN').setValue(info.FI340GZNXXXQGLKZGN);
						Ext.getCmp('tps_FI600ZNXXXQGLKZGN').setValue(info.FI600ZNXXXQGLKZGN);
						Ext.getCmp('tps_FIAGXXQGLKZGN').setValue(info.FIAGXXQGLKZGN);
						Ext.getCmp('tps_TDZDPC').setValue(info.TDZDPC);
						Ext.getCmp('tps_XFYZY').setValue(info.XFYZY);
						Ext.getCmp('tps_QJB_MEMO').setValue(info.QJB_MEMO);
						Ext.getCmp('tps_MDHL_MEMO').setValue(info.MDHL_MEMO);
						Ext.getCmp('tps_JM_MEMO').setValue(info.JM_MEMO);
						Ext.getCmp('tps_DB_MEMO').setValue(info.DB_MEMO);
						Ext.getCmp('tps_CZX_MEMO').setValue(info.CZX_MEMO);
						Ext.getCmp('tps_CJRCZX_MEMO').setValue(info.CJRCZX_MEMO);
						Ext.getCmp('tps_JNZCQ_MEMO').setValue(info.JNZCQ_MEMO);
						
						var WLLCs = [];
						var TechParamsStore = obj.getStore("TechParamsStore","HelcPDA.store.techParams.TechParamsStore");
						for(var i = 0 ; i < info.C_VALUE.length ; i++){
							var temp={};
							temp.WLLC=info.C_VALUE[i].WLLC;
							temp.ELV_FLOOR_PARAM_ID=info.C_VALUE[i].ELV_FLOOR_PARAM_ID;
							WLLCs[i]=temp;
						};
						TechParamsStore.setData(WLLCs);
						
						//把具体楼层存在本地
						var TPSstext = [];
						var WL_TPS=WL.JSONStore.get(collectionName);
						for(var i = 0 ; i < info.C_VALUE.length ; i++){
							var query1={tcode:'TechParams',tid:info.C_VALUE[i].ELV_FLOOR_PARAM_ID,stext:info.C_VALUE[i]};
							TPSstext[i]=query1;
						};
						
						var query={tcode:'TechParams'};
						WL_TPS.remove(query).then(function(){
							WL_TPS.add(TPSstext).then(function(){
								
							}).fail(function(err){
								Ext.Msg.alert("保存失败");
							});
						}).fail(function(){
							Ext.Msg.alert("删除数据失败");
						});
				}
					
				}
				
			};
			
			obj.connectServer(getResult, 'techparamssearchAction.do?method=toSearch', content);
		}
		
		
	},

	show_WLLC : function(){
		if(Ext.getCmp('show_WLLC')._text == "显示物理楼层"){
			Ext.getCmp('show_WLLC').setText("隐藏物理楼层");
			var C_value = Ext.getCmp('tps_C').getValue();
			Ext.getCmp('TechParamsList').setHeight(C_value*42);
		}else{
			Ext.getCmp('show_WLLC').setText("显示物理楼层");
			Ext.getCmp('TechParamsList').setHeight(0);
		}
	}



});