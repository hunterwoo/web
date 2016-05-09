/**
 * zeev - Fri May 06 2016 22:29:46 GMT+0800 (中国标准时间)
 * @version v1.0.0
 */
!(function(){this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};
this["Handlebars"]["templates"]["application"] = Ember.Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "                <a><i class=\"fa fa-home\" title=\"主页\"></i><span>主页</span></a>\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "                <a><i class=\"fa fa-home\" title=\"记录\"></i><span>记录</span></a>\r\n";
},"5":function(depth0,helpers,partials,data) {
    return "                <a><i class=\"fa fa-home\" title=\"关于\"></i><span>关于</span></a>\r\n";
},"7":function(depth0,helpers,partials,data) {
    return "ZEEV博客";
},"9":function(depth0,helpers,partials,data) {
    return "<img alt=\"zeev\" src=\"/common/img/logo.jpg\">";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return alias2((helpers['loading-bar'] || (depth0 && depth0['loading-bar']) || alias1).call(depth0,{"name":"loading-bar","hash":{"isLoading":(depth0 != null ? depth0.isAjaxLoading : depth0)},"data":data}))
    + "\r\n<aside class=\"left_col text-center \">\r\n    <div class=\"profile\">\r\n        <a href=\"/\">\r\n            <img alt=\"HOME\" class=\"img-circle profile_picture\" src=\"/common/img/logo.jpg\">\r\n        </a>\r\n    </div>\r\n    <div class=\"stats-label\">\r\n        <h1>\r\n            "
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.name : stack1), depth0))
    + "\r\n        </h1>\r\n        <ul class=\"nav nav-tabs nav-justified nav_color\">\r\n            <li>\r\n                <h3>28</h3>\r\n                <h6>None</h6>\r\n            </li>\r\n            <li>\r\n                <h3>28</h3>\r\n                <h6>None</h6>\r\n            </li>\r\n            <li>\r\n                <h3>28</h3>\r\n                <h6>None</h6>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <nav class=\"nav_menu\">\r\n        <ul class=\"list-unstyled\">\r\n"
    + ((stack1 = (helpers['link-to'] || (depth0 && depth0['link-to']) || alias1).call(depth0,"index",{"name":"link-to","hash":{"title":"主页","tagName":"li"},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers['link-to'] || (depth0 && depth0['link-to']) || alias1).call(depth0,"article",{"name":"link-to","hash":{"title":"记录","tagName":"li"},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers['link-to'] || (depth0 && depth0['link-to']) || alias1).call(depth0,"about",{"name":"link-to","hash":{"title":"关于","tagName":"li"},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\r\n    </nav>\r\n    <div class=\"connect_btn\">\r\n        <a class=\"btn btn-link\" href=\"https://github.com/zeev-kell\" target=\"_blank\" title=\"github\">\r\n            <i class=\"fa fa-github\"></i>\r\n        </a>\r\n        <a class=\"btn btn-link\" href=\"http://github.com\" title=\"mail\">\r\n            <i class=\"fa fa-envelope\"></i>\r\n        </a>\r\n    </div>\r\n</aside>\r\n<div class=\"right_col container-fluid\">\r\n    <header class=\"nav_header\">\r\n        <div class=\"nav_btn\" "
    + alias2((helpers.action || (depth0 && depth0.action) || alias1).call(depth0,"open_side",{"name":"action","hash":{"on":"click"},"data":data}))
    + "><i></i>\r\n        </div>\r\n        <h1>"
    + ((stack1 = (helpers['link-to'] || (depth0 && depth0['link-to']) || alias1).call(depth0,"index",{"name":"link-to","hash":{"class":"btn-lick","title":"主页"},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</h1>\r\n        "
    + ((stack1 = (helpers['link-to'] || (depth0 && depth0['link-to']) || alias1).call(depth0,"about",{"name":"link-to","hash":{"class":"profile_sm","title":"关于"},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n    </header>\r\n    <div id=\"side_mask\" "
    + alias2((helpers.action || (depth0 && depth0.action) || alias1).call(depth0,"close_side",{"name":"action","hash":{"on":"click"},"data":data}))
    + "></div>\r\n    "
    + alias2(((helper = (helper = helpers.outlet || (depth0 != null ? depth0.outlet : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"outlet","hash":{},"data":data}) : helper)))
    + "\r\n</div>";
},"useData":true});
this["Handlebars"]["templates"]["index"] = Ember.Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"axis\">\r\n    <div class=\"axis_line\"></div>\r\n    <ul class=\"axis_time\">\r\n        <li>\r\n            <div class=\"time\">2014</div>\r\n            <div class=\"content\">- - - - - - - - - - - - <span class=\"text\">something</span></div>\r\n        </li>\r\n        <li>\r\n            <div class=\"time\">2015</div>\r\n            <div class=\"content\">- - - - - - - - - - - - <span class=\"text\">something</span></div>\r\n        </li>\r\n        <li>\r\n            <div class=\"time\">2016</div>\r\n            <div class=\"content\">- - - - - - - - - - - - <span class=\"text\">something</span></div>\r\n        </li>\r\n    </ul>\r\n</div>";
},"useData":true});}).call(this);