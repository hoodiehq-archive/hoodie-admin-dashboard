!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.app=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"backbone.marionette":[function(_dereq_,module,exports){
module.exports=_dereq_('Mn2A9x');
},{}],"backbone.syphon":[function(_dereq_,module,exports){
module.exports=_dereq_('zpJqfl');
},{}],"backbone":[function(_dereq_,module,exports){
module.exports=_dereq_('atSdsZ');
},{}],"gridster":[function(_dereq_,module,exports){
module.exports=_dereq_('OOmgq/');
},{}],"jquery":[function(_dereq_,module,exports){
module.exports=_dereq_('KvN3hc');
},{}],"underscore":[function(_dereq_,module,exports){
module.exports=_dereq_('Y10LaM');
},{}],7:[function(_dereq_,module,exports){
// Backbone.Validation v0.7.1
//
// Copyright (c) 2011-2012 Thomas Pedersen
// Distributed under MIT License
//
// Documentation and full license available at:
// http://thedersen.com/projects/backbone-validation
(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(_dereq_('backbone'), _dereq_('underscore'));
  } else if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], factory);
  }
}(function (Backbone, _) {
  Backbone.Validation = (function(_){
    'use strict';
  
    // Default options
    // ---------------
  
    var defaultOptions = {
      forceUpdate: false,
      selector: 'name',
      labelFormatter: 'sentenceCase',
      valid: Function.prototype,
      invalid: Function.prototype
    };
  
  
    // Helper functions
    // ----------------
  
    // Formatting functions used for formatting error messages
    var formatFunctions = {
      // Uses the configured label formatter to format the attribute name
      // to make it more readable for the user
      formatLabel: function(attrName, model) {
        return defaultLabelFormatters[defaultOptions.labelFormatter](attrName, model);
      },
  
      // Replaces nummeric placeholders like {0} in a string with arguments
      // passed to the function
      format: function() {
        var args = Array.prototype.slice.call(arguments),
            text = args.shift();
        return text.replace(/\{(\d+)\}/g, function(match, number) {
          return typeof args[number] !== 'undefined' ? args[number] : match;
        });
      }
    };
  
    // Flattens an object
    // eg:
    //
    //     var o = {
    //       address: {
    //         street: 'Street',
    //         zip: 1234
    //       }
    //     };
    //
    // becomes:
    //
    //     var o = {
    //       'address.street': 'Street',
    //       'address.zip': 1234
    //     };
    var flatten = function (obj, into, prefix) {
      into = into || {};
      prefix = prefix || '';
  
      _.each(obj, function(val, key) {
        if(obj.hasOwnProperty(key)) {
          if (val && typeof val === 'object' && !(val instanceof Date || val instanceof RegExp)) {
            flatten(val, into, prefix + key + '.');
          }
          else {
            into[prefix + key] = val;
          }
        }
      });
  
      return into;
    };
  
    // Validation
    // ----------
  
    var Validation = (function(){
  
      // Returns an object with undefined properties for all
      // attributes on the model that has defined one or more
      // validation rules.
      var getValidatedAttrs = function(model) {
        return _.reduce(_.keys(model.validation || {}), function(memo, key) {
          memo[key] = void 0;
          return memo;
        }, {});
      };
  
      // Looks on the model for validations for a specified
      // attribute. Returns an array of any validators defined,
      // or an empty array if none is defined.
      var getValidators = function(model, attr) {
        var attrValidationSet = model.validation ? model.validation[attr] || {} : {};
  
        // If the validator is a function or a string, wrap it in a function validator
        if (_.isFunction(attrValidationSet) || _.isString(attrValidationSet)) {
          attrValidationSet = {
            fn: attrValidationSet
          };
        }
  
        // Stick the validator object into an array
        if(!_.isArray(attrValidationSet)) {
          attrValidationSet = [attrValidationSet];
        }
  
        // Reduces the array of validators into a new array with objects
        // with a validation method to call, the value to validate against
        // and the specified error message, if any
        return _.reduce(attrValidationSet, function(memo, attrValidation) {
          _.each(_.without(_.keys(attrValidation), 'msg'), function(validator) {
            memo.push({
              fn: defaultValidators[validator],
              val: attrValidation[validator],
              msg: attrValidation.msg
            });
          });
          return memo;
        }, []);
      };
  
      // Validates an attribute against all validators defined
      // for that attribute. If one or more errors are found,
      // the first error message is returned.
      // If the attribute is valid, an empty string is returned.
      var validateAttr = function(model, attr, value, computed) {
        // Reduces the array of validators to an error message by
        // applying all the validators and returning the first error
        // message, if any.
        return _.reduce(getValidators(model, attr), function(memo, validator){
          // Pass the format functions plus the default
          // validators as the context to the validator
          var ctx = _.extend({}, formatFunctions, defaultValidators),
              result = validator.fn.call(ctx, value, attr, validator.val, model, computed);
  
          if(result === false || memo === false) {
            return false;
          }
          if (result && !memo) {
            return validator.msg || result;
          }
          return memo;
        }, '');
      };
  
      // Loops through the model's attributes and validates them all.
      // Returns and object containing names of invalid attributes
      // as well as error messages.
      var validateModel = function(model, attrs) {
        var error,
            invalidAttrs = {},
            isValid = true,
            computed = _.clone(attrs),
            flattened = flatten(attrs);
  
        _.each(flattened, function(val, attr) {
          error = validateAttr(model, attr, val, computed);
          if (error) {
            invalidAttrs[attr] = error;
            isValid = false;
          }
        });
  
        return {
          invalidAttrs: invalidAttrs,
          isValid: isValid
        };
      };
  
      // Contains the methods that are mixed in on the model when binding
      var mixin = function(view, options) {
        return {
  
          // Check whether or not a value passes validation
          // without updating the model
          preValidate: function(attr, value) {
            return validateAttr(this, attr, value, _.extend({}, this.attributes));
          },
  
          // Check to see if an attribute, an array of attributes or the
          // entire model is valid. Passing true will force a validation
          // of the model.
          isValid: function(option) {
            var flattened = flatten(this.attributes);
  
            if(_.isString(option)){
              return !validateAttr(this, option, flattened[option], _.extend({}, this.attributes));
            }
            if(_.isArray(option)){
              return _.reduce(option, function(memo, attr) {
                return memo && !validateAttr(this, attr, flattened[attr], _.extend({}, this.attributes));
              }, true, this);
            }
            if(option === true) {
              this.validate();
            }
            return this.validation ? this._isValid : true;
          },
  
          // This is called by Backbone when it needs to perform validation.
          // You can call it manually without any parameters to validate the
          // entire model.
          validate: function(attrs, setOptions){
            var model = this,
                validateAll = !attrs,
                opt = _.extend({}, options, setOptions),
                validatedAttrs = getValidatedAttrs(model),
                allAttrs = _.extend({}, validatedAttrs, model.attributes, attrs),
                changedAttrs = flatten(attrs || allAttrs),
  
                result = validateModel(model, allAttrs);
  
            model._isValid = result.isValid;
  
            // After validation is performed, loop through all changed attributes
            // and call the valid callbacks so the view is updated.
            _.each(validatedAttrs, function(val, attr){
              var invalid = result.invalidAttrs.hasOwnProperty(attr);
              if(!invalid){
                opt.valid(view, attr, opt.selector);
              }
            });
  
            // After validation is performed, loop through all changed attributes
            // and call the invalid callback so the view is updated.
            _.each(validatedAttrs, function(val, attr){
              var invalid = result.invalidAttrs.hasOwnProperty(attr),
                  changed = changedAttrs.hasOwnProperty(attr);
  
              if(invalid && (changed || validateAll)){
                opt.invalid(view, attr, result.invalidAttrs[attr], opt.selector);
              }
            });
  
            // Trigger validated events.
            // Need to defer this so the model is actually updated before
            // the event is triggered.
            _.defer(function() {
              model.trigger('validated', model._isValid, model, result.invalidAttrs);
              model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
            });
  
            // Return any error messages to Backbone, unless the forceUpdate flag is set.
            // Then we do not return anything and fools Backbone to believe the validation was
            // a success. That way Backbone will update the model regardless.
            if (!opt.forceUpdate && _.intersection(_.keys(result.invalidAttrs), _.keys(changedAttrs)).length > 0) {
              return result.invalidAttrs;
            }
          }
        };
      };
  
      // Helper to mix in validation on a model
      var bindModel = function(view, model, options) {
        _.extend(model, mixin(view, options));
      };
  
      // Removes the methods added to a model
      var unbindModel = function(model) {
        delete model.validate;
        delete model.preValidate;
        delete model.isValid;
      };
  
      // Mix in validation on a model whenever a model is
      // added to a collection
      var collectionAdd = function(model) {
        bindModel(this.view, model, this.options);
      };
  
      // Remove validation from a model whenever a model is
      // removed from a collection
      var collectionRemove = function(model) {
        unbindModel(model);
      };
  
      // Returns the public methods on Backbone.Validation
      return {
  
        // Current version of the library
        version: '0.7.1',
  
        // Called to configure the default options
        configure: function(options) {
          _.extend(defaultOptions, options);
        },
  
        // Hooks up validation on a view with a model
        // or collection
        bind: function(view, options) {
          var model = view.model,
              collection = view.collection;
  
          options = _.extend({}, defaultOptions, defaultCallbacks, options);
  
          if(typeof model === 'undefined' && typeof collection === 'undefined'){
            throw 'Before you execute the binding your view must have a model or a collection.\n' +
                  'See http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.';
          }
  
          if(model) {
            bindModel(view, model, options);
          }
          else if(collection) {
            collection.each(function(model){
              bindModel(view, model, options);
            });
            collection.bind('add', collectionAdd, {view: view, options: options});
            collection.bind('remove', collectionRemove);
          }
        },
  
        // Removes validation from a view with a model
        // or collection
        unbind: function(view) {
          var model = view.model,
              collection = view.collection;
  
          if(model) {
            unbindModel(view.model);
          }
          if(collection) {
            collection.each(function(model){
              unbindModel(model);
            });
            collection.unbind('add', collectionAdd);
            collection.unbind('remove', collectionRemove);
          }
        },
  
        // Used to extend the Backbone.Model.prototype
        // with validation
        mixin: mixin(null, defaultOptions)
      };
    }());
  
  
    // Callbacks
    // ---------
  
    var defaultCallbacks = Validation.callbacks = {
  
      // Gets called when a previously invalid field in the
      // view becomes valid. Removes any error message.
      // Should be overridden with custom functionality.
      valid: function(view, attr, selector) {
        view.$('[' + selector + '~="' + attr + '"]')
            .removeClass('invalid')
            .removeAttr('data-error');
      },
  
      // Gets called when a field in the view becomes invalid.
      // Adds a error message.
      // Should be overridden with custom functionality.
      invalid: function(view, attr, error, selector) {
        view.$('[' + selector + '~="' + attr + '"]')
            .addClass('invalid')
            .attr('data-error', error);
      }
    };
  
  
    // Patterns
    // --------
  
    var defaultPatterns = Validation.patterns = {
      // Matches any digit(s) (i.e. 0-9)
      digits: /^\d+$/,
  
      // Matched any number (e.g. 100.000)
      number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/,
  
      // Matches a valid email address (e.g. mail@example.com)
      email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
  
      // Mathes any valid url (e.g. http://www.xample.com)
      url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    };
  
  
    // Error messages
    // --------------
  
    // Error message for the build in validators.
    // {x} gets swapped out with arguments form the validator.
    var defaultMessages = Validation.messages = {
      required: '{0} is required',
      acceptance: '{0} must be accepted',
      min: '{0} must be greater than or equal to {1}',
      max: '{0} must be less than or equal to {1}',
      range: '{0} must be between {1} and {2}',
      length: '{0} must be {1} characters',
      minLength: '{0} must be at least {1} characters',
      maxLength: '{0} must be at most {1} characters',
      rangeLength: '{0} must be between {1} and {2} characters',
      oneOf: '{0} must be one of: {1}',
      equalTo: '{0} must be the same as {1}',
      pattern: '{0} must be a valid {1}'
    };
  
    // Label formatters
    // ----------------
  
    // Label formatters are used to convert the attribute name
    // to a more human friendly label when using the built in
    // error messages.
    // Configure which one to use with a call to
    //
    //     Backbone.Validation.configure({
    //       labelFormatter: 'label'
    //     });
    var defaultLabelFormatters = Validation.labelFormatters = {
  
      // Returns the attribute name with applying any formatting
      none: function(attrName) {
        return attrName;
      },
  
      // Converts attributeName or attribute_name to Attribute name
      sentenceCase: function(attrName) {
        return attrName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(match, index) {
          return index === 0 ? match.toUpperCase() : ' ' + match.toLowerCase();
        }).replace('_', ' ');
      },
  
      // Looks for a label configured on the model and returns it
      //
      //      var Model = Backbone.Model.extend({
      //        validation: {
      //          someAttribute: {
      //            required: true
      //          }
      //        },
      //
      //        labels: {
      //          someAttribute: 'Custom label'
      //        }
      //      });
      label: function(attrName, model) {
        return (model.labels && model.labels[attrName]) || defaultLabelFormatters.sentenceCase(attrName, model);
      }
    };
  
  
    // Built in validators
    // -------------------
  
    var defaultValidators = Validation.validators = (function(){
      // Use native trim when defined
      var trim = String.prototype.trim ?
        function(text) {
          return text === null ? '' : String.prototype.trim.call(text);
        } :
        function(text) {
          var trimLeft = /^\s+/,
              trimRight = /\s+$/;
  
          return text === null ? '' : text.toString().replace(trimLeft, '').replace(trimRight, '');
        };
  
      // Determines whether or not a value is a number
      var isNumber = function(value){
        return _.isNumber(value) || (_.isString(value) && value.match(defaultPatterns.number));
      };
  
      // Determines whether or not not a value is empty
      var hasValue = function(value) {
        return !(_.isNull(value) || _.isUndefined(value) || (_.isString(value) && trim(value) === ''));
      };
  
      return {
        // Function validator
        // Lets you implement a custom function used for validation
        fn: function(value, attr, fn, model, computed) {
          if(_.isString(fn)){
            fn = model[fn];
          }
          return fn.call(model, value, attr, computed);
        },
  
        // Required validator
        // Validates if the attribute is required or not
        required: function(value, attr, required, model, computed) {
          var isRequired = _.isFunction(required) ? required.call(model, value, attr, computed) : required;
          if(!isRequired && !hasValue(value)) {
            return false; // overrides all other validators
          }
          if (isRequired && !hasValue(value)) {
            return this.format(defaultMessages.required, this.formatLabel(attr, model));
          }
        },
  
        // Acceptance validator
        // Validates that something has to be accepted, e.g. terms of use
        // `true` or 'true' are valid
        acceptance: function(value, attr, accept, model) {
          if(value !== 'true' && (!_.isBoolean(value) || value === false)) {
            return this.format(defaultMessages.acceptance, this.formatLabel(attr, model));
          }
        },
  
        // Min validator
        // Validates that the value has to be a number and equal to or greater than
        // the min value specified
        min: function(value, attr, minValue, model) {
          if (!isNumber(value) || value < minValue) {
            return this.format(defaultMessages.min, this.formatLabel(attr, model), minValue);
          }
        },
  
        // Max validator
        // Validates that the value has to be a number and equal to or less than
        // the max value specified
        max: function(value, attr, maxValue, model) {
          if (!isNumber(value) || value > maxValue) {
            return this.format(defaultMessages.max, this.formatLabel(attr, model), maxValue);
          }
        },
  
        // Range validator
        // Validates that the value has to be a number and equal to or between
        // the two numbers specified
        range: function(value, attr, range, model) {
          if(!isNumber(value) || value < range[0] || value > range[1]) {
            return this.format(defaultMessages.range, this.formatLabel(attr, model), range[0], range[1]);
          }
        },
  
        // Length validator
        // Validates that the value has to be a string with length equal to
        // the length value specified
        length: function(value, attr, length, model) {
          if (!hasValue(value) || trim(value).length !== length) {
            return this.format(defaultMessages.length, this.formatLabel(attr, model), length);
          }
        },
  
        // Min length validator
        // Validates that the value has to be a string with length equal to or greater than
        // the min length value specified
        minLength: function(value, attr, minLength, model) {
          if (!hasValue(value) || trim(value).length < minLength) {
            return this.format(defaultMessages.minLength, this.formatLabel(attr, model), minLength);
          }
        },
  
        // Max length validator
        // Validates that the value has to be a string with length equal to or less than
        // the max length value specified
        maxLength: function(value, attr, maxLength, model) {
          if (!hasValue(value) || trim(value).length > maxLength) {
            return this.format(defaultMessages.maxLength, this.formatLabel(attr, model), maxLength);
          }
        },
  
        // Range length validator
        // Validates that the value has to be a string and equal to or between
        // the two numbers specified
        rangeLength: function(value, attr, range, model) {
          if(!hasValue(value) || trim(value).length < range[0] || trim(value).length > range[1]) {
            return this.format(defaultMessages.rangeLength, this.formatLabel(attr, model), range[0], range[1]);
          }
        },
  
        // One of validator
        // Validates that the value has to be equal to one of the elements in
        // the specified array. Case sensitive matching
        oneOf: function(value, attr, values, model) {
          if(!_.include(values, value)){
            return this.format(defaultMessages.oneOf, this.formatLabel(attr, model), values.join(', '));
          }
        },
  
        // Equal to validator
        // Validates that the value has to be equal to the value of the attribute
        // with the name specified
        equalTo: function(value, attr, equalTo, model, computed) {
          if(value !== computed[equalTo]) {
            return this.format(defaultMessages.equalTo, this.formatLabel(attr, model), this.formatLabel(equalTo, model));
          }
        },
  
        // Pattern validator
        // Validates that the value has to match the pattern specified.
        // Can be a regular expression or the name of one of the built in patterns
        pattern: function(value, attr, pattern, model) {
          if (!hasValue(value) || !value.toString().match(defaultPatterns[pattern] || pattern)) {
            return this.format(defaultMessages.pattern, this.formatLabel(attr, model), pattern);
          }
        }
      };
    }());
  
    return Validation;
  }(_));
  
  return Backbone.Validation;
}));
},{"backbone":"atSdsZ","underscore":"Y10LaM"}],8:[function(_dereq_,module,exports){
'use strict';

var _ = _dereq_('underscore');
var Backbone = _dereq_('backbone');

_.extend(Backbone.Router.prototype, {

  /**
   * Override default route fn to call before/after filters
   *
   * @param {String} route
   * @param {String} name
   * @param {Function} [callback]
   * @return {*}
   */
  route: function (route, name, callback) {

    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }

    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }

    if (!callback) {
      callback = this[name];
    }

    var router = this;

    // store all the before and after routes in a stack
    var beforeStack = [];
    var afterStack = [];

    _.each(router.before, function (value, key) {
      beforeStack.push({
        'filter': key,
        'filterFn': value
      });
    });

    _.each(router.after, function (value, key) {
      afterStack.push({
        'filter': key,
        'filterFn': value
      });
    });

    Backbone.history.route(route, function (fragment) {
      var args = router._extractParameters(route, fragment);

      var beforeStackClone = _.clone(beforeStack);
      var afterStackClone = _.clone(afterStack);

      function next(stack, runRoute) {
        var layer = stack.shift();

        if (layer) {
          var filter = _.isRegExp(layer.filter) ? layer.filter : router._routeToRegExp(layer.filter);

          if (filter.test(fragment)) {
            var fn = _.isFunction(layer.filterFn) ? layer.filterFn : router[layer.filterFn];

            fn.apply(router, [
                fragment,
                args,
                function () {
                  next(stack, runRoute);
                }
              ]);
          } else {
            next(stack, runRoute);
          }
        } else if (runRoute) {
          callback.apply(router, args);
        }
      }

      // start with top of the before stack
      next(beforeStackClone, true);

      router.trigger.apply(router, ['route:' + name].concat(args));
      router.trigger('route', name, args);

      Backbone.history.trigger('route', router, name, args);

      next(afterStackClone);

    });

    return this;
  }

});

