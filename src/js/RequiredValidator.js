/**
 * Created by molodyko on 18.03.2016.
 */

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

        console.log('fd');

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