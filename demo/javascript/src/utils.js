;
(function () {
    var toString = Object.prototype.toString;

    var utils = {
        /**
         * check is storage available
         * @param storage{string} default 'localStorage);
         * @return boolean
         */
        isStorageAvailable: function (storage) {
            if (!storage) storage = 'localStorage';
            try {
                window[storage].setItem('_easemob_detection_', '_easemob_detection_');
                window[storage].getItem('_easemob_detection_');
                return true; 
            } catch (e) {
                return false;
            }
        },

        /**
         * get an item from storage through key.
         * @param key{string|integer}
         * @param storage{string} default 'localStorage'
         * return {string|integer|object|etc}
         */
        getItemFromStorage: function (key, storage) {
            if (!storage) storage = 'localStorage';
            var result = window[storage].getItem(key);
            try {
                result = JSON.parse(result);
            } catch (error) {
                // NOP
            }
            return result;
        },

        /**
         * set an item to storage
         * @param key{string|integer}
         * @param val{string|integer|object|etc}
         * @param storage{string} default 'localStorage'
         */
        setItemToStorage: function (key, val, storage) {
            if (!storage) storage = 'localStorage';
            var valToBeSaved = toString.call(val) === '[object Object]' || Array.isArray(val) ? JSON.stringify(val) : val;
            window[storage].setItem(key, valToBeSaved);
        }
    };

    exports.utils = utils;
}());
