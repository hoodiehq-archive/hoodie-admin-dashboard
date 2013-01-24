# Hoodie.AdminLogs
# ================

#
class Hoodie.AdminLogs

  constructor: (admin) ->
    @admin  = admin
    @hoodie = admin.hoodie

  findAll : ->
    @hoodie.resolveWith []