this["JST"] = this["JST"] || {};

this["JST"]["app/templates/databases/item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<td width="10">\n  <label class="checkbox">\n    <input type="checkbox" class="row-select">\n  </label>\n</td>\n<td>\n  <a href="#/database/'+
( database.get("name") )+
'/_all_docs?limit=100">'+
( database.get("name") )+
'</a>\n</td>\n<td>'+
( database.status.get("disk_size")  )+
'</td>\n<td>'+
( database.status.get("doc_count")  )+
'</td>\n';
}
return __p;
};

this["JST"]["app/templates/databases/list.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="result-tools" style="">\n  <div class="btn-toolbar pull-left">\n    <button type="button" class="btn all" data-toggle="button">✓ All</button>\n    <button class="btn btn-small disabled bulk-delete"><i class="icon-trash"></i></button>\n  </div>\n\n  <form class="navbar-form pull-right database-search">\n    <input type="text" class="search-query" placeholder="Search by database name">\n  </form>\n</div>\n<table class="databases table table-striped">\n  <tbody>\n  </tbody>\n</table>\n';
}
return __p;
};

this["JST"]["app/templates/databases/sidebar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a class="btn btn-small new span4" id="new" style="width: 93%; margin-left: 0"><i class="icon-plus"></i> New database</a>\n<hr>\n<ul class="nav nav-list">\n  <!-- <li class="nav-header">Database types</li> -->\n  <li class="active"><a class="toggle-view" id="owned">Your databases</a></li>\n  <li class=""><a class="toggle-view" id="shared">Shared databases</a></li>\n</ul>\n<hr>\n<div class="well">\n  <p>Here be news.</p>\n</div>\n<img src="img/couchdblogo.png"/>';
}
return __p;
};

this["JST"]["app/templates/documents/all_docs_item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<td class="select"><input type="checkbox" class="row-select"></td>\n<td>\n  <div>\n    <pre class="prettyprint">'+
( doc.prettyJSON() )+
'</pre>\n    <div class="btn-group">\n      <a href="#'+
( doc.url('app') )+
'" class="btn btn-small edits">Edit '+
( doc.docType() )+
'</a>\n      <button href="#" class="btn btn-small btn-danger delete" title="Delete this document."><i class="icon icon-trash"></i></button>\n    </div>\n  </div>\n</td>\n';
}
return __p;
};

