/**
 * Created by molodyko on 18.03.2016.
 */

/**
 * Url regexp validator
 */
var UrlValidator = {

    export: function () {
        return {

            /**
             * Url validation
             * @param errorMessage
             * @returns {FieldValidate}
             */
            url: function (errorMessage) {
                var msg = errorMessage || 'Field should be a url',
                    urlPattern = /^(https?:\/\/)?[\w]*\.[\w\-\&\#\=\/\.?\(\)]*$/;

                this.regExp(urlPattern, msg);
                return this;
            }
        }
    }
};
