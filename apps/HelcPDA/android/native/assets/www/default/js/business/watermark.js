
/* JavaScript content from js/business/watermark.js in folder common */
/**
 * 
 */
/** ***********************水印 开始********************************* */
var WatermarkModule = (function() {
	// 获取当前时间
	function getCurentTime() {
		var now = new Date();

		var year = now.getFullYear(); // 年
		var month = now.getMonth() + 1; // 月
		var day = now.getDate(); // 日

		var hh = now.getHours(); // 时
		var mm = now.getMinutes(); // 分
		var ss = now.getSeconds(); // 秒

		var clock = year + "-";

		if (month < 10)
			clock += "0";

		clock += month + "-";

		if (day < 10)
			clock += "0";

		clock += day + " ";

		if (hh < 10)
			clock += "0";

		clock += hh + ":";

		if (mm < 10)
			clock += '0';

		clock += mm + ":";

		if (ss < 10)
			clock += '0';

		clock += ss;

		return (clock);
	}
	function _setWatermark() {
		var canvas = $("#watermark");
		var context = canvas.get(0).getContext("2d");

		canvas.attr("width", $(window).get(0).innerWdith);
		canvas.attr("height", $(window).get(0).innerHeight);

		var time = getCurentTime();
		context.font = "30px serif";
		context.globalAlpha = 0.3;
		var posY = 40;
		for (var i = 0; i < 6; i++, posY += 60) {
			context.strokeText(userid + " " + usernames, 10, posY);
			posY = posY + 40;
			context.strokeText(time, 10, posY);
		}
	}
	return {
		setWatermark : function() {
			_setWatermark();
		}
	};
})();
/** ****************************水印 结束********************************* */