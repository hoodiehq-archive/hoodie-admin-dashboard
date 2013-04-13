this["JST"] = this["JST"] || {};

this["JST"]["dashboard"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "\n  <div class=\"alert alert-error\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n    <ul>\n      <li>\n        <a href=\"/modules/appconfig\"><strong>Appconfig:</strong><br>\n        Emails cannot be sent, please configure email transport.</a>\n      </li>\n    </ul>\n  </div>\n  ";
  }

  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">New events for "
    + escapeExpression(((stack1 = ((stack1 = depth0.appInfo),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " since your last visit <span class=\"timeago\" title=\"";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.convertTimestampToISO),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.since), options) : helperMissing.call(depth0, "convertTimestampToISO", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.since), options)))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.since)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></h2>\n\n  ";
  stack2 = helpers['if'].call(depth0, depth0.emailTransportNotConfigured, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  <div class=\"alert alert-info\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n    <ul>\n      <li>Module Signup confirmation reports: New user confirmed! (about 6 hours ago)</li>\n    </ul>\n  </div>\n\n  <div class=\"row-fluid statistics\">\n    <div class=\"panel span4 ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.positiveSuccessNegativeWarning),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.signups), options) : helperMissing.call(depth0, "positiveSuccessNegativeWarning", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.signups), options)))
    + "\">\n      <span>New signups/past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.signups)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n    </div>\n    <div class=\"panel span4 ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.positiveWarningNegativeSuccess),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.account_deletions), options) : helperMissing.call(depth0, "positiveWarningNegativeSuccess", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.account_deletions), options)))
    + "\">\n      <span>Account deletions/past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.account_deletions)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n    </div>\n    <div class=\"panel span4 ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.positiveSuccessNegativeWarning),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.growth), options) : helperMissing.call(depth0, "positiveSuccessNegativeWarning", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.growth), options)))
    + "\">\n      <span>Growth/past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.growth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%</h1>\n    </div>\n  </div>\n  <div class=\"row-fluid statistics\">\n    <div class=\"panel info span4\">\n      <span>Total Users</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.users_total)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n    </div>\n    <div class=\"panel info span4\">\n      <span>Active Users / past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.users_active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n    </div>\n    <div class=\"panel span4 ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.positiveSuccessNegativeWarning),stack1 ? stack1.call(depth0, ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.active), options) : helperMissing.call(depth0, "positiveSuccessNegativeWarning", ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.active), options)))
    + "\">\n      <span>Activity / past 30 days</span>\n      <h1>"
    + escapeExpression(((stack1 = ((stack1 = depth0.stats),stack1 == null || stack1 === false ? stack1 : stack1.active)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%</h1>\n    </div>\n  </div>\n</div>\n";
  return buffer;
  });

this["JST"]["layouts/application"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<div class=\"topbar\">\n  <a href=\"#\" class=\"signOut\">Sign out</a>\n</div>\n<div class=\"sidebar\">\n  sidebar\n</div>\n<div class=\"main\">\n  main\n</div>";
  });

this["JST"]["main"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<a href=\"#\" class=\"signOut\">Sign out</a>\n\n<div class=\"sidebar\">\n\n</div>\n<div class=\"main\">\n\n</div>\n";
  });

this["JST"]["module"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.module),stack1 == null || stack1 === false ? stack1 : stack1.cleanName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n\n  <div class=\"module-content\"></div>\n</div>\n";
  return buffer;
  });

