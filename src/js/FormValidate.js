/**
 * Created by molodyko on 18.03.2016.
 */

/**
 * Form validate
 */
var FormValidate = (function () {

    /**
     * Init class
     * @param fields
     */
    var constructor = function constructor(fields) {

        // Check valid arguments
        if (fields == null) {
            throw new Error('Fields is empty');
        }

        // Save fields
        this.fields = fields;
        // Set last valid value
        this.lastValid = null;
        // Init default mode
        this.defaultModeValidate = constructor.MODE_ALL_FIELD_VALIDATE;

    }, self = constructor.prototype;

    // Validate all fields
    constructor.MODE_ALL_FIELD_VALIDATE = 'all';

    // Validate one first field
    constructor.MODE_ONE_FIELD_VALIDATE= 'one';

    self.validate = function (opt) {
        var options = opt || {},
            mode = options.mode || this.defaultModeValidate,
            valid = true, i, field;

        for (i in this.fields) {
            field = this.fields[i];
            if (field.validate() == false) {
                valid = false;
                if (mode !== constructor.MODE_ALL_FIELD_VALIDATE) {
                    break;
                }
            }
        }

        this.lastValid = valid;
        return valid;
    };

    self.getLastResult = function () {
        return this.lastValid;
    };

    return constructor;
})();
