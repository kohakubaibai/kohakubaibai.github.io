window.QGSettings = {
   "appId": "bbef47e726da87070255",
   "debug": false,
   "personalizationEnabled": true,
   "vapidPublicKey": "BAI52DKzMfk93faKlw4af25o1cjaa5Uq_fYvmnTP-WcrgLs9hWE6ihaxh2eessltH1orDEcXYl87AEi2d7jhm8A",
   "qgendpoint": "https://.aiqua.io/notify.html",
   "origin": "https://www.cheers.com.tw/",
   "inWebEnabled": true,
   "cookieServer": {
      "enabled": true,
      "endpoint": "https://appier.cheers.com.tw"
   },
   "push": {
      "delay": 0,
      "requestSelf": false,
      "fakePrompt": true,
      "secondsBetweenPrompts": 1296000,
      "restrictOrigin": false,
      "useNotifyEndpoint": false,
      "allowedPushDomains": null,
      "optInTip": {
         "title": "\u6536\u5230\u6700\u65b0\u5929\u4e0b\u5b78\u7fd2Cheers\u63a8\u64ad",
         "message": "\u901a\u904e\u4ee5\u4e0b\u7c21\u55ae\u6b65\u9a5f\u99ac\u4e0a\u6253\u958b\u63a8\u64ad\uff1a\n1. \u9ede\u64ca\u7db2\u5740\u5217\u4e0a\u7684\u5716\u793a\uff0c\u5982\u4e0a\u65b9\u793a\u610f\u3002\n2.\u5141\u8a31\u901a\u77e5\u3002",
         "bgColor": "#efefef",
         "textColor": "#000000",
         "location": "right",
         "overlay": true
      },
      "onSubscribedPopup": {
         "enabled": false,
         "htmlBody": "\u5373\u523b\u8a02\u95b1Cheers\u96fb\u5b50\u5831\uff0c\u5c31\u4eab\u5929\u4e0b\u5b78\u7fd2\u7368\u5bb6\u512a\u60e0\uff01",
         "showOverlay": false
      },
      "optInTipEnabled": false,
      "prompt": {
         "buttonColor": "#f09706",
         "isMiddle": false,
         "laterText": "\u4e0b\u6b21\u518d\u8aaa",
         "message": "\u9ede\u64ca\u300c\u540c\u610f\u300d\uff0c\u5c07\u53ef\u4ee5\u6536\u5230\u5929\u4e0b\u5b78\u7fd2Cheers\u7684\u6700\u65b0\u8a0a\u606f\u3002",
         "overlay": true,
         "subscribeText": "\u540c\u610f",
         "title": "\u5929\u4e0b\u5b78\u7fd2Cheers\u63a8\u64ad",
         "icon": "https://www.cheers.com.tw/favicon_2019.ico"
      }
   }
};
if(window.qg && window.qg.queue) {
    window.qg.queue.unshift(('init', QGSettings));
}
!function(q,g,r,a,p,h,js){
    if(!q.qg){
        js=q.qg=function() {
            js.callmethod ? js.callmethod.call(js, arguments) : js.queue.push(arguments);
            js.queue = [];
        }
    }
    if(q.qg.initialized){return;}
    window.qg.queue.unshift(['init',window.QGSettings])
    p=g.createElement(r);
    p.async=!0;
    p.src=a;
    h=g.getElementsByTagName(r)[0];
    h.parentNode.insertBefore(p,h);
    q.qg.initialized = true;
}(window,document,'script','https://cdn.qgraph.io/v3/r/aiqua.js');