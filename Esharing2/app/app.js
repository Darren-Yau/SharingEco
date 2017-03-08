var app = angular.module('myApp', ['ngRoute', 'ngFileUpload']);
app.factory("services", ['$http', function($http) {
    var serviceBase = 'services/'
    var obj = {};

    obj.Posts_Cars_byType = function() {
        return $http.get(serviceBase + 'Posts_Cars_byType');
    };
    obj.Posts_Houses_byType = function() {
        return $http.get(serviceBase + 'Posts_Houses_byType');
    };
    obj.Post_Car_User = function(postID) {
        return $http.get(serviceBase + 'Post_Car_User?id=' + postID);
    };
    obj.Post_House_User = function(postID) {
        return $http.get(serviceBase + 'Post_House_User?id=' + postID);
    };
    obj.Car = function(CarID) {
        return $http.get(serviceBase + 'Car?id=' + CarID);
    }
    obj.House = function(HouseID) {
        return $http.get(serviceBase + 'House?id=' + HouseID);
    }
    obj.updateCar = function(CarID, Car) {
        return $http.post(serviceBase + 'updateCar', {
            id: CarID,
            Car: Car
        }).then(function(status) {
            return status.data;
        });
    };
    obj.updateHouse = function(HouseID, House) {
        return $http.post(serviceBase + 'updateHouse', {
            id: HouseID,
            House: House
        }).then(function(status) {
            return status.data;
        });
    };
    obj.deleteCar = function(PostID, CarID) {
        return $http.delete(serviceBase + 'deleteCar?id=' + PostID + '&CarID=' + CarID).then(function(status) {
            return status.data;
        });
    };
    obj.deleteHouse = function(PostID, HouseID) {
        return $http.delete(serviceBase + 'deleteHouse?id=' + PostID + '&HouseID=' + HouseID).then(function(status) {
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
    obj.insertHouse_Post = function(House, Post) {
        return $http.post(serviceBase + 'insertHouse_Post', {
            House: House,
            Post: Post
        }).then(function(results) {
            return results;
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
    obj.sendMail=function (Mail) {
      return $http.post(serviceBase + 'sendMail', Mail).then(function (results) {
        return results.data;
      })
    }
    return obj;
}]);

app.controller('userLogin', function($scope, services) {
    $scope.login = function() {
        var result = services.loginverify($scope.email, $scope.password);
        if (result == 0) {
            $scope.message = 'sorry, your email address and password are not match';
        } else {
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

app.controller('postCtrl', function($scope, services, $location, $route) {
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
    };
    $scope.deleteHouse = function(PostID, HouseID) {
        services.deleteHouse(PostID, HouseID);
        $location.path('/postManage');
    };
});

app.controller('CarsCtrl', function($scope, services) {
    services.Posts_Cars_byType().then(function(data) {
        $scope.Cars = data.data;
    });
    $scope.addressIncludes = [];
    $scope.makeIncludes = [];
    $scope.colorIncludes = [];
    $scope.includeAddress = function(address) {
        var i = $.inArray(address, $scope.addressIncludes);
        if (i > -1) {
            $scope.addressIncludes.splice(i, 1);
        } else {
            $scope.addressIncludes.push(address);
        }
    };
    $scope.includeMake = function(make) {
        var i = $.inArray(make, $scope.makeIncludes);
        if (i > -1) {
            $scope.makeIncludes.splice(i, 1);
        } else {
            $scope.makeIncludes.push(make);
        }
    }
    $scope.includeColor = function(color) {
        var i = $.inArray(color, $scope.colorIncludes);
        if (i > -1) {
            $scope.colorIncludes.splice(i, 1);
        } else {
            $scope.colorIncludes.push(color);
        }
    }
    $scope.query = function(car) {
        if ($scope.addressIncludes.length > 0) {
            if ($.inArray(car.Address, $scope.addressIncludes) < 0)
                return;
        }
        if ($scope.makeIncludes.length > 0) {
            if ($.inArray(car.Make, $scope.makeIncludes) < 0)
                return;
        }
        if ($scope.colorIncludes.length > 0) {
            if ($.inArray(car.Color, $scope.colorIncludes) < 0)
                return;
        }
        return car;
    }
});

app.controller('HousesCtrl', function($scope, services) {
    services.Posts_Houses_byType().then(function(data) {
        $scope.Houses = data.data;
    });
    $scope.addressIncludes = [];
    $scope.roomIncludes = [];
    $scope.bathIncludes = [];
    $scope.includeAddress = function(address) {
        var i = $.inArray(address, $scope.addressIncludes);
        if (i > -1) {
            $scope.addressIncludes.splice(i, 1);
        } else {
            $scope.addressIncludes.push(address);
        }
    };
    $scope.includeRoom = function(room) {
        var i = $.inArray(make, $scope.roomIncludes);
        if (i > -1) {
            $scope.roomIncludes.splice(i, 1);
        } else {
            $scope.roomIncludes.push(room);
        }
    }
    $scope.includeBath = function(bath) {
        var i = $.inArray(bath, $scope.bathIncludes);
        if (i > -1) {
            $scope.bathIncludes.splice(i, 1);
        } else {
            $scope.bathIncludes.push(bath);
        }
    }
    $scope.query = function(house) {
        if ($scope.addressIncludes.length > 0) {
            if ($.inArray(house.Address, $scope.addressIncludes) < 0)
                return;
        }
        if ($scope.roomIncludes.length > 0) {
            if ($.inArray(house.Rooms, $scope.roomIncludes) < 0)
                return;
        }
        if ($scope.bathIncludes.length > 0) {
            if ($.inArray(house.Baths, $scope.bathIncludes) < 0)
                return;
        }
        return house;
    }
});

app.controller('CarEditCtrl', function($scope, services, $routeParams, Car, Post, $location, Upload) {
    var ID = ($routeParams.ID) ? parseInt($routeParams.ID) : 0;
    var CarID = ($routeParams.CarID) ? parseInt($routeParams.CarID) : 0;
    $scope.buttonText = (ID === 0) ? 'Add' : 'Update';
    var original_Car = Car.data;
    original_Car.Yr = parseInt(original_Car.Yr);
    original_Car.Price = parseInt(original_Car.Price);
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
    }
});

app.controller('HouseEditCtrl', function($scope, services, $routeParams, House, Post, $location, Upload) {
    var ID = ($routeParams.ID) ? parseInt($routeParams.ID) : 0;
    var HouseID = ($routeParams.HouseID) ? parseInt($routeParams.HouseID) : 0;
    $scope.buttonText = (ID === 0) ? 'Add' : 'Update';
    var original_House = House.data;
    original_House.Rent = parseInt(original_House.Rent);
    original_House.Sqft = parseInt(original_House.Sqft);
    original_House.Rooms = parseInt(original_House.Rooms);
    original_House.Baths = parseInt(original_House.Baths);
    var original_Post = Post.data;
    var img;
    $scope.House = angular.copy(original_House);
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
                'targetPath': '../houseimg/'
            }
        }).then(function(resp) {
            $scope.Post.imgsrc = './houseimg/' + resp.data;
        });
    }

    $scope.houseChange = function() {
        return angular.equals(original_House, $scope.Car);
    }
    $scope.postChange = function() {
        return angular.equals(original_Post, $scope.Post);
    }
    $scope.isChange = function() {
        return $scope.houseChange() && $scope.postChange();
    }
    $scope.saveHouse = function() {
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
            $scope.Post.CarID = 0;
            $scope.Post.CreatorID = 1;
            $scope.Post.ItemType = 'car';
            services.insertHouse_Post($scope.House, $scope.Post);
        } else {
            if (!$scope.houseChange()) {
                services.updateHouse(HouseID, $scope.House);
            }
            if (!$scope.postChange()) {
                services.updatePost(ID, $scope.Post);
            }
        }
        $location.path('/postManage');
    }
});

app.controller('CarViewCtrl', function($scope, services, $routeParams, Car) {
    $scope.Car = Car.data;
    $scope.sendMail = function() {
        var Mail = {};
        Mail.SendID = 1;
        Mail.RecID = Car.data.CreatorID;
        var datenow=new Date();
        Mail.TimeSent = datenow.getTime();
        Mail.Message = $scope.content;
        Mail.Sender = 'kaichen';
        Mail.Receiver = Car.data.Fname;
        services.sendMail(Mail);
    };
});

app.controller('HouseViewCtrl', function($scope, services, $routeParams, House) {
    $scope.House = House.data;
    $scope.sendMail = function() {
        var Mail = {};
        Mail.SendID = 1;
        Mail.RecID = House.data.CreatorID;
        var datenow=new Date();
        Mail.TimeSent = datenow.getTime();
        Mail.Message = $scope.content;
        Mail.Sender = 'kaichen';
        Mail.Receiver = House.data.Fname;
        services.sendMail(Mail);
    };
});

app.controller('MailCtrl', function($scope, Messages, services, $location) {
  $scope.Messages=Messages;
  $scope.myInbox=function (obj) {
    return obj.RecID==1;
  };
  $scope.myOutbox=function (obj) {
    return obj.SendID==1;
  };
  $scope.Chats=[];
  var receiverID=0;
  var receivername='kaichen';
  $scope.getChat=function (send,rec,sender,receiver) {
    if(send==1){
      receiverID=rec;
      receivername=receiver;
    }
    else{
      receiverID=send;
      receivername=sender;
    }
    $scope.Chats=[];
    for(var i=0;i<$scope.Messages.length;i++){
      if(($scope.Messages[i].SendID==send && $scope.Messages[i].RecID==rec)
    || ($scope.Messages[i].RecID==send && $scope.Messages[i].SendID==rec)){
        $scope.Chats.push($scope.Messages[i]);
      }
    }
    for(var j=0;j<$scope.Chats.length;j++){
      if($scope.Chats[j].SendID==1){
        $scope.Chats[j].style1='left clearfix admin_chat';
        $scope.Chats[j].style2='chat-img1 pull-right';
        $scope.Chats[j].style3='chat_time pull-left';
        $scope.Chats[j].imgsrc='./images/me.png';
      }
      else{
        $scope.Chats[j].style1='left clearfix';
        $scope.Chats[j].style2='chat-img1 pull-left';
        $scope.Chats[j].style3='chat_time pull-right';
        $scope.Chats[j].imgsrc='./images/you.png';
      }
    }
  };
  $scope.sendMail = function() {
      var Mail = {};
      Mail.SendID = 1;
      Mail.RecID = receiverID;
      var datenow=new Date();
      Mail.TimeSent = datenow.getTime();
      Mail.Message = $scope.content;
      Mail.Sender = 'kaichen';
      Mail.Receiver = receivername;
      services.sendMail(Mail);
  };
  $location.path('mailBox');
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
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
            .when('/houses', {
                title: 'houses list',
                templateUrl: 'partials/Houselist.html',
                controller: 'HousesCtrl'
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
            .when('/Housedetail/:ID', {
                title: 'House Details',
                templateUrl: 'partials/Housedetail.html',
                controller: 'HouseViewCtrl',
                resolve: {
                    House: function(services, $route) {
                        var postID = $route.current.params.ID;
                        return services.Post_House_User(postID);
                    }
                }
            })
            .when('/postManage', {
                title: 'Post Selection',
                templateUrl: 'partials/PostSelection.html',
                controller: 'postCtrl'
            })
            .when('/editCarPost/:ID/:CarID', {
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
            .when('/editHousePost/:ID/:HouseID', {
                title: 'Edit House',
                templateUrl: 'partials/HouseEdit.html',
                controller: 'HouseEditCtrl',
                resolve: {
                    Post: function(services, $route) {
                        var ID = $route.current.params.ID;
                        return services.Post(ID);
                    },
                    House: function(services, $route) {
                        var HouseID = $route.current.params.HouseID;
                        return services.House(HouseID);
                    }
                }
            })
            .when('/mailBox', {
                title: 'Edit Mail',
                templateUrl: 'partials/mailBox.html',
                controller: 'MailCtrl',
                resolve: {
                  Messages: function (services) {
                    var UserID=1;
                    return services.Mails(UserID);
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