module.exports = Backbone;

},{"backbone":"atSdsZ","underscore":"Y10LaM"}],9:[function(_dereq_,module,exports){

},{}],10:[function(_dereq_,module,exports){
"use strict";
/*globals Handlebars: true */
var base = _dereq_("./handlebars/base");

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)
var SafeString = _dereq_("./handlebars/safe-string")["default"];
var Exception = _dereq_("./handlebars/exception")["default"];
var Utils = _dereq_("./handlebars/utils");
var runtime = _dereq_("./handlebars/runtime");

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
var create = function() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = SafeString;
  hb.Exception = Exception;
  hb.Utils = Utils;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
};

var Handlebars = create();
Handlebars.create = create;

exports["default"] = Handlebars;
},{"./handlebars/base":11,"./handlebars/exception":12,"./handlebars/runtime":13,"./handlebars/safe-string":14,"./handlebars/utils":15}],11:[function(_dereq_,module,exports){
"use strict";
var Utils = _dereq_("./utils");
var Exception = _dereq_("./exception")["default"];

var VERSION = "1.3.0";
exports.VERSION = VERSION;var COMPILER_REVISION = 4;
exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var isArray = Utils.isArray,
    isFunction = Utils.isFunction,
    toString = Utils.toString,
    objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials) {
  this.helpers = helpers || {};
  this.partials = partials || {};

  registerDefaultHelpers(this);
}

exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: logger,
  log: log,

  registerHelper: function(name, fn, inverse) {
    if (toString.call(name) === objectType) {
      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
      Utils.extend(this.helpers, name);
    } else {
      if (inverse) { fn.not = inverse; }
      this.helpers[name] = fn;
    }
  },

  registerPartial: function(name, str) {
    if (toString.call(name) === objectType) {
      Utils.extend(this.partials,  name);
    } else {
      this.partials[name] = str;
    }
  }
};

function registerDefaultHelpers(instance) {
  instance.registerHelper('helperMissing', function(arg) {
    if(arguments.length === 2) {
      return undefined;
    } else {
      throw new Exception("Missing helper: '" + arg + "'");
    }
  });

  instance.registerHelper('blockHelperMissing', function(context, options) {
    var inverse = options.inverse || function() {}, fn = options.fn;

    if (isFunction(context)) { context = context.call(this); }

    if(context === true) {
      return fn(this);
    } else if(context === false || context == null) {
      return inverse(this);
    } else if (isArray(context)) {
      if(context.length > 0) {
        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      return fn(context);
    }
  });

  instance.registerHelper('each', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    if (isFunction(context)) { context = context.call(this); }

    if (options.data) {
      data = createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index = i;
            data.first = (i === 0);
            data.last  = (i === (context.length-1));
          }
          ret = ret + fn(context[i], { data: data });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) { 
              data.key = key; 
              data.index = i;
              data.first = (i === 0);
            }
            ret = ret + fn(context[key], {data: data});
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  });

  instance.registerHelper('if', function(conditional, options) {
    if (isFunction(conditional)) { conditional = conditional.call(this); }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });

  instance.registerHelper('with', function(context, options) {
    if (isFunction(context)) { context = context.call(this); }

    if (!Utils.isEmpty(context)) return options.fn(context);
  });

  instance.registerHelper('log', function(context, options) {
    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
    instance.log(level, context);
  });
}

var logger = {
  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

  // State enum
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  level: 3,

  // can be overridden in the host environment
  log: function(level, obj) {
    if (logger.level <= level) {
      var method = logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};
exports.logger = logger;
function log(level, obj) { logger.log(level, obj); }

exports.log = log;var createFrame = function(object) {
  var obj = {};
  Utils.extend(obj, object);
  return obj;
};
exports.createFrame = createFrame;
},{"./exception":12,"./utils":15}],12:[function(_dereq_,module,exports){
"use strict";

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var line;
  if (node && node.firstLine) {
    line = node.firstLine;

    message += ' - ' + line + ':' + node.firstColumn;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  if (line) {
    this.lineNumber = line;
    this.column = node.firstColumn;
  }
}

Exception.prototype = new Error();

exports["default"] = Exception;
},{}],13:[function(_dereq_,module,exports){
"use strict";
var Utils = _dereq_("./utils");
var Exception = _dereq_("./exception")["default"];
var COMPILER_REVISION = _dereq_("./base").COMPILER_REVISION;
var REVISION_CHANGES = _dereq_("./base").REVISION_CHANGES;

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = REVISION_CHANGES[currentRevision],
          compilerVersions = REVISION_CHANGES[compilerRevision];
      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
    }
  }
}

exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

function template(templateSpec, env) {
  if (!env) {
    throw new Exception("No environment passed to template");
  }

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
    var result = env.VM.invokePartial.apply(this, arguments);
    if (result != null) { return result; }

    if (env.compile) {
      var options = { helpers: helpers, partials: partials, data: data };
      partials[name] = env.compile(partial, { data: data !== undefined }, env);
      return partials[name](context, options);
    } else {
      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    }
  };

  // Just add water
  var container = {
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    programs: [],
    program: function(i, fn, data) {
      var programWrapper = this.programs[i];
      if(data) {
        programWrapper = program(i, fn, data);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = program(i, fn);
      }
      return programWrapper;
    },
    merge: function(param, common) {
      var ret = param || common;

      if (param && common && (param !== common)) {
        ret = {};
        Utils.extend(ret, common);
        Utils.extend(ret, param);
      }
      return ret;
    },
    programWithDepth: env.VM.programWithDepth,
    noop: env.VM.noop,
    compilerInfo: null
  };

  return function(context, options) {
    options = options || {};
    var namespace = options.partial ? options : env,
        helpers,
        partials;

    if (!options.partial) {
      helpers = options.helpers;
      partials = options.partials;
    }
    var result = templateSpec.call(
          container,
          namespace, context,
          helpers,
          partials,
          options.data);

    if (!options.partial) {
      env.VM.checkRevision(container.compilerInfo);
    }

    return result;
  };
}

exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
  var args = Array.prototype.slice.call(arguments, 3);

  var prog = function(context, options) {
    options = options || {};

    return fn.apply(this, [context, options.data || data].concat(args));
  };
  prog.program = i;
  prog.depth = args.length;
  return prog;
}

exports.programWithDepth = programWithDepth;function program(i, fn, data) {
  var prog = function(context, options) {
    options = options || {};

    return fn(context, options.data || data);
  };
  prog.program = i;
  prog.depth = 0;
  return prog;
}

exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
  var options = { partial: true, helpers: helpers, partials: partials, data: data };

  if(partial === undefined) {
    throw new Exception("The partial " + name + " could not be found");
  } else if(partial instanceof Function) {
    return partial(context, options);
  }
}

exports.invokePartial = invokePartial;function noop() { return ""; }

exports.noop = noop;
},{"./base":11,"./exception":12,"./utils":15}],14:[function(_dereq_,module,exports){
"use strict";
// Build out our basic SafeString type
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = function() {
  return "" + this.string;
};

exports["default"] = SafeString;
},{}],15:[function(_dereq_,module,exports){
"use strict";
/*jshint -W004 */
var SafeString = _dereq_("./safe-string")["default"];

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

function escapeChar(chr) {
  return escape[chr] || "&amp;";
}

function extend(obj, value) {
  for(var key in value) {
    if(Object.prototype.hasOwnProperty.call(value, key)) {
      obj[key] = value[key];
    }
  }
}

exports.extend = extend;var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
var isFunction = function(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
var isFunction;
exports.isFunction = isFunction;
var isArray = Array.isArray || function(value) {
  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;

function escapeExpression(string) {
  // don't escape SafeStrings, since they're already safe
  if (string instanceof SafeString) {
    return string.toString();
  } else if (!string && string !== 0) {
    return "";
  }

  // Force a string conversion as this will be done by the append regardless and
  // the regex test will do this transparently behind the scenes, causing issues if
  // an object's to string has escaped characters in it.
  string = "" + string;

  if(!possible.test(string)) { return string; }
  return string.replace(badChars, escapeChar);
}

exports.escapeExpression = escapeExpression;function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.isEmpty = isEmpty;
},{"./safe-string":14}],16:[function(_dereq_,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = _dereq_('./dist/cjs/handlebars.runtime');

},{"./dist/cjs/handlebars.runtime":10}],17:[function(_dereq_,module,exports){
module.exports = _dereq_("handlebars/runtime")["default"];

},{"handlebars/runtime":16}],18:[function(_dereq_,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

function isPlainObject(obj) {
	if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
		return false;

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
		return false;

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for ( key in obj ) {}

	return key === undefined || hasOwn.call( obj, key );
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
	    target = arguments[0] || {},
	    i = 1,
	    length = arguments.length,
	    deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function") {
		target = {};
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray(src) ? src : [];

					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

},{}],19:[function(_dereq_,module,exports){
// Open stores
// -------------

var hoodieRemoteStore = _dereq_('../lib/store/remote');
var extend = _dereq_('extend');

function hoodieOpen(hoodie) {

  // generic method to open a store.
  //
  //     hoodie.open("some_store_name").findAll()
  //
  function open(storeName, options) {
    options = options || {};

    extend(options, {
      name: storeName
    });

    return hoodieRemoteStore(hoodie, options);
  }

  //
  // Public API
  //
  hoodie.open = open;
}

module.exports = hoodieOpen;

},{"../lib/store/remote":26,"extend":18}],20:[function(_dereq_,module,exports){
//
// hoodie.request
// ================

// Hoodie's central place to send request to its backend.
// At the moment, it's a wrapper around jQuery's ajax method,
// but we might get rid of this dependency in the future.
//
// It has build in support for CORS and a standard error
// handling that normalizes errors returned by CouchDB
// to JavaScript's native conventions of errors having
// a name & a message property.
//
// Common errors to expect:
//
// * HoodieRequestError
// * HoodieUnauthorizedError
// * HoodieConflictError
// * HoodieServerError

var hoodiefyRequestErrorName = _dereq_('../utils/hoodiefy_request_error_name');
var extend = _dereq_('extend');
var rejectWith = _dereq_('../utils/promise/reject_with');

function hoodieRequest(hoodie) {
  var $ajax = $.ajax;

  // Hoodie backend listents to requests prefixed by /_api,
  // so we prefix all requests with relative URLs
  var API_PATH = '/_api';

  // Requests
  // ----------

  // sends requests to the hoodie backend.
  //
  //     promise = hoodie.request('GET', '/user_database/doc_id')
  //
  function request(type, url, options) {
    var defaults, requestPromise, pipedPromise;

    options = options || {};

    defaults = {
      type: type,
      dataType: 'json'
    };

    // if absolute path passed, set CORS headers

    // if relative path passed, prefix with baseUrl
    if (!/^http/.test(url)) {
      url = (hoodie.baseUrl || '') + API_PATH + url;
    }

    // if url is cross domain, set CORS headers
    if (/^http/.test(url)) {
      defaults.xhrFields = {
        withCredentials: true
      };
      defaults.crossDomain = true;
    }

    defaults.url = url;


    // we are piping the result of the request to return a nicer
    // error if the request cannot reach the server at all.
    // We can't return the promise of ajax directly because of
    // the piping, as for whatever reason the returned promise
    // does not have the `abort` method any more, maybe others
    // as well. See also http://bugs.jquery.com/ticket/14104
    requestPromise = $ajax(extend(defaults, options));
    pipedPromise = requestPromise.then( null, handleRequestError);
    pipedPromise.abort = requestPromise.abort;

    return pipedPromise;
  }

  //
  //
  //
  function handleRequestError(xhr) {
    var error;

    try {
      error = parseErrorFromResponse(xhr);
    } catch (_error) {

      if (xhr.responseText) {
        error = xhr.responseText;
      } else {
        error = {
          name: 'HoodieConnectionError',
          message: 'Could not connect to Hoodie server at {{url}}.',
          url: hoodie.baseUrl || '/'
        };
      }
    }

    return rejectWith(error).promise();
  }

  //
  // CouchDB returns errors in JSON format, with the properties
  // `error` and `reason`. Hoodie uses JavaScript's native Error
  // properties `name` and `message` instead, so we are normalizing
  // that.
  //
  // Besides the renaming we also do a matching with a map of known
  // errors to make them more clear. For reference, see
  // https://wiki.apache.org/couchdb/Default_http_errors &
  // https://github.com/apache/couchdb/blob/master/src/couchdb/couch_httpd.erl#L807
  //

  function parseErrorFromResponse(xhr) {
    var error = JSON.parse(xhr.responseText);

    // get error name
    error.name = HTTP_STATUS_ERROR_MAP[xhr.status];
    if (! error.name) {
      error.name = hoodiefyRequestErrorName(error.error);
    }

    // store status & message
    error.status = xhr.status;
    error.message = error.reason || '';
    error.message = error.message.charAt(0).toUpperCase() + error.message.slice(1);

    // cleanup
    delete error.error;
    delete error.reason;

    return error;
  }

  // map CouchDB HTTP status codes to Hoodie Errors
  var HTTP_STATUS_ERROR_MAP = {
    400: 'HoodieRequestError', // bad request
    401: 'HoodieUnauthorizedError',
    403: 'HoodieRequestError', // forbidden
    404: 'HoodieNotFoundError', // forbidden
    409: 'HoodieConflictError',
    412: 'HoodieConflictError', // file exist
    500: 'HoodieServerError'
  };

  //
  // public API
  //
  hoodie.request = request;
}

module.exports = hoodieRequest;

},{"../utils/hoodiefy_request_error_name":29,"../utils/promise/reject_with":33,"extend":18}],21:[function(_dereq_,module,exports){
// Hoodie Error
// -------------

// With the custom hoodie error function
// we normalize all errors the get returned
// when using hoodie's rejectWith
//
// The native JavaScript error method has
// a name & a message property. HoodieError
// requires these, but on top allows for
// unlimited custom properties.
//
// Instead of being initialized with just
// the message, HoodieError expects an
// object with properites. The `message`
// property is required. The name will
// fallback to `error`.
//
// `message` can also contain placeholders
// in the form of `{{propertyName}}`` which
// will get replaced automatically with passed
// extra properties.
//
// ### Error Conventions
//
// We follow JavaScript's native error conventions,
// meaning that error names are camelCase with the
// first letter uppercase as well, and the message
// starting with an uppercase letter.
//
var errorMessageReplacePattern = /\{\{\s*\w+\s*\}\}/g;
var errorMessageFindPropertyPattern = /\w+/;

var extend = _dereq_('extend');

function HoodieError(properties) {

  // normalize arguments
  if (typeof properties === 'string') {
    properties = {
      message: properties
    };
  }

  if (! properties.message) {
    throw new Error('FATAL: error.message must be set');
  }

  // must check for properties, as this.name is always set.
  if (! properties.name) {
    properties.name = 'HoodieError';
  }

  properties.message = properties.message.replace(errorMessageReplacePattern, function(match) {
    var property = match.match(errorMessageFindPropertyPattern)[0];
    return properties[property];
  });
  extend(this, properties);
}
HoodieError.prototype = new Error();
HoodieError.prototype.constructor = HoodieError;

module.exports = HoodieError;


},{"extend":18}],22:[function(_dereq_,module,exports){
// Hoodie Invalid Type Or Id Error
// -------------------------------

// only lowercase letters, numbers and dashes
// are allowed for object IDs.
//
var HoodieError = _dereq_('./error');

//
function HoodieObjectIdError(properties) {
  properties.name = 'HoodieObjectIdError';
  properties.message = '"{{id}}" is invalid object id. {{rules}}.';

  return new HoodieError(properties);
}
var validIdPattern = /^[a-z0-9\-]+$/;
HoodieObjectIdError.isInvalid = function(id, customPattern) {
  return !(customPattern || validIdPattern).test(id || '');
};
HoodieObjectIdError.isValid = function(id, customPattern) {
  return (customPattern || validIdPattern).test(id || '');
};
HoodieObjectIdError.prototype.rules = 'Lowercase letters, numbers and dashes allowed only. Must start with a letter';

module.exports = HoodieObjectIdError;

},{"./error":21}],23:[function(_dereq_,module,exports){
// Hoodie Invalid Type Or Id Error
// -------------------------------

// only lowercase letters, numbers and dashes
// are allowed for object types, plus must start
// with a letter.
//
var HoodieError = _dereq_('./error');

// Hoodie Invalid Type Or Id Error
// -------------------------------

// only lowercase letters, numbers and dashes
// are allowed for object types, plus must start
// with a letter.
//
function HoodieObjectTypeError(properties) {
  properties.name = 'HoodieObjectTypeError';
  properties.message = '"{{type}}" is invalid object type. {{rules}}.';

  return new HoodieError(properties);
}
var validTypePattern = /^[a-z$][a-z0-9]+$/;
HoodieObjectTypeError.isInvalid = function(type, customPattern) {
  return !(customPattern || validTypePattern).test(type || '');
};
HoodieObjectTypeError.isValid = function(type, customPattern) {
  return (customPattern || validTypePattern).test(type || '');
};
HoodieObjectTypeError.prototype.rules = 'lowercase letters, numbers and dashes allowed only. Must start with a letter';

module.exports = HoodieObjectTypeError;

},{"./error":21}],24:[function(_dereq_,module,exports){
// Events
// ========
//
// extend any Class with support for
//
// * `object.bind('event', cb)`
// * `object.unbind('event', cb)`
// * `object.trigger('event', args...)`
// * `object.one('ev', cb)`
//
// based on [Events implementations from Spine](https://github.com/maccman/spine/blob/master/src/spine.coffee#L1)
//

// callbacks are global, while the events API is used at several places,
// like hoodie.on / hoodie.store.on / hoodie.task.on etc.
//
function hoodieEvents(hoodie, options) {
  var context = hoodie;
  var namespace = '';

  // normalize options hash
  options = options || {};

  // make sure callbacks hash exists
  if (!hoodie.eventsCallbacks) {
    hoodie.eventsCallbacks = {};
  }

  if (options.context) {
    context = options.context;
    namespace = options.namespace + ':';
  }

  // Bind
  // ------
  //
  // bind a callback to an event triggerd by the object
  //
  //     object.bind 'cheat', blame
  //
  function bind(ev, callback) {
    var evs, name, _i, _len;

    evs = ev.split(' ');

    for (_i = 0, _len = evs.length; _i < _len; _i++) {
      name = namespace + evs[_i];
      hoodie.eventsCallbacks[name] = hoodie.eventsCallbacks[name] || [];
      hoodie.eventsCallbacks[name].push(callback);
    }
  }

  // one
  // -----
  //
  // same as `bind`, but does get executed only once
  //
  //     object.one 'groundTouch', gameOver
  //
  function one(ev, callback) {
    ev = namespace + ev;
    var wrapper = function() {
        hoodie.unbind(ev, wrapper);
        callback.apply(null, arguments);
      };
    hoodie.bind(ev, wrapper);
  }

  // trigger
  // ---------
  //
  // trigger an event and pass optional parameters for binding.
  //     object.trigger 'win', score: 1230
  //
  function trigger() {
    var args, callback, ev, list, _i, _len;

    args = 1 <= arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
    ev = args.shift();
    ev = namespace + ev;
    list = hoodie.eventsCallbacks[ev];

    if (!list) {
      return;
    }

    for (_i = 0, _len = list.length; _i < _len; _i++) {
      callback = list[_i];
      callback.apply(null, args);
    }

    return true;
  }

  // unbind
  // --------
  //
  // unbind to from all bindings, from all bindings of a specific event
  // or from a specific binding.
  //
  //     object.unbind()
  //     object.unbind 'move'
  //     object.unbind 'move', follow
  //
  function unbind(ev, callback) {
    var cb, i, list, _i, _len, evNames;

    if (!ev) {
      if (!namespace) {
        hoodie.eventsCallbacks = {};
      }

      evNames = Object.keys(hoodie.eventsCallbacks);
      evNames = evNames.filter(function(key) {
        return key.indexOf(namespace) === 0;
      });
      evNames.forEach(function(key) {
        delete hoodie.eventsCallbacks[key];
      });

      return;
    }

    ev = namespace + ev;

    list = hoodie.eventsCallbacks[ev];

    if (!list) {
      return;
    }

    if (!callback) {
      delete hoodie.eventsCallbacks[ev];
      return;
    }

    for (i = _i = 0, _len = list.length; _i < _len; i = ++_i) {
      cb = list[i];


      if (cb !== callback) {
        continue;
      }

      list = list.slice();
      list.splice(i, 1);
      hoodie.eventsCallbacks[ev] = list;
      break;
    }

    return;
  }

  context.bind = bind;
  context.on = bind;
  context.one = one;
  context.trigger = trigger;
  context.unbind = unbind;
  context.off = unbind;
}

module.exports = hoodieEvents;

},{}],25:[function(_dereq_,module,exports){
// Store
// ============

// This class defines the API that hoodie.store (local store) and hoodie.open
// (remote store) implement to assure a coherent API. It also implements some
// basic validations.
//
// The returned API provides the following methods:
//
// * validate
// * save
// * add
// * find
// * findOrAdd
// * findAll
// * update
// * updateAll
// * remove
// * removeAll
// * decoratePromises
// * trigger
// * on
// * unbind
//
// At the same time, the returned API can be called as function returning a
// store scoped by the passed type, for example
//
//     var taskStore = hoodie.store('task');
//     taskStore.findAll().then( showAllTasks );
//     taskStore.update('id123', {done: true});
//

//
var hoodieScopedStoreApi = _dereq_('./scoped');
var hoodieEvents = _dereq_('../events');
var HoodieError = _dereq_('../error/error');
var HoodieObjectTypeError = _dereq_('../error/object_type');
var HoodieObjectIdError = _dereq_('../error/object_id');
var extend = _dereq_('extend');

var getDefer = _dereq_('../../utils/promise/defer');
var rejectWith = _dereq_('../../utils/promise/reject_with');
var resolveWith = _dereq_('../../utils/promise/resolve_with');
var isPromise = _dereq_('../../utils/promise/is_promise');

//
function hoodieStoreApi(hoodie, options) {

  // persistance logic
  var backend = {};

  // extend this property with extra functions that will be available
  // on all promises returned by hoodie.store API. It has a reference
  // to current hoodie instance by default
  var promiseApi = {
    hoodie: hoodie
  };

  // name
  var storeName = options.name || 'store';

  // public API
  var api = function api(type, id) {
    var scopedOptions = extend(true, {
      type: type,
      id: id
    }, options);
    return hoodieScopedStoreApi(hoodie, api, scopedOptions);
  };

  // add event API
  hoodieEvents(hoodie, {
    context: api,
    namespace: storeName
  });


  // Validate
  // --------------

  // by default, we only check for a valid type & id.
  // the validate method can be overwriten by passing
  // options.validate
  //
  // if `validate` returns nothing, the passed object is
  // valid. Otherwise it returns an error
  //
  api.validate = options.validate;

  if (!options.validate) {
    api.validate = function(object /*, options */ ) {

      if (!object) {
        return new HoodieError({
          name: 'InvalidObjectError',
          message: 'No object passed.'
        });
      }

      if (HoodieObjectTypeError.isInvalid(object.type, validIdOrTypePattern)) {
        return new HoodieObjectTypeError({
          type: object.type,
          rules: validIdOrTypeRules
        });
      }

      if (!object.id) {
        return;
      }

      if (HoodieObjectIdError.isInvalid(object.id, validIdOrTypePattern)) {
        return new HoodieObjectIdError({
          id: object.id,
          rules: validIdOrTypeRules
        });
      }

    };

  }

  // Save
  // --------------

  // creates or replaces an an eventually existing object in the store
  // with same type & id.
  //
  // When id is undefined, it gets generated and a new object gets saved
  //
  // example usage:
  //
  //     store.save('car', undefined, {color: 'red'})
  //     store.save('car', 'abc4567', {color: 'red'})
  //
  api.save = function save(type, id, properties, options) {

    if (options) {
      options = extend(true, {}, options);
    } else {
      options = {};
    }

    // don't mess with passed object
    var object = extend(true, {}, properties, {
      type: type,
      id: id
    });

    // validations
    var error = api.validate(object, options || {});

    if (error) {
      return rejectWith(error);
    }

    return decoratePromise(backend.save(object, options || {}));
  };


  // Add
  // -------------------

  // `.add` is an alias for `.save`, with the difference that there is no id argument.
  // Internally it simply calls `.save(type, undefined, object).
  //
  api.add = function add(type, properties, options) {

    if (properties === undefined) {
      properties = {};
    }

    options = options || {};

    return api.save(type, properties.id, properties, options);
  };


  // find
  // ------

  //
  api.find = function find(type, id) {

    return decoratePromise(backend.find(type, id));
  };


  // find or add
  // -------------

  // 1. Try to find a share by given id
  // 2. If share could be found, return it
  // 3. If not, add one and return it.
  //
  api.findOrAdd = function findOrAdd(type, id, properties) {

    if (properties === null) {
      properties = {};
    }

    function handleNotFound() {
      var newProperties;
      newProperties = extend(true, {
        id: id
      }, properties);
      return api.add(type, newProperties);
    }

    // promise decorations get lost when piped through `then`,
    // that's why we need to decorate the find's promise again.
    var promise = api.find(type, id).then(null, handleNotFound);
    return decoratePromise(promise);
  };


  // findAll
  // ------------

  // returns all objects from store.
  // Can be optionally filtered by a type or a function
  //
  api.findAll = function findAll(type, options) {
    return decoratePromise( backend.findAll(type, options) );
  };


  // Update
  // -------------------

  // In contrast to `.save`, the `.update` method does not replace the stored object,
  // but only changes the passed attributes of an exsting object, if it exists
  //
  // both a hash of key/values or a function that applies the update to the passed
  // object can be passed.
  //
  // example usage
  //
  // hoodie.store.update('car', 'abc4567', {sold: true})
  // hoodie.store.update('car', 'abc4567', function(obj) { obj.sold = true })
  //
  api.update = function update(type, id, objectUpdate, options) {

    function handleFound(currentObject) {
      var changedProperties, newObj, value;

      // normalize input
      newObj = extend(true, {}, currentObject);

      if (typeof objectUpdate === 'function') {
        objectUpdate = objectUpdate(newObj);
      }

      if (!objectUpdate) {
        return resolveWith(currentObject);
      }

      // check if something changed
      changedProperties = (function() {
        var _results = [];

        for (var key in objectUpdate) {
          if (objectUpdate.hasOwnProperty(key)) {
            value = objectUpdate[key];
            if ((currentObject[key] !== value) === false) {
              continue;
            }
            // workaround for undefined values, as extend ignores these
            newObj[key] = value;
            _results.push(key);
          }
        }
        return _results;
      })();

      if (!(changedProperties.length || options)) {
        return resolveWith(newObj);
      }

      //apply update
      return api.save(type, id, newObj, options);
    }

    // promise decorations get lost when piped through `then`,
    // that's why we need to decorate the find's promise again.
    var promise = api.find(type, id).then(handleFound);
    return decoratePromise(promise);
  };


  // updateOrAdd
  // -------------

  // same as `.update()`, but in case the object cannot be found,
  // it gets created
  //
  api.updateOrAdd = function updateOrAdd(type, id, objectUpdate, options) {
    function handleNotFound() {
      var properties = extend(true, {}, objectUpdate, {
        id: id
      });

      return api.add(type, properties, options);
    }

    var promise = api.update(type, id, objectUpdate, options).then(null, handleNotFound);

    return decoratePromise(promise);
  };


  // updateAll
  // -----------------

  // update all objects in the store, can be optionally filtered by a function
  // As an alternative, an array of objects can be passed
  //
  // example usage
  //
  // hoodie.store.updateAll()
  //
  api.updateAll = function updateAll(filterOrObjects, objectUpdate, options) {
    var promise;

    options = options || {};

    // normalize the input: make sure we have all objects
    switch (true) {
    case typeof filterOrObjects === 'string':
      promise = api.findAll(filterOrObjects);
      break;
    case isPromise(filterOrObjects):
      promise = filterOrObjects;
      break;
    case $.isArray(filterOrObjects):
      promise = getDefer().resolve(filterOrObjects).promise();
      break;
    default:
      // e.g. null, update all
      promise = api.findAll();
    }

    promise = promise.then(function(objects) {
      // now we update all objects one by one and return a promise
      // that will be resolved once all updates have been finished
      var object, _updatePromises;

      if (!$.isArray(objects)) {
        objects = [objects];
      }

      _updatePromises = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = objects.length; _i < _len; _i++) {
          object = objects[_i];
          _results.push(api.update(object.type, object.id, objectUpdate, options));
        }
        return _results;
      })();

      return $.when.apply(null, _updatePromises);
    });

    return decoratePromise(promise);
  };


  // Remove
  // ------------

  // Removes one object specified by `type` and `id`.
  //
  // when object has been synced before, mark it as deleted.
  // Otherwise remove it from Store.
  //
  api.remove = function remove(type, id, options) {
    return decoratePromise(backend.remove(type, id, options || {}));
  };


  // removeAll
  // -----------

  // Destroye all objects. Can be filtered by a type
  //
  api.removeAll = function removeAll(type, options) {
    return decoratePromise(backend.removeAll(type, options || {}));
  };


  // decorate promises
  // -------------------

  // extend promises returned by store.api
  api.decoratePromises = function decoratePromises(methods) {
    return extend(promiseApi, methods);
  };



  // required backend methods
  // -------------------------
  if (!options.backend) {
    throw new Error('options.backend must be passed');
  }

  var required = 'save find findAll remove removeAll'.split(' ');

  required.forEach(function(methodName) {

    if (!options.backend[methodName]) {
      throw new Error('options.backend.' + methodName + ' must be passed.');
    }

    backend[methodName] = options.backend[methodName];
  });


  // Private
  // ---------

  // / not allowed for id
  var validIdOrTypePattern = /^[^\/]+$/;
  var validIdOrTypeRules = '/ not allowed';

  //
  function decoratePromise(promise) {
    return extend(promise, promiseApi);
  }

  return api;
}

module.exports = hoodieStoreApi;

},{"../../utils/promise/defer":30,"../../utils/promise/is_promise":31,"../../utils/promise/reject_with":33,"../../utils/promise/resolve_with":34,"../error/error":21,"../error/object_id":22,"../error/object_type":23,"../events":24,"./scoped":27,"extend":18}],26:[function(_dereq_,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};// Remote
// ========

// Connection to a remote Couch Database.
//
// store API
// ----------------
//
// object loading / updating / deleting
//
// * find(type, id)
// * findAll(type )
// * add(type, object)
// * save(type, id, object)
// * update(type, id, new_properties )
// * updateAll( type, new_properties)
// * remove(type, id)
// * removeAll(type)
//
// custom requests
//
// * request(view, params)
// * get(view, params)
// * post(view, params)
//
// synchronization
//
// * connect()
// * disconnect()
// * pull()
// * push()
// * sync()
//
// event binding
//
// * on(event, callback)
//

var hoodieStoreApi = _dereq_('./api');
var extend = _dereq_('extend');
var generateId = _dereq_('../../utils/generate_id');
var resolveWith = _dereq_('../../utils/promise/resolve_with');

//
function hoodieRemoteStore(hoodie, options) {

  var remoteStore = {};


  // Remote Store Persistance methods
  // ----------------------------------

  // find
  // ------

  // find one object
  //
  remoteStore.find = function find(type, id) {
    var path;

    path = type + '/' + id;

    if (remote.prefix) {
      path = remote.prefix + path;
    }

    path = '/' + encodeURIComponent(path);

    return remote.request('GET', path).then(parseFromRemote);
  };


  // findAll
  // ---------

  // find all objects, can be filetered by a type
  //
  remoteStore.findAll = function findAll(type) {
    var endkey, path, startkey;

    path = '/_all_docs?include_docs=true';

    switch (true) {
    case (type !== undefined) && remote.prefix !== '':
      startkey = remote.prefix + type + '/';
      break;
    case type !== undefined:
      startkey = type + '/';
      break;
    case remote.prefix !== '':
      startkey = remote.prefix;
      break;
    default:
      startkey = '';
    }

    if (startkey) {

      // make sure that only objects starting with
      // `startkey` will be returned
      endkey = startkey.replace(/.$/, function(chars) {
        var charCode;
        charCode = chars.charCodeAt(0);
        return String.fromCharCode(charCode + 1);
      });
      path = '' + path + '&startkey="' + (encodeURIComponent(startkey)) + '"&endkey="' + (encodeURIComponent(endkey)) + '"';
    }

    return remote.request('GET', path).then(mapDocsFromFindAll).then(parseAllFromRemote);
  };


  // save
  // ------

  // save a new object. If it existed before, all properties
  // will be overwritten
  //
  remoteStore.save = function save(object) {
    var path;

    if (!object.id) {
      object.id = generateId();
    }

    object = parseForRemote(object);
    path = '/' + encodeURIComponent(object._id);
    return remote.request('PUT', path, {
      data: object
    });
  };


  // remove
  // ---------

  // remove one object
  //
  remoteStore.remove = function remove(type, id) {
    return remote.update(type, id, {
      _deleted: true
    });
  };


  // removeAll
  // ------------

  // remove all objects, can be filtered by type
  //
  remoteStore.removeAll = function removeAll(type) {
    return remote.updateAll(type, {
      _deleted: true
    });
  };


  var remote = hoodieStoreApi(hoodie, {

    name: options.name,

    backend: {
      save: remoteStore.save,
      find: remoteStore.find,
      findAll: remoteStore.findAll,
      remove: remoteStore.remove,
      removeAll: remoteStore.removeAll
    }
  });





  // properties
  // ------------

  // name

  // the name of the Remote is the name of the
  // CouchDB database and is also used to prefix
  // triggered events
  //
  var remoteName = null;


  // sync

  // if set to true, updates will be continuously pulled
  // and pushed. Alternatively, `sync` can be set to
  // `pull: true` or `push: true`.
  //
  remote.connected = false;


  // prefix

  // prefix for docs in a CouchDB database, e.g. all docs
  // in public user stores are prefixed by '$public/'
  //
  remote.prefix = '';
  var remotePrefixPattern = new RegExp('^');


  // defaults
  // ----------------

  //
  if (options.name !== undefined) {
    remoteName = options.name;
  }

  if (options.prefix !== undefined) {
    remote.prefix = options.prefix;
    remotePrefixPattern = new RegExp('^' + remote.prefix);
  }

  if (options.baseUrl !== null) {
    remote.baseUrl = options.baseUrl;
  }


  // request
  // ---------

  // wrapper for hoodie's request, with some store specific defaults
  // and a prefixed path
  //
  remote.request = function remoteRequest(type, path, options) {
    options = options || {};

    if (remoteName) {
      path = '/' + (encodeURIComponent(remoteName)) + path;
    }

    if (remote.baseUrl) {
      path = '' + remote.baseUrl + path;
    }

    options.contentType = options.contentType || 'application/json';

    if (type === 'POST' || type === 'PUT') {
      options.dataType = options.dataType || 'json';
      options.processData = options.processData || false;
      options.data = JSON.stringify(options.data);
    }
    return hoodie.request(type, path, options);
  };


  // isKnownObject
  // ---------------

  // determine between a known and a new object
  //
  remote.isKnownObject = function isKnownObject(object) {
    var key = '' + object.type + '/' + object.id;

    if (knownObjects[key] !== undefined) {
      return knownObjects[key];
    }
  };


  // markAsKnownObject
  // -------------------

  // determine between a known and a new object
  //
  remote.markAsKnownObject = function markAsKnownObject(object) {
    var key = '' + object.type + '/' + object.id;
    knownObjects[key] = 1;
    return knownObjects[key];
  };


  // synchronization
  // -----------------

  // Connect
  // ---------

  // start syncing. `remote.bootstrap()` will automatically start
  // pulling when `remote.connected` remains true.
  //
  remote.connect = function connect(name) {
    if (name) {
      remoteName = name;
    }
    remote.connected = true;
    remote.trigger('connect');
    return remote.bootstrap().then(function() {
      remote.push();
    });
  };


  // Disconnect
  // ------------

  // stop syncing changes from remote store
  //
  remote.disconnect = function disconnect() {
    remote.connected = false;
    remote.trigger('disconnect'); // TODO: spec that
    if (pullRequest) {
      pullRequest.abort();
    }

    if (pushRequest) {
      pushRequest.abort();
    }

  };


  // isConnected
  // -------------

  //
  remote.isConnected = function isConnected() {
    return remote.connected;
  };


  // getSinceNr
  // ------------

  // returns the sequence number from wich to start to find changes in pull
  //
  var since = options.since || 0; // TODO: spec that!
  remote.getSinceNr = function getSinceNr() {
    if (typeof since === 'function') {
      return since();
    }

    return since;
  };


  // bootstrap
  // -----------

  // inital pull of data of the remote store. By default, we pull all
  // changes since the beginning, but this behavior might be adjusted,
  // e.g for a filtered bootstrap.
  //
  var isBootstrapping = false;
  remote.bootstrap = function bootstrap() {
    isBootstrapping = true;
    remote.trigger('bootstrap:start');
    return remote.pull().done(handleBootstrapSuccess).fail(handleBootstrapError);
  };


  // pull changes
  // --------------

  // a.k.a. make a GET request to CouchDB's `_changes` feed.
  // We currently make long poll requests, that we manually abort
  // and restart each 25 seconds.
  //
  var pullRequest, pullRequestTimeout;
  remote.pull = function pull() {
    pullRequest = remote.request('GET', pullUrl());

    if (remote.isConnected()) {
      global.clearTimeout(pullRequestTimeout);
      pullRequestTimeout = global.setTimeout(restartPullRequest, 25000);
    }

    return pullRequest.done(handlePullSuccess).fail(handlePullError);
  };


  // push changes
  // --------------

  // Push objects to remote store using the `_bulk_docs` API.
  //
  var pushRequest;
  remote.push = function push(objects) {
    var object, objectsForRemote, _i, _len;

    if (!$.isArray(objects)) {
      objects = defaultObjectsToPush();
    }

    if (objects.length === 0) {
      return resolveWith([]);
    }

    objectsForRemote = [];

    for (_i = 0, _len = objects.length; _i < _len; _i++) {

      // don't mess with original objects
      object = extend(true, {}, objects[_i]);
      addRevisionTo(object);
      object = parseForRemote(object);
      objectsForRemote.push(object);
    }
    pushRequest = remote.request('POST', '/_bulk_docs', {
      data: {
        docs: objectsForRemote,
        new_edits: false
      }
    });

    pushRequest.done(function() {
      for (var i = 0; i < objects.length; i++) {
        remote.trigger('push', objects[i]);
      }
    });
    return pushRequest;
  };

  // sync changes
  // --------------

  // push objects, then pull updates.
  //
  remote.sync = function sync(objects) {
    return remote.push(objects).then(remote.pull);
  };

  //
  // Private
  // ---------
  //

  // in order to differentiate whether an object from remote should trigger a 'new'
  // or an 'update' event, we store a hash of known objects
  var knownObjects = {};


  // valid CouchDB doc attributes starting with an underscore
  //
  var validSpecialAttributes = ['_id', '_rev', '_deleted', '_revisions', '_attachments'];


  // default objects to push
  // --------------------------

  // when pushed without passing any objects, the objects returned from
  // this method will be passed. It can be overwritten by passing an
  // array of objects or a function as `options.objects`
  //
  var defaultObjectsToPush = function defaultObjectsToPush() {
      return [];
    };
  if (options.defaultObjectsToPush) {
    if ($.isArray(options.defaultObjectsToPush)) {
      defaultObjectsToPush = function defaultObjectsToPush() {
        return options.defaultObjectsToPush;
      };
    } else {
      defaultObjectsToPush = options.defaultObjectsToPush;
    }
  }


  // setSinceNr
  // ------------

  // sets the sequence number from wich to start to find changes in pull.
  // If remote store was initialized with since : function(nr) { ... },
  // call the function with the seq passed. Otherwise simply set the seq
  // number and return it.
  //
  function setSinceNr(seq) {
    if (typeof since === 'function') {
      return since(seq);
    }

    since = seq;
    return since;
  }


  // Parse for remote
  // ------------------

  // parse object for remote storage. All properties starting with an
  // `underscore` do not get synchronized despite the special properties
  // `_id`, `_rev` and `_deleted` (see above)
  //
  // Also `id` gets replaced with `_id` which consists of type & id
  //
  function parseForRemote(object) {
    var attr, properties;
    properties = extend({}, object);

    for (attr in properties) {
      if (properties.hasOwnProperty(attr)) {
        if (validSpecialAttributes.indexOf(attr) !== -1) {
          continue;
        }
        if (!/^_/.test(attr)) {
          continue;
        }
        delete properties[attr];
      }
    }

    // prepare CouchDB id
    properties._id = '' + properties.type + '/' + properties.id;
    if (remote.prefix) {
      properties._id = '' + remote.prefix + properties._id;
    }
    delete properties.id;
    return properties;
  }


  // ### parseFromRemote

  // normalize objects coming from remote
  //
  // renames `_id` attribute to `id` and removes the type from the id,
  // e.g. `type/123` -> `123`
  //
  function parseFromRemote(object) {
    var id, matches;

    // handle id and type
    id = object._id || object.id;
    delete object._id;

    if (remote.prefix) {
      id = id.replace(remotePrefixPattern, '');
    }

    // turn doc/123 into type = doc & id = 123
    // NOTE: we don't use a simple id.split(/\//) here,
    // as in some cases IDs might contain '/', too
    //
    matches = id.match(/([^\/]+)\/(.*)/);
    object.type = matches[1], object.id = matches[2];

    return object;
  }

  function parseAllFromRemote(objects) {
    return objects.map(parseFromRemote);
  }


  // ### _addRevisionTo

  // extends passed object with a _rev property
  //
  function addRevisionTo(attributes) {
    var currentRevId, currentRevNr, newRevisionId, parts;
    try {
      parts = attributes._rev.split(/-/), currentRevNr = parts[0], currentRevId = parts[1];
    } catch (_error) {}
    currentRevNr = parseInt(currentRevNr, 10) || 0;
    newRevisionId = generateNewRevisionId();

    // local changes are not meant to be replicated outside of the
    // users database, therefore the `-local` suffix.
    if (attributes._$local) {
      newRevisionId += '-local';
    }

    attributes._rev = '' + (currentRevNr + 1) + '-' + newRevisionId;
    attributes._revisions = {
      start: 1,
      ids: [newRevisionId]
    };

    if (currentRevId) {
      attributes._revisions.start += currentRevNr;
      return attributes._revisions.ids.push(currentRevId);
    }
  }


  // ### generate new revision id

  //
  function generateNewRevisionId() {
    return generateId(9);
  }


  // ### map docs from findAll

  //
  function mapDocsFromFindAll(response) {
    return response.rows.map(function(row) {
      return row.doc;
    });
  }


  // ### pull url

  // Depending on whether remote is connected (= pulling changes continuously)
  // return a longpoll URL or not. If it is a beginning bootstrap request, do
  // not return a longpoll URL, as we want it to finish right away, even if there
  // are no changes on remote.
  //
  function pullUrl() {
    var since;
    since = remote.getSinceNr();
    if (remote.isConnected() && !isBootstrapping) {
      return '/_changes?include_docs=true&since=' + since + '&heartbeat=10000&feed=longpoll';
    } else {
      return '/_changes?include_docs=true&since=' + since;
    }
  }


  // ### restart pull request

  // request gets restarted automaticcally
  // when aborted (see handlePullError)
  function restartPullRequest() {
    if (pullRequest) {
      pullRequest.abort();
    }
  }


  // ### pull success handler

  // request gets restarted automaticcally
  // when aborted (see handlePullError)
  //
  function handlePullSuccess(response) {
    setSinceNr(response.last_seq);
    handlePullResults(response.results);
    if (remote.isConnected()) {
      return remote.pull();
    }
  }


  // ### pull error handler

  // when there is a change, trigger event,
  // then check for another change
  //
  function handlePullError(xhr, error) {
    if (!remote.isConnected()) {
      return;
    }

    switch (xhr.status) {
      // Session is invalid. User is still login, but needs to reauthenticate
      // before sync can be continued
    case 401:
      remote.trigger('error:unauthenticated', error);
      return remote.disconnect();

      // the 404 comes, when the requested DB has been removed
      // or does not exist yet.
      //
      // BUT: it might also happen that the background workers did
      //      not create a pending database yet. Therefore,
      //      we try it again in 3 seconds
      //
      // TODO: review / rethink that.
      //
    case 404:
      return global.setTimeout(remote.pull, 3000);

    case 500:
      //
      // Please server, don't give us these. At least not persistently
      //
      remote.trigger('error:server', error);
      global.setTimeout(remote.pull, 3000);
      return hoodie.checkConnection();
    default:
      // usually a 0, which stands for timeout or server not reachable.
      if (xhr.statusText === 'abort') {
        // manual abort after 25sec. restart pulling changes directly when connected
        return remote.pull();
      } else {

        // oops. This might be caused by an unreachable server.
        // Or the server cancelled it for what ever reason, e.g.
        // heroku kills the request after ~30s.
        // we'll try again after a 3s timeout
        //
        global.setTimeout(remote.pull, 3000);
        return hoodie.checkConnection();
      }
    }
  }


  // ### handle initial bootstrapping from remote
  //
  function handleBootstrapSuccess() {
    isBootstrapping = false;
    remote.trigger('bootstrap:end');
  }

  // ### handle error of initial bootstrapping from remote
  //
  function handleBootstrapError(error) {
    isBootstrapping = false;
    remote.trigger('bootstrap:error', error);
  }

  // ### handle changes from remote
  //
  function handlePullResults(changes) {
    var doc, event, object, _i, _len;

    for (_i = 0, _len = changes.length; _i < _len; _i++) {
      doc = changes[_i].doc;

      if (remote.prefix && doc._id.indexOf(remote.prefix) !== 0) {
        continue;
      }

      object = parseFromRemote(doc);

      if (object._deleted) {
        if (!remote.isKnownObject(object)) {
          continue;
        }
        event = 'remove';
        remote.isKnownObject(object);
      } else {
        if (remote.isKnownObject(object)) {
          event = 'update';
        } else {
          event = 'add';
          remote.markAsKnownObject(object);
        }
      }

      remote.trigger(event, object);
      remote.trigger(event + ':' + object.type, object);
      remote.trigger(event + ':' + object.type + ':' + object.id, object);
      remote.trigger('change', event, object);
      remote.trigger('change:' + object.type, event, object);
      remote.trigger('change:' + object.type + ':' + object.id, event, object);
    }
  }


  // bootstrap known objects
  //
  if (options.knownObjects) {
    for (var i = 0; i < options.knownObjects.length; i++) {
      remote.markAsKnownObject({
        type: options.knownObjects[i].type,
        id: options.knownObjects[i].id
      });
    }
  }


  // expose public API
  return remote;
}

module.exports = hoodieRemoteStore;

},{"../../utils/generate_id":28,"../../utils/promise/resolve_with":34,"./api":25,"extend":18}],27:[function(_dereq_,module,exports){
// scoped Store
// ============

// same as store, but with type preset to an initially
// passed value.
//
var hoodieEvents = _dereq_('../events');

//
function hoodieScopedStoreApi(hoodie, storeApi, options) {

  // name
  var storeName = options.name || 'store';
  var type = options.type;
  var id = options.id;

  var api = {};

  // scoped by type only
  if (!id) {

    // add events
    hoodieEvents(hoodie, {
      context: api,
      namespace: storeName + ':' + type
    });

    //
    api.save = function save(id, properties, options) {
      return storeApi.save(type, id, properties, options);
    };

    //
    api.add = function add(properties, options) {
      return storeApi.add(type, properties, options);
    };

    //
    api.find = function find(id) {
      return storeApi.find(type, id);
    };

    //
    api.findOrAdd = function findOrAdd(id, properties) {
      return storeApi.findOrAdd(type, id, properties);
    };

    //
    api.findAll = function findAll(options) {
      return storeApi.findAll(type, options);
    };

    //
    api.update = function update(id, objectUpdate, options) {
      return storeApi.update(type, id, objectUpdate, options);
    };

    //
    api.updateAll = function updateAll(objectUpdate, options) {
      return storeApi.updateAll(type, objectUpdate, options);
    };

    //
    api.remove = function remove(id, options) {
      return storeApi.remove(type, id, options);
    };

    //
    api.removeAll = function removeAll(options) {
      return storeApi.removeAll(type, options);
    };
  }

  // scoped by both: type & id
  if (id) {

    // add events
    hoodieEvents(hoodie, {
      context: api,
      namespace: storeName + ':' + type + ':' + id
    });

    //
    api.save = function save(properties, options) {
      return storeApi.save(type, id, properties, options);
    };

    //
    api.find = function find() {
      return storeApi.find(type, id);
    };

    //
    api.update = function update(objectUpdate, options) {
      return storeApi.update(type, id, objectUpdate, options);
    };

    //
    api.remove = function remove(options) {
      return storeApi.remove(type, id, options);
    };
  }

  //
  api.decoratePromises = storeApi.decoratePromises;
  api.validate = storeApi.validate;

  return api;
}

module.exports = hoodieScopedStoreApi;

},{"../events":24}],28:[function(_dereq_,module,exports){
var chars, i, radix;

// uuids consist of numbers and lowercase letters only.
// We stick to lowercase letters to prevent confusion
// and to prevent issues with CouchDB, e.g. database
// names do wonly allow for lowercase letters.
chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
radix = chars.length;

// helper to generate unique ids.
function generateId (length) {
  var id = '';

  // default uuid length to 7
  if (length === undefined) {
    length = 7;
  }

  for (i = 0; i < length; i++) {
    var rand = Math.random() * radix;
    var char = chars[Math.floor(rand)];
    id += String(char).charAt(0);
  }

  return id;
}

module.exports = generateId;

},{}],29:[function(_dereq_,module,exports){
var findLettersToUpperCase = /(^\w|_\w)/g;

function hoodiefyRequestErrorName (name) {
  name = name.replace(findLettersToUpperCase, function (match) {
    return (match[1] || match[0]).toUpperCase();
  });

  return 'Hoodie' + name + 'Error';
}

module.exports = hoodiefyRequestErrorName;
},{}],30:[function(_dereq_,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};module.exports = global.jQuery.Deferred;
},{}],31:[function(_dereq_,module,exports){
// returns true if passed object is a promise (but not a deferred),
// otherwise false.
function isPromise(object) {
  return !! (object &&
             typeof object.done === 'function' &&
             typeof object.resolve !== 'function');
}

module.exports = isPromise;
},{}],32:[function(_dereq_,module,exports){
var defer = _dereq_('./defer');
//
function reject() {
  return defer().reject().promise();
}

module.exports = reject;
},{"./defer":30}],33:[function(_dereq_,module,exports){
var getDefer = _dereq_('./defer');
var HoodieError = _dereq_('../../lib/error/error');

//
function rejectWith(errorProperties) {
  var error = new HoodieError(errorProperties);
  return getDefer().reject(error).promise();
}

module.exports = rejectWith;

},{"../../lib/error/error":21,"./defer":30}],34:[function(_dereq_,module,exports){
var getDefer = _dereq_('./defer');

//
function resolveWith() {
  var defer = getDefer();
  return defer.resolve.apply(defer, arguments).promise();
}

module.exports = resolveWith;

},{"./defer":30}],35:[function(_dereq_,module,exports){
// Hoodie Admin
// -------------
//
// your friendly library for pocket,
// the Hoodie Admin UI
//
var hoodieRequest = _dereq_('hoodie/src/hoodie/request');
var hoodieOpen = _dereq_('hoodie/src/hoodie/open');

var hoodieAdminAccount = _dereq_('./hoodie.admin/account');
var hoodieAdminPlugin = _dereq_('./hoodie.admin/plugin');
var hoodieAdminUser = _dereq_('./hoodie.admin/user');

var hoodieEvents = _dereq_('hoodie/src/lib/events');

// Constructor
// -------------

// When initializing a hoodie instance, an optional URL
// can be passed. That's the URL of the hoodie backend.
// If no URL passed it defaults to the current domain.
//
//     // init a new hoodie instance
//     hoodie = new Hoodie
//
function HoodieAdmin(baseUrl) {
  var hoodieAdmin = this;

  // enforce initialization with `new`
  if (!(hoodieAdmin instanceof HoodieAdmin)) {
    throw new Error('usage: new HoodieAdmin(url);');
  }

  // remove trailing slashes
  hoodieAdmin.baseUrl = baseUrl ? baseUrl.replace(/\/+$/, '') : '';


  // hoodieAdmin.extend
  // ---------------

  // extend hoodieAdmin instance:
  //
  //     hoodieAdmin.extend(function(hoodieAdmin) {} )
  //
  hoodieAdmin.extend = function extend(extension) {
    extension(hoodieAdmin);
  };

  //
  // Extending hoodie admin core
  //

  // * hoodieAdmin.bind
  // * hoodieAdmin.on
  // * hoodieAdmin.one
  // * hoodieAdmin.trigger
  // * hoodieAdmin.unbind
  // * hoodieAdmin.off
  hoodieAdmin.extend(hoodieEvents);

  // * hoodieAdmin.request
  hoodieAdmin.extend(hoodieRequest);

  // * hoodieAdmin.open
  hoodieAdmin.extend(hoodieOpen);

  // * hoodieAdmin.account
  hoodieAdmin.extend(hoodieAdminAccount);

  // * hoodieAdmin.plugin
  hoodieAdmin.extend(hoodieAdminPlugin);

  // * hoodieAdmin.user
  hoodieAdmin.extend(hoodieAdminUser);

  //
  // loading user extensions
  //
  applyExtensions(HoodieAdmin);
}

// Extending HoodieAdmin
// ----------------------

// You can extend the Hoodie class like so:
//
// Hoodie.extend(funcion(HoodieAdmin) { HoodieAdmin.myMagic = function() {} })
//

var extensions = [];

HoodieAdmin.extend = function(extension) {
  extensions.push(extension);
};

//
// detect available extensions and attach to Hoodie Object.
//
function applyExtensions(hoodie) {
  for (var i = 0; i < extensions.length; i++) {
    extensions[i](hoodie);
  }
}

module.exports = HoodieAdmin;

},{"./hoodie.admin/account":36,"./hoodie.admin/plugin":37,"./hoodie.admin/user":38,"hoodie/src/hoodie/open":19,"hoodie/src/hoodie/request":20,"hoodie/src/lib/events":24}],36:[function(_dereq_,module,exports){
// HoodieAdmin Account
// ===================

var hoodieEvents = _dereq_('hoodie/src/lib/events');
var resolveWith = _dereq_('hoodie/src/utils/promise/resolve_with');
var reject = _dereq_('hoodie/src/utils/promise/reject');

var ADMIN_USERNAME = 'admin';

function hoodieAccount (hoodieAdmin) {

  // public API
  var account = {};
  var signedIn = null;

  // add events API
  hoodieEvents(hoodieAdmin, {
    context: account,
    namespace: 'account'
  });


  // Authenticate
  // --------------

  // Use this method to assure that the admin is authenticated:
  // `hoodieAdmin.account.authenticate().done( doSomething ).fail( handleError )`
  // 
  // Note that this authenticated is a much simpler imlementation then the
  // one from `hoodie.admin.authenticate`. It sends a GET request every single
  // time it gets called, without bundling requests or caching the state on
  // whether the admin is authenticated or not.
  //
  account.authenticate = function authenticate() {
    return hoodieAdmin.request('GET', '/_session').then(handleAuthenticateRequestSuccess);
  };


  // sign in with password
  // ----------------------------------

  // username is hardcoded to "admin"
  account.signIn = function signIn(password) {
    var requestOptions = {
      data: {
        name: ADMIN_USERNAME,
        password: password
      }
    };

    return hoodieAdmin.request('POST', '/_session', requestOptions)
    .done( function() {
      signedIn = true;
      account.trigger('signin', ADMIN_USERNAME);
    });
  };


  // sign out
  // ---------
  account.signOut = function signOut() {
    return hoodieAdmin.request('DELETE', '/_session')
    .done( function() {
      signedIn = false;
      return hoodieAdmin.trigger('signout');
    });
  };

  account.hasValidSession = function() {
    return !!signedIn;
  };

  account.hasInValidSession = function() {
    return !!signedIn;
  };

  //
  // handle a successful authentication request.
  //
  // As long as there is no server error or internet connection issue,
  // the authenticate request (GET /_session) does always return
  // a 200 status. To differentiate whether the user is signed in or
  // not, we check `userCtx.name` in the response. If the user is not
  // signed in, it's null, otherwise the name the user signed in with
  //
  // If the user is not signed in, we difeerentiate between users that
  // signed in with a username / password or anonymously. For anonymous
  // users, the password is stored in local store, so we don't need
  // to trigger an 'unauthenticated' error, but instead try to sign in.
  //
  function handleAuthenticateRequestSuccess(response) {
    if (response.userCtx.name) {
      return resolveWith(response.userCtx.name);
    }

    return reject();
  }

  hoodieAdmin.account = account;
}

module.exports = hoodieAccount;


},{"hoodie/src/lib/events":24,"hoodie/src/utils/promise/reject":32,"hoodie/src/utils/promise/resolve_with":34}],37:[function(_dereq_,module,exports){
function hoodieAdminPlugin(hoodieAdmin) {
  hoodieAdmin.plugins = hoodieAdmin.open('plugins');
  hoodieAdmin.plugins.connect();
}

module.exports = hoodieAdminPlugin;


},{}],38:[function(_dereq_,module,exports){
function hoodieAdminUser(hoodieAdmin) {
  hoodieAdmin.user = hoodieAdmin.open('_users', {
    prefix: 'org.couchdb.user:'
  });
}

module.exports = hoodieAdminUser;


},{}],39:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');

