export default Regexp={
	isPhone:function(tel){
		const phone= /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/;
		if (phone.test(tel)){
			return true;
		}else{
			return false;
		}
	},
	isPassword:function(text){
		const password=/^\w{6,16}$/;
		if (password.test(text)){
			return true;
		}else{
			return false;
		}
	}
}