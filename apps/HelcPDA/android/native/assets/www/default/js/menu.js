
/* JavaScript content from js/menu.js in folder common */
/**
 * 菜单数据
 */

var Menu = {
		Monitor : [ {
			"name" : "激活调试",
			"value" : "activetest",
			"url" : "ActivateTest.html",
			"imgpath" : "images/home/1/main_2final_06.png"
		}, {
			"name" : "远程监视",
			"value" : "realtime",
			"url" : "search.html",
			"imgpath" : "images/home/1/main_2final_07.png"
		}
		//, {
		//	"name" : "多梯监控",
		//	"value" : "realtimemore",
		//	"url" : "realtimemore.html",
		//	"imgpath" : "images/home/1/main_2final_08.png"
		//}
		, {
			"name" : "实时故障",
			"value" : "faulttransmitters",
			"url" : "FaultTransmitters.html",
			"imgpath" : "images/home/1/main_2final_09.png"
		}, {
			"name" : "遥监异常",
			"value" : "sbxs",
			"url" : "devicetour.html",
			"imgpath" : "images/home/1/main_2final_10.png"
		}, {
			"name" : "运行巡视",
			"value" : "yxxs",
			"url" : "runtour.html",
			"imgpath" : "images/home/1/main_2final_20.png"
		}
//		, {
//			"name" : "扶梯管理",
//			"value" : "ftgl",
//			"url" : "futi.html",
//			"imgpath" : "images/home/1/main_2final_13.png"
//		} 
		, {
			"name" : "故障转发",
			"value" : "gzzf",
			"url" : "FaultForwarding.html",
			"imgpath" : "images/home/1/main_2final_21.png"
		}
		],
		Query : [ {
			"name" : "电话卡查询",
			"value" : "telcard",
			"url" : "telcardinfo.html",
			"imgpath" : "images/home/2/main_2final_01.png"
		}, {
			"name" : "电梯查询",
			"value" : "dtcx",
			"url" : "elevator.html",
			"imgpath" : "images/home/2/main_2final_02.png"
		}, {
			"name" : "故障存档",
			"value" : "gzcd",
			"url" : "faultsearch.html",
			"imgpath" : "images/home/2/main_2final_03.png"
		}, {
			"name" : "故障手册",
			"value" : "gzsc",
			"url" : "retrievalsearch.html",
			"imgpath" : "images/home/2/main_2final_04.png"
		}, {
			"name" : "收藏记录",
			"value" : "scjl",
			"url" : "favorite.html",
			"imgpath" : "images/home/2/main_2final_05.png"
		}
		, {
			"name" : "绑定状态",
			"value" : "bdzt",
			"url" : "BindStatus.html",
			"imgpath" : "images/home/2/main_2final_06.png"
		}
		
		, {
			"name" : "预诊断报警",
			"value" : "yzdbj",
			"url" : "AlarmCollectSearch.html",
			"imgpath" : "images/home/2/main_2final_07.png"
		}
		, {
			"name" : "屏蔽故障",
			"value" : "pbgjcq",
			"url" : "FaultMaskSearch.html",
			"imgpath" : "images/home/2/main_2final_08.png"
		}
		],
		Data : [ {
			"name" : "故障码读取",
			"value" : "gzdq",
			"url" : "faultrwsearch.html?source=FaultRW.html",
			"imgpath" : "images/home/3/main_2final_11.png"
		}, {
			"name" : "地址读取",
			"value" : "dzdx",
			"url" : "faultrwsearch.html?source=DataRW.html",
			"imgpath" : "images/home/3/main_2final_12.png"
		} ],
		Report : [ {
			"name" : "故障统计",
			"value" : "gztj",
			"url" : "FaultReport.html",
			"imgpath" : "images/home/4/main_2final_14.png"
		}, {
			"name" : "业务统计",
			"value" : "dfgz",
			"url" : "StatusReport.html",
			"imgpath" : "images/home/4/main_2final_15.png"
		} ],
		More : {
			"name" : "更多",
			"value" : "more",
			"url" : "#",
			"imgpath" : "images/home/more.png"
		}
	};


/**********扶梯*******************/
/*
var Menu = {
		Monitor : [ {
			"name" : "远程监视",
			"value" : "realtime",
			"url" : "search.html",
			"imgpath" : "images/home/1/main_2final_07.png"
		}
		, {
			"name" : "实时故障",
			"value" : "faulttransmitters",
			"url" : "FaultTransmitters.html",
			"imgpath" : "images/home/1/main_2final_09.png"
		}
		, {
			"name" : "扶梯管理",
			"value" : "ftgl",
			"url" : "futi.html",
			"imgpath" : "images/home/1/main_2final_13.png"
		} 
		
		],
		Query : [  {
			"name" : "电梯查询",
			"value" : "dtcx",
			"url" : "elevator.html",
			"imgpath" : "images/home/2/main_2final_02.png"
		}
		
		],
		Data : [ {
			"name" : "故障码读取",
			"value" : "gzdq",
			"url" : "faultrwsearch.html?source=FaultRW.html",
			"imgpath" : "images/home/3/main_2final_11.png"
		}, {
			"name" : "地址读取",
			"value" : "dzdx",
			"url" : "faultrwsearch.html?source=DataRW.html",
			"imgpath" : "images/home/3/main_2final_12.png"
		} ],
		Report : []
	};
*/