var BaseCollection = _dereq_('../../../helpers/mvc/collection');
var Model = _dereq_('../models/plugin');

var Collection = BaseCollection.extend({
  url: app.request('config').api.url + '_plugins',
  model: Model
});

module.exports = Collection;


},{"../../../helpers/mvc/collection":79,"../../../helpers/namespace":82,"../models/plugin":43}],40:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Plugins = _dereq_('./plugins');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  plugins: function (name, action) {
    new Plugins({
      name: name,
      action: action,
      ns: 'plugins'
    });
  }

});

module.exports = Controller;


},{"./plugins":41,"backbone.marionette":"Mn2A9x"}],41:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

var Collection = _dereq_('../collections/plugins');
var Model = _dereq_('../models/plugin');

var controller = Marionette.Controller.extend({

  initialize: function (options) {
    var self = this;

    // require ui dependencies
    _dereq_('../../ui/plugins/index');

    this.options = options || {};

    this.model = new Model();
    this.collection = new Collection();
    this.collection.fetch({
      reset: true
    });

    this.listenTo(this.collection, 'reset', function () {

      switch (self.options.action) {
        case 'show':
          self.show(self.collection.get(self.options.name));
          break;
        case 'edit':
          self.edit(self.collection.get(self.options.name));
          break;
        default:
          self.list(self.collection);
      }

      // move this out
      app.vent.trigger('nav:show', {
        model: self.collection.get(self.options.id),
        collection: self.collection,
      });

    });

  },

  show: function (model) {
    app.vent.trigger('plugins:show', {
      collection: model.collection,
      model: model
    });
  },

  edit: function (model) {
    app.vent.trigger('plugins:edit', {
      collection: model.collection,
      model: model
    });
  },


  list: function (collection) {
    app.vent.trigger('plugins:list', {
      collection: collection
    });
  }

});

