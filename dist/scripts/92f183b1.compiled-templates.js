this["JST"] = this["JST"] || {};

this["JST"]["application"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<p>Your content here</p>\n\n";};

this["JST"]["dashboard"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "      <div class=\"content centered\">\n        <h2 class=\"top\">";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "New events for minutes.io  since your last visit <span class=\"timeago\">";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.since;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</span></h2>\n        <h3 class=\"top\">Users</h3>\n        <div class=\"row-fluid statistics\">\n          <div class=\"panel success span4\">\n            <span>New signups/past 30 days</span>\n            <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.signups;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h1>\n          </div>\n          <div class=\"panel warning span4\">\n            <span>Account deletions/past 30 days</span>\n            <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.account_deletions;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h1>\n          </div>\n          <div class=\"panel success span4\">\n            <span>Growth/past 30 days</span>\n            <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.growth;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "%</h1>\n          </div>\n        </div>\n        <div class=\"row-fluid statistics\">\n          <div class=\"panel info span4\">\n            <span>Total</span>\n            <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.users_total;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h1>\n          </div>\n          <div class=\"panel info span4\">\n            <span>Active/past 30 days</span>\n            <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.users_active;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h1>\n          </div>\n          <div class=\"panel warning span4\">\n            <span>Activity/past 30 days</span>\n            <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.active;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "%</h1>\n          </div>\n        </div>\n        <h3>Messages and errors</h3>\n        <div class=\"alert alert-error\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n          <ul>\n            <li>Module Mail reports error: Cannot send email (about 4 hours ago)</li>\n            <li>Module Mail reports error: Cannot send email (about 4 hours ago)</li>\n            <li>Module Mail reports error: Cannot send email (about 5 hours ago)</li>\n            <li>46 additional new errors in this module</li>\n          </ul>\n        </div>\n        <div class=\"alert alert-info\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n          <ul>\n            <li>Module Signup confirmation reports: New user confirmed! (about 6 hours ago)</li>\n          </ul>\n        </div>\n      </div>";
  return buffer;};

this["JST"]["modules/worker-email-out"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"description\">E-Mail out is in charge of all outgoing mail from this Hoodie instance</span>\n<form action=\"\">\n  <section>\n    <div class=\"formLabel\">\n      <label>From address</label>\n    </div>\n    <div class=\"form\">\n      <input type=\"email\" placeholder=\"";
  stack1 = depth0.appInfo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.defaultReplyMailAddress;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\" required>\n      <span class=\"note\">From address for all of your app's emails.</span>\n    </div>\n  </section>\n</form>";
  return buffer;};

this["JST"]["modules/worker-email-signup-confirmation"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"description\">Configure whether users must confirm their signup and if yes, set up the email they will receive for this purpose.</span>\n<form action=\"\">\n  <section>\n    <div class=\"formLabel\">\n      <label>Signup confirmation</label>\n    </div>\n    <div class=\"form\">\n      <label class=\"checkbox\">\n        <input type=\"checkbox\" class=\"formCondition\" data-conditions=\"true:.confirmationOptions\"> is mandatory\n      </label>\n    </div>\n  </section>\n\n  <section class=\"confirmationOptions\">\n    <div class=\"formLabel\">\n      <label>From address</label>\n    </div>\n    <div class=\"form\">\n      <input type=\"email\" placeholder=\"";
  stack1 = depth0.appInfo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.defaultReplyMailAddress;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\" required>\n      <span class=\"note\">From address for all of your app's emails.</span>\n    </div>\n  </section>\n\n  <section class=\"confirmationOptions\">\n    <div class=\"formLabel\">\n      <label>Subject line</label>\n    </div>\n    <div class=\"form\">\n      <input type=\"text\" placeholder=\"Please confirm your signup at ";
  stack1 = depth0.appInfo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">\n    </div>\n  </section>\n\n  <section class=\"confirmationOptions\">\n    <div class=\"formLabel\">\n      <label>Body</label>\n    </div>\n    <div class=\"form\">\n      <textarea rows=\"4\">Hello (name)! Thanks for signing up with ";
  stack1 = depth0.appInfo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</textarea>\n    </div>\n  </section>\n</form>";
  return buffer;};

this["JST"]["modules"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <div class=\"module\" id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">\n    <legend>";
  foundHelper = helpers.cleanName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</legend>\n    ";
  foundHelper = helpers.formHTML;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.formHTML; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  ";
  return buffer;}

  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">Modules</h2>\n  ";
  stack1 = depth0.modules;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;};

