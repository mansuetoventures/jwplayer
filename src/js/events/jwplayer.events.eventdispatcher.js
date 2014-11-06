(function(jwplayer) {
    var _ = jwplayer._,
        _utils = jwplayer.utils,
        GLOBAL_EVENT = 'GLOBAL_EVENT';

    jwplayer.events.eventdispatcher = function(_id, _debug) {

        var obj = _utils.extend({}, jwplayer.utils.Events);

        /** Clears all event listeners **/
        this.resetEventListeners = obj.off;
        this.removeEventListener = obj.off;

        /** Add an event listener for a specific type of event. **/
        this.addEventListener = function(type, callback) {
            // Legacy support
            if (_.isString(callback)) {
                /*jshint evil:true*/
                callback = (new Function('return ' + callback))();
            }

            return obj.on(type, callback);
        };

        /** Add an event listener for all events. **/
        this.addGlobalListener = function(listener) {
            return this.addEventListener(GLOBAL_EVENT, listener);
        };

        /** Add an event listener for all events. **/
        this.removeGlobalListener = function(listener) {
            return this.removeEventListener(GLOBAL_EVENT, listener);
        };


        /** Send an event **/
        this.sendEvent = function(type, data) {
            data = _utils.extend({}, data, {
                id: _id,
                version: jwplayer.version,
                type: type
            });

            if (_debug) {
                _utils.log(type, data);
            }

            obj.trigger(GLOBAL_EVENT, data);
            obj.trigger(type, data);
        };
    };
})(window.jwplayer);
