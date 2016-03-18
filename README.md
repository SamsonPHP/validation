# SamsonPHP validation module
 
SamsonPHP validation implementation

[![Latest Stable Version](https://poser.pugx.org/SamsonPHP/validation/v/stable.svg)](https://packagist.org/packages/SamsonPHP/validation)
[![Build Status](https://scrutinizer-ci.com/g/SamsonPHP/validation/badges/build.png?b=master)](https://scrutinizer-ci.com/g/SamsonPHP/validation/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/SamsonPHP/validation/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/SamsonPHP/validation/?branch=master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/SamsonPHP/validation/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/SamsonPHP/validation/?branch=master) 
[![Total Downloads](https://poser.pugx.org/SamsonPHP/validation/downloads.svg)](https://packagist.org/packages/SamsonPHP/validation)
[![Stories in Ready](https://badge.waffle.io/SamsonPHP/validation.png?label=ready&title=Ready)](https://waffle.io/SamsonPHP/validation)

##Documentation
Follow [official documentation](http://github.com/SamsonPHP/validation/blob/master/docs/Index.md).
 
##Installation
You can install this package through Composer:
```composer require SamsonPHP/validation```
The packages adheres to the SemVer specification, and there will be full backward compatibility between minor versions.

##Testing
```$ vendor/bin/phpunit```

##Usage example
```
var formValidation = new FormValidate([
    new FieldValidate({
        el: '#product_name',
        insertTo: '.error-wrapper',
        styleList: '*'
    }).required().length(),
    new FieldValidate({
        el: '#product_description',
        insertTo: '.error-wrapper',
        styleList: '*'
    }).required(),
    new FieldValidate({
        el: '#product_usp',
        insertTo: '.error-wrapper',
        styleList: '*'
    }).required()
]);

s('#send-form-button').click(function () {
    return formValidation.validate();
});
```

##Using FieldValidator
Just create instance of FieldValidator class and pass options to it:

```
var productFieldValidator = new FieldValidate({
  el: '#product_name',
  insertTo: '.error-wrapper',
  styleList: '*'
}).required().url()
```

And if you want get result of validation you have to call this method:

```
productFieldValidator.validate(); //=> true|false
```

In this example:

* __el__ - [required] Selector to field, can be string or s() element
* __insertTo__ - Selector to field which can dysplay error message, can be string or s() element
* __styleList__ - Prefix whcih will instet to message text(default: '')

But there can be a lot of options:

* __trim__ - Need remove prefix and suffix spaces
* __fieldErrorClass__ - Class which will be added to field, can be string or array.(default: ['class-error-field-', 'class-error-field'])

If there is array then first element of it will be prefix to all false passed validators.

For example ``` ['class-error-field-', 'class-error-field'] ``` 

Will add such classes to field: <input ... class="class-error-field-required class-error-field-regexp class-error-field">

* __showErrorBlock__ - Show error block or not. Default if __insetTo__ element passed then block will show. If you want hide error block then pass false to it
* __insertToType__ - Where insert error block(default:__MODE_INSERT_TO_PARENT__):

 __MODE_INSERT_TO_DEFAULT__ - There no changes with insertTo element

 __MODE_INSERT_TO_PARENT__ - Find elemnet insert to in parent element of this field

* __showErrorBlockType__ - Where output classes(default:__MODE_SHOW_ERROR_BLOCK_DEFAULT__):

 __MODE_SHOW_ERROR_BLOCK_DEFAULT__ - Change classes in field
 
 __MODE_SHOW_ERROR_BLOCK_PARENT__ - Change classes in parent block 

##Crate custom validator
There very easy to create new validator. It can be class __validator__ or __alias__

For create new validator just create class with __export__ and __validate__ methods
 __export__ method will return object which will be added to main field object
 __validate__ method which validate field with custom login
 
 Constructor of class can receive field object
 
 There is simple required validator:
 
``` 
 /**
 * Required validator
 */
var RequiredValidator = (function () {

    /**
     * Init class
     * @param field
     */
    var constructor = function (field) {

        // Required type default values
        this.id = 'required';
        this.defaultRequiredMessage = 'Field have to be filled';
        this.field = field;
    };

    var self = constructor.prototype;

    /**
     * Export data into field
     */
    self.export = function () {
        var validatorInstance = this;

        return {

            /**
             * Required validation
             * @param errorMessage
             * @returns {FieldValidate}
             */
            required: function (errorMessage) {

                validatorInstance.defaultRequiredMessage = errorMessage || validatorInstance.defaultRequiredMessage;
                this.reservedValidators.push(validatorInstance.id);
                return this;
            }
        }
    };

    /**
     * Validate validator
     */
    self.validate = function () {

        if (this.field._getFieldValue() == '') {
            this.field.addError(this.id, this.defaultRequiredMessage);
            this.field.valid = false;
        } else {
            this.field.removeError(this.id);
            this.field.valid = true;
        }
    };

    return constructor;
})();
```

You need add your validator to register validator array

```
// Register all used validators
this.registerValidator = [
    new RequiredValidator(this)
];
```

__required__ method will be added to field instance and can be access as
``` new FieldValidator(...).required() ```
and such validator can be added

__And you can use alias validator__

There is when you need override some default values form another class validator and save it as new validator.

For example lets create __url__ validator which use regExp validator

```
/**
 * Url regexp validator
 */
var UrlValidator = {

    export: function () {
        return {

            /**
             * Url validation
             * @param errorMessage
             * @returns {FieldValidate}
             */
            url: function (errorMessage) {
                var msg = errorMessage || 'Field should be a url',
                    urlPattern = /^(https?:\/\/)?[\w]*\.[\w\-\&\#\=\/\.?\(\)]*$/;

                this.regExp(urlPattern, msg);
                return this;
            }
        }
    }
};
```

As you can see there is only one methond in object which return new object which will be used for extending


And you have to add to register array this validator as object without creating

```
// Register all used validators
this.registerValidator = [
    new RequiredValidator(this),
    new RegExpValidator(this),
    UrlValidator
];
```
And you can use it as:

``` new FieldValidator(...).required().url() ```

__But You should not use this validator with regExp__

##Contributing
Feel free to fork and create pull requests at any time.

##Security
If you discover any security related issues, please use this repository issue tracker.

##License
Open Software License ("OSL") v 3.0. Please see License File for more information.
 
[SamsonOS](http://samsonos.com)
