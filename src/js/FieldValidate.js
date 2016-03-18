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
        this.registerValidator = [
            new RequiredValidator(this),
            new LengthValidator(this),
            new RegExpValidator(this),
            UrlValidator
        ];

        // Extend validators
        this._extendValidator();

        /**
         * Override parameters
         * TODO Add login to extend default values
         */
        // Main DOM element
        this.el = typeof options.el == 'string' ? s(options.el) : options.el;
        // Prefix to error message content
        this.styleList = options.styleList || '';
        // Trim value
        this.trim = options.trim || true;
        // Trim value
        this.fieldErrorClass = options.fieldErrorClass || ['class-error-field-', 'class-error-field'];
        // If need show error block with message (default value is: if insert to element exists)
        this.showErrorBlock = options.showErrorBlock || (options.insertTo != null);
        // Which element will be changed his class as error
        this.showErrorBlockType = options.showErrorBlockType || constructor.MODE_SHOW_ERROR_BLOCK_DEFAULT;
        // Resolve insert to options
        this._resolveInsetToOption(options);

        /**
         * Default values of views
         */
        // Class of error block
        this.errorBlockClassPrefix = 'class-error-';
        // Class of item error block
        this.errorBlockItemClassPrefix = 'class-error-item-';
        // Class depending of field name
        this.class = this.errorBlockClassPrefix + this.el.a('name');
        // Array of set validators
        this.reservedValidators = [];
        // Initial valid value
        this.valid = true;

    }, self = constructor.prototype;

    /**
     * Default element set class
     * @type {number}
     */
    constructor.MODE_SHOW_ERROR_BLOCK_DEFAULT = 1;

    /**
     * Set namespace of target element which will change his class as parent of target field
     * @type {number}
     */
    constructor.MODE_SHOW_ERROR_BLOCK_PARENT = 2;

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
        var validatorInstance;

        // Iterate all reserved validator and call their validate methods
        this.reservedValidators.forEach(function(id) {
            // Find validator
            validatorInstance = this._findValidatorById(id);
            if (typeof validatorInstance.validate === 'function') {
                // Validate
                validatorInstance.validate();
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

        // Show field class
        this._toggleFieldClass(id, false);
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
        this._toggleFieldClass(id, true);
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
     * Find global validator by id
     * @param id
     * @returns {*}
     * @private
     */
    self._findValidatorById = function (id) {
        var result;
        this.registerValidator.forEach(function (validator) {
            if (validator.id != null && validator.id === id) {
                result = validator;
            }
        });

        if (result == null) {
            throw new Error("Validator not found");
        }

        return result;
    };

    /**
     * Get right insert to element
     * @param options
     */
    self._resolveInsetToOption = function (options) {

        // If inset to element is exists
        if (options.insertTo) {

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
                    this.insertTo = s(insertToElement.selector, this.el.parent());
                    break;
            }
        }
    };

    /**
     * Toggle class to field
     * @private
     */
    self._toggleFieldClass = function (id, addClass) {
        var isFirst = true,
            targetElement = this.el,
            mode = addClass ? 'addClass' : 'removeClass';

        // When need attach classes to parent of input
        if (this.showErrorBlockType === constructor.MODE_SHOW_ERROR_BLOCK_PARENT) {
            targetElement = targetElement.parent();
        }

        // If need work globally not with particular validator
        if (id == null) {
            this.reservedValidators.forEach(function(validator) {
                if (typeof validator.id !== 'undefined') {
                    this._toggleFieldClass(validator.id, addClass);
                }
            }.bind(this))
        }

        // Add passed custom class
        if (this.fieldErrorClass) {
            // If this array of classes
            if (Array.isArray(this.fieldErrorClass)) {
                this.fieldErrorClass.forEach(function (klass) {
                    // Use first as prefix to id of type validation
                    if (isFirst) {
                        targetElement[mode](klass + id);
                        isFirst = false;
                    } else {
                        targetElement[mode](klass);
                    }
                }.bind(this));
            } else {
                targetElement[mode](this.fieldErrorClass);
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

            // If there is object
            if (typeof validator === 'object') {

                // Merge main object with data of validator
                constructor.merge(self, validator.export());
            }
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

