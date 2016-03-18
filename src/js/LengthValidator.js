/**
 * Created by molodyko on 18.03.2016.
 */

/**
 * Length validator
 */
var LengthValidator = (function () {

    /**
     * Init class
     * @param field
     */
    var constructor = function (field) {

        // Length type default values
        this.id = 'length';
        this.defaultMinLength = 6;
        this.defaultMaxLength = 12;
        this.defaultLengthMessage = 'Length of value have to be form %s to %s';
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
             * Set max value
             * @param number
             * @returns {LengthValidator}
             */
            max: function (number) {
                validatorInstance.defaultMaxLength = number;
                return this;
            },

            /**
             * Set min value
             * @param number
             * @returns {LengthValidator}
             */
            min: function (number) {
                validatorInstance.defaultMinLength = number;
                return this;
            },

            /**
             * Set length validator
             * @param errorMessage
             * @returns {LengthValidator}
             */
            length: function (errorMessage) {

                // Get message
                var message = errorMessage || validatorInstance.defaultLengthMessage;

                // Interpolate message
                validatorInstance.defaultLengthMessage = this.interpolate(
                    message,
                    validatorInstance.defaultMinLength,
                    validatorInstance.defaultMaxLength
                );
                this.reservedValidators.push(validatorInstance.id);
                return this;
            }
        }
    };

    /**
     * Validate validator
     */
    self.validate = function () {

        if (this.field._getFieldValue().length < this.defaultMinLength || this.field._getFieldValue().length > this.defaultMaxLength) {
            this.field.valid = false;
            this.field.addError(this.id, this.defaultLengthMessage);
        } else {
            this.field.valid = true;
            this.field.removeError(this.id);
        }
    };

    return constructor;
})();