$(function(){
	var signer = $.cookie('signer');
	if(signer){
		$('#goLogin').hide();
		var header = '<img src="../images/headPic/'+signer+'.jpg" onerror="this.src=\'../images/headPic/default.jpg\'">';
		$('#user').empty().html(header+'&nbsp;'+signer).show();
		$('.dropdown-menu li:first-child').click(function(){
			location.href = '/userInfo';
		})
		$('.dropdown-menu li:last-child').click(function(){
			$.removeCookie('signer');
			$.removeCookie('signerID');
			location.reload();
		})
		
		function checkNumber() {
			var $val = $('textarea').val().length;
			$('textarea').next().text($val+'/140');
		}
		
		var timer;
		$('textarea').focus(function(){
			timer = setInterval(checkNumber, 20);
		}).blur(function(){
			clearInterval(timer);
		})
		
		$('form').submit(function(e){
			e.preventDefault();
			var data = $(this).serialize();
			$.post('/addQuestion',data,function(data){
				$('.modal-body p').text(data.msg);
				$('.modal').modal('show');
				if(data.flag == 'success'){
					$('.modal').on('hidden.bs.modal', function(){
						location.href = '/';
					})
				}
			})
		})		
	}else{
		$('.modal-body p').text("您当前未登录，请登录后再提问");
		$('.modal').modal('show');
		$('.modal').on('hidden.bs.modal', function(e){
			location.href = '/login'
		})
		$('#user').hide();
		$('#goLogin').click(function(){
			location.href = '/login';
		});
		$('form').submit(function(e){
			e.preventDefault();
		})
	}
	$('#goBack').click(function(){
		history.go(-1);
	})
})
