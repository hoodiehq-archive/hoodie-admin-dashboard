this["JST"] = this["JST"] || {};

this["JST"]["dashboard"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\n  <div class=\"alert alert-error\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n    <ul>\n      <li>\n        <a href=\"/modules/appconfig\"><strong>Appconfig:</strong><br>\n        Emails cannot be send, please configure email transport.</a>\n      </li>\n    </ul>\n  </div>\n  ";}

  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">New events for ";
  stack1 = depth0.appInfo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + " since your last visit <span class=\"timeago\" title=\"";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.since;
  stack2 = {};
  foundHelper = helpers.convertTimestampToISO;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "convertTimestampToISO", stack1, {hash:stack2,data:data});
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.since;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</span></h2>\n\n  ";
  stack1 = depth0.emailTransportNotConfigured;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"alert alert-info\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n    <ul>\n      <li>Module Signup confirmation reports: New user confirmed! (about 6 hours ago)</li>\n    </ul>\n  </div>\n\n  <div class=\"row-fluid statistics\">\n    <div class=\"panel success span4\">\n      <span>New signups/past 30 days</span>\n      <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.signups;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h1>\n    </div>\n    <div class=\"panel warning span4\">\n      <span>Account deletions/past 30 days</span>\n      <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.account_deletions;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h1>\n    </div>\n    <div class=\"panel success span4\">\n      <span>Growth/past 30 days</span>\n      <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.growth;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "%</h1>\n    </div>\n  </div>\n  <div class=\"row-fluid statistics\">\n    <div class=\"panel info span4\">\n      <span>Total Users</span>\n      <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.users_total;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h1>\n    </div>\n    <div class=\"panel info span4\">\n      <span>Active Users / past 30 days</span>\n      <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.users_active;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h1>\n    </div>\n    <div class=\"panel warning span4\">\n      <span>Activity / past 30 days</span>\n      <h1>";
  stack1 = depth0.stats;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.active;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "%</h1>\n    </div>\n  </div>\n</div>\n";
  return buffer;};

this["JST"]["layouts/application"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"topbar\">\n  <a href=\"#\" class=\"signOut\">Sign out</a>\n</div>\n<div class=\"sidebar\">\n  sidebar\n</div>\n<div class=\"main\">\n  main\n</div>";};

this["JST"]["main"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<a href=\"#\" class=\"signOut\">Sign out</a>\n\n<div class=\"sidebar\">\n\n</div>\n<div class=\"main\">\n\n</div>\n";};

this["JST"]["module"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">";
  stack1 = depth0.module;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.cleanName;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</h2>\n\n  <div class=\"module-content\"></div>\n</div>\n";
  return buffer;};

this["JST"]["modules/appconfig"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h2>Set GMAIL email &amp; password for sending emails</h2>\n\n<form class=\"email form-horizontal\" action=\"\">\n  <span class=\"error\"></span>\n  <div class=\"control-group\">\n    <label class=\"control-label\">Service</label>\n    <div class=\"controls\">\n      <select>\n        <option>GMAIL</option>\n      </select>\n    </div>\n  </div>\n  <div class=\"control-group\">\n    <label class=\"control-label\">Username</label>\n    <div class=\"controls\">\n      <input class=\"username\" type=\"text\" placeholder=\"me@gmail.com\" value=\"";
  stack1 = depth0.config;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.email;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.transport;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.auth;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.user;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">\n    </div>\n  </div>\n  <div class=\"control-group\">\n    <label class=\"control-label\">Password</label>\n    <div class=\"controls\">\n      <input class=\"password\" type=\"password\" value=\"";
  stack1 = depth0.config;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.email;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.transport;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.auth;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.pass;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">\n    </div>\n  </div>\n\n  <div class=\"control-group\">\n    <div class=\"controls\">\n      <button class=\"submit btn\" type=\"submit\">Submit</button>\n    </div>\n  </div>\n\n</form>\n";
  return buffer;};

this["JST"]["modules/email-out"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"module\" id=\"";
  stack1 = depth0.module;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">\n  <legend>Settings</legend>\n\n  <span class=\"description\">E-Mail out is in charge of all outgoing mail from this Hoodie instance</span>\n  <form action=\"\">\n    <section>\n      <div class=\"formLabel\">\n        <label>From address</label>\n      </div>\n      <div class=\"form\">\n        <input type=\"email\" placeholder=\"";
  foundHelper = helpers.defaultReplyMailAddress;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.defaultReplyMailAddress; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\" required>\n        <span class=\"note\">From address for all of your app's emails.</span>\n      </div>\n    </section>\n  </form>\n</div>\n";
  return buffer;};

this["JST"]["modules/logs"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "hello from /app/scrits/templates/modules/logs.hbs\n";};

this["JST"]["modules/sharings"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "hello from /app/scrits/templates/modules/sharings.hbs\n";};

