/**
 * Created by Administrator on 2016/5/11 0011.
 */
/**
 * Created by Tivie on 04-11-2014.
 */

if (typeof angular !== 'undefined' && typeof markdown !== 'undefined') {

    (function (module, Showdown) {

        module
            .provider('$Showdown', provider)
            .directive('sdModelToHtml', ['$Showdown', markdownToHtmlDirective])
            .filter('sdStripHtml', stripHtmlFilter);

        function provider() {

            var config = {
                extensions: [],
                stripHtml : true
            };

            /**
             * Sets a configuration option
             *
             * @param {string} key Config parameter key
             * @param {string} value Config parameter value
             */
            this.setOption = function (key, value) {
                config.key = value;

                return this;
            };

            /**
             * Gets the value of the configuration parameter specified by key
             *
             * @param {string} key The config parameter key
             * @returns {string|null} Returns the value of the config parameter. (or null if the config parameter is not set)
             */
            this.getOption = function (key) {
                if (config.hasOwnProperty(key)) {
                    return config.key;
                } else {
                    return null;
                }
            };

            /**
             * Loads a Showdown Extension
             *
             * @param {string} extensionName The name of the extension to load
             */
            this.loadExtension = function (extensionName) {
                config.extensions.push(extensionName);

                return this;
            };

            function SDObject() {
                var converter = Showdown;
                /**
                 * Converts a markdown text into HTML
                 *
                 * @param {string} markdown The markdown string to be converted to HTML
                 * @returns {string} The converted HTML
                 */
                this.makeHtml = function (markdown) {
                    return converter.toHTML(markdown);
                };

                /**
                 * Strips a text of it's HTML tags
                 *
                 * @param {string} text
                 * @returns {string}
                 */
                this.stripHtml = function (text) {
                    return String(text).replace(/<[^>]+>/gm, '');
                };
            }

            // The object returned by service provider
            this.$get = function () {
                return new SDObject();
            };
        }

        /**
         * AngularJS Directive to Md to HTML transformation
         *
         * Usage example:
         * <div sd-md-to-html-model="markdownText" ></div>
         *
         * @param $Showdown
         * @returns {*}
         */
        function markdownToHtmlDirective($Showdown) {

            var link = function (scope, element) {
                scope.$watch('model', function (newValue) {
                    var val;
                    if (typeof newValue === 'string') {
                        val = $Showdown.makeHtml(newValue);
                    } else {
                        val = typeof newValue;
                    }
                    element.html(val);
                });
            };

            return {
                restrict: 'A',
                link    : link,
                scope   : {
                    model: '=sdModelToHtml'
                }
            }
        }

        /**
         * AngularJS Filter to Strip HTML tags from text
         *
         * @returns {Function}
         */
        function stripHtmlFilter() {
            return function (text) {
                return String(text).replace(/<[^>]+>/gm, '');
            };
        }

    })(angular.module('Showdown', []), markdown);

} else {

    /** TODO Since this library is opt out, maybe we should not throw an error so we can concatenate this
     script with the main lib */
    // throw new Error("ng-showdown was not loaded because one of it's dependencies (AngularJS or Showdown) wasn't met");
}
