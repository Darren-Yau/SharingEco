var app = angular.module('myApp', ['ngRoute', 'ngFileUpload']);
app.factory("services", ['$http', function($http) {
    var serviceBase = 'services/'
    var obj = {};

    obj.Posts_Cars_byType = function() {
        return $http.get(serviceBase + 'Posts_Cars_byType');
    };
    obj.Post_Car_User = function(postID) {
        return $http.get(serviceBase + 'Post_Car_User?id=' + postID);
    };
    obj.Car = function(CarID) {
        return $http.get(serviceBase + 'Car?id=' + CarID);
    }
    obj.updateCar = function(CarID, Car) {
        return $http.post(serviceBase + 'updateCar', {
            id: CarID,
            Car: Car
        }).then(function(status) {
            return status.data;
        });
    };
    obj.deleteCar = function(PostID, CarID) {
        return $http.delete(serviceBase + 'deleteCar?id=' + PostID + '&CarID=' + CarID).then(function(status) {
            return status.data;
        });
    };

    obj.Posts_cars = function(UserID) {
        return $http.get(serviceBase + 'Posts_cars?id=' + UserID);
    };
    obj.Posts_houses = function(UserID) {
        return $http.get(serviceBase + 'Posts_houses?id=' + UserID);
    };
    obj.Post = function(PostID) {
        return $http.get(serviceBase + 'Post?id=' + PostID);
    };
    obj.updatePost = function(PostID, Post) {
        return $http.post(serviceBase + 'updatePost', {
            id: PostID,
            Post: Post
        }).then(function(status) {
            return status.data;
        });
    };
    obj.insertCar_Post = function(Car, Post) {
        return $http.post(serviceBase + 'insertCar_Post', {
            Car: Car,
            Post: Post
        }).then(function(results) {
            return results;
        });
    };
    obj.deletePost = function(ItemID) {
        return $http.delete(serviceBase + 'deletePost?id=' + ItemID).then(function(status) {
            return status.data;
        });
    };

    obj.loginverify = function(email, password) {
        return $http.get(serviceBase + 'loginverify?email=' + email + '&password=' + password);
    };
    obj.emailverify = function(email) {
        return $http.get(serviceBase + 'verifyemail?email=' + email).then(function(statues) {
            return statues.data;
        });
    };
    obj.insertUser = function(User) {
        return $http.post(serviceBase + 'insertUser', User).then(function(results) {
            return results;
        });
    };
    obj.Mails=function (UserID) {
      return $http.get(serviceBase + 'Mails?id=' + UserID).then(function (results) {
        return results.data;
      });
    };
    obj.SendMail = function(Mail){
        return $http.post(serviceBase + sendMail,Mail);
    };
    return obj;
}]);

app.factory('AuthService', function() {
    var userID;
    return {
        setUser: function(user) {
            UserID = user;
        },
        islogged: function() {
            return (userID) ? userID : false;
        },
        logout: function() {
            userID = null;
        }
    }
});

app.controller('userLogin', function($scope, services, AuthService) {
    $scope.login = function() {
        var result = services.loginverify($scope.email, $scope.password);
        if (result == 0) {
            $scope.message = 'sorry, your email address and password are not match';
        } else {
            AuthService.setUser($scope.email);
            window.history.back();
        }
    }
});

app.controller('userSignup', function($scope, $location, services) {
    $scope.signup = function() {
        $scope.message = "";
        services.emailverify($scope.Email).then(function(data) {
            if (data.Email) {
                register = false;
                $scope.message = "sorry, this email exists already, please change an other one.";
            } else {
                $location.path('/login');
                var User = {
                    PassHash: $scope.Password,
                    PassSalt: '',
                    Fname: $scope.Fname,
                    Lname: $scope.Lname,
                    Email: $scope.Email
                };
                services.insertUser(User);
            }
        });
    }
});

app.controller('postCtrl', function($scope, AuthService, services, $location, $route) {
    var id = 1;
    services.Posts_cars(id).then(function(data) {
        $scope.Cars = data.data;
    });
    services.Posts_houses(id).then(function(data) {
        $scope.Houses = data.data;
    });
    $scope.deleteCar = function(PostID, CarID) {
        services.deleteCar(PostID, CarID);
        $location.path('/postManage');
        $route.reload();
    };
    $scope.deleteHouse = function(PostID, HouseID) {
        services.deleteHouse(PostID, HouseID);
        $location.path('/postManage');
        $route.reload();
    };
});

app.controller('CarsCtrl', function($scope, services) {
    services.Posts_Cars_byType().then(function(data) {
        $scope.Cars = data.data;
    });
});

