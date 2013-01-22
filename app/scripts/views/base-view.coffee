class pocket.Views.baseView extends Backbone.View

  helper: ->
    console.log "HELPDERP"

  # Turns "email-out" into "Email out"
  makeURLHuman: (@string) ->
    result = @string.replace(/-/g,' ')
    result = result.charAt(0).toUpperCase() + result.slice(1)

  defaultReplyMail: (@appName) ->
    console.log("appName: ",@appName);
    if !@appName
      return "please-reply@your-app.com"
    if @appName.indexOf(".") is -1
      return "please-reply@"+@appName+".com"
    else
      return "please-reply@"+@appName