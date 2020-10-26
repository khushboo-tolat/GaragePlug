var app = angular.module('myApp', []);

app.controller('homeCtrl', function($scope, $window){
     $scope.redirect = function(){
          $window.location.href = 'car-service.html';
     };
});

app.controller('mainCtrl',function($scope, $window){
     var service_data = JSON.parse($window.sessionStorage.getItem('service'));
     var size = JSON.parse($window.sessionStorage.getItem('size'));

     $scope.service_data = {
          0:{
               id: 0,
               image: "service-general.png",
               name: "GENERAL",
               select: false
          },
          1:{
               id: 1,
               image: "service-washing.png",
               name: "WASHING",
               select: false
          },
          2:{
               id: 2,
               image: "service-polishing.png",
               name: "POLISHING",
               select: false
          },
          3:{
               id: 3,
               image: "service-body.png",
               name: "BODY WORK",
               select: false
          },
          4:{
               id: 4,
               image: "service-engine.png",
               name: "ENGINE CHECK",
               select: false
          },
          5:{
               id: 5,
               image: "service-filter.png",
               name: "FILTER CHANGE",
               select: false
          },
          6:{
               id: 6,
               image: "service-wheel.png",
               name: "WHEEL ALIGNMENT",
               select: false
          },
          7:{
               id: 7,
               image: "service-oil.png",
               name: "OIL CHECK",
               select: false
          },
          8:{
               id: 8,
               image: "service-spark-plug.png",
               name: "SPARK PLUG",
               select: false
          }
     };

     $scope.size_data = {
          0:{
               id: 0,
               image: "type-small.png",
               name: "SMALL"
          },
          1:{
               id: 1,
               image: "type-sedan.png",
               name: "SEDAN"
          },
          2:{
               id: 2,
               image: "type-hatchback.png",
               name: "HATCHBACK"
          },
          3:{
               id: 3,
               image: "type-minivan.png",
               name: "MINIVAN"
          },
          4:{
               id: 4,
               image: "type-supercar.png",
               name: "SUPERCAR"
          },
          5:{
               id: 5,
               image: "type-cuv.png",
               name: "CUV"
          },
          6:{
               id: 6,
               image: "type-truck.png",
               name: "PICKUP TRUCK"
          },
          7:{
               id: 7,
               image: "type-van.png",
               name: "VAN"
          },
          8:{
               id: 8,
               image: "type-suv.png",
               name: "SUV"
          }
     };

     $window.sessionStorage.setItem("size_data", JSON.stringify($scope.size_data));

     $scope.size = -1;

     if(service_data != null){
          $scope.service_data = service_data;
     }

     if(size != null){
          $scope.size = size;
     }

     $scope.select_service = function(id){
          if($scope.service_data[id].select == false){
               $scope.service_data[id].select = true;
          }
          else if($scope.service_data[id].select == true){
               $scope.service_data[id].select = false;
          }

     }

     $scope.service_redirect = function(){
          $scope.set_service();
          $window.location.href = 'car-size.html';
     };

     $scope.set_service = function(){
          $window.sessionStorage.setItem("service", JSON.stringify($scope.service_data));
     };

     $scope.select_size = function(id){
          $scope.size = id;
     };

     $scope.size_redirect = function(){
          $scope.set_size();
          $window.location.href = 'price.html';
     };

     $scope.set_size = function(){
          $window.sessionStorage.setItem("size", JSON.stringify($scope.size));
     };

     $scope.change_service = function(){
          $window.location.href = 'car-service.html';
     };

     $scope.price_redirect = function(){
          $window.location.href = 'contact.html';
     };   
});

app.controller('contactCtrl',function($scope, $window){
     $scope.first_name;
     $scope.last_name;
     $scope.email;
     $scope.mobile;
     $scope.show = false;

     $scope.payment_method = function(bool){
          $scope.show = bool;
     };

     $scope.contact_redirect = function(){
          var cust = {
               "first_name": $scope.first_name,
               "last_name": $scope.last_name,
               "email": $scope.email,
               "mobile": $scope.mobile,
               "type": $scope.show
          }
          $window.sessionStorage.setItem("cust_data", JSON.stringify(cust));

          $window.location.href = 'checkout.html';
     };
});

app.controller('checkoutCtrl',function($scope, $window){
     var service_data = JSON.parse($window.sessionStorage.getItem('service'));
     var size_data = JSON.parse($window.sessionStorage.getItem('size_data'));
     var size = JSON.parse($window.sessionStorage.getItem('size'));

     $scope.service = "";
     $scope.cust = JSON.parse($window.sessionStorage.getItem('cust_data'));

     if($scope.cust.type == true){
          $scope.type = "Credit/Debit Card";
     }
     else{
          $scope.type = "Cash";
     }

     console.log($scope.service.trim().length === 0);

     for(var i = 0; i < Object.keys(service_data).length; i++){
          if(service_data[i].select == true){
               if($scope.service.trim().length === 0){
                    $scope.service = service_data[i].name;
               }
               else{
                    $scope.service = $scope.service + ", " + service_data[i].name;    
               }
          }
     }

     $scope.size = size_data[size].name;

     $scope.checkout_redirect = function(){
          $window.location.href = 'final.html';
     };
});

app.controller('finalCtrl',function($scope, $window){
     $window.sessionStorage.clear();
});