this["JST"]["app/templates/documents/all_docs_list.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="view show">\n  <div class="row">\n    <div class="btn-toolbar span6">\n      <button type="button" class="btn all" data-toggle="button">✓ All</button>\n      <button class="btn btn-small disabled bulk-delete"><i class="icon-trash"></i></button>\n    </div>\n    <div class="btn-toolbar pull-right">\n      <a href="#new-view-index" class="btn btn-small toggle-edit disabled"><i class="icon-wrench"></i> Edit index</a>\n      <a href="#params" class="btn btn-small toggle-params"><i class="icon-plus"></i> API preview</a>\n    </div>\n  </div>\n\n  <div class="row">\n    <div class="accordion" id="advanced-options-accordion">\n      <div class="accordion-group">\n        <div class="accordion-heading">\n          <a class="accordion-toggle" data-bypass="true" data-toggle="collapse" data-parent="#advanced-options-accordion" href="#collapse-advanced-options">\n            Advanced Options\n          </a>\n        </div>\n        <div id="collapse-advanced-options" class="accordion-body collapse in">\n          <div class="accordion-inner">\n            <form class="view-query-update">\n              <div class="controls controls-row">\n                <label class="span3 inline">\n                  Limit:\n                  <select name="limit" class="input-small">\n                    <option>5</option>\n                    <option selected="selected">10</option>\n                    <option>25</option>\n                    <option>50</option>\n                    <option>100</option>\n                  </select>\n                </label>\n                <label class="span3 checkbox inline">\n                  <input name="include_docs" type="checkbox" id="inlineCheckbox1" value="true"> Include Docs\n                </label>\n                ';
 if (hasReduce) { 
;__p+='\n                  <label class="span2 checkbox inline">\n                    <input name="reduce" type="checkbox" id="inlineCheckbox1" value="true"> Reduce\n                  </label>\n                  <label class="span4 inline">\n                    Group Level:\n                    <select name="group_level" class="input-small">\n                      <option value="0">None</option>\n                      <option value="1">1</option>\n                      <option value="2">2</option>\n                      <option value="3">3</option>\n                      <option value="4">4</option>\n                      <option value="5">5</option>\n                      <option value="6">6</option>\n                      <option value="7">7</option>\n                      <option value="8">8</option>\n                      <option value="9">9</option>\n                      <option value="999" selected="selected">exact</option>\n                    </select>\n                  </label>\n                ';
 } 
;__p+='\n              </div>\n\n              <div class="controls controls-row">\n                <input name="key" class="span4" type="text" placeholder="Key">\n                <input name="keys" class="span8" type="text" placeholder="Keys">\n              </div>\n              <div class="controls controls-row">\n                <input name="startkey" class="span6" type="text" placeholder="Start Key">\n                <input name="endkey" class="span6" type="text" placeholder="End Key">\n              </div>\n              <div class="controls controls-row">\n                <button type="submit" class="btn btn-primary">Query</button>\n              </div>\n            </form>\n \n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n\n  <table class="all-docs table table-striped table-condensed">\n    <tbody></tbody>\n  </table>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/documents/doc.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="doc">\n  <div class="page-header">\n    <h2>Doc: '+
( doc.id )+
'</h2>\n  </div>\n\n  <div class="errors-container"></div>\n\n  <textarea class="doc-code">'+
( JSON.stringify(doc.attributes, null, "  ") )+
'</textarea>\n  <br />\n  <p>\n    <button class="save-doc btn btn-large btn-primary" type="button">Save</button>\n  </p>\n\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/documents/doc_field_editor.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="doc-field-editor">\n  <div class="tools">\n\n    <div class="btn-toolbar pull-left">\n      <button class="btn btn-small all">&#x2713; All</button>\n      <button class="btn btn-small disabled delete"><i class="icon-trash"></i> Delete field</button>\n      <button class="btn btn-small new" style="margin-left: 64px"><i class="icon-plus"></i> New field</button>\n    </div>\n    <div class="btn-toolbar pull-right">\n      <button class="btn btn-small cancel">Cancel</button>\n      <button class="btn btn-small save">Save</button>\n    </div>\n  </div>\n\n  <div class="clearfix"></div>\n  <!-- <hr style="margin-top: 0"/> -->\n\n  <table class="table table-striped  table-condensed">\n    <thead>\n      <tr>\n        <th class="select">\n        </th>\n        <th>Key</th>\n        <th>Value</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr style="display:none">\n        <td class="select"><input type="checkbox" /></td>\n        <td class="key"><input type="text" class="input-large" value=\'\' /></td>\n        <td class="value"><input type="text" class="input-xxlarge" value=\'\' /></td>\n      </tr>\n      ';
 _.each(doc.attributes, function(value, key) { 
;__p+='\n        <tr>\n          <td class="select"><input type="checkbox" /></td>\n          <td class="key">\n            <input type="text" class="input-large" name="doc['+
( key )+
']" value="'+
( key )+
'" />\n          </td>\n          <td class="value"><input type="text" class="input-xxlarge" value=\''+
( JSON.stringify(value) )+
'\' /></td>\n        </tr>\n      ';
 }); 
;__p+='\n    </tbody>\n  </table>\n  <a class="btn btn-small new" style="margin-left: 64px"><i class="icon-plus"></i> New field</a>\n\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/documents/doc_field_editor_tabs.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="nav nav-tabs">\n  <li class="'+
( isSelectedClass('field_editor') )+
'"><a href="#'+
( doc.url('app') )+
'/field_editor">Doc fields</a></li>\n  <li class="'+
( isSelectedClass('code_editor') )+
'"><a href="#'+
( doc.url('app') )+
'/code_editor"><i class="icon-pencil"></i> Code editor</a></li>\n  <ul class="nav pull-right" style="margin:5px 10px 0px 10px;">\n    <li>\n      <div class="btn-group">\n        <button class="btn btn-small duplicate"><i class="icon-repeat"></i> Duplicate document</button>\n        <button class="btn btn-small delete"><i class="icon-trash"></i> Delete document</button>\n      </div>\n    </li>\n  </ul>\n</ul>\n';
}
return __p;
};

