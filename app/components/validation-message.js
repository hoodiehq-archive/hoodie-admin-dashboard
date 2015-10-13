import Ember from 'ember';

/*

Waits until the first proper validation error before it displays any error messages.
Needs to have two params passed into the template:

errors (from ember-validations)
pristine (you provide this)

Errors is just the ember-validations error object. Pristine is either true or false
and defines whether to show validations at all (if true, then no, until an input is made).

The component is a block and yields an input

{{#validation-message errors=errors.model.newUserName pristine=pristine.model.newUserName}}
  {{input type="text" class="form-control username" placeholder="User name" required="" value=model.newUserName disabled=disableAdd}}
{{/validation-message}}

*/

export default Ember.Component.extend();
