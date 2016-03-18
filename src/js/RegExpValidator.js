/**
 * Created by molodyko on 18.03.2016.
 */

/**
 * RegExp validator
 */
var RegExpValidator = (function () {

    /**
     * Init class
     * @param field
     */
    var constructor = function (field) {

        // TegExp type default values
        this.id = 'regexp';
        this.regExpPattern = null;
        this.regExpFlags = null;
        this.defaultRegExpMessage = 'Field have to match with %s';
        this.exportName = 'regExp';
        this.field = field;
    };

    var self = constructor.prototype;

    /**
     * Export data into field
     */
    self.export = function () {
        var validatorInstance = this,
            object = {};

        /**
         * RegExp validation
         * @param regexp
         * @param errorMessage
         * @returns {FieldValidate}
         */
        object[this.exportName] = function (regexp, errorMessage) {

            // Check if valid arguments
            if (regexp == null) {
                throw new Error("You should set regexp value");
            }

            // Get message
            var message = errorMessage || validatorInstance.defaultRegExpMessage;

            // Interpolate message
            validatorInstance.defaultRegExpMessage = this.interpolate(message, regexp);

            // If array set flags
            if (Array.isArray(regexp)) {
                validatorInstance.regExpPattern = regexp[0];
                validatorInstance.regExpFlags = regexp[1];
            } else {
                validatorInstance.regExpPattern = regexp;
            }

            this.reservedValidators.push(validatorInstance.id);
            return this;
        };

        return object;
    };

    /**
     * Validate validator
     */
    self.validate = function () {

        var regExp;
        if (this.regExpFlags != null) {
            regExp = new RegExp(this.regExpPattern, this.regExpFlags);
        } else {
            regExp = new RegExp(this.regExpPattern);
        }

        // Validate
        if (typeof this.field._getFieldValue() === 'string') {
            if (this.field._getFieldValue().match(regExp)) {
                this.field.removeError(this.id);
                this.field.valid = true;
            } else {

                this.field.addError(this.id, this.defaultRegExpMessage);
                this.field.valid = false;
            }
        }
    };

    return constructor;
})();