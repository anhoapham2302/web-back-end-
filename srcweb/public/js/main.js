
(function($) {
	"use strict"

	// Fixed Nav
	var lastScrollTop = 0;
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();
		if ( wScroll > $('#nav').height() ) {
			if ( wScroll < lastScrollTop ) {
				$('#nav-fixed').removeClass('slide-up').addClass('slide-down');
			} else {
				$('#nav-fixed').removeClass('slide-down').addClass('slide-up');
			}
		}
		lastScrollTop = wScroll
	});

	// Search Nav
	$('.search-btn').on('click', function () {
		$('.search-form').addClass('active');
	});

	$('.search-close').on('click', function () {
		$('.search-form').removeClass('active');
	});

	


	$('#frmRegister').validate({
		rules: {
		  username: {
			required: true,
			remote: {
				url: '/signup/isavailable'
			}
		  },
		  password: {
			required: true,
			minlength: 6
		  },
		  confirm: {
			required: true,
			equalTo: $('[name="password"]')
		  },
		  name: {
			required: true,
		  },
		  email: {
			required: true,
			email: true
		  },
		  dob: {
			required: true,
		  }
		},
		messages: {
		  username: {
			required: 'Your username is required.',
			remote: 'Your username has been taken, please take another.'
		  },
		  password: {
			required: 'Your password is required.',
			minlength: 'Your password must have at least 6 characters.'
		  },
		  confirm: {
			required: 'Your password does not match.',
			equalTo: 'Your password does not match.'
		  },
		  name: {
			required: 'Valid full name is required.',
		  },
		  email: {
			required: 'Please enter a valid email address.',
			email: 'Please enter a valid email address.'
		  },
		  dob: {
			required: 'Valid date of birth is required.',
		  }
		},
  
		errorElement: 'small',
		errorClass: 'help-block text-danger',
		validClass: 'is-valid',
		highlight: function (e) {
		  $(e).removeClass('is-valid').addClass('is-invalid');
		},
		unhighlight: function (e) {
		  $(e).removeClass('is-invalid').addClass('is-valid');
		}
	  });
  
	  $('#txtDOB').datetimepicker({
		format: 'd/m/Y',
		timepicker: false,
		mask: true,
	  });
	  

})(jQuery);


$(function () {
    tinymce.init({
      selector: '#txtFullDes',
      height: 600,
      menubar: false,
      plugins: 'paste image link autolink lists table media',
      toolbar: [
        'undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright',
        'forecolor backcolor',
        'table link image media',
      ],
    });
  });



