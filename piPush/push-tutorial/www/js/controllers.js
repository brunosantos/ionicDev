angular.module('starter.controllers', [])

.factory("Items", function($firebaseArray) {
  var itemsRef = new Firebase("https://intense-torch-2736.firebaseio.com/items");
  return $firebaseArray(itemsRef);
})

.factory("piItems", function($firebaseArray) {
  var itemsRef = new Firebase("https://intense-torch-2736.firebaseio.com/pi");
  return $firebaseArray(itemsRef);
})




.controller('DashCtrl', function($scope, $cordovaToast, piItems, $firebaseObject) {


  $scope.piItems = piItems;

  $scope.getPiDHT = function(){
    //$scope.items.$add();
    $cordovaToast.showShortCenter('temp', $scope.piItems[0].temperature);
  }

  var obj = $firebaseObject(new Firebase("https://intense-torch-2736.firebaseio.com/pi"));
  var unwatch = obj.$watch(function() {
    $cordovaToast.showShortCenter("data changed!");
    console.log("data changed!", $scope.piItems.$keyAt(1));
    $scope.temp = $scope.piItems;//$scope.piItems.pop().temperature;
  });


})
  
.controller('ChatsCtrl', function($scope, Chats, Items) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }

  $scope.items = Items;

    $scope.addItem = function() {
    var date = new Date();
    var name = prompt("What do you need to buy?");
    if (name) {
      $scope.items.$add({
        "name": name,
        "date":date.toJSON(),
        "time":date.getHours(),
        "humidity":12,
        "temperature":33
      });
    }
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

