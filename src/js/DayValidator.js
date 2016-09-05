/**
 * Created by petrashenko on 18.03.2016.
 */

/**
 * Day validator
 */
var DayValidator = (function() {

    /**
     * Init class
     * @param field
     */
    var constructor = function (field) {

        // Length type default values
        this.id = 'day';
        this.defaultMinDay = 1;
        this.defaultMaxDay = 31;
        this.defaultDayFormatMessage = 'Length of value have to be from %s to %s';
        this.field = field;
    }, self = constructor.prototype;

    self.export = function () {
        var validatorInstance = this;

        return {

            /**
             * Day validation
             * @param errorMessage
             * @returns {FieldValidate}
             */
            day: function (errorMessage) {

                var msg = errorMessage || validatorInstance.defaultDayFormatMessage;

                validatorInstance.defaultDayFormatMessage = this.interpolate(
                    msg,
                    validatorInstance.defaultMinDay,
                    validatorInstance.defaultMaxDay
                );
                this.reservedValidators.push(validatorInstance.id);

                return this;
            }
        }
    };

    self.validate = function () {
        if(this.field._getFieldValue().length) {
            if (this.field._getFieldValue() >= this.defaultMinDay && this.field._getFieldValue() <= this.defaultMaxDay) {
                this.field.valid = true;
                this.field.removeError(this.id);
            } else {
                this.field.valid = false;
                this.field.addError(this.id, this.defaultDayFormatMessage);
            }
        }else {
            this.field.valid = false;
        }
    };

    return constructor;
})();
