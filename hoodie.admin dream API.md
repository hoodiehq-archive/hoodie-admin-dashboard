hoodie.admin dream API
========================

```js
hoodie.admin.users.findAll()
hoodie.admin.users.total()
hoodie.admin.users.search("joe")
hoodie.admin.users.search("joe", {limit: 10})

hoodie.admin.config.get('default_email_from')
hoodie.admin.config.set('default_email_from', 'hello@boom.com')

hoodie.admin.on('error', handleError)
hoodie.admin.on('log', handleLog)

hoodie.admin.logs.findAll()
```