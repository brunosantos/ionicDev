import urllib2
import base64

post_data = """{  
  "tokens":[
    "APA91bFCSLesMh6trwF0KdCqk-n10TKY6OhOwEqgmTz7OPkxBVnP3GruX_78TWaM1Ul3gpCiJM9Om4cWFoNfDhYX7vMdv3TfthiMzNXpBoWW7SINLeadNSblf9bhtC4hKAHsrXzeOqG_FyDg_gfu-qsft0mvGfUD8w"
  ],
  "notification":{
    "alert":"Hello World!",
    "android":{
      "collapseKey":"foo asfdasfas f",
      "delayWhileIdle":true,
      "timeToLive":300,
      "payload":{
        "key1":"value",
        "key2":"value"
      }
    }
  }
}"""
app_id = "fa316698"
private_key = "c9ebbadaf2db0594af2f52127499a7b83a0d81c731b813d9"
url = "https://push.ionic.io/api/v1/push"
req = urllib2.Request(url, data=post_data)
req.add_header("Content-Type", "application/json")
req.add_header("X-Ionic-Application-Id", app_id)
b64 = base64.encodestring('%s:' % private_key).replace('\n', '')
req.add_header("Authorization", "Basic %s" % b64)
resp = urllib2.urlopen(req)
print resp
