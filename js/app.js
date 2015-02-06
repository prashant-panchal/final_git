
 var app1 =  angular.module("app",[]); 
var mainApp = angular.module('mainModule', ['ngRoute','ui.bootstrap','angularUtils.directives.dirPagination','ngAnimate']);
var myModule= angular.module('MyServiceModuleOne', ['app']);

/*********************************Services Written by Amit Gore****************************************/
mainApp.factory('search_to_book', function() {
 var doc_data = {}
 function set(data) {
   doc_data = data;
 }
 function get() {
  return doc_data;
 }

 return {
  set: set,
  get: get
 }

});
/*mainApp.factory('Auth', function(){
	var user;

	return{
	    setUser : function(aUser){
	        user = aUser;
	    },
	    isLoggedIn : function(){
	        return(user)? user : false;
	    }
	  }
	});
*/
/***********************************end of services*********************************************/

/*** Configure the Routes*/
mainApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
	.when("/", {
		templateUrl: "webpage/index.html", 
		controller: "PageCtrl"})
    .when("/search/:param1-:param11", {
    	templateUrl: "webpage/search.html", 
    	controller: "doctor_search"
    		})
    .when("/book_mainAppointment/:slot/:date/:doctor", {
    	templateUrl: "webpage/docPrimaryInfo.html", 
    	controller: "book_mainAppointment"
    		})
    .when("/mobile_verification", {
    	templateUrl: "webpage/login/mobile.html", 
    	controller: "patient_registration"
    		})
	.when("/primary_info", {
		templateUrl: "webpage/docPrimaryInfo.html", 
		controller: "PageCtrl"})
    // login Pages
	.when("/new_user", {
		templateUrl: "webpage/login/new_user.html", 
		controller: "PageCtrl"})
	.when("/mobilenumber", {
		templateUrl: "webpage/Registration/MobileUpdate.html", 
		controller: "patient_registration"})	
	.when("/patient", {
		templateUrl: "webpage/login/patient.html",
		controller: "login"})
	.when("/patientlogout", {
		templateUrl: "webpage/index.html",
		controller: "login"})	
	.when("/doctor", {
		templateUrl: "webpage/login/doctor.html",
		controller: "PageCtrl"})
	.when("/forgotp", {
		templateUrl: "webpage/login/forgotp.html",
		controller: "PageCtrl"})
	.when("/morelocation", {
		templateUrl: "webpage/more/morelocation.html",
		controller: "BlogCtrl"})
	.when("/morespeciality", {
		templateUrl: "webpage/more/morespeciality.html",
		controller: "BlogCtrl"})
	.when("/moreclinic", {
		templateUrl: "webpage/more/moreclinic.html",
		controller: "BlogCtrl"})
	
	
	
	//.when("/primary_info", {templateUrl: "webpage/about.html", controller: "PageCtrl"})
    .when("/about", {templateUrl: "webpage/about.html", controller: "PageCtrl"})
    .when("/faq", {templateUrl: "webpage/faq.html", controller: "PageCtrl"})
    .when("/pricing", {templateUrl: "webpage/pricing.html", controller: "PageCtrl"})
    .when("/services", {templateUrl: "webpage/services.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "webpage/contact.html", controller: "PageCtrl"})
    // Blog
    .when("/blog", {templateUrl: "webpage/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "webpage/blog_item.html", controller: "BlogCtrl"})
    // else 404
    .otherwise("/404", {templateUrl: "webpage/404.html", controller: "PageCtrl"});
}]);


/* The below method was used to test the login authentication method from stack-overflow,so 
 * commented to keep the reference (31-jan)
 * created a service (Auth) which will handle the user object and have a method to know if the user is logged or not.
 * */

/*mainApp.run(['$rootScope', '$location','login', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (1) {
            console.log('DENY');
        }
        else {
            console.log('ALLOW');
        }
    });
}]);
*/



/**
 * Controls the Blog
 */
mainApp.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
mainApp.controller('PageCtrl', function ( $scope, $location, $http, $routeParams ) {
	console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })
});




mainApp.controller('PhoneListCtrl', function ($scope) {
  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});

