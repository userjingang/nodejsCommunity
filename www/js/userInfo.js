
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
		$('form').submit(function(e){
			e.preventDefault();			
			var data = new FormData(this);			
			$.post({
				url: '/addHeadPic',
				data: data,
				contentType: false,
				processData: false,
				success: function(data){
					if(data.flag == 'success'){
						location.reload();
					}else{
						
					}
				}
			})
		})		
	}else{
		$('.modal-body p').text("您当前未登录，请登录后再设置");
		$('.modal').modal('show');
		$('.modal').on('hidden.bs.modal', function(e){
			location.href = '/login'
		})
		$('#user').hide();
		$('#goLogin').click(function(){
			location.href = '/login';
		});
	}
	$('#goBack').click(function(){
		history.go(-1);
	})
})

