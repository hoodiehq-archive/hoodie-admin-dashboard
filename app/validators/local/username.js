import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function(){
    var username = this.model.get(this.property);
    if(!username){
      this.errors.pushObject('The username cannot be empty');
    } else if(username.match(/[A-Z]/)){
      this.errors.pushObject('The username cannot contain uppercase letters');
    } else if(!username[0].match(/[a-z]/)){
      this.errors.pushObject('The username must start with a letter');
    } else if(username.length < 5){
      this.errors.pushObject('The username must be longer than 5 characters');
    }
  }
});