app.controller('CarEditCtrl', function($scope, services, $routeParams, Car, Post, $location, Upload, AuthService) {
    var ID = ($routeParams.ID) ? parseInt($routeParams.ID) : 0;
    var CarID = ($routeParams.CarID) ? parseInt($routeParams.CarID) : 0;
    $scope.buttonText = (ID === 0) ? 'Add' : 'Update';
    var original_Car = Car.data;
    original_Car.Yr = parseInt(original_Car.Yr);
    original_Car.Price = parseInt(original_Car.Price)
    var original_Post = Post.data;
    var img;
    $scope.Car = angular.copy(original_Car);
    $scope.Post = angular.copy(original_Post);
    $scope.onFileSelect = function(file) {
        if (!file) return;
        img = file;
    };
    $scope.imgUpload = function() {
        Upload.upload({
            url: './partials/upload.php',
            data: {
                file: img,
                'targetPath': '../carimg/'
            }
        }).then(function(resp) {
            $scope.Post.imgsrc = './carimg/' + resp.data;
        });
    }

    $scope.carChange = function() {
        return angular.equals(original_Car, $scope.Car);
    }
    $scope.postChange = function() {
        return angular.equals(original_Post, $scope.Post);
    }
    $scope.isChange = function() {
        return $scope.carChange() && $scope.postChange();
    }
    $scope.saveCar = function() {
        if (ID <= 0) {;
            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var day = today.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            $scope.Post.DateCreated = year + '-' + month + '-' + day;
            $scope.Post.HouseID = 0;
            $scope.Post.CreatorID = 1;
            $scope.Post.ItemType = 'car';
            services.insertCar_Post($scope.Car, $scope.Post);
        } else {
            if (!$scope.carChange()) {
                services.updateCar(CarID, $scope.Car);
            }
            if (!$scope.postChange()) {
                services.updatePost(ID, $scope.Post);
            }
        }
        $location.path('/postManage');
        $route.reload();
    }
});

app.controller('CarViewCtrl', function($scope, services, $routeParams, Car, $location, Upload, AuthService) {
    $scope.Car = Car.data;
    $scope.sendMail = function() {
        var Mail = [];
        Mail.sendID = AuthService.userID;
        Mail.recID = Car.data.ownerID;
        $scope.title = 'I am interested in your car ' + Car.data.make + Car.data.model;
        Mail.title = $scope.title;
        Mail.content = $scope.content;
        alert(Mail);
        service.sendMail(Mail);
    };
});

app.controller('MailCtrl', function($scope, Messages, services, $location) {
  $scope.Messages=Messages;
  $scope.myInbox=function (obj) {
    return obj.SendID==1;
  };
  $scope.myOutbox=function (obj) {
    return obj.RecID==1;
  };
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
                title: 'Items',
                templateUrl: 'partials/Items.html',
                controller: 'listCtrl'
            })
            .when('/login', {
                title: 'login',
                templateUrl: 'partials/login.html',
                controller: 'userLogin'
            })
            .when('/signup', {
                title: 'signup',
                templateUrl: 'partials/signup.html',
                controller: 'userSignup'
            })
            .when('/cars', {
                title: 'cars list',
                templateUrl: 'partials/Carlist.html',
                controller: 'CarsCtrl'
            })
            .when('/Cardetail/:ID', {
                title: 'Car Details',
                templateUrl: 'partials/Cardetail.html',
                controller: 'CarViewCtrl',
                resolve: {
                    Car: function(services, $route) {
                        var postID = $route.current.params.ID;
                        return services.Post_Car_User(postID);
                    }
                }
            })
            .when('/houses', {
                title: 'houses list',
                templateUrl: 'partials/Houselist.html',
                controller: 'HousesCtrl'
            })
            .when('/postManage', {
                title: 'Post Selection',
                templateUrl: 'partials/PostSelection.html',
                controller: 'postCtrl'
            })
            .when('/editPost/:ID/:CarID', {
                title: 'Edit Car',
                templateUrl: 'partials/CarEdit.html',
                controller: 'CarEditCtrl',
                resolve: {
                    Post: function(services, $route) {
                        var ID = $route.current.params.ID;
                        return services.Post(ID);
                    },
                    Car: function(services, $route) {
                        var CarID = $route.current.params.CarID;
                        return services.Car(CarID);
                    }
                }
            })
            .when('/mailBox', {
                title: 'Edit Car',
                templateUrl: 'partials/mailBox.html',
                controller: 'MailCtrl',
                resolve: {
                  Messages: function (services) {
                    var UserID=1;
                    return services.Mails(UserID);
                  }
                }
            })
            .when('/editHouse/:PostID', {
                title: 'Edit House',
                templateUrl: 'partials/HouseEdit.html',
                controller: 'HouseCtrl',
                resolve: {
                    House: function(services, $route) {
                        var PostID = $route.current.params.PostID;
                        return services.Houses(PostID);
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