this["JST"]["sidebar-modules"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n<li>\n  <a href=\"/#modules/";
  foundHelper = helpers.url;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\" title=\"";
  foundHelper = helpers.cleanName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">\n    <span class=\"name\">";
  foundHelper = helpers.cleanName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</span>\n    <span class=\"badge ";
  foundHelper = helpers.badgeStatus;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.badgeStatus; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">";
  foundHelper = helpers.messageAmount;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.messageAmount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</span>\n  </a>\n</li>\n";
  return buffer;}

  stack1 = depth0.modules;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }};

this["JST"]["sidebar"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "      <header>\n        <div class=\"logo ir\">Hoodie Pocket</div>\n        <h1><a href=\"/#\"></a></h1>\n      </header>\n      <nav>\n        <ul class=\"core\">\n          <li class=\"users\"><a href=\"/#users\">Users<span class=\"badge\"></span></a></li>\n          <li><a href=\"/#data\">Data</a></li>\n        </ul>\n        <ul class=\"modules\">\n        </ul>\n      </nav>";};

this["JST"]["users"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n            <tr>\n              <td>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n              <td>";
  foundHelper = helpers.lastLogin;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastLogin; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n              <td>";
  foundHelper = helpers.signedUpAt;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n              <td>";
  foundHelper = helpers.state;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n              <td>resend / new</td>\n              <td>edit / delete</td>\n            </tr>\n            ";
  return buffer;}

  buffer += "<div class=\"content centered\">\n        <h2 class=\"top\">Users</h2>\n        <div class=\"userSearch\">\n          <form class=\"form-search\">\n            <input type=\"text\" class=\"input-large search-query\" placeholder=\"Search in users\">\n            <button type=\"submit\" class=\"btn\">Search</button>\n          </form>\n          <div class=\"pagination pagination-right\">\n            <ul>\n              <li class=\"disabled\"><a href=\"#\">Prev</a></li>\n              <li class=\"active\"><a href=\"#\">1</a></li>\n              <li><a href=\"#\">2</a></li>\n              <li><a href=\"#\">3</a></li>\n              <li><a href=\"#\">4</a></li>\n              <li><a href=\"#\">5</a></li>\n              <li><a href=\"#\">Next</a></li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"tableStatus\">\n          <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n          <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n        </div>\n        <table class=\"table\">\n          <thead>\n            <tr>\n              <th>Email</th>\n              <th>Last seen</th>\n              <th>Signup date</th>\n              <th>State</th>\n              <th>Password</th>\n              <th></th>\n            </tr>\n          </thead>\n          <tbody>\n            ";
  stack1 = depth0.users;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </tbody>\n        </table>\n        <div class=\"tableStatus\">\n          <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n          <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n        </div>\n        <div class=\"userSearch\">\n\n        <div class=\"pagination pagination-right\">\n          <ul>\n            <li class=\"disabled\"><a href=\"#\">Prev</a></li>\n            <li class=\"active\"><a href=\"#\">1</a></li>\n            <li><a href=\"#\">2</a></li>\n            <li><a href=\"#\">3</a></li>\n            <li><a href=\"#\">4</a></li>\n            <li><a href=\"#\">5</a></li>\n            <li><a href=\"#\">Next</a></li>\n          </ul>\n        </div>\n        </div>\n      </div>\n";
  return buffer;};