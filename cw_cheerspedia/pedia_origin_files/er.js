var ERUID_COOKIE="__eruid";
var ER_LASTVIEW_COOKIE="__lastv";
var ERTAG_FROM_COOKIE="__etF";
var ERTAG_NOW_COOKIE="__etN";
var ER_EVENT_UID="__erEvntUid";
var ALG_LAST_ITEM_VIEW="last_item_views";
var TYPE_CROSS="cross";
var EVENT_PARAM_ERTAG="erTag";
var EVENT_PARAM_ERTAG_FROM="erTF";
var EVENT_PARAM_ERTAG_NOW="erTN";
var EVENT_PARAM_UID="uid";
var EVENT_PARAM_PREVIOUS_DOMAIN="preDN";
var ERSSID_COOKIE="__erSSID";
if(!window.console){console={log:function(){}}
}var ER={};
var ER={};
ER.loadJS=new function(){var me=this;
var _erUid="";
var _erSSID="";
var m_qeventList="",m_event_final="",m_qqueryList="",m_qquery="";
return{setData:function(qeventList,event_final,qqueryList,qquery){m_qeventList=qeventList;
m_event_final=event_final;
m_qqueryList=qqueryList;
m_qquery=qquery
},loadScripts:function(scripts,successCallBack){var loadSingleScript=function(_jsFile){var nextScript;
var _src=erUrlPrefix+_jsFile;
var xhr=createCORSRequest("GET",_src);
if(!xhr){throw new Error("CORS not supported")
}xhr.onreadystatechange=function(){if(xhr.readyState===4&&xhr.status===200){eval(xhr.responseText);
nextScript=scripts.shift();
if(nextScript){loadSingleScript(nextScript)
}else{if(typeof successCallBack==="function"){successCallBack()
}}}};
xhr.onload=function(){console.log("load file: "+_jsFile);
if(Object.prototype.toString.call(xhr)==="[object XDomainRequest]"||Object.prototype.toString.call(xhr)==="[object Object]"){eval(xhr.responseText);
nextScript=scripts.shift();
if(nextScript){loadSingleScript(nextScript)
}else{if(typeof successCallBack==="function"){successCallBack()
}}}};
xhr.onerror=function(){console.log("There was an error!")
};
xhr.send()
};
var createCORSRequest=function(_method,_url){var xhr=new XMLHttpRequest();
if("withCredentials" in xhr){xhr.open(_method,_url,true)
}else{if(typeof XDomainRequest!="undefined"){xhr=new XDomainRequest();
xhr.open(_method,_url)
}else{xhr=null
}}return xhr
};
try{loadSingleScript(scripts.shift())
}catch(err){console.log("err: "+err)
}},mainProcess:function(){ER.lastView.saveLastViewItem(m_qeventList,m_event_final);
bRet=ER.lastView.isDefinedAlg(ALG_LAST_ITEM_VIEW,m_qqueryList,m_qquery);
if(bRet){ER.lastView.transfer2ItemQuery(ALG_LAST_ITEM_VIEW,m_qqueryList,m_qquery)
}this._erUid=ER.erCookieObj.getLocalCookie(ERUID_COOKIE);
ER.erTag.updateViewPath(m_qeventList,m_event_final);
ER.erTag.eventWrapper(m_qeventList,m_event_final);
ER.prevPage.eventWrapper(m_qeventList,m_event_final);
ER.uidFill.eventWrapper(m_qeventList,m_event_final);
ER.uidFill.eventWrapper(m_qqueryList,m_qquery);
ER.pTuple.pTupleToJson(m_qeventList,m_event_final);
var cookieStorageLife=365;
var submitER=function(_erUid,_ssid){var eventObj=ER.eventObj;
eventObj.init(_erUid,erUrlPrefix,m_qeventList,m_event_final,_ssid);
eventObj.submit();
var queryObj=ER.queryObj;
queryObj.init(_erUid,erUrlPrefix,m_qqueryList,m_qquery);
queryObj.submit()
};
var loadJSON=function(_tryCrxCallback){var jq=document.createElement("script");
jq.type="text/javascript";
jq.async=true;
jq.src=erUrlPrefix+"json2.js";
var currentJs=document.getElementById("etu-recommender");
currentJs.parentNode.insertBefore(jq,currentJs);
function onJSONLoad(){_tryCrxCallback()
}if(jq.addEventListener){jq.addEventListener("load",onJSONLoad,false)
}else{if(jq.attachEvent){ieLoadBugFix(jq,onJSONLoad);
function ieLoadBugFix(_scriptElement,_callback){if(_scriptElement.readyState=="loaded"||_scriptElement.readyState=="complete"){_callback()
}else{setTimeout(function(){ieLoadBugFix(_scriptElement,_callback)
},100)
}}}}};
var tryCrxCookie=function(){var remoteStorage=CrxDomainStorage;
var bInitRet=remoteStorage.init(erUrlPrefix,"srv.html?"+(new Date().getDate()));
var _erUid_=ER.erCookieObj.getLocalCookie(ERUID_COOKIE);
remoteStorage.requestValue(ERUID_COOKIE,_erUid_,function(key,value,_ssid){ER.erCookieObj.setLocalCookie(ERUID_COOKIE,value,cookieStorageLife);
submitER(value,_ssid)
})
};
loadJSON(tryCrxCookie)
}}
};
ER.track=new function(){var a=function(b,d,e,c){if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")
}
}if(typeof b!="undefined"){event_final=b
}else{if(typeof _qevent!="undefined"){event_final=_qevent
}}if(typeof d!="undefined"){qeventList=d
}if(typeof e!="undefined"){qquery=e
}if(typeof c!="undefined"){qqueryList=c
}ER.loadJS.setData(qeventList,event_final,qqueryList,qquery)
};
return{send:function(b,d,e,c){a(b,d,e,c);
ER.loadJS.mainProcess()
}}
};
(function(){var b="";
var e=[];
var d="";
var c=[];
if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")
}
}if(typeof _qevents!="undefined"){b=_qevents
}else{if(typeof _qevent!="undefined"){b=_qevent
}}if(typeof _qeventList!="undefined"){e=_qeventList
}if(typeof _qquery!="undefined"){d=_qquery
}if(typeof _qqueryList!="undefined"){c=_qqueryList
}ER.loadJS.setData(e,b,c,d);
var a=["_erObj.js","_erUtils.js","_erLastView.js","_erTag.js","_erQueryInject.js","_erCrxDomain.js"];
ER.loadJS.loadScripts(a,ER.loadJS.mainProcess)
})();