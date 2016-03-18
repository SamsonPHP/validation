/**
 * Created by molodyko on 18.03.2016.
 */

/**
 * Field validate class
 */
var FieldValidate = (function () {

    /**
     * Init class
     * @param options
     */
    var constructor = function constructor(options) {

        // Check valid options
        if (options.el == null) {
            throw new Error('Missed required options in constructor');
        }

        /**
         * Extend validator
         */
        // Register all used validators
        this.registerValidator = [RequiredValidator, LengthValidator];
        // Extend validators
        this._extendValidator();

        /**
         * Override parameters
         */
        // Main DOM element
        this.el = typeof options.el == 'string' ? s(options.el) : options.el;
        // Prefix to error message content
        this.styleList = options.styleList || '';
        // Trim value
        this.trim = options.trim || true;
        // Trim value
        this.fieldErrorClass = options.fieldErrorClass || ['class-error-field-', 'class-error-field'];
        // If need show error block with message
        this.showErrorBlock = options.showErrorBlock || true;
        // Resolve insert to options
        this._resolveInsetToOption(options);

        /**
         * Default values of views
         */
        // Class of error block
        this.errorBlockClassPrefix = 'class-error-';
        // Class of item error block
        this.errorBlockItemClassPrefix = 'class-error-item-';
        // Prefix to validate method of reserved validator
        this.validatorIdPrefix = '_';
        // Class depending of field name
        this.class = this.errorBlockClassPrefix + this.el.a('name');
        // Array of set validators
        this.reservedValidators = [];
        // Initial valid value
        this.valid = true;

    }, self = constructor.prototype;

    /**
     * Set namespace as parent of target element
     * @type {number}
     */
    constructor.MODE_INSERT_TO_PARENT = 1;

    /**
     * Not set namespace
     * @type {number}
     */
    constructor.MODE_INSERT_TO_DEFAULT = 2;

    /**
     * Add custom validator
     * @param validator
     * @returns {FieldValidate}
     */
    self.addCustomValidator = function (validator) {
        if (validator != null) {
            this.registerValidator.push(validator);
        }
        return this;
    };

    /**
     * Validate field with set validators
     * @returns {boolean}
     */
    self.validate = function () {

        // Iterate all reserved validator and call their validate methods
        this.reservedValidators.forEach(function(validator) {
            var checkValue = this[this.validatorIdPrefix + validator];
            if (typeof checkValue === 'function') {
                checkValue.call(this);
            }
        }.bind(this));

        // If all is ok then remove error message
        if (this.valid) {
            this.removeError();
        }

        // Return result
        return this.valid;
    };

    /**
     * Remove item of error
     * @param id
     */
    self.removeError = function (id) {

        // If we work with error block
        if (this.showErrorBlock) {
            // Remove item
            if (id != null) {
                s('.' + this.class + ' .' + this.errorBlockItemClassPrefix + id, this.insertTo).remove();
                // Remove block
            } else {
                s('.' + this.class, this.insertTo).remove();
            }
        }

        // Remove field class
        this._removeFieldClass(id);
    };

    /**
     * Add error on field
     * @param id
     * @param message
     */
    self.addError = function (id, message) {

        // If we work with error block
        if (this.showErrorBlock) {
            // Create error block
            this._createErrorBlock(id, message);
        }

        // Show field class
        this._addFieldClass(id);
    };

    /**
     * Interpolate sting "Some %s", "value" => "Some value"
     * @returns {*}
     */
    self.interpolate = function () {
        var string = arguments[0], subst = [].slice.call(arguments, 1);
        // Substitute arguments
        subst.forEach(function (item) {
            string = string.replace(/\%s/i, item);
        });
        return string;
    };

    /**
     * Get right insert to elemnt
     * @param options
     */
    self._resolveInsetToOption = function (options) {

        // Get insert to element
        var insertToElement = typeof options.insertTo === 'string' ? s(options.insertTo) : options.insertTo;

        // Resolve type
        this.insertToType = options.insertToType || constructor.MODE_INSERT_TO_PARENT;

        // Set insert to element by mode
        switch (this.insertToType) {

            // Element insert to with default parent
            case constructor.MODE_INSERT_TO_DEFAULT:
                // Insert to passed element or to parent of input
                this.insertTo = insertToElement;
                break;

            // Element insert to as sibling to field element
            case constructor.MODE_INSERT_TO_PARENT:
                //console.log(this.el.parent());
                this.insertTo = s(insertToElement.selector, this.el.parent());
                break;
        }
    };

    /**
     * Add class to field
     * @private
     */
    self._addFieldClass = function (id) {
        var isFirst = true;

        console.log('sdf');
        // Add passed custom class
        if (this.fieldErrorClass) {
            if (Array.isArray(this.fieldErrorClass)) {
                this.fieldErrorClass.forEach(function (klass) {
                    if (isFirst) {
                        this.el.addClass(klass + id);
                        isFirst = false;
                    } else {
                        this.el.addClass(klass);
                    }
                }.bind(this));
            } else {
                this.el.addClass(this.fieldErrorClass);
            }
        }
    };

    /**
     * Remove field class
     * @private
     */
    self._removeFieldClass = function (id) {
        var isFirst = true;

        // Add passed custom class
        if (this.fieldErrorClass) {
            if (Array.isArray(this.fieldErrorClass)) {
                this.fieldErrorClass.forEach(function (klass) {
                    if (isFirst) {
                        this.el.removeClass(klass + id);
                        isFirst = false;
                    } else {
                        this.el.removeClass(klass);
                    }
                }.bind(this));
            } else {
                this.el.removeClass(this.fieldErrorClass);
            }
        }
    };

    /**
     * Create error block for particular field
     * @param id
     * @param message
     * @private
     */
    self._createErrorBlock = function (id, message) {

        var targetElement = this.insertTo,
            html;

        // If error block exists then use it
        if (s('.' + this.class).length > 0) {
            targetElement = s('.' + this.class, this.insertTo);
            // Or create it
        } else {
            targetElement.append(this._getErrorBlockView(this.class));
            targetElement = s('.' + this.class, this.insertTo);
        }
        // Remove previous error message of such type
        this.removeError(id);
        // Create new message item
        html = this._getErrorBlockItemView(this.errorBlockItemClassPrefix + id, message);
        targetElement.append(html);
    };

    /**
     * Get block view
     * @param klass
     * @returns {string}
     * @private
     */
    self._getErrorBlockView = function (klass) {
        return '<ul class="' + klass + '"></ul>';
    };

    /**
     * Get item view
     * @param klass
     * @param message
     * @returns {string}
     * @private
     */
    self._getErrorBlockItemView = function (klass, message) {
        return '<li class="' + this.errorBlockItemClassPrefix.slice(0, -1) + ' ' + klass + '">' + this.styleList + ' ' + message + '</li>';
    };

    /**
     * Get value of element
     * @returns {*}
     * @private
     */
    self._getFieldValue = function () {
        var value = this.el.val();

        // Trim value
        if (this.trim && (value !== null)) {
            value = value.trim();
        }

        return value;
    };

    /**
     * Extend registered validators to main object
     * @private
     */
    self._extendValidator = function () {
        // Add values to main object
        this.registerValidator.forEach(function (validator) {
            // Merge main object with data of validator
            constructor.merge(self, validator);
        }.bind(this));
    };

    /**
     * Recursively merge properties of two objects by link
     */
    constructor.merge = function merge(obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = merge(obj1[p], obj2[p]);

                } else {
                    obj1[p] = obj2[p];
                }

            } catch(e) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    };

    return constructor;
})();

