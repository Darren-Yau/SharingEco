var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};

    obj.sendMail=function (Mails) {
      return $http.post(serviceBase+'sendMail',Mails).then(function (results){
        return results;
      });
    };
    obj.getSendMails=function(UserID){
      return $http.get(serviceBase+'getsendMails');
    };
    obj.getRecMails=function(UserID){
      return $http.get(serviceBase+'getRecMails');
    };
    obj.deleteMail=function (MailID) {
      return $http.delete(serviceBase+'deleteMail/id='+MailID).then(function (statues) {
        return statues.data;
      });
    };

    obj.getCars=function () {
      return $http.get(serviceBase+'Cars');
    };
    obj.getCar=function (postID) {
      return $http.get(serviceBase+'Car?id='+postID);
    };
    obj.insertCar=function (Car) {
      return $http.post(serviceBase+'insertCar',Car).then(function (results) {
        return results;
      });
    };
    obj.updateCar=function (CarID,Car) {
      return $http.post(serviceBase+'updateCar',{id:CarID, Car:Car}).then(function (status) {
        return status.data;
      });
    };
    obj.deleteCar=function (CarID) {
      return $http.delete(serviceBase+'deleteCar?id='+CarID).then(function (status) {
        return status.data;
      });
    };

    obj.getHouses=function () {
      return $http.get(serviceBase+'Houses');
    };
    obj.getHouse=function (HouseID) {
      return $http.get(serviceBase+'House?id='+HouseID);
    };
    obj.insertHouse=function (House) {
      return $http.post(serviceBase+'insertHouse',House).then(function (results) {
        return results;
      });
    };
    obj.updateHouse=function (HouseID,House) {
      return $http.post(serviceBase+'updateHouse',{id:HouseID, House:House}).then(function (status) {
        return status.data;
      });
    };
    obj.deleteHouse=function (HouseID) {
      return $http.delete(serviceBase+'deleteHouse?id='+HouseID).then(function (status) {
        return status.data;
      });
    };

    obj.getPosts=function (UserID) {
      return $http.get(serviceBase+'getPosts?id='+UserID);
    };
    obj.getPost=function (ItemID) {
      return $http.get(serviceBase+'getPost?ItemID='+ItemID);
    };
    obj.updatePost=function (ItemID, Item) {
      return $http.post(serviceBase+'updatePost',{id:ItemID, Item:Item}).then(function (status) {
        return status.data;
      });
    };
    obj.insertPost=function (Item) {
      return $http.post(serviceBase+'insertPost',Item).then(function (results) {
        return results;
      });
    };
    obj.deletePost=function (ItemID) {
      return $http.delete(serviceBase+'deletePost?id='+ItemID).then(function (status) {
        return status.data;
      });
    };

  obj.loginverify=function(email,password){
    return $http.get(serviceBase+'loginverify?email='+email+'&password='+password);
  };
  obj.emailverify=function(email){
    return $http.get(serviceBase+'verifyemail?email='+email).then(function (statues) {
      return statues.data;
    });
  };
  obj.insertUser=function(User){
    console.log(User);
    return $http.post(serviceBase+'insertUser',User).then(function(results){
      return results;
    });
  };
    return obj;
}]);

app.factory('AuthService',function () {
  var userID;
  return {
    setUser:function (user) {
      UserID=user;
    },
    islogged:function () {
      return (userID)?userID:false;
    },
    logout:function(){
      userID=null;
    }
  }
});

app.controller('userLogin',function ($scope,services,AuthService) {
  $scope.login=function(){
    var result=services.loginverify($scope.email,$scope.password);
    if(result==0){
      $scope.message='sorry, your email address and password are not match';
    }
    else{
      AuthService.setUser($scope.email);
      window.history.back();
    }
  }
});

app.controller('userSignup',function ($scope,$location,services) {
  $scope.signup=function () {
    $scope.message="";
    services.emailverify($scope.Email).then(function (data) {
      if(data.Email){
        register=false;
        $scope.message="sorry, this email exists already, please change an other one.";
      }
      else{
        $location.path('/login');
        var User = {
          PassHash:$scope.Password,
          PassSalt:'',
          Fname:$scope.Fname,
          Lname:$scope.Lname,
          Email:$scope.Email
        };
        services.insertUser(User);
      }
    });
  }
});

app.controller('outboxCtrl',function ($scope, services, AuthService) {
  var id=AuthService.userID;
  services.getsendMails(id).then(function (data) {
    $scope.sendMails=data.data;
  });
  $scope.delete=function () {
    if(confirm("Are you sure to delete this mail?")==true)
    services.deleteMail($scope.mail_id);
  }
});

