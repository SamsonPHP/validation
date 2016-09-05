/**
 * Created by petrashenko on 18.03.2016.
 */

/**
 * Text validator
 */
var TextValidator = (function() {

    /**
     * Init class
     * @param field
     */
    var constructor = function (field) {

        // Length type default values
        this.id = 'text';
        this.defaultMinLengthText = 2;
        this.defaultMaxLengthText  = 20;
        this.defaultTextMessage = 'Length of value have to be from %s to %s';
        this.field = field;
    }, self = constructor.prototype;

    self.export = function () {
        var validatorInstance = this;

        return {

            /**
             * Text validation
             * @param errorMessage
             * @returns {FieldValidate}
             */
            text: function (errorMessage) {

                var msg = errorMessage || validatorInstance.defaultTextMessage;

                validatorInstance.defaultTextMessage = this.interpolate(
                    msg,
                    validatorInstance.defaultMinLengthText,
                    validatorInstance.defaultMaxLengthText
                );

                this.reservedValidators.push(validatorInstance.id);

                return this;
            },

            minLength : function(num) {
                validatorInstance.defaultMinLengthText = num;
                return this;
            },

            maxLength : function(num) {
                validatorInstance.defaultMaxLengthText = num;
                return this;
            }
        }
    };

    self.validate = function () {
        if(this.field._getFieldValue().length) {
            if (this.field._getFieldValue().length >= this.defaultMinLengthText && this.field._getFieldValue().length <= this.defaultMaxLengthText) {
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
