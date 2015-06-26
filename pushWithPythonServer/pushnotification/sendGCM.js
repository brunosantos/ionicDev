var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyC0XstIOWkurKHuyIrJHMMfcYui6BTjgaY');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',"\u270C Peace, Love \u2764 you minha PAIXAO!!! \u2706!");
message.addData('title','Gosto de ti!' );
message.addData('msgcnt','3'); // Shows up in the notification in the status bar when you drag it down by the time

//message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app - may not work
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id/token is required
registrationIds.push('APA91bHEpi5jtTOdxQ4HQy6wKDUl5vZTjeCNvUOjt34OL3d-jIb03deTkIJ-fgaNfhEOIVdfW19mrEmXl0Pl_qQdJkEIgw5uIGBTjcVQ97bH47lBuZ14DKahSz7vWV9xjBXG_yoLZnpe3qeOPzv_y4LpUJ9OBzVyRomWn1Gvgnhb3yY_YuXBSYY');
 
/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result); //null is actually success
});
