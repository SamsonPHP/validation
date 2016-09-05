/**
 * Created by molodyko on 18.03.2016.
 */

/**
 * Email validator
 */
var EmailValidator = (function() {

    /**
     * Init class
     * @param field
     */
    var constructor = function (field) {

        // Length type default values
        this.id = 'email';
        this.defaultTextMessage = 'Email not correct';
        this.field = field;
        this.pattern = /^[-._A-Za-z0-9]+@(?:[A-Za-z0-9][-A-Z-a-z0-9]+\.)+[A-Za-z]{2,6}$/;
    }, self = constructor.prototype;

    self.export = function () {
        var validatorInstance = this;

        return {

            /**
             * Email validation
             * @param errorMessage
             * @returns {FieldValidate}
             */
            email: function (errorMessage) {

                var msg = errorMessage || validatorInstance.defaultTextMessage;

                validatorInstance.defaultTextMessage = this.interpolate(
                    msg,
                    validatorInstance.defaultMinLengthText,
                    validatorInstance.defaultMaxLengthText
                );

                this.reservedValidators.push(validatorInstance.id);

                return this;
            }
        }
    };

    self.validate = function () {
        if(this.field._getFieldValue().length) {
            if (this.pattern.test(this.field._getFieldValue())) {
                this.field.valid = true;
                this.field.removeError(this.id);
            } else {
                this.field.valid = false;
                this.field.addError(this.id, this.defaultTextMessage);
            }
        }else {
            this.field.valid = false;
        }
    };

    return constructor;
})();

