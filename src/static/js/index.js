function h_box(p){
	var one = '<i class="selected_icon fas fa-shopping-cart"></i> | Car Shopping'
	var two = '<i class="selected_icon fas fa-mug-hot"></i> | Best Coffee'
	var three = '<i class="selected_icon fas fa-address-card"></i> | User Options  <hr><div class="container_options_users" onclick="login_show(3)" id="user_options"><div class=cont_option><p class="name_opt">Log-In</p><i class="opt_user_active fas fa-key"></i></div></div><div class="container_options_users" onclick="Start_Descover(2)" id="user_options"><div class=cont_option><p class="name_opt">Start to descovery!</p><i class="opt_user_active fas fa-user-plus"></i></div></div>'


	var four = '<i class="selected_icon fas fa-envelope-open-text"></i> | Inbox orders <hr>'
	var five = '<i class="selected_icon fas fa-user-cog"></i> | {{p.user}} config <hr>'
	var six = '<i class="selected_icon fas fa-cogs"></i> | Bussines options  <hr>'


	var selected = $('#content_selected').html()
	var selected = $('#content_selected_home').html()

	if (p == 1) {
		$('#content_selected').html(one)
	}

	if (p == 2) {
		$('#content_selected').html(two)
	}

	if (p == 3) {
		$('#content_selected').html(three)
	}

	if (p == 4) {
		$('#content_selected').html(four)
	}

	if (p == 5) {
		$('#content_selected').html(five)
	}

	if (p == 6) {
		$('#content_selected').html(six)
		send_backend('3')
	}

}

function Start_Descover(p){
	if (p == 2) {
		active(2)
	}
}

function login_show(p){
	if (p == 3) {
		active(3)
	}
}

/* La funcion send backen enviara datos de usuario dependiendo del parametro que el usuario elija */
function send_backend(param) {
	if (param == '2') {
		var user = $("#User_name-r").val()
		var mail = $("#Email-r").val()
		var pass = $("#Password-r").val()

		var alterned_data = { 
			"user": user,
		       "mail": mail,
		       "pass": pass
		}

		let options = {
			 method: 'POST',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 body: JSON.stringify(alterned_data)
		}

		let fetchRes = fetch("/addUser", options)
		fetchRes.then(res =>
		    res.json()).then(d => {
		        if (d['s'] == '1') {
		        	alert('Su nombre de usuario esta registrado, sastifactoriamente.')
		        }

		        if (d['s'] == '0') {
		        	alert('Su nombre de usuario esta ocupado, Lo sentimos, Intente con uno nuevo.')
		        }
		 })
	}

	if (param == '1'){
		var user = $("#User_name").val()
		var pass = $("#Password").val()

		var alterned_data = { 
			"user": user,
		       "pass": pass
		}

		let options = {
			 method: 'POST',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 body: JSON.stringify(alterned_data)
		}

		let fetchRes = fetch("/Login", options)
		fetchRes.then(res =>
		    res.json()).then(d => {
		        if (d['s'] == '1') {
		        	window.location.replace("/home");
		        }

		        if (d['s'] == '0') {
		        	alert('Su nombre de usuario o contraseña son incorrectas, Lo sentimos, Intente con uno nuevo.')
		        }
		 })
	}

	if(param == '3'){

		var alterned_data = { 
			"user": 'data'
		}

		let options = {
			 method: 'POST',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 body: JSON.stringify(alterned_data)
		}

		let fetchRes = fetch("/exists", options)
		fetchRes.then(res =>
		    res.json()).then(d => {
		        if (d['d'] == '1') {
		        	alert('que?')
		        }

		        if (d['d'] == '0') {
		        	alert('Uno nuevo.')
		        }
		 })
	}

		if(param == 'e'){

		var alterned_data = { 
			"user": 'exit'
		}

		let options = {
			 method: 'POST',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 body: JSON.stringify(alterned_data)
		}

		let fetchRes = fetch("/logout", options)
		fetchRes.then(res =>
		    res.json()).then(d => {
		        if (d['d'] == '1') {
		        	window.location.replace("/")
		        }

		        if (d['d'] == '0') {
		        	alert('Algo no anda bien')
		        }
		 })
	}

	if(param == '4'){
		var name = $("#name_business").val()
		var description = $("#text_b").val()
		var addres = $("#inputAddress")
		var open = $("#Open")
		var close = $("#Close")





		var alterned_data = { 
			   "name": name,
		       "description": description,
		       "addres": addres,
		       "open": open,
		       "close": close
		}

		let options = {
			 method: 'POST',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 body: JSON.stringify(alterned_data)
		}

		let fetchRes = fetch("/addBusiness", options)
		fetchRes.then(res =>
		    res.json()).then(d => {
		        if (d['d'] == '1') {
		        	window.location.replace("/")
		        }

		        if (d['d'] == '0') {
		        	alert('Algo no anda bien')
		        }
		 })
	}

}


/* Con active configuraremos la activacion de la caja popup dependiendo del parametro que le estemos pasando */
function active(x) {
	var y = ''
	var frm = ''
	$(".G_popup").addClass("Activos_xd")

 	$(".G_popup").css('visibility', 'visible')
 	$(".G_overlay").css('visibility', 'visible')
 	

 	$(".G_popup").css('opacity', '1')
 	$(".G_overlay").css('opacity', '1')

	var content_popup = $('#content_popup').html()

	if (x == 2) {

	    frm = '<br><div class="form_user"><div class="form-group"><label for="User_name">- <i class="fas fa-user"></i> - User Name</label><br><input type="text" class="Inputs_cant" id="User_name-r" placeholder="Username Here"></div><div class="form-group"><label for="User_name">- <i class="fas fa-envelope"></i> - Email</label><br><input type="text" class="Inputs_cant" id="Email-r" placeholder="E-Mail Here"></div><div class="form-group"><label for="Password">- <i class="fas fa-user-lock"></i> - Password</label><br><input type="text" class="Inputs_cant" id="Password-r" placeholder="Password Here"></div><button onclick="send_backend(2)"> <i class="fas fa-star"></i> </button></div>'
		y = '<i class="icon_ip fas fa-user-plus"></i> -  Start to descovery' + frm
		$('#content_popup').html(y)
	}

	if (x == 3) {
	    frm = '<br><div class="form_user"> <div class="form-group"><label for="User_name">- <i class="fas fa-user"></i> - User Name</label><br><input type="text" class="Inputs_cant" id="User_name" placeholder="Username Here"></div><div class="form-group"><label for="Password">- <i class="fas fa-user-lock"></i> - Password</label><br><input type="text" class="Inputs_cant" id="Password" placeholder="Password Here"></div><button onclick="send_backend(1)"> <i class="btn_frm_us fas fa-unlock-alt"></i> </button></div'
		y = "<i class='icon_ip fas fa-key'></i> -  Log In " + frm
		$('#content_popup').html(y)

	}

}
/* Con exit configuraremos la desactivacion de la caja popup Porcompleto */
function exit() {
	$(".G_popup").removeClass("Activos_xd")
 	$(".G_popup").css('visibility', 'hidden')
 	$(".G_popup").css('opacity', '0')
 	
 	$(".G_overlay").css('visibility', 'hidden')
 	$(".G_overlay").css('opacity', '0')
}