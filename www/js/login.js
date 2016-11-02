
$(function(){
	var signer = $.cookie('signer');
	if(signer){
		$('.modal-body p').text("您已登录，请先退出当前账号");
		$('.modal').modal('show');
		var header = '<img src="../images/headPic/'+signer+'.jpg" onerror="this.src=\'../images/headPic/default.jpg\'">';
		$('#user').empty().html(header+'&nbsp;'+signer).show();
		$('#goLogin').hide();
		$('.dropdown-menu li:first-child').click(function(){
			location.href = '/userInfo';
		})
		$('.dropdown-menu li:last-child').click(function(){
			$.removeCookie('signer');
			$.removeCookie('signerID');
			location.reload();
		})
		$('form').submit(function(e){
			e.preventDefault();
		})
	}else{
		$('#user').hide();
		$('#goLogin').show().html('<i class="glyphicon glyphicon-question-sign"></i>注册').click(function(){
			location.href = '/register'
		})
		$('form').submit(function(e){
			e.preventDefault();
			var data = $(this).serialize();
			$.post('/login', data, function(data){
				if(data.flag == 'success'){
					location.href = '/';
				}else{
					$('.modal-body p').text(data.msg);
					$('.modal').modal('show');
				}
			})
		})
	}
	$('#goBack').click(function(){
		history.go(-1);
	})
})