this["JST"]["modules/appconfig"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"module\">\n  <legend>Email Settings</legend>\n  <span class=\"description\">Set up all outgoing email from this Hoodie app</span>\n  <form class=\"email form-horizontal\" action=\"\">\n    <section>\n      <div class=\"control-group\">\n        <label>Service</label>\n        <div class=\"controls\">\n          <select>\n            <option>gMail</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label>Username</label>\n        <div class=\"controls\">\n          <input class=\"username\" type=\"email\" placeholder=\"me@gmail.com\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.email)),stack1 == null || stack1 === false ? stack1 : stack1.transport)),stack1 == null || stack1 === false ? stack1 : stack1.auth)),stack1 == null || stack1 === false ? stack1 : stack1.user)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n      </div>\n\n      <div class=\"control-group\">\n        <label>Password</label>\n        <div class=\"controls\">\n          <input class=\"password\" type=\"password\" value=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.email)),stack1 == null || stack1 === false ? stack1 : stack1.transport)),stack1 == null || stack1 === false ? stack1 : stack1.auth)),stack1 == null || stack1 === false ? stack1 : stack1.pass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n      </div>\n\n    </section>\n    <section>\n      <label></label>\n      <div class=\"controls\">\n        <button class=\"submit btn\" type=\"submit\">Submit</button>\n        <span class=\"submitMessage\"></span>\n      </div>\n    </section>\n  </form>\n</div>\n\n";
  return buffer;
  });

this["JST"]["modules/email-out"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"module\" id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.module),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <legend>Settings</legend>\n\n  <span class=\"description\">E-Mail out is in charge of all outgoing mail from this Hoodie instance</span>\n  <form action=\"\">\n    <section>\n      <div class=\"formLabel\">\n        <label>From address</label>\n      </div>\n      <div class=\"form\">\n        <input type=\"email\" placeholder=\"";
  if (stack2 = helpers.defaultReplyMailAddress) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.defaultReplyMailAddress; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" required>\n        <span class=\"note\">From address for all of your app's emails.</span>\n      </div>\n    </section>\n  </form>\n</div>\n";
  return buffer;
  });

this["JST"]["modules/logs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "hello from /app/scrits/templates/modules/logs.hbs\n";
  });

this["JST"]["modules/sharings"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "hello from /app/scrits/templates/modules/sharings.hbs\n";
  });