module.exports = controller;


},{"../../ui/plugins/index":71,"../collections/plugins":39,"../models/plugin":43,"backbone.marionette":"Mn2A9x"}],42:[function(_dereq_,module,exports){
/*jshint -W079 */
var app = _dereq_('../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('pocket', function () {

  'use strict';

  this.addInitializer(function (options) {

    _dereq_('../structural/layout/index');
    _dereq_('../structural/sidebar/index');
    _dereq_('../structural/content/index');

    // boot up default UI components
    app.vent.on('app:start', function () {

      _dereq_('../ui/logo/index');
      _dereq_('../ui/navigation/index');
      _dereq_('../ui/info/index');
    });

    app.vent.on('app:login', function () {
      _dereq_('../ui/login/index');
    });

    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('plugins', function (name, action) {
      self._controller.plugins(name, action);
    });

    app.vent.on('app:user:logout', function () {
      app.hoodieAdmin.account.signOut();
    });

  });

});

module.exports = app;

},{"../../helpers/namespace":82,"../structural/content/index":45,"../structural/layout/index":48,"../structural/sidebar/index":52,"../ui/info/index":55,"../ui/login/index":59,"../ui/logo/index":63,"../ui/navigation/index":67,"./controllers/index":40}],43:[function(_dereq_,module,exports){
'use strict';

var BaseModel = _dereq_('../../../helpers/mvc/model');
var app = _dereq_('../../../helpers/namespace');

var config = app.request('config');

var Model = BaseModel.extend({

  initialize: function () {
    this.setIframeUrl();
  },

  setIframeUrl: function () {
    var url =  config.api.url + '_plugins/' + this.get('name') + '/pocket/index.html';
    this.set({
      'iframeUrl': url
    });
  },

  defaults: {
    name: '',
    description: '',
    title: '',
    version: '',
    pos: '',
    width: '',
    iframeUrl: ''
  }

});

module.exports = Model;

},{"../../../helpers/mvc/model":80,"../../../helpers/namespace":82}],44:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    // create layout object passing in a template string
    var Layout = Marionette.Layout.extend({
      template:  function () {
        return options.template;
      }
    });

    this.container = new Marionette.Region({
      el: 'section',
    });

    this.container.show(new Layout);
  }
});

