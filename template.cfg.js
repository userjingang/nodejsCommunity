var template = require('art-template');

template.config('cache', false);

/*
 * getTime: 给辅助规则设置个名字
 * callback: 辅助规则的具体实现
 */
template.helper('getTime', function(t){
	var d = new Date(t);
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	var date = d.getDate();
	var hour = d.getHours();
	var minute = d.getMinutes();
	var second = d.getSeconds();
	
	month = month<10 ? '0'+month : month; 
	date = date<10 ? '0'+date : date;
	hour = hour<10 ? '0'+hour : hour;
	minute = minute<10 ? '0'+minute : minute;
	second = second<10 ? '0'+second : second;
	
	return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second	
})
template.helper('getIP', function(ip){
//	IPV4的写法
	if(ip.startsWith('::ffff:')){
		return ip.substr(7);
	}
	
//	IPV6的写法
	if(ip.startsWith('::1')){
		return ip.substr(3);
	}
})
template.helper('getID', function(obj){
	return obj.toString();
})



module.exports = template;
