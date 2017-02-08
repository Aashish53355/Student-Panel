
scotchApp.service('attendenceService', function () {
    this.myFunc = function (xx, yy, zz, kk) {
			 var Attend=xx({
					url: 'http://localhost:61693/api/Attendance/Get',method: "GET" ,params: {Student_Id:zz,Class_Id:kk,Date:'2016-12-09'}
				})
				.success(function (data, status, headers, config) {
					yy.Attendence = data;
					return data;
				})
				.error(function (data, status, headers, config) {
					console.log('data error');
			})
		}
	});

scotchApp.service('feeService',  function(){
		this.feeFunc=function(xx,yy,zz){
			var Fee=xx({
					url: 'http://localhost:61693/api/Fee/Get',method: "GET" ,params: {Student_Id:zz}
				})
				.success(function (data, status, headers, config) {
					yy.FeeList = data;
					return data;
				})
				.error(function (data, status, headers, config) {
					console.log('data error');
             })
		}
});

scotchApp.service('examService',  function(){
	this.examFunc=function(xx,yy,zz){
	var Exam=xx({
					url: 'http://localhost:61693/api/Exam_schedule/Get',method: "GET" ,params: {Class_Id:zz}
				})
				.success(function (data, status, headers, config) {
					yy.Exam_schedule = data;
					
					 // alert($scope.Exam_schedule[0].Class);
					 return data;
				})
				.error(function (data, status, headers, config) {
					console.log('data error');
			})
		}
});

scotchApp.service('assignmentService', function () {
    this.assignmentFunc = function (xx, yy, zz) {
	xx({
	    url: 'http://localhost:61693/api/Admin_Assignment/GetAssignmentDetail', method: "GET", params: { Class_Id: zz }
				})
				.success(function (data, status, headers, config) {
				    yy.assignmentList = data;
					return data;
				})
				.error(function (data, status, headers, config) {
					console.log('data error');
			})
		}
});
scotchApp.service('transportService', function () {
    this.transportFunc = function (xx, yy) {
        xx({
            url: 'http://localhost:61693/api/Admin_Transport_details/GetTransport', method: "GET"
        })
                    .success(function (data, status, headers, config) {
                        yy.transportList = data;
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('data error');
                    })
    }
});

scotchApp.service('circularService', function () {
  
        this.circularFunc = function ($http, $scope, zz) {
            $http.get("http://localhost:61693/api/Admin_Circular/GetCircular", { params: { "Class_Id": zz } })
            .success(function (data, status, headers, config) {
                $scope.circularresponce = data;
            }
            )
              .error(function (data, status, headers, config) {
                  console.log('data error');
              })
            

        }
    });

scotchApp.service('holidayService',  function(){

	this.holidayFunc=function(xx,yy,zz){
		var Holiday=xx({
					url: 'http://localhost:61693/api/Holiday/Get',method: "GET", params: {Year: zz }
				})
				.success(function (data, status, headers, config) {
					yy.Detail = data;
					
				})
				.error(function (data, status, headers, config) {
					console.log('data error');

			})

	}
});