this["JST"]["modules/users"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n    <section>\n      <div class=\"control-group\">\n        <label>\n          Signup confirmation\n        </label>\n        <div class=\"controls\">\n          <span class=\"note\">Email needs to be configured in <a href=\"/modules/appconfig\">Appconfig</a> before enabling signup confirmation</span>\n        </div>\n      </div>\n    </section>\n    ";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <section>\n      <div class=\"control-group\">\n        <label>\n          Signup confirmation\n        </label>\n        <div class=\"controls\">\n          <label class=\"checkbox\">\n            <input type=\"checkbox\" name=\"confirmationMandatory\" class=\"formCondition\" data-conditions=\"true:.confirmationOptions\"> is mandatory\n          </label>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"control-group\">\n        <label>\n          From address\n        </label>\n        <div class=\"controls\">\n          <input type=\"email\" name=\"confirmationEmailFrom\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailFrom)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"";
  if (stack2 = helpers.defaultReplyMailAddress) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.defaultReplyMailAddress; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "\" required>\n          <span class=\"note\">From address for all of your app's emails.</span>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"control-group\">\n        <label>\n          Subject line\n        </label>\n        <div class=\"controls\">\n          <input type=\"text\" name=\"confirmationEmailSubject\" value=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailSubject)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"Please confirm your signup at "
    + escapeExpression(((stack1 = ((stack1 = depth0.appInfo),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n      </div>\n    </section>\n\n    <section class=\"confirmationOptions\">\n      <div class=\"control-group\">\n        <label>\n          Body\n        </label>\n        <div class=\"controls\">\n          <textarea rows=\"4\" name=\"confirmationEmailText\">"
    + escapeExpression(((stack1 = ((stack1 = depth0.config),stack1 == null || stack1 === false ? stack1 : stack1.confirmationEmailText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n        </div>\n      </div>\n    </section>\n\n    <section>\n      <div class=\"control-group\">\n        <label>\n          &nbsp;\n        </label>\n        <div class=\"controls\">\n          <button class=\"btn\" type=\"submit\">Update</button>\n        </div>\n      </div>\n    </section>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <table class=\"table users\">\n    <thead>\n      <tr>\n        <th>Username</th>\n        <th>Last seen</th>\n        <th>Signup date</th>\n        <th>State</th>\n        <th>Password</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      ";
  stack1 = helpers.each.call(depth0, depth0.users, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n  ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-type=\"";
  if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        <td>";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (stack1 = helpers.lastLogin) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastLogin; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td class=\"timeago\" title=\"";
  if (stack1 = helpers.signedUpAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.signedUpAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>resend / new</td>\n        <td><a href=\"#\" class=\"edit\">edit</a> / <a href=\"#\" class=\"remove\">delete</a></td>\n      </tr>\n      ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">";
  if (stack1 = helpers.resultsDesc) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.resultsDesc; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n    <p class=\"currentSearchMetrics muted\">Showing "
    + escapeExpression(((stack1 = ((stack1 = depth0.users),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " of ";
  if (stack2 = helpers.totalUsers) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.totalUsers; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " users</p>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<div class=\"module\" id=\""
    + escapeExpression(((stack1 = ((stack1 = depth0.module),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <legend>Settings</legend>\n\n  <span class=\"description\">Configure whether users must confirm their signup and if yes, set up the email they will receive for this purpose.</span>\n\n  <form class=\"config form-horizontal\">\n    ";
  stack2 = helpers['if'].call(depth0, depth0.emailTransportNotConfigured, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  </form>\n</div>\n\n<hr>\n\n<div class=\"content centered\">\n  <h2 class=\"top\">Users</h2>\n  <fieldset class=\"toggle\">\n    <legend class=\"toggler\">Add and remove test users</legend>\n    <div class=\"togglee\">\n      <legend>Add test users</legend>\n      <form class=\"form-horizontal addTestUsers\">\n        <section class=\"noBorder\">\n          <div class=\"control-group\">\n            <label>\n              Number of test users\n            </label>\n            <div class=\"controls\">\n              <input type=\"text\" name=\"amountOfTestUsers\" class=\"amountOfTestUsers\" value=\"\" placeholder=\"1\">\n            </div>\n          </div>\n        </section>\n        <section>\n          <div class=\"control-group\">\n            <label>\n              &nbsp;\n            </label>\n            <div class=\"controls\">\n              <button class=\"btn\" type=\"submit\">Add test users</button>\n              <span class=\"submitMessage\"></span>\n            </div>\n          </div>\n        </section>\n      </form>\n      <legend>Remove test users</legend>\n      <form class=\"form-horizontal removeTestUsers\">\n        <section class=\"noBorder\">\n          <div class=\"control-group\">\n            <label>\n              &nbsp;\n            </label>\n            <div class=\"controls\">\n              <button class=\"btn\" type=\"submit\">Remove all test users</button>\n              <span class=\"submitMessage\"></span>\n            </div>\n          </div>\n        </section>\n      </form>\n    </div>\n  </fieldset>\n  <fieldset class=\"toggle\">\n    <legend class=\"toggler\">Add real user</legend>\n    <div class=\"togglee\">\n      <legend>Add real user</legend>\n      <form class=\"form-horizontal addRealUser\">\n        <section class=\"noBorder\">\n          <div class=\"control-group\">\n            <label>\n              Username\n            </label>\n            <div class=\"controls\">\n              <input type=\"text\" name=\"username\" class=\"username\" value=\"\" placeholder=\"username\">\n            </div>\n          </div>\n        </section>\n        <section class=\"noBorder\">\n          <div class=\"control-group\">\n            <label>\n              Password\n            </label>\n            <div class=\"controls\">\n              <input type=\"text\" name=\"password\" class=\"password\" value=\"\" placeholder=\"\">\n            </div>\n          </div>\n        </section>\n        <section>\n          <div class=\"control-group\">\n            <label>\n              &nbsp;\n            </label>\n            <div class=\"controls\">\n              <button class=\"btn\" type=\"submit\">Add user</button>\n              <span class=\"submitMessage\"></span>\n            </div>\n          </div>\n        </section>\n      </form>\n    </div>\n  </fieldset>\n  <div class=\"userSearch\">\n    <form class=\"form-search\">\n      <div class=\"input-append\">\n        <input type=\"text\" class=\"span2 search-query\" placeholder=\"Username\">\n        <button type=\"submit\" class=\"btn\">Search</button>\n      </div>\n    </form>\n  </div>\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">";
  if (stack2 = helpers.resultsDesc) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.resultsDesc; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</p>\n    <p class=\"currentSearchMetrics muted\">Showing "
    + escapeExpression(((stack1 = ((stack1 = depth0.users),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " of ";
  if (stack2 = helpers.totalUsers) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.totalUsers; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + " users</p>\n  </div>\n  ";
  stack2 = helpers['if'].call(depth0, depth0.users, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n  ";
  stack2 = helpers['if'].call(depth0, depth0.users, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["JST"]["sidebar-modules"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>\n  <a href=\"/#modules/";
  if (stack1 = helpers.url) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" title=\"";
  if (stack1 = helpers.cleanName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"";
  if (stack1 = helpers.cleanName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n    <span class=\"name\">";
  if (stack1 = helpers.cleanName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.cleanName; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n    <span class=\"badge ";
  if (stack1 = helpers.badgeStatus) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.badgeStatus; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.messageAmount) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.messageAmount; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n  </a>\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0.modules, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["sidebar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<header>\n  <div class=\"logo ir\">Hoodie Pocket</div>\n  <div class=\"appName\"><div><a href=\"/#\"></a></div></div>\n</header>\n<nav>\n  <ul class=\"modules\"></ul>\n</nav>\n";
  });

this["JST"]["signin"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"signInContainer\">\n  <div class=\"logo ir\">Hoodie Pocket</div>\n  <h2 class=\"top\">";
  if (stack1 = helpers['a']) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0['a']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " Welcome to "
    + escapeExpression(((stack1 = ((stack1 = depth0.appInfo),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'s Pocket</h2>\n  <form class=\"signIn form-horizontal\">\n    <section class=\"noBorder\">\n      <span class=\"error\"></span>\n      <div class=\"control-group\">\n        <label>Admin password</label>\n        <div class=\"controls\">\n          <input id=\"signInPassword\" type=\"password\" autofocus>\n        </div>\n      </div>\n      <div class=\"control-group\">\n        <label></label>\n        <div class=\"controls\">\n          <button id=\"signIn\" type=\"submit\" class=\"btn\">Sign in!</button>\n        </div>\n      </div>\n    </section>\n  </form>\n</div>\n";
  return buffer;
  });

this["JST"]["users"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (stack1 = helpers.lastLogin) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lastLogin; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td class=\"timeago\" title=\"";
  if (stack1 = helpers.signedUpAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.signedUpAt) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.signedUpAt; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>";
  if (stack1 = helpers.state) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.state; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n        <td>resend / new</td>\n        <td>edit / delete</td>\n      </tr>\n      ";
  return buffer;
  }

  buffer += "<div class=\"content centered\">\n  <h2 class=\"top\">Users</h2>\n  <div class=\"userSearch\">\n    <form class=\"form-search\">\n      <div class=\"input-append\">\n        <input type=\"text\" class=\"span2 search-query\">\n        <button type=\"submit\" class=\"btn\">Search</button>\n      </div>\n    </form>\n  </div>\n  <div class=\"tableStatus\" >\n    <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n    <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n  </div>\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th>Username</th>\n        <th>Last seen</th>\n        <th>Signup date</th>\n        <th>State</th>\n        <th>Password</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      ";
  stack1 = helpers.each.call(depth0, depth0.users, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n  <div class=\"tableStatus\">\n    <p class=\"currentSearchTerm muted\">Currently displaying all users</p>\n    <p class=\"currentSearchMetrics muted\">Showing 50 of 4211 users</p>\n  </div>\n</div>\n";
  return buffer;
  });