/*Author:Amit Gore
 * On every accessable page for'patient',we have included this mainController
 * So to check whether patient is logged in or not is being handled within this controller  
 * 
 * */
mainApp.controller('mainController', function($scope,$http) {
  
  // set the default states for lions and cranes
  $scope.lions = false;
  $scope.cranes = false;
  $scope.session_check_url= 'serverside/login/login_status.php';
	
	$http.post($scope.session_check_url)
	
			.success(function(dataFromServer,status,headers,config)
					{
						 console.log(dataFromServer);
						 $scope.user_session=dataFromServer;
						 if(!($scope.user_session))
							 {
							 console.log("not logged in-maincontroller");
							 }
						 //Auth.setUser(dataFromServer);
					})
			
			.error(function(data,status,headers,config){
				
				alert('failure in ajax request:login status check');
				
			});
  
  
});

mainApp.controller('session_protected_page',function($scope,$rootScope,$location,$http){

$rootScope.referrar_url=$location.path();
$scope.session_check_url= 'serverside/login/login_status.php';
	
	$http.post($scope.session_check_url)
	
			.success(function(dataFromServer,status,headers,config)
					{
						 console.log(dataFromServer);
						 $scope.user_session=dataFromServer;
						 if(!($scope.user_session))
							 {
							 alert("not logged in-session_protected controller");
							 //window.location.replace('#/patient:'+$location.path());
							 window.location.replace('#/patient');
							 }
						 //Auth.setUser(dataFromServer);
					})
			
			.error(function(data,status,headers,config){
				
				alert('failure in ajax request:login status check');
				
			});
  
	
});


/*----------------------------------------------CONTROLLERS WRITTEN BY AMIT GORE--------------------------------------------------------------------*/

/*
 * Login Related controller
 * Author:Amit Gore
 * */
/*
 * The below controller was used to test the login authentication method from stack-overflow,so 
 * commented to keep the reference 
 * mainApp.controller('mainCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {

	  $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {

	    if(!value && oldValue) {
	      console.log("Disconnect");
	      $location.path('/login');
	    }

	    if(value) {
	      console.log("Connect");
	      //Do something when the user is connected
	    }

	  }, true);
}]);*/

mainApp.controller('login',function($scope,$routeParams,$rootScope,$http){ //function as a dependency for login controller here
	
	/*$scope.check_session=function(){
	   	
		$scope.session_check_url= 'serverside/login/login_status.php';
		
		$http.post($scope.session_check_url)
		
				.success(function(dataFromServer,status,headers,config)
						{
							 console.log(dataFromServer);
							 return dataFromServer;
							 
							 //Auth.setUser(dataFromServer);
						})
				
				.error(function(data,status,headers,config){
					
					alert('failure in ajax request:login status check');
					return false;
				});
		return false;
	
		}//check_session function ends here
*/	
$scope.doctorlogin=function(){
		
	   	var dataObject={
	   			username:$scope.doc.email
	   		   ,password:$scope.doc.password	
	   	};
	   	
		$scope.login_check_url= 'serverside/login/doctor/doctor_login_check.php';
		//$rootScope.referrar_url;
		$http.post($scope.login_check_url, dataObject,{})
		
				.success(function(dataFromServer,status,headers,config)
						{
							 console.log(dataFromServer);
							 if(dataFromServer=="1")
								 {
								 alert("true");
								 }
							 else alert("false");
					   	})
				
				.error(function(data,status,headers,config){
					
					
				});
	
		}//doctorlogin function ends here
	
	

	
$scope.patientlogout=function(){
		
		$scope.logout_url='serverside/login/logout.php';
		$http.post($scope.logout_url)
		
				.success(function(dataFromServer,status,headers,config)
						{
							 console.log(dataFromServer);
							 //Auth.setUser(dataFromServer);
							 window.location.reload();
						})
				
				.error(function(data,status,headers,config){
					
					
				});
	
		}//patientlogout function ends here
	
	
	$scope.patientlogin=function(){
		
	   	var dataObject={
	   			username:$scope.credentials.username
	   		   ,password:$scope.credentials.password	
	   	};
	   	
		$scope.login_check_url= 'serverside/login/usercheck.php';
		//$rootScope.referrar_url;
		$http.post($scope.login_check_url, dataObject,{})
		
				.success(function(dataFromServer,status,headers,config)
						{
							 console.log(dataFromServer);
							 //Auth.setUser(dataFromServer);
							 if(!($rootScope.referrar_url))
								 {
								 window.location.replace('#/');
								 }
							 else
								 {
							 window.location.replace('#'+$rootScope.referrar_url);
								 }
						})
				
				.error(function(data,status,headers,config){
					
					
				});
	
		}//patientlogin function ends here

});

