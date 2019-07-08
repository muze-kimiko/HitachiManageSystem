
var ans=null;
//基本分数
var jbsc=0;
//ky分数
var kysc=0;
var jl=null;
Ext.define('HelcPDA.controller.kytest.kytestcon', {
    extend: 'HelcPDA.controller.ApplicationController',

    config: {
        control: {
//            "button#inspection_syn": {
//                tap: 'inspection_syn'
//            },
            "button#addtest":{
            	tap:'addtest'
            },"button#kytestkhback":{
            	tap:'kytestkhback'
            },
            "button#wxyy":{
            	tap:'publictj'
            },
            "button#tjry":{
            	tap:'publictj'
            },
            "button#wxyd":{
            	tap:'publictj'
            },"button#jtdc":{
            	tap:'publictj'
            },"button#xdmb":{
            	tap:'publictj'
            },"list#cyzlist":{
            	itemtap:'pubiliclist'
            },"list#wxyylist":{
            	itemtap:'pubiliclist'
            },"list#wxydlist":{
            	itemtap:'pubiliclist'
            },"list#jtdclist":{
            	itemtap:'pubiliclist'
            },"list#xdmblist":{
            	itemtap:'pubiliclist'
            },"button#kytestkhtj":{
            	tap:'kytestkhtj'
            },
            "button#kylistback":{
            	tap:'kylistback'
            },"button#searchtest":{
            	tap:'searchtest'
            },"button#kysearchback":{
            	tap:'kysearchback'
            },"button#kysearch_s":{
            	tap:'kysearch_s'
            },"list#kylist":{
            	itemtap:'kylist'
            },"button#gotoky":{
            	tap:'gotoky'
            }
            
        }
    },
    //获取试题
    addtest: function(button, e, eOpts) {
    	var obj=this;
       this.NextView('kytestkh','HelcPDA.view.kytest.kytestkh');
       this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=getTest', null);
    	  
       function getResult(res){
    	   jl="";
          var test=res.test[0];
          var config=res.config[0].kytime;
          ans=test.Answer;
          Ext.getCmp('jbtm').setHtml("1."+test.subject);
          Ext.getCmp('ansa').setLabel("a."+test.AnswerA);
          Ext.getCmp('ansb').setLabel("b."+test.AnswerB);
          Ext.getCmp('ansc').setLabel("c."+test.AnswerC);
          Ext.getCmp('ansd').setLabel("d."+test.AnswerD);
          jl+='"jbtm":"1.'+test.subject+'","ansa":"a.'+test.AnswerA+'","ansb":"b.'+test.AnswerB+'","ansc":"c.'+test.AnswerC+'","ansd":"d.'+test.AnswerD+'","ans":"'+test.Answer+'"';
          obj.starttime(config*60,function(){Ext.Msg.alert('提示','考查超时！请重新填写！');obj.kytestkhback();});
       }
       
       
    },
    kytestkhback: function(button, e, eOpts) {
   	  this.BackView();
   	 clearInterval(Ext.getCmp('ctime1').getValue());
 	var date=new Date();
	var nn=date.getFullYear();
	var ny=date.getMonth()+1;
	var falg="f";
	this.listinit(userid,nn,ny,falg,this);
	var tmpData = Ext.getCmp('cyzlist').getStore( ) ;
    var tmpData1 = Ext.getCmp('wxyylist').getStore( ) ;
    var tmpData2 = Ext.getCmp('wxydlist').getStore( ) ;
    var tmpData3 = Ext.getCmp('jtdclist').getStore( ) ;
    var tmpData4 = Ext.getCmp('xdmblist').getStore( ) ;
     tmpData.setData(null);
     tmpData1.setData(null);
     tmpData2.setData(null);
     tmpData3.setData(null);
     tmpData4.setData(null);

    
	
    },
    //填写答案 
    publictj:function(button,e,eOpts){
      console.log(button.id);
    	var store=null;
    	var length=null;
    	var data={};
     if(button.id=='tjry'){
    	 if(Ext.getCmp('cyz').getValue()==""||Ext.getCmp('cyz').getValue()==null){
    		 Ext.Msg.alert('提示','请先填写内容！');
    		 return;
    	 }
    	store=this.getStore('cyzlistStore','HelcPDA.store.kytest.kylistStore');
    	data.name=Ext.getCmp('cyz').getValue();
    	//cyz.push(data);
    	store.add(data);
    	var length=store.getCount();
		Ext.getCmp('cyzlist').setHeight(length==0?0:(length+1)*35);
    	
      }else if(button.id=='wxyy'){
//    	  if(Ext.getCmp('dtq').getValue()==""||Ext.getCmp('dtq').getValue()==null){
//     		 Ext.Msg.alert('提示','请先填写内容！');
//     		 return;
//     	 }
//    	store=this.getStore('wxyylistStore','HelcPDA.store.kytest.wxyylistStore'); 
//    	data.text=Ext.getCmp('dtq').getValue();
//    	//wxyy.push(data);
//    	store.add(data);
    	  length=Ext.getCmp('wxyyf').items.length;
    	Ext.getCmp('wxyyf').add({
    		xtype : 'textareafield',
    		id : 'wxyy'+(length-2),
    		label :(length-2)+'.',
    		labelWrap : true,
    		labelWidth : '8%',
    		height : 80
    	});  
   
      }else if(button.id=='wxyd'){
//    	  if(Ext.getCmp('dtq').getValue()==""||Ext.getCmp('dtq').getValue()==null){
//      		 Ext.Msg.alert('提示','请先填写内容！');
//      		 return;
//      	 }
//    	  store=this.getStore('wxydlistStore','HelcPDA.store.kytest.wxydlistStore'); 
//      	data.text=Ext.getCmp('dtq').getValue();
//      	//wxyd.push(data);
//      	store.add(data);
      	 length=Ext.getCmp('wxydf').items.length;
   	Ext.getCmp('wxydf').add({
   		xtype : 'textareafield',
   		id : 'wxyd'+(length-2),
   		label :(length-2)+'.',
   		labelWrap : true,
   		labelWidth : '8%',
   		height : 80
   	});
    	  
      }else if(button.id=='jtdc'){
//    	  if(Ext.getCmp('dtq').getValue()==""||Ext.getCmp('dtq').getValue()==null){
//      		 Ext.Msg.alert('提示','请先填写内容！');
//      		 return;
//      	 }
//    	  store=this.getStore('jtdclistStore','HelcPDA.store.kytest.jtdclistStore'); 
//      	data.text=Ext.getCmp('dtq').getValue();
//      	//jtdc.push(data);
//      	store.add(data);	
    	  length=Ext.getCmp('jtdcf').items.length;
    	Ext.getCmp('jtdcf').add({
    		xtype : 'textareafield',
    		id : 'jtdc'+(length-2),
    		label :(length-2)+'.',
    		labelWrap : true,
    		labelWidth : '8%',
    		height : 80
    	});
      }else if(button.id=='xdmb'){
//    	  if(Ext.getCmp('dtq').getValue()==""||Ext.getCmp('dtq').getValue()==null){
//      		 Ext.Msg.alert('提示','请先填写内容！');
//      		 return;
//      	 }
//    	  store=this.getStore('xdmblistStore','HelcPDA.store.kytest.xdmblistStore'); 
//      	data.text=Ext.getCmp('dtq').getValue();
//      	//xdmb.push(data);
//      	store.add(data);
    	  length=Ext.getCmp('xdmbf').items.length;  
    	Ext.getCmp('xdmbf').add({
    		xtype : 'textareafield',
    		id : 'xdmb'+(length-2),
    		label :(length-2)+'.',
    		labelWrap : true,
    		labelWidth : '8%',
    		height : 80
    	});
      }
    
    },
    pubiliclist:function(obj,index,target,record,e,eOpts){
    	if(e.target.id=="2"){
    		var store=null;
    	  if(obj.id=="cyzlist"){
    		 store=Ext.getCmp('cyzlist').getStore();
    	  }else if(obj.id=="wxyylist"){
    		  store=Ext.getCmp('wxyylist').getStore();
    	  }else if(obj.id=="wxydlist"){
    		  store=Ext.getCmp('wxydlist').getStore();   	
    	  }else if(obj.id=="jtdclist"){
    		  store=Ext.getCmp('jtdclist').getStore();
    	  }else if(obj.id=="xdmblist"){
    		  store=Ext.getCmp('xdmblist').getStore();
    	  }
   	   Ext.Msg.confirm('你好','删除信息？',function(btn){
				if (btn == 'yes'){
					store.removeAt(index);
					
				}else{
					return;
				}
			});
    	}
    	
    },
    //计时函数
    starttime:function(min,fn){
    	console.log("ss1");	
       var tmp=null;
       var m=min;
       var s=-1;
       var st=null;
       function counttime(){
    	 
    	  if(s<min){
    		 s++;
             m=Math.floor((min-s)/60);
             tmp=60-s%60;
             if(tmp==60)
            	 tmp=0; 
    		 if(m<10)
    			 m="0"+m;
    		 if(tmp<10)
    			 tmp="0"+tmp;
    		 st=m+":"+tmp;
    		
    		 Ext.getCmp('ctime').setHtml(st);
    		 Ext.getCmp('ctime1').setValue(timer);
    		 console.log(timer);
    	  }else{
    		  clearInterval(timer);
    		  fn();
    	  }
       }
    	var timer=setInterval(function(){counttime()},1000);
    },
    kytestkhtj:function(button,e,eOpts){
    	this.tjstore();
    	this.countjbsc(ans);
    	this.countkysc();   	
    	var objj=this;
    	var data="";
    	var info="";
    	data='{"userid":"'+userid+'","zynr":"'+Ext.getCmp('zynr').getValue()+'","txr":"'+Ext.getCmp('txr').getValue()+'"';
        var tmpData = Ext.getCmp('cyzlist').getStore( ) ;
        var tmpData1 = Ext.getCmp('wxyylist').getStore( ) ;
        var tmpData2 = Ext.getCmp('wxydlist').getStore( ) ;
        var tmpData3 = Ext.getCmp('jtdclist').getStore( ) ;
        var tmpData4 = Ext.getCmp('xdmblist').getStore( ) ;
        var cyzlist=[];
        var wxyylist=[];
        var wxydlist=[];
        var jtdclist=[];
        var xdmblist=[];
    	for(var i=0;i<tmpData.getCount();i++){
    		var obj={};
    		obj.name=tmpData.getAt(i).get('name');
    		cyzlist.push(obj);
    	}
    	for(var i=0;i<tmpData1.getCount();i++){
    		var obj={};
    		obj.text=tmpData1.getAt(i).get('text');
    		wxyylist.push(obj);
    	}
    	for(var i=0;i<tmpData2.getCount();i++){
    		var obj={};
    		obj.text=tmpData2.getAt(i).get('text');
    		wxydlist.push(obj);
    	}
    	for(var i=0;i<tmpData3.getCount();i++){
    		var obj={};
    		obj.text=tmpData3.getAt(i).get('text');
    		jtdclist.push(obj);
    	}
    	for(var i=0;i<tmpData4.getCount();i++){
    		var obj={};
    		obj.text=tmpData4.getAt(i).get('text');
    		xdmblist.push(obj);
    	}
    	data+=',"cyzlist":'+JSON.stringify(cyzlist)+'';
    	data+=',"wxyylist":'+JSON.stringify(wxyylist)+'';
    	data+=',"wxydlist":'+JSON.stringify(wxydlist)+'';
    	data+=',"jtdclist":'+JSON.stringify(jtdclist)+'';	
    	data+=',"xdmblist":'+JSON.stringify(xdmblist)+'';
        data+=','+jl+',"jbsc":"'+jbsc+'","kysc":"'+kysc+'"';
        //后增
        data+=',"health":"'+Ext.getCmp('health').getChecked()+'"';
        for(var i=1;i<=5;i++){
        	data+=',"aqfh'+i+'":"'+Ext.getCmp('aqfh'+i).getChecked()+'"';	
        }
        data+='}';
        
        console.log(data);
        	
    	function getResult(res){
    		console.log(res);
    		if(res.msginfo=="操作成功"){
    			Ext.Msg.alert('操作成功!','你的基本分:'+jbsc+'分,答案:'+ans+',KY分:'+kysc+"分");
    			objj.kytestkhback();
    		}else{
    			Ext.Msg.alert('操作失败!','请重新提交!');
    		}
    	}
    	
    	 this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=addKytest', data);
    	
    	
    },
   //计算基本分
    countjbsc:function(str){
    	jbsc=0;
    	var sc="";
    	if(Ext.getCmp('ansa').getChecked()){
    		sc+="A";
    	}
    	if(Ext.getCmp('ansb').getChecked()){
    		sc+="B";
    	}
    	if(Ext.getCmp('ansc').getChecked()){
    		sc+="C";
    	}
    	if(Ext.getCmp('ansd').getChecked()){
    		sc+="D";
    	}
    	if(str.indexOf(sc)!=-1){
    		jbsc=Math.round(100*(sc.length/str.length));
    		console.log(str,sc,jbsc);
    	}   	
    	jl+=',"yans":"'+sc+'"';
    	},
    	//计算ky分
    	countkysc:function(){
    	 	    kysc=0;
    		    var tmpData1 = Ext.getCmp('wxyylist').getStore( );
    	        var tmpData2 = Ext.getCmp('wxydlist').getStore( );
    	        var tmpData3 = Ext.getCmp('jtdclist').getStore( );
    	        var tmpData4 = Ext.getCmp('xdmblist').getStore( );
    	        var j=0;
    	        var j1=0;
    	        if(Ext.getCmp('zynr').getValue()!=""){
    	        	kysc+=5;
    	        }
    	        for(var i=0;i<tmpData1.getCount();i++){
    	        	if(tmpData1.getAt(i).get('text').length>=7){
    	        		j++;
    	        	}
    	        	if(j>=4){
    	        	    break;
    	        	}
    	        }
    	        kysc+=Math.round(40*(j/4));
    	        console.log("kysc1"+kysc);
    	        if(tmpData2.getCount()!=0){
    	        	kysc+=5;	
    	        }
    	        console.log("kysc2"+kysc);
    	        for(var i=0;i<tmpData3.getCount();i++){
    	        	if(tmpData3.getAt(i).get('text').length>=7){
    	        		j1++;
    	        	}
    	        	if(j1>=4){
    	        	    break;
    	        	}
    	        }
    	        kysc+=Math.round(40*(j1/4));
    	        console.log("kysc3"+kysc);
    	        if(tmpData4.getCount()!=0){
    	        	if(tmpData4.getAt(0).get('text').length>=7)
    	        		kysc+=10;
    	        }
    	       console.log("kysc4"+kysc);
    	        
    	},
    	listinit:function(userid,y,m,flag,obj){
    		    var data={};
    		    data.userid=userid;
    		    data.year=y;
    		    data.month=m;
    		    data.flag=flag;
    		    function getResult(res){
    		    	var store=obj.getStore('kylistStore','HelcPDA.store.kytest.kylistStore');
    		        var ress=res.list;
    		        var ls=[];
    		        var data=null;
    		    	for(var i=0;i<ress.length;i++){
    		    		var ob={};
    		    	    data=eval("("+ress[i].data+")");
    		    		ob.day=ress[i].tjday;
    		    		ob.con=data.zynr;
    		    		ob.jbfs=data.jbsc;
    		    		ob.kyfs=data.kysc;
    		    		ob.data=data;
    		    		ls.push(ob);
    		    		
    		    	}
    		    	store.setData(ls);
    		    }
    		    obj.connectServer(getResult, 'maintainancePlanItemListAction.do?method=getKylist', JSON.stringify(data));
    	},
    	kylistback:function(){
    		this.BackView();
    	},
    	searchtest:function(){
    		this.NextView('kysearch','HelcPDA.view.kytest.kysearch');
    		var date=new Date();
    		var nn=date.getFullYear();
    		var ny=date.getMonth()+1;
    		var nna=[];
    		var nya=[];
    		for(var i=0;i<5;i++){
        		var ob={};
        		ob.text=nn-i;
        		ob.value=nn-i;
        		nna.push(ob);
        	}
    		
    		for(var i=0;i<12;i++){
    		var ob={};
    		ob.text=i+1;
    		ob.value=i+1;
    		nya.push(ob);
    		}
    		Ext.getCmp('kysearch_nf').setOptions(nna);
    		Ext.getCmp('kysearch_yf').setOptions(nya);
    		
    	    
    	},
    	kysearchback:function(){
    		this.BackView();
    	},
    	kysearch_s:function(){
    		var nn=Ext.getCmp('kysearch_nf').getValue();
    		var ny=Ext.getCmp('kysearch_yf').getValue();
    		var userid=Ext.getCmp('kysearch_cyz').getValue();
    		var flag="s";
    		this.listinit(userid,nn,ny,flag,this);
    		this.BackView();
    	},
    	kylist:function(obj,index,target,record,e,eOpts){
    		
    		this.NextView('kytestkh','HelcPDA.view.kytest.kytestkh');
    		Ext.getCmp('khqk').setHidden(false);
    		Ext.getCmp('kytestkhtj').setHidden(true);
    		Ext.getCmp('yans').setHidden(false);
    		Ext.getCmp('rans').setHidden(false);
    		Ext.getCmp('cyz').setReadOnly(true);
    		var test=record.data.data;
    		Ext.getCmp('zynr').setValue(test.zynr);
    		Ext.getCmp('txr').setValue(test.zynr);
    		Ext.getCmp('jbzsdf').setValue(record.data.jbfs);
    		Ext.getCmp('kykhdf').setValue(record.data.kyfs);
    		Ext.getCmp('jbtm').setHtml(test.jbtm);
            Ext.getCmp('ansa').setLabel(test.ansa);
            Ext.getCmp('ansb').setLabel(test.ansb);
            Ext.getCmp('ansc').setLabel(test.ansc);
            Ext.getCmp('ansd').setLabel(test.ansd);
            Ext.getCmp('rans').setValue(test.ans);
            Ext.getCmp('yans').setValue(test.yans);
            var tmpData = Ext.getCmp('cyzlist').getStore( ) ;
            var tmpData1 = Ext.getCmp('wxyylist').getStore( ) ;
            var tmpData2 = Ext.getCmp('wxydlist').getStore( ) ;
            var tmpData3 = Ext.getCmp('jtdclist').getStore( ) ;
            var tmpData4 = Ext.getCmp('xdmblist').getStore( ) ;
            tmpData.setData(test.cyzlist);
            tmpData1.setData(test.wxyylist);
            tmpData2.setData(test.wxydlist);
            tmpData3.setData(test.jtdclist);
            tmpData4.setData(test.xdmblist);
            //待优化
            var da=['zynr','txr','jbzsdf','kykhdf','rans','tjry','wxyy','wxyd','jtdc','xdmb','ansa','ansb','ansc','ansd','wxyyc','wxydc','jtdcc','xdmbc','health','aqfh1','aqfh','aqfh3','aqfh4','aqfh5'];
            for(var i=0;i<5;i++){
            	Ext.getCmp(da[i]).setReadOnly(true);
            }
            for(var i=5;i<10;i++){
            	Ext.getCmp(da[i]).setHidden(true);	
            }
            var sj=document.getElementsByName('2');
            for(var i=0;i<sj.length;i++){
            sj[i].style.display='none';
            }
            for(var i=10;i<14;i++){
            	Ext.getCmp(da[i]).setDisabled(true);
            }
            for(var i=14;i<18;i++){
            	Ext.getCmp(da[i]).setHidden(false);	
            }
            var length=null;
            length=tmpData.getCount();
        	Ext.getCmp('cyzlist').setHeight(length==0?0:(length+1)*35);	
        	length=tmpData1.getCount();
         	Ext.getCmp('wxyylist').setHeight(length==0?0:(length+1)*35);	
         	length=tmpData2.getCount();
         	Ext.getCmp('wxydlist').setHeight(length==0?0:(length+1)*35);	
         	length=tmpData3.getCount();
         	Ext.getCmp('jtdclist').setHeight(length==0?0:(length+1)*35);	
         	length=tmpData4.getCount();
         	Ext.getCmp('xdmblist').setHeight(length==0?0:(length+1)*35);
         	
            for(var i=1;i<=3;i++){
            	Ext.getCmp("wxyy"+i).setHidden(true);	
            }
            for(var i=1;i<=2;i++){
            	Ext.getCmp("wxyd"+i).setHidden(true);	
            }
            for(var i=1;i<=3;i++){
            	Ext.getCmp("jtdc"+i).setHidden(true);	
            }
            for(var i=1;i<=1;i++){
            	Ext.getCmp("xdmb"+i).setHidden(true);	
            }
            for(var i=18;i<24;i++){
            	Ext.getCmp(da[i]).setDisabled(true);
            }
            //后增
            Ext.getCmp('health').setChecked(test.health);
            Ext.getCmp('aqfh1').setChecked(test.aqfh1);
            Ext.getCmp('aqfh2').setChecked(test.aqfh2);	
            Ext.getCmp('aqfh3').setChecked(test.aqfh3);	
            Ext.getCmp('aqfh4').setChecked(test.aqfh4);	
            Ext.getCmp('aqfh5').setChecked(test.aqfh5);	
            if(test.yans.indexOf("A")!=-1){
            	Ext.getCmp('ansa').setChecked(true);
            }
            if(test.yans.indexOf("B")!=-1){
            	Ext.getCmp('ansb').setChecked(true);
            }
            if(test.yans.indexOf("C")!=-1){
            	Ext.getCmp('ansc').setChecked(true);
            } 
            if(test.yans.indexOf("D")!=-1){
            	Ext.getCmp('ansd').setChecked(true);
            }
            

    	},gotoky:function(){
    		var obj=this;
    		obj.NextView('kytestlist','HelcPDA.view.kytest.kytestlist');
			var date=new Date();
    		var nn=date.getFullYear();
    		var ny=date.getMonth()+1;
    		var falg="f";
			obj.listinit(userid,nn,ny,falg,obj);
			var statPanel3=Ext.getCmp('statPanel3');
			if(statPanel3){
				statPanel3.destroy();
			};
			
    	},
    	//封装数据
        tjstore:function(){
             var tmpData1 = Ext.getCmp('wxyylist').getStore( ) ;
             var tmpData2 = Ext.getCmp('wxydlist').getStore( ) ;
             var tmpData3 = Ext.getCmp('jtdclist').getStore( ) ;
             var tmpData4 = Ext.getCmp('xdmblist').getStore( ) ;
             var sj=[];
             var sj1=[];
             var sj2=[];
             var sj3=[];
             var sj4=[];
             var length=null;
             length=Ext.getCmp('wxyyf').items.length;
             for(var i=0;i<(length-3);i++){
            	 var obj={};
            	 obj.text=((i+1)+"."+Ext.getCmp('wxyy'+(i+1)).getValue()); 
            	 sj[i]=obj;
             }
             tmpData1.setData(sj);
             
             length=Ext.getCmp('wxydf').items.length;           
             for(var i=0;i<(length-3);i++){
            	 var obj={};
            	 obj.text=((i+1)+"."+Ext.getCmp('wxyy'+(i+1)).getValue()); 
            	 sj1[i]=obj;
             }
             tmpData2.setData(sj1);
             length=Ext.getCmp('jtdcf').items.length;           
             for(var i=0;i<(length-3);i++){
            	 var obj={};
            	 obj.text=((i+1)+"."+Ext.getCmp('jtdc'+(i+1)).getValue()); 
            	 sj2[i]=obj;
             }
             tmpData3.setData(sj2);
             length=Ext.getCmp('xdmbf').items.length;           
             for(var i=0;i<(length-3);i++){
            	 var obj={};
            	 obj.text=((i+1)+"."+Ext.getCmp('xdmb'+(i+1)).getValue()); 
            	 sj3[i]=obj;
             }
             tmpData4.setData(sj3);
             
        }
    	


});