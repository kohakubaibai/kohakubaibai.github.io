(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{4:function(e,n,t){e.exports=t("qWZN")},qWZN:function(e,n,t){(function(e){!function(n,t,i){n.Appier={article:function(e){var n=e;function t(){return{id:n.id,channel:n.channel,subchannel:n.subchannel,title:n.title,author:n.author,group_tag:n.group_tag,keyword:n.keyword}}return{visit:function(){qg("event","article_view",t())},readComplete:function(){qg("event","article_readcomplete",t())},share:function(e){var n=t();n.method=e,qg("event","article_share",n)},searchRead:function(){qg("event","search_result_click",{id:n.id,channel:n.channel,subchannel:n.subchannel,title:n.title,author:n.author,keyword:n.search_keyword})}}},common:function(){return{keywordSearch:function(n,t){qg("event","keyword_search",{keyword:n}),e(t).submit()},loginComplete:function(){qg("event","login_complete",{})},registerView:function(){qg("event","register_view",{})},registerClose:function(){qg("event","register_close",{})},registerComplete:function(e){qg("event","register_complete",{register_method:e})},curationView:function(e){qg("event","curation_view",{group_page:e})},specialView:function(e){qg("event","special_view",{title:e})}}},profile:function(e){var n=e;return{pushProfile:function(){var e={};if(n&&n.uuid&&(e.user_id=n.uuid,e.email=n.email,e.member="member",e.subscriber="unknown",n&&n.j_end_date)){var t=new Date(n.j_end_date),i=new Date;t.getTime()>=i.getTime()&&(e.subscriber="cj_magazine")}e.dmp_id=n.idvisitor,_.forEach(e,(function(n,t){null===n&&delete e[t]})),qg("identify",e)}}}}}(window,document)}).call(this,t("EVdn"))}},[[4,0,1]]]);