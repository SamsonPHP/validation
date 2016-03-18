/**
 * Created by molodyko on 18.03.2016.
 */

/**
 * Length validator
 */
var LengthValidator = {

    // Length type default values
    idLength: 'length',
    defaultMinLength: 6,
    defaultMaxLength: 12,
    defaultLengthMessage: 'Length of value have to be form %s to %s',

    /**
     * Set max value
     * @param number
     * @returns {LengthValidator}
     */
    max: function (number) {
        this.defaultMaxLength = number;
        return this;
    },

    /**
     * Set min value
     * @param number
     * @returns {LengthValidator}
     */
    min: function (number) {
        this.defaultMinLength = number;
        return this;
    },

    /**
     * Set length validator
     * @param errorMessage
     * @returns {LengthValidator}
     */
    length: function (errorMessage) {

        this.defaultLengthMessage = errorMessage || this.interpolate(
            this.defaultLengthMessage,
            this.defaultMinLength,
            this.defaultMaxLength
        );
        this.reservedValidators.push(this.idLength);
        return this;
    },

    /**
     * Validate
     * @returns {LengthValidator}
     * @private
     */
    _length: function () {

        if (this._getFieldValue().length < this.defaultMinLength || this._getFieldValue().length > this.defaultMaxLength) {
            this.valid = false;
            this.addError(this.idLength, this.defaultLengthMessage);
        } else {
            this.valid = true;
            this.removeError(this.idLength);
        }

        return this;
    }
};