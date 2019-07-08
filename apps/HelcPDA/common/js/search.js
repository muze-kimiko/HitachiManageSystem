
var LeesCircleQueue=function(size)

{

    // ��������  

    var _queue=[];

 

    // ��������

    var _front=0;

          

    // ��β����

    var _rear=0;

        

    // Ԫ�ظ���

    var _length=0;

 

    // ���е��ڴ��С����ʵ�ʿ��ô�СΪ_capacity-1

    var _capacity = size;

 

    // ���Ԫ�� 

    this.Push=function(item)

    {

        var nIndex = GetNextRearIndex();

        _queue[nIndex] = item;

        if (_length < _capacity)

            _length++;

    }

    // �Ƴ�ͷ��Ԫ��

    this.Pop=function()

    {            

        if (_length > 0)

        {

            _length--;

            _front++;

            if (_front == _capacity)

                _front = 0;

        }

        if (_length == 0)

        {

            _front = _rear = 0;

        }

    }

    // ��ȡȫ������

    this.GetAllItem=function()

    {

        var tmp = [];

        for (var i = 0; i < _length; i++)

        {

            tmp[i] = _queue[(_front + i) % _capacity];

        }

        return tmp;                

    }

    // ��ȡ��һ������

    function GetNextRearIndex()

    {

        if (_length == _capacity)//full

        {

            _rear = (_rear + 1) % _capacity;

            _front = (_rear + 1) % _capacity;

        }

        else

        {

            if (_length > 0)

                _rear = (_rear + 1) % _capacity;

            else

            {

                _front = _rear = 0;

            }

        }

        return _rear;

    }

};

function initSearch(ctlId) {

    var queue = new LeesCircleQueue(5);
    var pageName = location.pathname.substr(location.pathname.lastIndexOf("/") + 1).split('.')[0];
    var keyName = pageName + "_" + ctlId;
    var str = localStorage.getItem(keyName);

    if (str != null && str != "") {

        //try {
        var list = JSON.parse(str);

        var htmlNewOption = "";

        for (i = 0; i < list.length; i++) {
            htmlNewOption += '<option value="' + list[i] + '">';
        }

        var eleList = document.getElementById(ctlId + "list");
        var ctl = document.getElementById(ctlId);
        if (typeof (eleList) == "undefined" || eleList == null) {
            var datalist = document.createElement('datalist');
            datalist.id = ctlId + "list";
            ctl.parentElement.appendChild(datalist);
            eleList = document.getElementById(ctlId + "list");
            ctl.setAttribute("list", ctlId + "list");
        }

        eleList.innerHTML = htmlNewOption;
        //}
        //catch (err) {
        //}
    }
}

function addSearch(ctlId) {
    var queue = new LeesCircleQueue(5);
    var pageName = location.pathname.substr(location.pathname.lastIndexOf("/") + 1).split('.')[0];
    var keyName = pageName + "_" + ctlId;
    var data = localStorage.getItem(keyName);

    if (data != null && data != "") {
        var oldlist = JSON.parse(data);
        for (var i = 0; i < oldlist.length; i++) {
            queue.Push(oldlist[i]);
        }
    }

    var eleList = document.getElementById(ctlId + "list");
    var ctl = document.getElementById(ctlId);
    if (typeof (eleList) == "undefined" || eleList == null) {
        var datalist = document.createElement('datalist');
        datalist.id = ctlId + "list";
        ctl.parentElement.appendChild(datalist);
        eleList = document.getElementById(ctlId + "list");
        ctl.setAttribute("list", ctlId + "list");
    }

    var templist = queue.GetAllItem();
    if(!isExist(templist,ctl.value)){
    	queue.Push(ctl.value);	
    }
    
    var list = queue.GetAllItem();

    var htmlNewOption = "";

    for (i = 0; i < list.length; i++) {
        htmlNewOption += '<option value="' + list[i] + '">';
    }

    eleList.innerHTML = htmlNewOption;

    localStorage.setItem(keyName, JSON.stringify(list));
}
function isExist(arr,value){
	if(arr==null || !value){
		return false;
	}
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == value) {
			return true;
		}
	}
}
function initElevator(ctlId) {

    var queue = new LeesCircleQueue(5);
    var pageName = location.pathname.substr(location.pathname.lastIndexOf("/") + 1).split('.')[0];
    var keyName = pageName + "_" + ctlId;
    var dayName = pageName + "_" + ctlId+"_day";
    
    var strDay = localStorage.getItem(dayName);
    var myDate = new Date();

    if (strDay != null && strDay != "" && strDay==myDate.toLocaleDateString()) {

        //try {
    	var str = localStorage.getItem(keyName);
    	
        var list = JSON.parse(str);

        var htmlNewOption = "";

        for (i = 0; i < list.length; i++) {
            htmlNewOption += '<option value="' + list[i] + '">';
        }

        var eleList = document.getElementById(ctlId + "list");
        var ctl = document.getElementById(ctlId);
        if (typeof (eleList) == "undefined" || eleList == null) {
            var datalist = document.createElement('datalist');
            datalist.id = ctlId + "list";
            ctl.parentElement.appendChild(datalist);
            eleList = document.getElementById(ctlId + "list");
            ctl.setAttribute("list", ctlId + "list");
        }

        eleList.innerHTML = htmlNewOption;
        

        //}
        //catch (err) {
        //}
    }
    else
	{
   	    var jsonString = '{}';
        GetAPIData("/api/category/GetModelNoList", jsonString, function(data){
        	if(typeof data!='undefined' && data)
        	{
        		var objResult = eval("(" + data.Data + ")");
        		
        		var list=new Array();
        		for(var i=0;i<objResult.length;i++)
        		{
        			list[i]=objResult[i].FullName;
        		}
        		
                var htmlNewOption = "";

                for (i = 0; i < list.length; i++) {
                    htmlNewOption += '<option value="' + list[i] + '">';
                }

                var eleList = document.getElementById(ctlId + "list");
                var ctl = document.getElementById(ctlId);
                if (typeof (eleList) == "undefined" || eleList == null) {
                    var datalist = document.createElement('datalist');
                    datalist.id = ctlId + "list";
                    ctl.parentElement.appendChild(datalist);
                    eleList = document.getElementById(ctlId + "list");
                    ctl.setAttribute("list", ctlId + "list");
                }

                eleList.innerHTML = htmlNewOption;
                
                localStorage.setItem(keyName, JSON.stringify(list));
                localStorage.setItem(dayName, myDate.toLocaleDateString());
        	}
        }, err, null, null,true,false,null,'正在加载,请稍侯...');
	}
}

function onModelNoListSuccess(data,ctlId)
{

}