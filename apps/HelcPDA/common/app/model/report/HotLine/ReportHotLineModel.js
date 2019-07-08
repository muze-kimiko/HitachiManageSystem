/*
 * 受信热线 模板  2014-5-29 xcx
 */
Ext.define('HelcPDA.model.report.HotLine.ReportHotLineModel',{
	extend:'Ext.data.Model',
	config:{
		fields : [
		          'sumfault', //受信宗数
		          'sumarrival',//录入到达时间宗数
		          'sumtiring',//困人宗数
		          'COMPANY_NAME',// 受信地址
		          'COMPANY',// 受信地址id
		          'STATION_NAME',// 站名
		          'FAULT_AMOUNT',// 受信宗数所属站
		          'ENTERED_ARRIVAL_AMOUNT',// 录入到达时间宗数
		          'ENTERED_ARRIVAL_RATE',// 录入到达时间比例
		          'PE_ARRIVAL_RATE',// 按时录入到达时间率
		          'ENTERED_FINISHED_AMOUNT',// 录入完工时间宗数
		          'ENTERED_FINISHED_RATE',// 录入完工时间宗数比例
		          'PE_ENTERED_FINISHED_RATE',// 按时录入完工时间率
		          'TIRING_AMOUNT',// 困人宗数
		          'ENTERED_SAVING_AMOUNT',// 录入救人时间宗数
		          'ENTERED_SAVING_RATE',// 录入救人时间宗数比例
		          'PE_ENTERED_SAVING_RATE',// 按时录入救人时间率
		          'sumpearrivalam',// 按时到达宗数                
		          'sumpefinishedam',// 按时录入完工宗数
		          'sumpeenteredsavingam' //按时救人时间宗数
		          ]
	}
});