module.exports = Controller;

},{"backbone.marionette":"Mn2A9x"}],45:[function(_dereq_,module,exports){
/*jshint -W079 */
var Controller = _dereq_('./controllers/index');
var app = _dereq_('../../../helpers/namespace');

app.module('pocket.content', function () {

  'use strict';

  this.addInitializer(function (options) {

    options.app.components.sidebar.template = _dereq_('./templates/index.hbs');

    this._controller = new Controller(
      options.app.components.sidebar
    );

  });

  this.on('before:start', function () {
    app.rm.addRegions({
      content: 'section',
      content_header: 'section header',
      content_main: 'section section',
      content_footer: 'section footer'
    });
  });

});

module.exports = app;

},{"../../../helpers/namespace":82,"./controllers/index":44,"./templates/index.hbs":46}],46:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header></header>\n<section class=\"pluginView\"></section>\n<footer></footer>\n";
  });

},{"hbsfy/runtime":17}],47:[function(_dereq_,module,exports){
var Marionette = _dereq_('backbone.marionette');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {

    'use strict';

    this.options = options || {};
  },

  showAppLayout: function (tmpl) {

    var Layout = Marionette.Layout.extend({
      template:  function () {
        return tmpl;
      }
    });

    this.container = new Marionette.Region({
      el: '#content',
    });

    this.container.show(new Layout);
  },

  showLoginLayout: function (tmpl) {

    var Layout = Marionette.Layout.extend({
      template:  function () {
        return tmpl;
      }
    });

    this.container = new Marionette.Region({
      el: '#content',
    });

    this.container.show(new Layout);

    app.rm.addRegions({
      login: 'section.login'
    });

  }

});