mainApp.controller('patient_registration',function($scope,$rootScope,$http,$location){
	//alert($location.path());
	$scope.registration_url= 'serverside/registration/patient_registration.php';
	$scope.fbregistration_url= 'serverside/registration/fp_patient_registration.php';
	$scope.p_registrationform = {};
	
	//defining submit form function
	$scope.p_registrationform.submitForm=function(){
		console.log("Submitting the form");
		var dataObject = {
				fname : $scope.p_registrationform.fname
				,lname : $scope.p_registrationform.lname
				,mobile : $scope.p_registrationform.mobile
				,password : $scope.p_registrationform.password
		};
		console.log(dataObject);$http.post($scope.registration_url,dataObject,{})
		.success(function(dataFromServer, status, headers, config) {
			  //alert("success");
			  window.location.replace('#/mobile_verification');
	          console.log(dataFromServer);
	       })
	    
	    .error(function(data, status, headers, config) {
	          alert("Submitting form failed!");
	       });
		
		
	     }//submitForm function ends
	
	$scope.p_registrationform.submitForm_facebook=function(){
		console.log("Submitting the facebook form");
		var dataObject = {
				 mobile : $scope.p_registrationform.mobile
				,password : $scope.p_registrationform.password
		};
		console.log(dataObject);$http.post($scope.fbregistration_url,dataObject,{})
		.success(function(dataFromServer, status, headers, config) {
			  //alert("success");
			  //window.location.replace('#/mobile_verification');
	          console.log(dataFromServer);
	       })
	    
	    .error(function(data, status, headers, config) {
	          alert("Submitting form failed!");
	       });
		
		
	     }//submitForm function ends
	 
	
	$scope.OTPcheck=function(OTPcharacters){
	   	 
		//$scope.OTPcharacters=angular.copy(OTPcharacters);
		$scope.OTPmatch_status;
		$scope.check_otp_url='serverside/registration/checkOTP.php';
		$http.post($scope.check_otp_url,OTPcharacters,{})
		.success(function(dataFromServer,status,headers,config)
		{
			 console.log(dataFromServer);
		})
		
		.error(function(data,status,headers,config){
			
			
		});
	
		}//OTPcheck ends here
		
		$scope.OTPresend=function(){
		   	 
			//$scope.OTPcharacters=angular.copy(OTPcharacters);
			$scope.resend_otp_url='serverside/registration/ResendOTP.php';
			$http.post($scope.resend_otp_url)
			.success(function(dataFromServer,status,headers,config)
			{
				 console.log(dataFromServer);
			})
			
			.error(function(data,status,headers,config){
				
				
			});
		
		}//OTPresend end here
	 
	
	
});//patient_registration controller ends here




