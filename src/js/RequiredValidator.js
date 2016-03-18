/**
 * Created by molodyko on 18.03.2016.
 */

/**
 * Required validator
 */
var RequiredValidator = {

    // Required type default values
    idRequired: 'required',
    defaultRequiredMessage: 'Field have to be filled',

    /**
     * Required validation
     * @param errorMessage
     * @returns {FieldValidate}
     */
    required: function (errorMessage) {

        this.defaultRequiredMessage = errorMessage || this.defaultRequiredMessage;
        this.reservedValidators.push(this.idRequired);
        return this;
    },

    /**
     * Validate
     * @returns {RequiredValidator}
     * @private
     */
    _required: function () {

        if (this._getFieldValue() == '') {
            this.addError(this.idRequired, this.defaultRequiredMessage);
            this.valid = false;
        } else {
            this.removeError(this.idRequired);
            this.valid = true;
        }

        return this;
    }
};
