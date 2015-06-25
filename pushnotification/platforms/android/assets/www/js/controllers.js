app.controller('AppCtrl', function($scope, $cordovaPush, $cordovaDialogs, $cordovaMedia, $cordovaToast, ionPlatform, $http) {
    $scope.notifications = [];

    // call to register automatically upon device ready
    ionPlatform.ready.then(function (device) {
        $cordovaToast.showShortCenter(device);
        $scope.register();
    });

    // Register
    $scope.register = function () {
        var config = null;

        if (ionic.Platform.isAndroid()) {
            config = {
                "senderID": "128349573468",
                //"ecb": "function_to_be_called"
            };
        }
        // else if (ionic.Platform.isIOS()) {
        //     config = {
        //         "badge": "true",
        //         "sound": "true",
        //         "alert": "true"
        //     }
        // }

        $cordovaPush.register(config).then(function (result) {
            console.log("Register success " + result);

            $cordovaToast.showShortCenter('Registered for push notifications');
            $scope.registerDisabled=true;
            // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
            // if (ionic.Platform.isIOS()) {
            //     $scope.regId = result;
            //     storeDeviceToken("ios");
            // }
        }, function (err) {
            console.log("Register error " + err)
        });
    }

    // Notification Received
    // $rootScope.$on('$cordovaPush:notificationReceived'
    $scope.$on('pushNotificationReceived', function (event, notification) {
        alert("pushNotificationReceived");
        console.log(JSON.stringify([notification]));
        if (ionic.Platform.isAndroid()) {
            handleAndroid(notification);
        }
        else if (ionic.Platform.isIOS()) {
            handleIOS(notification);
            $scope.$apply(function () {
                $scope.notifications.push(JSON.stringify(notification.alert));
            })
        }
    });

    // Android Notification Received Handler
    function handleAndroid(notification) {
        switch(notification.event) {
            case 'registered':
              if (notification.regid.length > 0 ) {
                alert('registration ID = ' + notification.regid);
                $scope.regId = notification.regid;
                storeDeviceToken("android");
              }
              break;

            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
                alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                $cordovaDialogs.alert(notification.message, "Push Notification Received");
                $scope.$apply(function () {
                    $scope.notifications.push(JSON.stringify(notification.message));
                })
              break;

            case 'error':
              $cordovaDialogs.alert(notification.msg, "Push notification error event");
              break;

            default:
              $cordovaDialogs.alert(notification.event, 'An unknown GCM event has occurred');
              break;
          }
    }

    // Stores the device token in a db using node-pushserver (running locally in this case)
    //
    // type:  Platform type (ios, android etc)
    function storeDeviceToken(type) {
        // Create a random userid to store with it
        var user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: $scope.regId };
        console.log("Post token for registered device with data " + JSON.stringify(user));

        $http.post('http://192.168.1.13:8000/subscribe', JSON.stringify(user))
            .success(function (data, status) {
                console.log("Token stored, device is successfully subscribed to receive push notifications.");
            })
            .error(function (data, status) {
                console.log("Error storing device token." + data + " " + status)
            }
        );
    }

    // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
    // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
    // time the app opens which this currently does. However in many cases you will always receive the same device token as
    // previously so multiple userids will be created with the same token unless you add code to check).
    function removeDeviceToken() {
        var tkn = {"token": $scope.regId};
        $http.post('http://192.168.1.13:8000/unsubscribe', JSON.stringify(tkn))
            .success(function (data, status) {
                console.log("Token removed, device is successfully unsubscribed and will not receive push notifications.");
            })
            .error(function (data, status) {
                console.log("Error removing device token." + data + " " + status)
            }
        );
    }

    // Unregister - Unregister your device token from APNS or GCM
    // Not recommended:  See http://developer.android.com/google/gcm/adv.html#unreg-why
    //                   and https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/index.html#//apple_ref/occ/instm/UIApplication/unregisterForRemoteNotifications
    //
    // ** Instead, just remove the device token from your db and stop sending notifications **
    $scope.unregister = function () {
        console.log("Unregister called");
        removeDeviceToken();
        $scope.registerDisabled=false;
        //need to define options here, not sure what that needs to be but this is not recommended anyway
//        $cordovaPush.unregister(options).then(function(result) {
//            console.log("Unregister success " + result);//
//        }, function(err) {
//            console.log("Unregister error " + err)
//        });
    }


})

