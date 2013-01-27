class pocket.Views.BaseView extends Backbone.View

  # A global view helper
  helper: ->
    console.log "HELPDERP"

  # Turns "email-out" into "Email out"
  makeURLHuman: (@string) ->
    result = @string.replace(/-/g,' ')
    result = result.charAt(0).toUpperCase() + result.slice(1)

  # Generates a default address for email placeholders
  defaultReplyMail: (@appName) ->
    if !@appName
      return "please-reply@your-app.com"
    if @appName.indexOf(".") is -1
      return "please-reply@"+@appName+".com"
    else
      return "please-reply@"+@appName
