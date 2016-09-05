/**
 * Created by petrashenko on 18.03.2016.
 */

/**
 * Year validator
 */
var YearValidator = (function() {

    /**
     * Init class
     * @param field
     */
    var constructor = function (field) {

        // Length type default values
        this.id = 'year';
        this.defaultMinYear = 1930;
        this.defaultMaxYear = 2016;
        this.defaultYearFormatMessage = 'Length of value have to be from %s to %s';
        this.field = field;
    }, self = constructor.prototype;

    self.export = function () {
        var validatorInstance = this;

        return {

            /**
             * Year validation
             * @param errorMessage
             * @returns {FieldValidate}
             */
            year: function (errorMessage) {

                var msg = errorMessage || validatorInstance.defaultYearFormatMessage;

                validatorInstance.defaultYearFormatMessage = this.interpolate(
                    msg,
                    validatorInstance.defaultMinYear,
                    validatorInstance.defaultMaxYear
                );
                this.reservedValidators.push(validatorInstance.id);

                return this;
            }
        }
    };

    self.validate = function () {
        if(this.field._getFieldValue().length) {
            if (this.field._getFieldValue() >= this.defaultMinYear && this.field._getFieldValue() <= this.defaultMaxYear) {
                this.field.valid = true;
                this.field.removeError(this.id);
            } else {
                this.field.valid = false;
                this.field.addError(this.id, this.defaultYearFormatMessage);
            }
        }else {
            this.field.valid = false;
        }
    };

    return constructor;
})();
