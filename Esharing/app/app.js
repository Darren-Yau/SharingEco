var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getItems = function(){
        return $http.get(serviceBase + 'Items');
    }
    obj.getItem = function(ItemID){
        return $http.get(serviceBase + 'Item?id=' + ItemID);
    }

    obj.insertItem = function (Item) {
    return $http.post(serviceBase + 'insertItem', Item).then(function (results) {
        return results;
    });
	};

	obj.updateItem = function (id,Item) {
	    return $http.post(serviceBase + 'updateItem', {id:id, Item:Item}).then(function (status) {
	        return status.data;
	    });
	};

	obj.deleteItem = function (id) {
	    return $http.delete(serviceBase + 'deleteItem?id=' + id).then(function (status) {
	        return status.data;
	    });
	};

    return obj;
}]);

app.controller('listCtrl', function ($scope, services) {
    services.getItems().then(function(data){
        $scope.Items = data.data;
    });
});

app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, Item) {
    var ItemID = ($routeParams.ItemID) ? parseInt($routeParams.ItemID) : 0;
    $rootScope.title = (ItemID > 0) ? 'Edit Item' : 'Add Item';
    $scope.buttonText = (ItemID > 0) ? 'Update Item' : 'Add New Item';
      var original = Item.data;
      original._id = ItemID;
      $scope.Item = angular.copy(original);
      $scope.Item._id = ItemID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.Item);
      }

      $scope.deleteItem = function(Item) {
        $location.path('/');
        if(confirm("Are you sure to delete Item number: "+$scope.Item._id)==true)
        services.deleteItem(Item.ItemNumber);
      };

      $scope.saveItem = function(Item) {
        $location.path('/');
        if (ItemID <= 0) {
            services.insertItem(Item);
        }
        else {
            services.updateItem(ItemID, Item);
        }
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
