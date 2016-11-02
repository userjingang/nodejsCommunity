$(function(){
	var signer = $.cookie('signer');
	if(signer){
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
	}else{
		$('#goLogin').click(function(){
			location.href = '/login';
		});
	}
	
	$('#goBack').click(function(){
		history.go(-1);
	})
	
	$('input[name="name"').blur(function(){
		var $val = $(this).val();
		if($val.length < 2 || $val.length > 16){
			check(this);
		}else{
			$.post('/checkName',{name: $val},function(data, statusText, xhr){
				check('input[name="name"',data.flag)
			})
		}
	})
	
	$('input[name="passwd"]').blur(function(){
		var $val = $(this).val();
		if($val.length < 6 || $val.length > 16){
			check(this);
		}else{
			check(this, 'success');
		}
	})
	
	$('input[name="passwd2"]').blur(function(){
		//匹配所有密码框
		var pass = $(':password').map(function(){
			return $(this).val();
		})
		
		if(pass[0] == pass[1]){
			check(this, 'success');
		}else{
			check(this);
		}
	})
	
	$('form').submit(function(e){
		e.preventDefault();
		//对form表单的数据进行序列化
		var data = $(this).serialize();
		$.post('/register', data, function(data){
			$('.modal-body p').text(data.msg);
			$('.modal').modal('show');
			if(data.flag == 'success'){
				$('.modal').on('hidden.bs.modal', function(e){
					location.href = '/login'
				})
			}
		})
	})
	
	function check(select, status) {
		status = status=='success' ? 'has-success' : 'has-error';
		$(select).parent().removeClass('has-success has-error').addClass(status);
	}
})