/**************************************************CONTROLLERS RELATED TO SEARCH RESULT PAGE*********************************************************/
mainApp.controller('doctor_search',function($scope,$routeParams,$rootScope,$http,$location){
	
	var doc_name = $routeParams.param11;
	
	$scope.url= 'serverside/search/search_result.php'; // The url of php file which is intended to populate $scope with the help of AJAX call
	
	 var search_by_url=function(doc_name){
		    //Creating the http post request here
			$http.post($scope.url,{"data" : doc_name}).
			success(function(data,status){
				//alert('success');
				$scope.status=status;
				$rootScope.cards = data;
				$scope.result= data;
			}).
			error(function(data,status){
				alert('Failure');
				$scope.data = data||"Request failed";
				$scope.status = status;
			});
		 }
	if(doc_name) //if there is a parameter in the url,which would be doctor name
		{
		$scope.keywords=doc_name;
		search_by_url(doc_name);   //call the function 
		//need to implement logic for this,calling the result two times
			
		}
	
	$scope.search = function(){
		//Creating the http post request here
		$http.post($scope.url,{"data" : $scope.keywords}).
		success(function(data,status){
			//alert('success');
			$scope.status=status;
			$rootScope.cards = data;
			$scope.result= data;
			//console.log($scope.data);
			window.location.replace('#/search/docname-'+$scope.keywords);
			//window.location.replace('#/search');
			//$location.path('#/search');
			
			
		}).
		error(function(data,status){
			alert('Failure');
			$scope.data = data||"Request failed";
			$scope.status = status;
		});
	}
	
	
/*	$scope.show_calandar = function(doc_id){
		$scope.url='serverside/search/search_result_calandar.php';
		//alert(doc_id);
		
		//Creating the http post request here
		$http.post($scope.url,{"data" :doc_id}).
		success(function(data,status){
			//alert('success');
			var chutiya = doc_id;
			$scope.status=status;
			$scope.slots=data;///check this and if not done upload files and send the link to abhishek
			//$scope.slots.splice(1,0,doc_id);
			$scope.result= data;
		}).
		error(function(data,status){
			alert('Failure');
			$scope.data = data||"Request failed";
			$scope.status = status;
		});
	}*/
	
});
/**************************************************end of controllers related to SEARCH RESULT page*********************************************************/

/*
 * Book mainAppointment Related controller
 * Author:Amit Gore
 * */
mainApp.controller('book_mainAppointment',function($scope,$routeParams,$rootScope,$http){
	
	
	$scope.slot = $routeParams.slot;
	$scope.date=$routeParams.date;
	$scope.doc_id=$routeParams.doctor;
	$scope.fetch_data_url= 'serverside/bookmainAppointment/docdata_bookmainAppointment_page.php';
	
	$http.post($scope.fetch_data_url,{"data" : $scope.doc_id}).
	success(function(data,status){
		//alert('success');
		$scope.status=status;
		$scope.doc_data = data;
		
	}).
	error(function(data,status){
		alert('Failure');
		$scope.data = data||"Request failed";
		$scope.status = status;
	});
	
	/*
	 * Book mainAppointment function definations
	 * 
	 * 
	 * */
	$scope.mainAppointment_related = {};
	$scope.save_to_database_url='serverside/bookmainAppointment/save_mainAppointment.php';
	//defining submit form function
	$scope.mainAppointment_related.submitForm=function(){
		console.log("Submitting the form");
		var dataObject = {
				patientname : $scope.mainAppointment_related.patientname
				,Reason : $scope.mainAppointment_related.Reason
				,mainApp_date : $scope.date
				,slot : $scope.slot
				,doc_id : $scope.doc_id
				};
		console.log(dataObject);
		$http.post($scope.save_to_database_url,dataObject,{})
		.success(function(dataFromServer, status, headers, config) {
			  //alert("success");
			  //window.location.replace('#/mobile_verification');
	          console.log(dataFromServer);
	       })
	    
	    .error(function(data, status, headers, config) {
	          alert("Submitting form failed!");
	       });
		
		
	     }//submitForm function ends
	
	
	





});




/*------------------------------------------------end of controllers WRITTEN BY AMIT GORE----------------------------------------------------------------*/




//Angular mainApp Module and Controller

mainApp.controller('MapCtrl', function ($scope) {

    var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(18.5203,73.8567),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
				 mapTypeControlOptions: {
				 style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
				 },
				 navigationControl: true,
				 navigationControlOptions: {
				 style: google.maps.NavigationControlStyle.SMALL
				 }
    }
	
	var bounds = new google.maps.LatLngBounds();
	
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
			
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        bounds.extend( marker.position);
		//map.fitBounds(bounds);
		//console.log(bounds);	
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (i = 0; i < cities.length; i++)
	{
        createMarker(cities[i]);
    }

    // $scope.openInfoWindow = function(e, selectedMarker){
        // e.preventDefault();
        // google.maps.event.trigger(selectedMarker, 'click');
    // }

});

