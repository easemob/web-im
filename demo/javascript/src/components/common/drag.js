module.exports = (function ( window ) {

    var _ev = (function () {

        var obj = {};

        if ( document.addEventListener ) {
            obj.bind = function ( dom, event, fn ) {
                dom.addEventListener(event, fn, false);
            };
            obj.unbind = function ( dom, event, fn ) {
                dom.removeEventListener(event, fn);
            };
        } else if ( document.attachEvent ) {
            obj.bind = function ( dom, event, fn ) {
                dom.attachEvent('on' + event, fn, false);
            };
            obj.unbind = function ( dom, event, fn ) {
                dom.detachEvent(event, fn);
            };
        } else {
            obj.bind = function ( dom, event, fn ) {
                dom['on' + event] = fn;
            };
            obj.unbind = function ( dom, event, fn ) {
                dom['on' + event] = null;
            };
        }
        return obj;
    }());


    return function ( dom ) {
        var me = this;

        me.dom = dom;

        if ( !me.dom ) {
            return false;
        }


        me._dragFlag = false;
        me._st = 0,
        me._startPosition = {
            x: 0,
            y: 0
        };

        var _start = function ( ev ) {

            var e = window.event || ev;

            var data = me.dom.getBoundingClientRect();

            me._dragFlag = true;

            // window size
            me._width = document.documentElement.clientWidth;
            me._height = document.documentElement.clientHeight;

            me._startPosition.x = e.clientX - data.left;
            me._startPosition.y = e.clientY - data.top;

            // dom size
            me.rect = {
                width: data.width,
                height: data.height
            };

            _ev.bind(document, 'mousemove', _move);
        };


        var _move = function ( ev ) {

            if ( !me._dragFlag ) {
                return false;
            }

            var e = window.event || ev,
                _x = me._width - e.clientX - me.rect.width + me._startPosition.x,
                _y = me._height - e.clientY - me.rect.height + me._startPosition.y;
            
            if ( e.clientX - me._startPosition.x <= 0 ) {//left
                _x = me._width - me.rect.width;
            } else if ( e.clientX + me.rect.width - me._startPosition.x >= me._width ) {//right
                _x = 0;
            }
            if ( e.clientY - me._startPosition.y <= 0 ) {//top
                _y = me._height - me.rect.height;
            } else if ( e.clientY + me.rect.height - me._startPosition.y >= me._height ) {//bottom
                _y = 0;
            }
            me.dom.style.left = 'auto';
            me.dom.style.top = 'auto';
            me.dom.style.right = _x + 'px';
            me.dom.style.bottom = _y + 'px';

            me.position = {
                x: _x
                , y: _y
            };
            
            clearTimeout(me._st);
            me._st = setTimeout(_moveend, 500);
        };

        var _moveend = function () {
            me._dragFlag = false;
            _ev.unbind(document, 'mousemove', _move);

            if ( !me.position ) { return false; }

            me.dom.style.left = 'auto';
            me.dom.style.top = 'auto';
            me.dom.style.right = me.position.x + 'px';
            me.dom.style.bottom = me.position.y + 'px';
            me.dom.style.display = 'block';
        };
           
        var _resize = function () {

            _ev.bind(window, 'resize', function () {
                if ( !me.rect || !me.rect.width ) {
                    return;
                }

                var _width = document.documentElement.clientWidth,
                    _height = document.documentElement.clientHeight,
                    _right = Number(me.dom.style.right.slice(0, -2)),
                    _bottom = Number(me.dom.style.bottom.slice(0, -2));
                
                //width
                if ( _width < me.rect.width ) {
                    me.dom.style.left = 'auto';
                    me.dom.style.right = 0;
                } else if ( _width - _right < me.rect.width ) {
                    me.dom.style.right = _width - me.rect.width + 'px';
                    me.dom.style.left = 0;
                } else {
                    me.dom.style.left = 'auto';
                }

                //height
                if ( _height < me.rect.height ) {
                    me.dom.style.top = 'auto';
                    me.dom.style.bottom = 0;
                } else if ( _height - _bottom < me.rect.height ) {
                    me.dom.style.bottom = _height - me.rect.height + 'px';
                    me.dom.style.top = 0;
                } else {
                    me.dom.style.top = 'auto';
                }
            });
        };


        _ev.bind(me.dom, 'mousedown', _start);
        _ev.bind(me.dom, 'mouseup', _moveend);
        _ev.bind(window, 'resize', _resize);

    };
}(window));
