#validation

Validation module

Use like this:

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