var cities = [
    {
        city : 'Pune',
        desc : 'This is the best city in the world!',
        lat : 18.5203,
        long : 73.8567
    },
    {
        city : 'Ahmadnagar',
        desc : 'This city is aiiiiite!',
        lat : 19.0800,
        long : 74.7300
    },
	{
        city : 'Nashik',
        desc : 'This city is aiiiiite!',
        lat : 20.0000,
        long : 73.7800
    },
	{
        city : 'Delhi',
        desc : 'This city is aiiiiite!',
        lat : 28.6139,
        long : 77.2089
    }
];




// form validations

mainApp.controller('formValidation', function($scope) {

	// function to submit the form after all validation has occurred			
	$scope.submitForm = function(isValid) {

		// check to make sure the form is completely valid
		if (isValid) { 
			alert('our form is amazing');
		}

	};

});

// logform

mainApp.controller('FormCtrl', ['$scope', function($scope) {
  // hide error messages until 'submit' event
  $scope.submitted = false;
  // hide success message
  $scope.showMessage = false;
  // method called from shakeThat directive
  $scope.submit = function() {
    // show success message
    $scope.showMessage = true;
  };
}])

mainApp.directive('shakeThat', ['$animate', function($animate) {

  return {
    require: '^form',
    scope: {
      submit: '&',
      submitted: '='
    },
    link: function(scope, element, attrs, form) {
      // listen on submit event
      element.on('submit', function() {
        // tell angular to update scope
        scope.$mainApply(function() {
          // everything ok -> call submit fn from controller
          if (form.$valid) return scope.submit();
          // show error messages on submit
          scope.submitted = true;
          // shake that form
          $animate.addClass(element, 'shake', function() {
            $animate.removeClass(element, 'shake');
          });
        });
      });
    }
  };

}]);






mainApp.controller('staticpages',function($scope){
	
	$scope.static_page = [
	{
	'images' : 	'images/marker-48.png',
	'titles' : 	' Location',
	'detail' :  ['Aundh','Baner','Shivaji nagar','Pashan','Sinhgad Road','Narhe','Kothrud','Alandi','Pimple Saudaghar'],
	'more':'morelocation'
	},
	{
	'images' : 	'images/tag-48.png',
	'titles' : 	' Speciality',
	'detail' :  ['Endocrinology','Diebetology','Nephrology','Urology','Joint replacement','Spine Surgery','Rheumatology','Neurology','Paed. Neurology'],
	
	'more':'morespeciality'
	},
	{
	'images' : 	'images/hospital-48.png',
	'titles' : 	' Clinic',
	'detail' :  ['HealthServe Community Clinic','Aditya Birla Clinic','Noble Hospital','Ruby Hall Clinic','Jehangir Hospital','Apollo Hospital','Deenanath Mangeshkar Hospital','Sancheti Hospital','Karve Childrens Hospital'],
	'more':'moreclinic'
	}];
	

});

// for static pages
mainApp.controller('speciality',function($scope,$filter){

	$scope.specialitys = ['Endocrinology','Diebetology','Nephrology','Urology','Joint replacement','Spine Surgery','Rheumatology','Neurology','Paed. Neurology','Neuro Surgery','Cardiology','Cardiac Surgery','Oncology','Onco Surgery','Dermatology','Maxillo Facial Surgeon','Retina Surgeon','Gastroenterology','Gastro. Surgeon','Heamatology','Hapatologist','Barriatric Surgery','Orthodontist','Vascular Surgery','Endoscopic Surgery']
	;

});

mainApp.controller('location',function($scope,$filter){

	$scope.locations = 
		  ['Aundh','Alandi','Akhurdi','Ambegoan','Baner','Balewadi','Bavdhan','Chandani Chawk','Kothrud','Karve Road','Nal Stop','Ganesh Nager','Sinhgad Road','Vadgoan','Anand Nagar','Swargate','Camp','Koregoan Park','Viman Nagar','Shaniwar Wada','Deccan']
	;

});

mainApp.controller('clinic',function($scope,$filter){

	$scope.clinic =  ['HealthServe Community Clinic','Aditya Birla Clinic','Noble Hospital','Ruby Hall Clinic','Jehangir Hospital','Apollo Hospital','Deenanath Mangeshkar Hospital','Sancheti Hospital','Karve Childrens Hospital']	;

});

mainApp.filter('mySort', function() {
    return function(input) {
      return input.sort();
    }
  });
