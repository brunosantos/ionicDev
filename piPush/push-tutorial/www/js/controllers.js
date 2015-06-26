angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $ionicUser, $ionicPush, $cordovaToast,  $ionicDeploy) {

  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    $ionicDeploy.update().then(function(res) {
      $cordovaToast.showShortCenter('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      $cordovaToast.showShortCenter('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    $ionicDeploy.check().then(function(hasUpdate) {
      $cordovaToast.showShortCenter('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      $cordovaToast.showShortCenter('Ionic Deploy: Unable to check for updates', err);
    });
  };

  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
      //or use
      //device.uuid
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      //alert('Identified user ' + user.name + '\n ID ' + user.user_id);
      $cordovaToast.showShortCenter('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        console.log(notification);
        $cordovaToast.showShortCenter('notification'+notification);
        // alert('notification'+notification);
        return true;
      }
    });
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      console.log('Got token', data.token, data.platform);
      // Do something with the token
      $cordovaToast.showShortCenter('Got token', data.token, data.platform);
      // alert('Got token', data.token, data.platform);
    });
  };
})
  
.controller('ChatsCtrl', function($scope, Chats) {
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
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

