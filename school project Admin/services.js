			scotchApp.service('feegetservice',  function(){
			debugger;

				this.feeFunc=function(xx,yy,zz){
					var Fee=xx({
								url: 'http://localhost:61693/api/Fee/ExamStudentlist',method: "GET", params: {Class_Id:zz }
							})
							.success(function (data, status, headers, config) {
								yy.Detail = data;
								// alert($scope.Detail);


							})
							.error(function (data, status, headers, config) {
								console.log('data error');

						})
			  
				}

				this.feetypefunc=function(xx,yy,zz){
					var Feevariable=xx({
							url:'http://localhost:61693/api/Admin_Fee/GetFeetype',method: "GET", params: {ID:zz}
							})
							.success(function (data, status, headers, config) {
								yy.feetype = data;
							// alert($scope.Detail);
							})
							.error(function (data, status, headers, config) {
								console.log('data error');
					})
				}

				this.feedetailsfunc=function(xx,yy,cc,aa,bb){
					var Feedetails=xx({
						url: 'http://localhost:61693/api/Admin_Fee/Get',method: "GET" ,params: {Student_Id:aa,Class_Id:bb ,ID:cc}

					})
					.success(function (data, status, headers, config) {
								yy.feetdetails = data;
								return data;
							})

							.error(function (data, status, headers, config) {
								console.log('data error');
							})
				}
				this.classfeefunc=function(xx,yy,zz){
					var Studentfees=xx({
						url: 'http://localhost:61693/api/Admin_Fee/GetShortedstdfee',method: "GET" ,params: {Class_Id:zz }

					})
					.success(function (data, status, headers, config) {
								yy.feetdetails = data;
								return data;
							})

							.error(function (data, status, headers, config) {
								console.log('data error');
							})
				}
			});

			scotchApp.service('AddedstudentService',  function(){
				this.getAddedstudentsfunc=function(xx,yy,zz){
						var StudentList=xx({
							url: 'http://localhost:61693/api/Admin_add_student/GetStudent',method: "GET" ,params: {Class_Id:zz }

						})
						.success(function (data, status, headers, config) {
									yy.StudentList = data;
									return data;
								})

								.error(function (data, status, headers, config) {
									console.log('data error');
								})
					}
					});

			scotchApp.service('ExamscheduleService',  function(){
					this.getExamschedulefunc=function(xx,yy,zz){
					var ExamList=xx({
						url: 'http://localhost:61693/api/Exam_schedule/Get',method: "GET" ,params: {Class_Id:zz }

						})
					.success(function (data, status, headers, config) {
								yy.ExamscheduleList = data;
								return data;
							})

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
								
								// alert($scope.Detail);


							})
							.error(function (data, status, headers, config) {
								console.log('data error');

						})

				}

				// this.updateHoliday=function(Holiday){
				// 	var  response=xx({
				// 		url:"",method:"Post",data:JSON.stringify(Holiday)
				// 	});
				// 	return response;
				// }
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

			scotchApp.service('Admin_CircularService',function(){
				this.circularFunc=function(xx,yy,zz){
					var circular=xx({
						 url: 'http://localhost:61693/api/Admin_Circular/GetCircular',method: "GET" ,params: {Class_Id:zz}
					})
					.success(function (data, status, headers, config) {
								yy.Circular = data;
								
								 // alert($scope.Exam_schedule[0].Class);
								 return data;
							})
							.error(function (data, status, headers, config) {
								console.log('data error');
						})
				}
			});
			scotchApp.service('Admin_AssignmentService',function(){
				this.assignmentFunc=function(xx,yy,zz){
					var assignment=xx({
						 url: 'http://localhost:61693/api/Admin_Assignment/GetAssignmentDetail',method: "GET" ,params: {Class_Id:zz}
					})
					.success(function (data, status, headers, config) {
								yy.Assignment = data;
								
								 // alert($scope.Exam_schedule[0].Class);
								 return data;
							})
							.error(function (data, status, headers, config) {
								console.log('data error');
						})
				}
			});