module.exports = Controller;


},{"backbone.marionette":"Mn2A9x"}],48:[function(_dereq_,module,exports){
/*jshint -W079 */
var Controller = _dereq_('./controllers/index');

var app = _dereq_('../../../helpers/namespace');

app.module('pocket.layout', function () {

  'use strict';

  this.addInitializer(function () {
    this._controller = new Controller();
  });

  this.on('before:start', function () {

    var self = this;

    this.listenTo(app.vent, 'app:layout:login', function () {
      self._controller.showLoginLayout(_dereq_('./templates/login.hbs'));
    });

    this.listenTo(app.vent, 'app:layout:app', function () {
      self._controller.showAppLayout(_dereq_('./templates/index.hbs'));
    });

  });

});

module.exports = app;


},{"../../../helpers/namespace":82,"./controllers/index":47,"./templates/index.hbs":49,"./templates/login.hbs":50}],49:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<aside class=\"sidebar\"> </aside>\n<section class=\"content\"> </section>\n";
  });

},{"hbsfy/runtime":17}],50:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"login\"></section>\n\n";
  });

},{"hbsfy/runtime":17}],51:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    // create layout object passing in a template string
    var Layout = Marionette.Layout.extend({
      template:  function () {
        return options.template;
      }
    });

    this.container = new Marionette.Region({
      el: 'aside',
    });

    this.container.show(new Layout);
  }
});

module.exports = Controller;

},{"backbone.marionette":"Mn2A9x"}],52:[function(_dereq_,module,exports){
/*jshint -W079 */
var Controller = _dereq_('./controllers/index');
var app = _dereq_('../../../helpers/namespace');


app.module('pocket.sidebar', function () {

  'use strict';

  this.addInitializer(function (options) {
    options.app.components.sidebar.template = _dereq_('./templates/index.hbs');

    this._controller = new Controller(
      options.app.components.sidebar
    );

  });

  this.on('before:start', function () {

    app.rm.addRegions({
      sidebar: 'aside',
      sidebar_logo: 'aside header',
      sidebar_nav: 'aside nav',
      sidebar_footer: 'aside footer',
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":82,"./controllers/index":51,"./templates/index.hbs":53}],53:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header></header>\n<nav></nav>\n<footer></footer>\n<!--<ul class=\"helpers\">-->\n  <!--<li>Pocket guides</li>-->\n  <!--<li>Hoodie</li>-->\n<!--</ul>-->\n";
  });

},{"hbsfy/runtime":17}],54:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../../helpers/namespace');
var Marionette = _dereq_('backbone.marionette');
var View = _dereq_('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.options.model = new Backbone.Model({
      name: options.app.name
    });

    this.show(this.options);
  },

  show: function (opts) {
    var view = new View({
      model: opts.model
    });

    app.rm.get('content_header').show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":82,"../views/index":57,"backbone.marionette":"Mn2A9x"}],55:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('pocket.info', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('info:show', function (options) {
      self._controller.show(options);
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":82,"./controllers/index":54}],56:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h3>Hello Admin!</h3>\n<div class=\"placeMeta\">\n  16:45 (GMT+1)\n  Oct. 12th, 2013\n  Berlin\n</div>\n";
  });

},{"hbsfy/runtime":17}],57:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

_dereq_('../../../../helpers/handlebars');

var tmpl = _dereq_('../templates/index.hbs');

var View = Marionette.ItemView.extend({
  template: tmpl,
  initialize: function (options) {
    this.options = options || {};
  }
});

module.exports = View;

},{"../../../../helpers/handlebars":78,"../templates/index.hbs":56,"backbone.marionette":"Mn2A9x"}],58:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var View = _dereq_('../views/index');
var User =  _dereq_('../../../../models/user');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.user = new User();
    this.view = new View({
      model: this.user
    });

    this.show();
  },

  show: function () {
    app.rm.get('login').show(this.view);
  }

});

module.exports = Controller;


},{"../../../../models/user":88,"../views/index":61,"backbone.marionette":"Mn2A9x"}],59:[function(_dereq_,module,exports){
'use strict';

var Controller = _dereq_('./controllers/index');

app.module('pocket.login', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

});

module.exports = app;

},{"./controllers/index":58}],60:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form class=\"form-horizontal\">\n<fieldset>\n\n<!-- Form Name -->\n<div class=\"logo ir\">Hoodie Pocket</div>\n<h2 class=\"top\"> Welcome to appName here's Pocket</h2>\n\n<!-- Password input-->\n<div class=\"control-group\">\n  <label class=\"control-label\" for=\"password\">Password</label>\n  <div class=\"controls\">\n    <input id=\"password\" name=\"password\" type=\"password\" placeholder=\"Password\" class=\"input-xlarge\" required=\"\">\n\n  </div>\n</div>\n\n<!-- Button -->\n<div class=\"control-group\">\n  <label class=\"control-label\" for=\"\">Submit</label>\n  <div class=\"controls\">\n    <a id=\"submit\" name=\"\" class=\"btn btn-default\">Button</a>\n  </div>\n</div>\n\n</fieldset>\n</form>\n\n";
  });

},{"hbsfy/runtime":17}],61:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');
var Syphon = _dereq_('backbone.syphon');

var tmpl = _dereq_('../templates/index.hbs');

_dereq_('../../../../helpers/handlebars');
_dereq_('backbone.validation');


var View = Marionette.ItemView.extend({
  template: tmpl,

  initialize: function () {
    Backbone.Validation.bind(this);
  },

  events: {
    'click #submit' : 'submit',
    'keydown input' : 'submitOnEnter'
  },

  invalid: function () {
    console.log('invalid password');
  },

  valid: function () {
    Backbone.history.navigate('plugins', {
      trigger: true
    });
  },

  modelEvents: {
    'validated:invalid': 'invalid'
  },

  submitOnEnter: function (e) {
    var key = e.keyCode || e.which;

    if (key === 13) {
      e.preventDefault();
      this.submit();
    }
  },

  submit: function () {
    var self = this;
    var data = Syphon.serialize(this);

    self.model.signIn(data.password)
    .done(self.valid())
    .fail(self.invalid());
  }

});

