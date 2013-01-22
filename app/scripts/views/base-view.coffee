class pocket.Views.baseView extends Backbone.View

  helper: ->
    console.log "HELPDERP"

  # Turns "email-out" into "Email out"
  makeURLHuman: (@string) ->
    result = @string.replace(/-/g,' ')
    result = result.charAt(0).toUpperCase() + result.slice(1)