this["JST"]["app/templates/documents/index_menu_item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#database/'+
( database )+
'/_design/'+
( ddoc )+
'/_view/'+
( index )+
'" class="toggle-view">\n  <i class="icon-list"></i> '+
( ddoc )+
'<span class="divider">/</span>'+
( index )+
'\n</a>';
}
return __p;
};

this["JST"]["app/templates/documents/index_row_docular.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<td class="select"><input type="checkbox"></td>\n<td>\n  <div>\n    <pre class="prettyprint">'+
( doc.prettyJSON() )+
'</pre>\n    <div class="btn-group">\n      <a href="#'+
( doc.url('app') )+
'" class="btn btn-small edits">Edit '+
( doc.docType() )+
'</a>\n      <button href="#" class="btn btn-small btn-danger delete" title="Delete this document."><i class="icon icon-trash"></i></button>\n    </div>\n  </div>\n</td>';
}
return __p;
};

this["JST"]["app/templates/documents/index_row_tabular.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<td class="select"><input type="checkbox"></td>\n<td>\n  <div>\n    <pre class="prettyprint">'+
( JSON.stringify(doc.get("key")) )+
'</pre>\n  </div>\n</td>\n<td>\n  <div>\n    <pre class="prettyprint">'+
( JSON.stringify(doc.get("value")) )+
'</pre>\n  </div>\n</td>';
}
return __p;
};

this["JST"]["app/templates/documents/search.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<input id="searchbox" type="text" class="span12" placeholder="Search by doc id, view key or search index">';
}
return __p;
};

this["JST"]["app/templates/documents/sidebar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="sidenav">\n  <a class="btn btn-small new" id="doc" href="#'+
( database.url('app') )+
'/new"><i class="icon-file"></i> New doc</a>\n  <div class="btn-group" id="new-index">\n    <button class="btn btn-small" href="#">New view</button>\n  </div>\n  <hr>\n  <ul class="nav nav-list">\n    <li class="active"><a id="all-docs" href="/_all_docs" class="toggle-view"><i class="icon-list"></i> All documents</a></li>\n    <li><a id="design-docs" href=\'/_all_docs?start_key="_design"&end_key="_e"\'  class="toggle-view"><i class="icon-list"></i> All design docs</a></li>\n  </ul>\n  <ul class="nav nav-list views">\n    <li class="nav-header">Secondary Indexes</li>\n    <li><a href="#new-view-index" class="new"><i class="icon-plus"></i> New</a></li>\n  </ul>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/documents/tabs.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="nav nav-tabs">\n  <li class="active"><a href="#">Docs</a></li>\n  <li><a href="#">Permissions</a></li>\n  <li><a href="#">Stats</a></li>\n  <div id="search" class="navbar-search span4 nav pull-right input-prepend" style="height:20px;"></div>\n  <!-- TODO: put this styling into less -->\n  <ul class="nav pull-right" style="margin:5px 10px 0px 10px;">\n    <li>\n      <div class="btn-group">\n        <a class="btn btn-small dropdown-toggle" data-toggle="dropdown" href="#">\n          <i class="icon icon-cog"></i> Database actions <span class="caret"></span>\n        </a>\n        <ul class="dropdown-menu">\n          <li><a class=""><i class="icon-repeat"></i> Replicate database</a></li>\n          <li><a class=""><i class="icon-trash"></i> Delete database</a></li>\n        </ul>\n      </div>\n    </li>\n  </ul>\n</ul>';
}
return __p;
};