app.controller('inboxCtrl',function ($scope, service, AuthService) {
  var id=AuthService.userID;
  service.getRecMails(id).then(function (data){
    $scope.recMails=data.data;
  });
  $scope.reply=function () {
    var Mail=[];
    Mail.sendID=$scope.sendID;
    Mail.recID=$scope.recID;
    Mail.title=$scope.title;
    Mail.content=$scope.content;
    service.sendMail(Mail);
  };
  $scope.delete=function () {
    if(confirm("Are you sure to delete this mail?")==true)
    services.deleteMail($scope.mail_id);
  }
});

app.controller('postCtrl',function($scope, AuthService, services){
  var id=1;
  services.getPosts(id).then(function (data) {
    $scope.Posts=data.data;
  })
  $scope.deletePost=function (PostID) {
    if(confirm("Are you sure to delete Item number: "+$scope.Post.id)==true)
    services.delete($scope.Post.id);
  }
});

app.controller('newPost',function ($scope, services, AuthService) {
  var post=[];
  post.date=Date.now();
  post.creator=AuthService.userID;
  post.title=$scope.title;
  post.des=$scope.des;
  post.type=$scope.type;
  post.address=$scope.address;
  services.insertPost(post);

  if(angular.equals($scope.type,'car')){
    var car=[];
    car.make=$scope.make;
    car.model=$scope.model;
    car.yr=$scope.year;
    car.color=$scope.color;
    car.price=$scope.price;
    services.insertCar(car);
  }
  else if(angular.equals($scope.type,'house')){
    var house=[];
    house.rent=$scope.rent;
    houst.sqft=$scope.sqft;
    house.rooms=$scope.rooms;
    house.baths=$scope.baths;
    services.insertHouse(house);
  }
});
app.controller('editPost',function ($scope, AuthService, services,$routeParams,$location) {
  var ItemID=parseInt($routeParams.ItemID);
  services.getPost(ItemID).then(function (data) {
    $scope.Post=data.data;
  });
  $scope.update=function () {
    $location.path('/');
    services.updatePost(ItemID,$scope.Post);
  }
});

app.controller('CarsCtrl',function ($scope, services) {
  services.getCars().then(function (data) {
    $scope.Cars=data.data;
  });
});

app.controller('CarCtrl',function ($scope, services, $routeParams, Car, $location, AuthService) {
  $scope.Car=Car.data;
  console.log(Car);
  $scope.sendMail=function () {
    var Mail=[];
    Mail.sendID=AuthService.userID;
    Mail.recID=Car.data.ownerID;
    $scope.title='I am interested in your car '+Car.data.make+Car.data.model;
    Mail.title=$scope.title;
    Mail.content=$scope.content;
    service.sendMail(Mail);
  }
});

app.controller('HousesCtrl',function ($scope, services) {
  services.getHouses().then(function (data) {
    $scope.Houses=data.data;
  });
});

app.controller('HouseCtrl',function ($scope, services, $routeParams, House, $location, AuthService) {
  var HouseID=parseInt($routeParams.HouseID);
  $scope.House.id=HouseID;
  $scope.House=House.data;
  $scope.sendMail=function () {
    var Mail=[];
    Mail.sendID=AuthService.userID;
    Mail.recID=House.data.ownerID;
    $scope.title='I am interested in your house/room '+House.data.name+' located in '+House.data.location;
    Mail.title=$scope.title;
    Mail.content=$scope.content;
    service.sendMail(Mail);
  }
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'Items',
        templateUrl: 'partials/Items.html',
        controller: 'listCtrl'
      })
      .when('/login',{
        title: 'login',
        templateUrl: 'partials/login.html',
        controller: 'userLogin'
      })
      .when('/signup',{
        title: 'signup',
        templateUrl: 'partials/signup.html',
        controller: 'userSignup'
      })
      .when('/cars',{
        title: 'cars list',
        templateUrl: 'partials/Carlist.html',
        controller: 'CarsCtrl'
      })
      .when('/Cardetail/:ID',{
        title: 'Car Details',
        templateUrl:'partials/Cardetail.html',
        controller:'CarCtrl',
        resolve:{
          Car:function (services, $route) {
            var postID=$route.current.params.ID;
            return services.getCar(postID);
          }
        }
      })
      .when('/houses',{
        title: 'houses list',
        templateUrl: 'partials/Houselist.html',
        controller: 'HousesCtrl'
      })
      .when('/postManage',{
        title: 'Post Selection',
        templateUrl: 'partials/PostSelection.html',
        controller:'postCtrl'
      })
      .when('/edit-Item/:ItemID', {
        title: 'Edit Items',
        templateUrl: 'partials/edit-Item.html',
        controller: 'editCtrl',
        resolve: {
          Item: function(services, $route){
            var ItemID = $route.current.params.ItemID;
            return services.getItem(ItemID);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
