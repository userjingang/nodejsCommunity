
$(function(){
	var signer = $.cookie('signer');
	
	if(signer){
		var header = '<img src="images/headPic/'+signer+'.jpg" onerror="this.src=\'images/headPic/default.jpg\'">';
		$('#user').empty().html(header+signer).show();
		$('.dropdown-menu li:first-child').click(function(){
			location.href = '/userInfo';
		})
		$('.dropdown-menu li:last-child').click(function(){
			$.removeCookie('signer');
			$.removeCookie('signerID');
			location.reload();
		})
		$('#ask').click(function(){
			location.href = '/ask';
		})
		
		//	采用事件委托的写法
		$('#list').delegate('.goAnswer', 'click', function(){		
			$.cookie('questionID',$(this).parents('li').attr('id'));
			location.href = '/answer';
		})
		
		$('#list').delegate('.good','click',function(){
			if($(this).find('img').attr('src') == 'images/icons/+0.png'){
				$(this).find('img').attr('src', 'images/icons/+1.png');
				$(this).nextAll('.hehe').find('img').attr('src', 'images/icons/-0.png');
				$(this).next().text( Number($(this).next().text())+1 );
			}
		})
		
		$('#list').delegate('.hehe','click',function(){
			if($(this).find('img').attr('src') == 'images/icons/-0.png'){
				$(this).find('img').attr('src', 'images/icons/-1.png');
				$(this).prevAll('.good').find('img').attr('src','images/icons/+0.png');
				$(this).prev().text( Number($(this).prev().text())-1 );
			}
		})
	}else{
//		$('.dropdown-menu').hide();
		
		$('#user').removeAttr('data-toggle').click(function(){
			location.href = '/login';
		})
		
		$('#ask').click(function(){
			$('.modal-body p').text('登录后方可提问');
			$('.modal').modal('show');
		})
		
		//	采用事件委托的写法
		$('#list').delegate('.goAnswer', 'click', function(){
			$('.modal-body p').text('登录后方可提问');
			$('.modal').modal('show');
		})
	}
	


	
})