this["JST"]["app/templates/fauxton/api_bar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="navbar navbar-fixed-bottom">\n  <div class="navbar-inner">\n    <div class="container">\n      <div class="input-prepend input-append">\n        <span class="add-on">API reference <i class="icon-question-sign"></i></span><input type="text" class="input-xxlarge" value="'+
( endpoint )+
'"><a href="#" class="btn">Show me</a>\n\n      </div>\n    </div>\n  </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/fauxton/breadcrumbs.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="breadcrumb">\n  ';
 _.each(_.initial(crumbs), function(crumb) { 
;__p+='\n    <li>\n      <a href="#'+
( crumb.link )+
'">'+
( crumb.name )+
'</a>\n      <span class="divider"> / </span>\n    </li>\n  ';
 }); 
;__p+='\n  ';
 var last = _.last(crumbs) || {name: ''} 
;__p+='\n  <li class="active">'+
( last.name )+
'</li>\n</ul>\n';
}
return __p;
};

this["JST"]["app/templates/fauxton/nav_bar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="navbar navbar-inverse navbar-fixed-top">\n  <div class="navbar-inner">\n    <div class="container">\n      <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </a>\n      <a class="brand" href="#">Project Fauxton</a>\n      <div class="nav-collapse">\n        <ul class="nav pull-right">\n          ';
 _.each(navLinks, function(link) { 
;__p+='\n            <li><a href="'+
( link.href )+
'">'+
( link.title )+
'</a></li>\n          ';
 }); 
;__p+='\n          <!-- TODO: pick this up from code - nested dicts in the above -->\n\n          <!-- <li class="dropdown">\n            <a href="#" class="dropdown-toggle" data-toggle="dropdown">drsm79 <b class="caret"></b></a>\n            <ul class="dropdown-menu">\n              <li><a href="account.html#account">Account Info</a></li>\n              <li><a href="account.html#password">Password</a></li>\n              <li><a href="account.html#indexing-rate">Indexing rate</a></li>\n              <li><a href="account.html#support-level">Support level</a></li>\n              <li><a href="account.html#location">Location for your data</a></li>\n              <li><a href="account.html#email-notifications">Email notifications</a></li>\n              <li><a href="account.html#design">Design</a></li>\n              <li class="divider"></li>\n              <li><a href="/sign-out.html">Sign Out</a></li>\n            </ul>\n          </li> -->\n        </ul>\n      </div><!--/.nav-collapse -->\n    </div>\n  </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/fauxton/notification.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="alert alert-'+
( type )+
'">\n  <button type="button" class="close" data-dismiss="alert">×</button>\n  '+
( msg )+
'\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/layouts/one_pane.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="primary-navbar"></div>\n\n<div id="dashboard" class="container">\n  <div class="row">\n    <div id="breadcrumbs" class="span12"></div>\n  </div>\n  <div id="tabs" class="row"></div>\n\n  <div class="row">\n    <div id="dashboard-content" class="list span12"></div>\n  </div>\n</div>\n\n<div id="api-navbar"></div>\n';
}
return __p;
};

this["JST"]["app/templates/layouts/two_pane.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="primary-navbar"></div>\n\n<div id="dashboard" class="container">\n  <div class="row">\n    <div id="breadcrumbs" class="span12"></div>\n  </div>\n  <div id="tabs" class="row"></div>\n\n  <div class="row">\n    <div id="left-content" class="span6"></div>\n    <div id="right-content" class="span6"></div>\n  </div>\n</div>\n\n<div id="api-navbar"></div>\n';
}
return __p;
};