module.exports = View;


},{"../../../../helpers/handlebars":78,"../templates/index.hbs":60,"backbone.marionette":"Mn2A9x","backbone.syphon":"zpJqfl","backbone.validation":7}],62:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../../helpers/namespace');
var Marionette = _dereq_('backbone.marionette');
var View = _dereq_('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};

    this.options.model = new Backbone.Model({
      name: options.app.name
    });

    this.show(this.options);
  },

  show: function (opts) {
    var view = new View({
      model: opts.model
    });

    app.rm.get('sidebar_logo').show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":82,"../views/index":65,"backbone.marionette":"Mn2A9x"}],63:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('pocket.logo', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('logo:show', function (options) {
      self._controller.show(options);
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":82,"./controllers/index":62}],64:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>\n  <a href=\"#\"> ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " </a>\n</h1>\n\n";
  return buffer;
  });

},{"hbsfy/runtime":17}],65:[function(_dereq_,module,exports){
arguments[4][57][0].apply(exports,arguments)
},{"../../../../helpers/handlebars":78,"../templates/index.hbs":64,"backbone.marionette":"Mn2A9x"}],66:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../../helpers/namespace');
var Marionette = _dereq_('backbone.marionette');
var View = _dereq_('../views/index');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  show: function (opts) {
    var view = new View({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.rm.get('sidebar_nav').show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":82,"../views/index":69,"backbone.marionette":"Mn2A9x"}],67:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('pocket.navigation', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('nav:show', function (options) {
      self._controller.show(options);
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":82,"./controllers/index":66}],68:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"#plugins/";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/show\">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</a>\n";
  return buffer;
  });

},{"hbsfy/runtime":17}],69:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

var tmpl = _dereq_('../templates/item.hbs');

_dereq_('../../../../helpers/handlebars');

var Row = Marionette.ItemView.extend({
  tagName: 'li',
  template: tmpl
});

var View = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'pluginList',
  itemView: Row
});

module.exports = View;


},{"../../../../helpers/handlebars":78,"../templates/item.hbs":68,"backbone.marionette":"Mn2A9x"}],70:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../../helpers/namespace');
var Marionette = _dereq_('backbone.marionette');

var ListView = _dereq_('../views/list');
var ShowView = _dereq_('../views/show');
var EditView = _dereq_('../views/edit');

var Controller = Marionette.Controller.extend({

  initialize: function (options) {
    this.options = options || {};
  },

  list: function (opts) {
    var view = new ListView({
      collection: opts.collection,
      ns: opts.ns
    });

    app.rm.get('content_main').show(view);
  },

  show: function (opts) {
    var view = new ShowView({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.rm.get('content_main').show(view);
  },

  edit: function (opts) {
    var view = new EditView({
      collection: opts.collection,
      model: opts.model,
      ns: opts.ns
    });

    app.rm.get('content_main').show(view);
  }

});

module.exports = Controller;

},{"../../../../helpers/namespace":82,"../views/edit":75,"../views/list":76,"../views/show":77,"backbone.marionette":"Mn2A9x"}],71:[function(_dereq_,module,exports){
'use strict';

var app = _dereq_('../../../helpers/namespace');
var Controller = _dereq_('./controllers/index');

app.module('pocket.plugins', function () {

  this.addInitializer(function (options) {
    this._controller = new Controller(options);
  });

  this.on('before:start', function () {
    var self = this;

    app.vent.on('plugins:list', function (options) {
      self._controller.list(options);
    });

    app.vent.on('plugins:show', function (options) {
      self._controller.show(options);
    });

    app.vent.on('plugins:edit', function (options) {
      self._controller.edit(options);
    });

  });

});

module.exports = app;

},{"../../../helpers/namespace":82,"./controllers/index":70}],72:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "edit\n";
  });

},{"hbsfy/runtime":17}],73:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<iframe src=\"";
  if (helper = helpers.iframeUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.iframeUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" frameborder=\"0\"></iframe>\n\n";
  return buffer;
  });

},{"hbsfy/runtime":17}],74:[function(_dereq_,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = _dereq_('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<iframe src=\"";
  if (helper = helpers.iframeUrl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.iframeUrl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" frameborder=\"0\"></iframe>\n";
  return buffer;
  });

},{"hbsfy/runtime":17}],75:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

_dereq_('../../../../helpers/handlebars');

var tmpl = _dereq_('../templates/edit.hbs');

var View = Marionette.ItemView.extend({
  template: tmpl
});

module.exports = View;

},{"../../../../helpers/handlebars":78,"../templates/edit.hbs":72,"backbone.marionette":"Mn2A9x"}],76:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

_dereq_('../../../../helpers/handlebars');

_dereq_('gridster');

var tmpl = _dereq_('../templates/list_item.hbs');

var Row = Marionette.ItemView.extend({
  tagName: 'li',
  template: tmpl
});

var View = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'pluginList',
  itemView: Row
});

module.exports = View;


},{"../../../../helpers/handlebars":78,"../templates/list_item.hbs":73,"backbone.marionette":"Mn2A9x","gridster":"OOmgq/"}],77:[function(_dereq_,module,exports){
'use strict';

var Marionette = _dereq_('backbone.marionette');

_dereq_('../../../../helpers/handlebars');

var tmpl = _dereq_('../templates/show.hbs');


var View = Marionette.ItemView.extend({
  template: tmpl,
  initialize: function (options) {
    this.options = options || {};
  }
});

module.exports = View;

},{"../../../../helpers/handlebars":78,"../templates/show.hbs":74,"backbone.marionette":"Mn2A9x"}],78:[function(_dereq_,module,exports){
/*global Handlebars:true */

var Handlebars = _dereq_('hbsfy/runtime');


//
// place {{ debug }}
//
Handlebars.registerHelper('debug', function (optionalValue) {

  'use strict';

  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});

module.exports = Handlebars;

},{"hbsfy/runtime":17}],79:[function(_dereq_,module,exports){

'use strict';

var _ = _dereq_('underscore');
var Backbone = _dereq_('backbone');

var SuperCollection = Backbone.SuperCollection = Backbone.Collection.extend({

  next: function (model) {
    return this.at((this.indexOf(model) + 1) % _.size(this));
  },

  prev: function (model) {
    var index = this.indexOf(model) - 1;
    return this.at(index > -1 ? index : _.size(this) - 1);
  }

});

module.exports = SuperCollection;


},{"backbone":"atSdsZ","underscore":"Y10LaM"}],80:[function(_dereq_,module,exports){
/*jshint -W079, -W098 */
var $ = _dereq_('jquery');
var Backbone = _dereq_('backbone');

var SuperModel = Backbone.Model.extend({
  idAttribute: 'name'
});

module.exports = SuperModel;


},{"backbone":"atSdsZ","jquery":"KvN3hc"}],81:[function(_dereq_,module,exports){
_dereq_('barf');

var BaseRouter = Backbone.Router.extend({

  before: {

    '*plugins(/:filter)': function (fragment, args, next) {
      app.hoodieAdmin.account.authenticate()
      .done(function () {
        app.vent.trigger('app:layout:app');
        next();
      })
      .fail(function () {
        app.vent.trigger('app:layout:login');
        app.vent.trigger('app:login');
      });
    }

  }

});

module.exports = BaseRouter;


},{"barf":8}],82:[function(_dereq_,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/*jshint -W079 */
'use strict';
var Marionette = _dereq_('backbone.marionette');
var Backbone = _dereq_('backbone');

var Router = _dereq_('../router');
var Config = _dereq_('../models/config');

var app = new Marionette.Application();
var AdminUser = _dereq_('../models/user');

//
// set global request handler exposing app config
//
app.reqres.setHandler('config', function () {
  return new Config().toJSON();
});

app.on('initialize:before', function (options) {

  app.hoodieAdmin = new AdminUser().admin;

  // create router instance
  app.router = new Router();

  // create layout manager
  app.rm = new Marionette.RegionManager();

  // log to console in debug mode
  if (options.debug) {
    global.app = app;

    app.vent.on('all', function (evt) {
      console.log(evt);
    });
  }

});

app.on('initialize:after', function () {

  // start router
  if (Backbone.history) {
    Backbone.history.start();
  }

});

module.exports = app;


},{"../models/config":87,"../models/user":88,"../router":89,"backbone":"atSdsZ","backbone.marionette":"Mn2A9x"}],83:[function(_dereq_,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};var storeError = _dereq_('./storeError');
var storeSuccess = _dereq_('./storeSuccess');
var app = _dereq_('../namespace');
var $ = _dereq_('jquery');

app.addInitializer(function (config) {

  'use strict';

  $.ajaxSetup({
    cache : config.ajax.cache,
    timeout: config.ajax.timeout,
    async: config.ajax.contentType
  });

  $(global).ajaxStart(function () {
    app.vent.trigger('ajax:start');
  });

  $(global).ajaxStop(function () {
    app.vent.trigger('ajax:stop');
  });

  $(global).ajaxError(storeError);
  $(global).ajaxSuccess(storeSuccess);

});

module.exports = app;

},{"../namespace":82,"./storeError":84,"./storeSuccess":85,"jquery":"KvN3hc"}],84:[function(_dereq_,module,exports){
var $ = _dereq_('jquery');

var errors = function (e, jqXHR) {

  'use strict';

  var statusCode = jqXHR.status + '';
  var errorObj = null;

  try {
    errorObj = $.parseJSON(jqXHR.responseText);
  }
  catch (e) {}

  var errors = {
    'default' : function () { }
  };

  (errors[statusCode] ? errors[statusCode] : errors['default'])();
};

module.exports = errors;

},{"jquery":"KvN3hc"}],85:[function(_dereq_,module,exports){
var success = function (e, jqXHR, opts, res) {

  'use strict';

  var statusCode = jqXHR.status + '';

  var success = {
    'default' : function () {
      console.log('SUCCESS', /* jqXHR ,*/ res);
    }
  };

  (success[statusCode] ? success[statusCode] : success['default'])();

};

module.exports = success;

},{}],86:[function(_dereq_,module,exports){
/*jshint -W079 */
var Config = _dereq_('./models/config');
var app = _dereq_('./helpers/namespace');

_dereq_('./helpers/storage/store');
_dereq_('./helpers/handlebars');

// start the pocket component
_dereq_('./components/pocket/index');

app.start(new Config().toJSON());

module.exports = app;


},{"./components/pocket/index":42,"./helpers/handlebars":78,"./helpers/namespace":82,"./helpers/storage/store":83,"./models/config":87}],87:[function(_dereq_,module,exports){
var BaseModel = _dereq_('../helpers/mvc/model');

var Model = BaseModel.extend({

  // TODO: the below should be extended by appconfig
  defaults: {
    app: {
      name: 'appname',
      components: {
        'layout': {
          config: { }
        },
        'sidebar': {
          config: {
            template: null
          }
        },
        'content': {
          config: { }
        }
      }
    },

    api: {
      url: '/_api/'
    },

    ajax: {
      timeout: 10000,
      cache: true,
      async: true
    },

    debug: true
  }

});

module.exports = Model;

},{"../helpers/mvc/model":80}],88:[function(_dereq_,module,exports){
var Backbone = _dereq_('backbone');
var Hoodieadmin = _dereq_('hoodie.admin');

var Model = Backbone.Model.extend({

  defaults: {
    password: ''
  },

  initialize: function () {
    this.admin = new Hoodieadmin();
  },

  authenticate: function () {
    return this.admin.account.authenticate();
  },

  hasValidSession: function () {
    return this.admin.account.hasValidSession();
  },

  hasInvalidSession: function () {
    return this.admin.account.hasInvalidSession();
  },

  signIn: function (password) {
    console.log('password');
    return this.admin.account.signIn(password);
  },

  signOut: function () {
    return this.admin.account.signOut();
  },

  validation: {
    password: {
      required: true,
      msg: 'Password can\'t be empty'
    }
  }

});

module.exports = Model;


},{"backbone":"atSdsZ","hoodie.admin":35}],89:[function(_dereq_,module,exports){
'use strict';

var BaseRouter = _dereq_('./helpers/mvc/router');

var Router = BaseRouter.extend({

  routes: {
    ''                      : 'plugins',
    'plugins/:filter'       : 'plugins',
    'logout'                : 'logout',
    '*defaults'             : 'plugins'
  },

  plugins: function (filter) {
    if (filter) {
      var action = filter.split('/')[2] || '';
      var name = filter.split('/')[1] || filter;

      app.vent.trigger('plugins', name, action);
    } else {
      app.vent.trigger('plugins');
    }

  },

  logout: function () {
    app.vent.trigger('app:layout:login');
    app.vent.trigger('app:user:logout');
  }

});

module.exports = Router;


},{"./helpers/mvc/router":81}]},{},[86])
(86)
});