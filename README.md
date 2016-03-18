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

##Contributing
Feel free to fork and create pull requests at any time.

##Security
If you discover any security related issues, please use this repository issue tracker.

##License
Open Software License ("OSL") v 3.0. Please see License File for more information.
 
[SamsonOS](http://samsonos.com)