this["JST"]["app/templates/layouts/with_right_sidebar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="primary-navbar"></div>\n\n<div id="dashboard" class="container">\n  <div class="row">\n    <div id="breadcrumbs" class="span12"></div>\n  </div>\n  <div class="row">\n    <div id="dashboard-content" class="list span8"></div>\n    <div id="sidebar-content" class="sidebar span4 pull-right"></div>\n  </div>\n</div>\n\n<div id="api-navbar"></div>\n';
}
return __p;
};

this["JST"]["app/templates/layouts/with_sidebar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="primary-navbar"></div>\n\n<div id="dashboard" class="container">\n  <div class="row">\n    <div id="breadcrumbs" class="span12"></div>\n  </div>\n  <div class="row">\n    <div id="sidebar-content" class="sidebar span4"></div>\n    <div id="dashboard-content" class="list span8 pull-right"></div>\n  </div>\n</div>\n\n<div id="api-navbar"></div>\n';
}
return __p;
};

this["JST"]["app/templates/layouts/with_tabs_sidebar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="primary-navbar"></div>\n<div id="dashboard" class="container">\n\n<div class="row-fluid">\n  <div id="breadcrumbs" class="row-fluid"></div>\n  <div id="tabs" class="row-fluid"></div>\n\n  <div class="row-fluid">\n    <div id="sidebar-content" class="sidebar span4"></div>\n    <div id="dashboard-content" class="list span8 pull-right"></div>\n  </div>\n</div>\n\n<div id="api-navbar"></div>';
}
return __p;
};

this["JST"]["app/addons/config/templates/dashboard.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row">\n  <div class="span2 offset10">\n    <button id="add-section" href="#" class="btn btn-primary button-margin">\n      <i class="icon-plus icon-white"> </i>\n      Add Section\n    </button>\n  </div>\n</div>\n<table class="config table table-striped table-bordered">\n  <thead>\n    <th> Section </th>\n    <th> Option </th>\n    <th> Value </th>\n    <th></th>\n  </thead>\n  <tbody>\n  </tbody>\n</table>\n<div id="add-section-modal" class="modal hide fade">\n  <div class="modal-header">\n    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n    <h3>Create Config Option</h3>\n  </div>\n  <div class="modal-body">\n    <form id="add-section-form" class="form well">\n      <label>Section</label>\n      <input type="text" name="section" placeholder="Section">\n      <span class="help-block">Enter an existing section name to add to it.</span>\n      <input type="text" name="name" placeholder="Name">\n      <br/>\n      <input type="text" name="value" placeholder="Value">\n      <div class="modal-footer">\n        <button type="button" class="btn" data-dismiss="modal">Cancel</button>\n        <button type="submit" class="btn btn-primary"> Save </button>\n      </div>\n    </form>\n  </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/addons/config/templates/item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 if (option.index === 0) {
;__p+='\n<th> '+
( option.section )+
' </th>\n';
 } else { 
;__p+='\n<td></td>\n';
 } 
;__p+='\n<td> '+
( option.name )+
' </td>\n<td>\n  <div id="show-value">\n    '+
( option.value )+
' <button class="edit-button"> Edit </button>\n  </div>\n  <div id="edit-value-form" style="display:none">\n    <input class="value-input" type="text" value="'+
( option.value )+
'" />\n    <button id="save-value" class="btn btn-success btn-small"> Save </button>\n    <button id="cancel-value" class="btn btn-danger btn-small"> Cancel </button>\n  </div>\n</td>\n<td id="delete-value"> <i class="icon-trash"> </i> </td>\n';
}
return __p;
};