this["JST"]["modules/users"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <section>\n      <div class=\"formLabel\">\n        <label>Signup confirmation</label>\n      </div>\n      <div class=\"form\">\n        <span class=\"note\">Email needs to be configured in <a href=\"/modules/appconfig\">Appconfig</a> before enabling signup confirmation</span>\n      </div>\n    </section>\n    ";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <section>\n      <div class=\"formLabel\">\n        <label>Signup confirmation</label>\n      </div>\n      <div class=\"form\">\n        <label class=\"checkbox\">\n          <input type=\"checkbox\" name=\"confirmationMandatory\" class=\"formCondition\" data-conditions=\"true:.confirmationOptions\"> is mandatory\n        </label>\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"formLabel\">\n        <label>From address</label>\n      </div>\n      <div class=\"form\">\n        <input type=\"email\" name=\"confirmationEmailFrom\" value=\"";
  stack1 = depth0.config;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailFrom;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\" placeholder=\"";
  foundHelper = helpers.defaultReplyMailAddress;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.defaultReplyMailAddress; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\" required>\n        <span class=\"note\">From address for all of your app's emails.</span>\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"formLabel\">\n        <label>Subject line</label>\n      </div>\n      <div class=\"form\">\n        <input type=\"text\" name=\"confirmationEmailSubject\" value=\"";
  stack1 = depth0.config;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailSubject;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\" placeholder=\"Please confirm your signup at ";
  stack1 = depth0.appInfo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"formLabel\">\n        <label>Body</label>\n      </div>\n      <div class=\"form\">\n        <textarea rows=\"4\" name=\"confirmationEmailText\">";
  stack1 = depth0.config;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailText;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</textarea>\n      </div>\n    </section>\n\n    <section>\n      <div class=\"formLabel\">\n        &nbsp;\n      </div>\n      <div class=\"form\">\n        <button class=\"btn\" type=\"submit\">update</button>\n      </div>\n    </section>\n    ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <tr>\n        <td>";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n        <td>";
  foundHelper = helpers.lastLogin;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastLogin; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n        <td>";
  foundHelper = helpers.signedUpAt;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n        <td>";
  foundHelper = helpers.state;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n        <td>resend / new</td>\n        <td>edit / delete</td>\n      </tr>\n      ";
  return buffer;}

  buffer += "<div class=\"module\" id=\"";
  stack1 = depth0.module;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "\">\n  <legend>Settings</legend>\n\n  <span class=\"description\">Configure whether users must confirm their signup and if yes, set up the email they will receive for this purpose.</span>\n\n  <form class=\"config\">\n    ";
  stack1 = depth0.emailTransportNotConfigured;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </form>\n</div>\n\n<hr>\n\n<div class=\"content centered\">\n  <h2 class=\"top\">Users</h2>\n  <div class=\"userSearch\">\n    <form class=\"form-search\">\n      <div class=\"input-append\">\n        <input type=\"text\" class=\"span2 search-query\">\n        <button type=\"submit\" class=\"btn\">Search</button>\n      </div>\n    </form>\n  </div>\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n    <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n  </div>\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th>Email</th>\n        <th>Last seen</th>\n        <th>Signup date</th>\n        <th>State</th>\n        <th>Password</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      ";
  stack1 = depth0.users;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n    <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n  </div>\n</div>\n";
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
  


  return "<header>\n  <div class=\"logo ir\">Hoodie Pocket</div>\n  <div class=\"appName\"><div><a href=\"/#\"></a></div></div>\n</header>\n<nav>\n  <ul class=\"modules\"></ul>\n</nav>\n";};

this["JST"]["signin"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"signInContainer\">\n  <div class=\"logo ir\">Hoodie Pocket</div>\n  <h2 class=\"top\">";
  foundHelper = helpers['a'];
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['a']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + " Welcome to ";
  stack1 = depth0.appInfo;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += Handlebars.Utils.escapeExpression(stack1) + "'s Pocket</h2>\n  <form class=\"signIn\">\n    <section class=\"noBorder\">\n      <span class=\"error\"></span>\n      <div class=\"formLabel\">\n        <label>Admin password</label>\n      </div>\n      <div class=\"form\">\n        <input id=\"signInPassword\" type=\"password\" autofocus>\n      </div>\n      <div class=\"formLabel\">\n      </div>\n      <div class=\"form\">\n        <button id=\"signIn\" type=\"submit\" class=\"btn\">Sign in!</button>\n      </div>\n    </section>\n  </form>\n</div>\n";
  return buffer;};

this["JST"]["users"] = function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <tr>\n        <td>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n        <td>";
  foundHelper = helpers.lastLogin;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastLogin; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n        <td>";
  foundHelper = helpers.signedUpAt;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n        <td>";
  foundHelper = helpers.state;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += Handlebars.Utils.escapeExpression(stack1) + "</td>\n        <td>resend / new</td>\n        <td>edit / delete</td>\n      </tr>\n      ";
  return buffer;}

  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">Users</h2>\n  <div class=\"userSearch\">\n    <form class=\"form-search\">\n      <div class=\"input-append\">\n        <input type=\"text\" class=\"span2 search-query\">\n        <button type=\"submit\" class=\"btn\">Search</button>\n      </div>\n    </form>\n  </div>\n  <div class=\"tableStatus\" >\n    <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n    <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n  </div>\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th>Email</th>\n        <th>Last seen</th>\n        <th>Signup date</th>\n        <th>State</th>\n        <th>Password</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      ";
  stack1 = depth0.users;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n    <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n  </div>\n</div>\n";
  return buffer;};