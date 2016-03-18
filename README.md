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
* __styleList__ - Prefix whcih will instet to message text

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



##Contributing
Feel free to fork and create pull requests at any time.

##Security
If you discover any security related issues, please use this repository issue tracker.

##License
Open Software License ("OSL") v 3.0. Please see License File for more information.
 
[SamsonOS](http://samsonos.com)