this["JST"]["app/addons/logs/templates/dashboard.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+=' <h2> Couchdb Logs </h2>\n  <table class="table table-bordered" >\n  <thead>\n    <tr>\n      <th class="Date">Date</th>\n      <th class="Log Level">Log Value</th>\n      <th class="Pid">Pid</th>\n      <th class="Args">Url</th>\n    </tr>\n  </thead>\n\n  <tbody>\n    ';
 _.each(logs, function (log) { 
;__p+='\n    <tr class="'+
( log.log_level )+
'">\n      <td>\n        <!-- TODO: better format the date -->\n        '+
( log.date.replace(/ /g,'') )+
'\n      </td>\n      <td>\n        '+
( log.log_level.replace(/ /g,'') )+
'\n      </td>\n      <td>\n        '+
( _.escape(log.pid) )+
'\n      </td>\n      <td>\n        <!-- TODO: split the line, maybe put method in it\'s own column -->\n        '+
( _.escape(log.args) )+
'\n      </td>\n    </tr>\n    ';
 }); 
;__p+='\n  </tbody>\n</table>\n';
}
return __p;
};

this["JST"]["app/addons/logs/templates/filterItem.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<span class="label label-info"> '+
( filter )+
'  </span>\n<a class="label label-info remove-filter" href="#">&times;</a>\n';
}
return __p;
};

this["JST"]["app/addons/logs/templates/sidebar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="log-sidebar">\n  <form class="form-inline" id="log-filter-form">\n    <fieldset>\n      <legend>Log Filter</legend>\n      <input type="text" name="filter" placeholder="Type a filter to sort the logs by">\n      <!-- TODO: filter by method -->\n      <!-- TODO: correct removed filter behaviour -->\n      <button type="submit" class="btn">Filter</button>\n      <span class="help-block"> <h6> Eg. debug or <1.4.1> or any regex </h6> </span>\n    </fieldset>\n  </form>\n  <ul id="filter-list"></ul>\n</div>\n';
}
return __p;
};

this["JST"]["app/addons/stats/templates/by_method.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<h2>By Method <small>GET, POST, PUT, DELETE</small></h2>\n<div id="httpd_request_methods"></div>';
}
return __p;
};

this["JST"]["app/addons/stats/templates/pie_table.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="row">\n  <div class="span8">\n    <h2>  '+
( datatype )+
' </h2>\n  </div>\n</div>\n\n';
 if (datatype != "couchdb"){
;__p+='\n<div class="row">\n  <div class="span8" style="height:430px;">\n    <center>\n      <svg id="'+
( datatype )+
'_graph"></svg>\n    </center>\n  </div>\n</div>\n';
 } 
;__p+='\n<div class="row">\n  <div class="span8">\n    <table class="table table-condensed table-striped">\n      <thead>\n        <tr>\n          <th> Description </th>\n          <th> current </th>\n          <th>  sum </th>\n          <th>  mean </th>\n          <th>  stddev </th>\n          <th>  min </th>\n          <th>  max </th>\n        </tr>\n      </thead>\n      ';
 _.each (statistics, function (stat_line) {
        if (stat_line.get("sum")){
       
;__p+='\n      <tr>\n        <td>'+
( stat_line.get("description") )+
'</td>\n        <td>'+
( stat_line.get("current") )+
'</td>\n        <td>'+
( stat_line.get("sum") )+
'</td>\n        <td>'+
( stat_line.get("mean") )+
'</td>\n        <td>'+
( stat_line.get("stddev") )+
'</td>\n        <td>'+
( stat_line.get("min") )+
'</td>\n        <td>'+
( stat_line.get("max") )+
'</td>\n      </tr>\n      ';
 }}) 
;__p+='\n    </table>\n  </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/addons/stats/templates/stats.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="datatypes">\n</div>\n';
}
return __p;
};

this["JST"]["app/addons/stats/templates/statselect.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
 _.each(datatypes, function (datatype) { 
;__p+='\n<li> \n<a href="#stats" class="datatype-select" data-type-select="'+
( datatype )+
'"> \n  '+
( datatype )+
'\n  <i class="icon-chevron-right" style="float:right"></i>\n</a>\n</li>\n';
 }); 
;__p+='\n';
}
return __p;
};