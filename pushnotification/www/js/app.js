 angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',
  'starter.controllers',
  'starter.services'
])
 .config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: 'fa316698',
    // The public API key all services will use for this app
    api_key: 'c0c5efa4579352c73927a6c6bcfc6b109391c841b531d7e9',
    // Set the app to use development pushes
    dev_push: true
  });
}])

var app = angular.module('app', ['ionic','ngCordova'])
    .run(function($ionicPlatform) {
})


