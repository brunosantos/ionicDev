// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
 angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',
  'starter.controllers',
  'starter.services',
  'ionic.service.deploy',
  'ionic.service.analytics',
  'firebase'
])
//  .run(['$ionicDeploy', function($ionicDeploy) {
//     // Check for updates
//     $ionicDeploy.check().then(function(response) {
//             // response will be true/false
//             if (response) {
//                 // Download the updates
//                 $ionicDeploy.download().then(function() {
//                     // Extract the updates
//                     $ionicDeploy.extract().then(function() {
//                         // Load the updated version
//                         $ionicDeploy.load();
//                     }, function(error) {
//                         // Error extracting
//                     }, function(progress) {
//                         // Do something with the zip extraction progress
//                         $scope.extraction_progress = progress;
//                     });
//                 }, function(error) {
//                     // Error downloading the updates
//                 }, function(progress) {
//                     // Do something with the download progress
//                     $scope.download_progress = progress;
//                 });
//             }
//         },
//         function(error) {
//             // Error checking for updates
//         })
// }])

 .config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: 'fa316698',
    // The public API key all services will use for this app
    api_key: 'c0c5efa4579352c73927a6c6bcfc6b109391c841b531d7e9',
    // The GCM project number
    gcm_id: '128349573468'
    // Set the app to use development pushes
    //dev_push: true
  });
}])

.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    $ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
