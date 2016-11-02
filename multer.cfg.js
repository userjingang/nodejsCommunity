
var multer = require('multer');

var storage = multer.diskStorage({
	destination: './www/images/headpic',
	filename: function(req, file, cb){
		var name = req.cookies.signer;
		var fileType = file.originalname;
		var arr = fileType.split('.');
		fileType = arr[arr.length-1];
		cb(null, name+'.'+fileType);
	}
});
var uploads = multer({storage});

module.exports = {uploads};