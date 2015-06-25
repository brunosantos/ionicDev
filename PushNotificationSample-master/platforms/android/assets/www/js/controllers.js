/**
 * Author: hollyschinsky
 * twitter: @devgirfl
 * blog: devgirl.org
 * more tutorials: hollyschinsky.github.io
 */
app.controller('AppCtrl', function($scope, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, ionPlatform, $http) {
    $scope.notifications = [];

    // call to register automatically upon device ready
    // ionPlatform.ready.then(function (device) {
    //     $scope.register();
    // });

    //  document.addEventListener("deviceready", function (device) {
    //     $scope.register();
    // }, false);

  var androidConfig = {
    "senderID": "128349573468",
  };

  document.addEventListener("deviceready", function(){
    $cordovaPush.register(config).then(function(result) {
      // Success
    }, function(err) {
      // Error
                  $cordovaToast.showShortCenter(err);
    })

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
                          $cordovaToast.showShortCenter("notificationReceived");
      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
            alert('registration ID = ' + notification.regid);
          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
          alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });
}, false);

    // Register
//     $scope.register = function () {
//         var config = null;

//         if (ionic.Platform.isAndroid()) {
//             config = {
//                 "senderID": "128349573468"//"YOUR_GCM_PROJECT_ID" // REPLACE THIS WITH YOURS FROM GCM CONSOLE -
//                 // also in the project URL like: https://console.developers.google.com/project/434205989073
//             };
//         }
//         else if (ionic.Platform.isIOS()) {
//             config = {
//                 "badge": "true",
//                 "sound": "true",
//                 "alert": "true"
//             }
//         }

//         $cordovaPush.register(config).then(function (result) {
//             $cordovaToast.showShortCenter(config.senderID);
//             $cordovaToast.showShortCenter("Register success: " + result);
//             $cordovaToast.showShortCenter('Registered for push notifications- DASS');
//             $scope.registerDisabled=true;
//             // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
//             if (ionic.Platform.isIOS()) {
//                 $scope.regId = result;
//                 storeDeviceToken("ios");
//             }
//         }, function (err) {
//             console.log("Register error " + err)
//             $cordovaToast.showShortCenter('Registered for push notifications: error');
//         });
//     }

// /*
//     // Notification Received    
//     $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
//                 $cordovaToast.showShortCenter("notificationReceived");
//         console.log(JSON.stringify([notification]));
//         $cordovaToast.showShortCenter('event:'+ionic.Platform);
            
//         if (ionic.Platform.isAndroid()) {
//             $cordovaToast.showShortCenter("Handle Android");
//             handleAndroid(notification);
//         }
//         else if (ionic.Platform.isIOS()) {
//             handleIOS(notification);
//             $scope.$apply(function () {
//                 $scope.notifications.push(JSON.stringify(notification.alert));
//             })
//         }
//     });  */

//     $scope.$on('$cordovaPush:notificationReceived', function(event, notification) {
//         $cordovaToast.showShortCenter("notificationReceived");
//         $cordovaToast.showShortCenter("notificationReceived:"+notification.event);
//       switch(notification.event) {
//         case 'registered':
//           if (notification.regid.length > 0 ) {
//             console.log('registration ID = ' + notification.regid);
//             $cordovaToast.showShortCenter(notification.regid);
//           }
//           break;

//         case 'message':
//           // this is the actual push notification. its format depends on the data model from the push server
//           console.log('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
//           break;

//         case 'error':
//           console.log('GCM error = ' + notification.msg);
//           break;

//         default:
//           console.log('An unknown GCM event has occurred');
//           break;
//       }
//     });  

//     // Android Notification Received Handler
//     function handleAndroid(notification) {
//         // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
//         //             via the console fields as shown.
//         console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
//         if (notification.event == "registered") {
//             $scope.regId = notification.regid;
//             $cordovaToast.showShortCenter('notification.regid:'+notification.regid);
//             storeDeviceToken("android");
//         }
//         else if (notification.event == "message") {
//             $cordovaDialogs.alert(notification.message, "Push Notification Received");
//             $scope.$apply(function () {
//                 $scope.notifications.push(JSON.stringify(notification.message));
//             })
//         }
//         else if (notification.event == "error")
//             $cordovaDialogs.alert(notification.msg, "Push notification error event");
//         else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
//     }

//     // IOS Notification Received Handler
//     function handleIOS(notification) {
//         // The app was already open but we'll still show the alert and sound the tone received this way. If you didn't check
//         // for foreground here it would make a sound twice, once when received in background and upon opening it from clicking
//         // the notification when this code runs (weird).
//         if (notification.foreground == "1") {
//             // Play custom audio if a sound specified.
//             if (notification.sound) {
//                 var mediaSrc = $cordovaMedia.newMedia(notification.sound);
//                 mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
//             }

//             if (notification.body && notification.messageFrom) {
//                 $cordovaDialogs.alert(notification.body, notification.messageFrom);
//             }
//             else $cordovaDialogs.alert(notification.alert, "Push Notification Received");

//             if (notification.badge) {
//                 $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
//                     console.log("Set badge success " + result)
//                 }, function (err) {
//                     console.log("Set badge error " + err)
//                 });
//             }
//         }
//         // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
//         // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
//         // the data in this situation.
//         else {
//             if (notification.body && notification.messageFrom) {
//                 $cordovaDialogs.alert(notification.body, "(RECEIVED WHEN APP IN BACKGROUND) " + notification.messageFrom);
//             }
//             else $cordovaDialogs.alert(notification.alert, "(RECEIVED WHEN APP IN BACKGROUND) Push Notification Received");
//         }
//     }

//     // Stores the device token in a db using node-pushserver (running locally in this case)
//     //
//     // type:  Platform type (ios, android etc)
//     function storeDeviceToken(type) {
//         console.log("storeDeviceToken" + type);
//         $cordovaToast.showShortCenter('inside storeDeviceToken');
//         // Create a random userid to store with it
//         var user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: $scope.regId };
//         console.log("Post token for registered device with data " + JSON.stringify(user));

//         $http.post('http://192.168.1.13:8000/subscribe', JSON.stringify(user))
//             .success(function (data, status) {
//                 console.log("Token stored, device is successfully subscribed to receive push notifications.");
//                 $cordovaToast.showShortCenter('Token stored');
//             })
//             .error(function (data, status) {
//                 console.log("Error storing device token." + data + " " + status)
//             }
//         );
//     }

//     // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
//     // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
//     // time the app opens which this currently does. However in many cases you will always receive the same device token as
//     // previously so multiple userids will be created with the same token unless you add code to check).
//     function removeDeviceToken() {
//         var tkn = {"token": $scope.regId};
//         $http.post('http://192.168.1.13:8000/unsubscribe', JSON.stringify(tkn))
//             .success(function (data, status) {
//                 console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
//             })
//             .error(function (data, status) {
//                 console.log("Error removing device token." + data + " " + status)
//             }
//         );
//     }

//     // Unregister - Unregister your device token from APNS or GCM
//     // Not recommended:  See http://developer.android.com/google/gcm/adv.html#unreg-why
//     //                   and https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications
//     //
//     // ** Instead, just remove the device token from your db and stop sending notifications **
//     $scope.unregister = function () {
//         console.log("Unregister called");
//         removeDeviceToken();
//         $scope.registerDisabled=false;
//         //need to define options here, not sure what that needs to be but this is not recommended anyway
// //        $cordovaPush.unregister(options).then(function(result) {
// //            console.log("Unregister success " + result);//
// //        }, function(err) {
// //            console.log("Unregister error " + err)
// //        });
//     }


})

