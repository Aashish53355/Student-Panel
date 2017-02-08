
	// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute','ngTouch', 'ui.grid', 'ui.grid.exporter', 'ui.grid.selection']);

// configure our routes
scotchApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page  
        .when('/', {
            templateUrl: 'pages/Dashboard.html',
            controller: 'DashboardController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })
   
        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })
        .when('/Holiday', {
            templateUrl : 'pages/Holiday.html',
            controller  : 'HolidayController'
        })
        .when('/Transport', {
            templateUrl : 'pages/Transport.html',
            controller  : 'TransportController'
        })
        .when('/Attendence', {
            templateUrl: 'pages/Attendence.html',
            controller: 'AttendenceController'
        })
        .when('/circular', {
            templateUrl : 'pages/circular.html',
            controller  : 'circularController'
        })
        .when('/assignment', {
            templateUrl : 'pages/assignment.html',
            controller  : 'assignmentController'
        })
    ;
});


scotchApp.controller('MainCtrl', ['$scope', '$http', '$interval', '$q', function ($scope, $http, $interval, $q) {
    var fakeI18n = function (title) {
        var deferred = $q.defer();
        $interval(function () {
            deferred.resolve('col: ' + title);
        }, 1000, 1);
        return deferred.promise;
    };

    $scope.gridOptions = {
        exporterMenuCsv: false,
        enableGridMenu: true,
        gridMenuTitleFilter: fakeI18n,
        columnDefs: [
          { name: 'Route_number' },
          { name: 'Registration_number', enableHiding: false },
          { name: 'Driver_name' }
        ],
        gridMenuCustomItems: [
          {
              title: 'Rotate Grid',
              action: function ($event) {
                  this.grid.element.toggleClass('rotated');
              },
              order: 210
          }
        ],
        onRegisterApi: function (gridApi) {
            debugger
            $scope.gridApi = gridApi;

            // interval of zero just to allow the directive to have initialized
            $interval(function () {
                gridApi.core.addToGridMenu(gridApi.grid, [{ title: 'Dynamic item', order: 100 }]);
            }, 0, 1);

            gridApi.core.on.columnVisibilityChanged($scope, function (changedColumn) {
                $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
            });
        }
    };

    $http.get('http://localhost:61693/api/Admin_Transport_details/GetTransport')
      .success(function (data) {
          $scope.gridOptions.data = data;
      });



}]);


scotchApp.controller('MainController', ['$scope',function ($scope, $http, $location) {
    
    debugger;
    paramsObject = {};
    window.location.search.replace(/\?/, '').split('&').map(function (o) { paramsObject[o.split('=')[0]] = o.split('=')[1] });
    $scope.FName = paramsObject.FName;
    $scope.Student_Id = paramsObject.Student_Id;
    $scope.Class_Id = paramsObject.Class_Id;

    $scope.doUpload = function (input) {
        alert("hello in do uo");
        debugger;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            var file = input.files[0];
            var img = new Image();
            var sizeKB = file.size / 1024;

            var ImageSize = $("#ImageSize").val();

            for (var i = 0; i < input.length; i++) {
                var file = $files[i];
                if (file.type.indexOf('image') === -1) { alert('only images are allows'); continue; }
            }

            reader.onload = function (e) {
                $('#Image').attr('src', e.target.result).width(120).height(140);
                var mydata = {
                    "Id": $('#Student_Id').val(),
                    "Attachement": $("input[type='file']").val().split('/').pop().split('\\').pop(),
                    "Image": $('#Image').attr('src')

                };
                alert(JSON.stringify(mydata));


                $http.post(
                                  'http://localhost:61693/api/Admin_add_student/UpdateImage',
                                    JSON.stringify(mydata),
                                    {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }
                                    ).success(function (data) {
                                        alert("sucess");
                                    }).error(function (data, status, header, config) {
                                        alert("error");


                                    });
            };

            reader.readAsDataURL(input.files[0]);



        }
      
    }












}]);

// create the controller and inject Angular's $scope
scotchApp.controller('AttendenceController', function ($scope, $http, $location, attendenceService) {
    var zz = $scope.Student_Id;
    var kk = $scope.Class_Id;

    //var Class_Id = paramsObject.Class_Id;
    $scope.Attend = attendenceService.myFunc($http, $scope,zz,kk );
        
});

scotchApp.controller('aboutController', function ($scope, $http, feeService) {
   
    var zz = $scope.Student_Id;
    $scope.Fee = feeService.feeFunc($http, $scope, zz);
});

scotchApp.controller('contactController', function ($scope, $http, examService) {
   
    var zz = $scope.Class_Id;
    $scope.Exam=examService.examFunc($http,$scope,zz);
});



scotchApp.controller("loginController", function ($scope, $http, $location, $window) {
    $scope.re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    $scope.GetUser = function () {
        var Email = $scope.uname;
        var Password = $scope.psw;
            
        var parameters = {
            Email, Password
        };
        var config = {
            params: parameters
        };

        $http.get('http://localhost:61693/api/Login/Get', config)
       .success(function (data, status, headers, config) {
           $scope.login = data;
           $scope.FName = $scope.login[0].FName;
           $scope.Student_Id = $scope.login[0].Student_Id;
           $scope.Class_Id = $scope.login[0].Class_Id;

           if ((Email == $scope.login[0].Email) && (Password == $scope.login[0].Password)) {
               alert("welcome" + " " + $scope.FName);
               $scope.uname = "";
               $scope.psw = "";
               $window.location.href = '../index.html?Student_Id=' + $scope.Student_Id + '&Class_Id=' + $scope.Class_Id + '&FName=' + $scope.FName;      
           }
       })
       .error(function (data, status, header, config) {
           alert("error");
           $window.location.href = '../Login.html';
           $scope.uname = "";
           $scope.psw = "";
       });
    }
});



scotchApp.controller('HolidayController', function($scope, $http,holidayService) {
    $http({
        url: 'http://localhost:61693/api/Holiday/GetYear',method: "GET", params: {Year: $scope.sample }
    })
            .success(function (data, status, headers, config) {
                $scope.yearlist = data;
            })
            .error(function (data, status, headers, config) {
                console.log('data error');
            })

    $scope.GetHolidyList=function(){
        $scope.sample=$scope.select_year.Year;

        $scope.Holiday=holidayService.holidayFunc($http,$scope,$scope.sample);
		
    }
		
});



scotchApp.controller('TransportController', function ($scope, $http, transportService) {
    $scope.transport = transportService.transportFunc($http, $scope);
    });
    

scotchApp.controller('DashboardController', function ($scope) {
   
});

scotchApp.controller('circularController', function ($scope, $http, circularService) {
    var zz = $scope.Class_Id;
    $scope.circular = circularService.circularFunc($http, $scope, zz);
});

scotchApp.controller('assignmentController', function ($scope,$http,assignmentService) {
    debugger;
    var zz = $scope.Class_Id;
    $scope.myassignment = assignmentService.assignmentFunc($http, $scope, zz);
});


