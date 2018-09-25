module.exports = function KeyPress(keycodes, callback) {
    const oKeycodes = Array.isArray(keycodes) ? keycodes : [keycodes];
    var keyMap = {};
    for (var i = oKeycodes.length; i--; ) {
        keyMap[String(oKeycodes[i])] = false;
    }
    function onKeyDown(e) {
        var keycode = e.which || e.keyCode;
        keyMap[String(keycode)] = true;
        run();
    }
    function onKeyUp(e) {
        var keycode = e.which || e.keyCode;
        keyMap[String(keycode)] = false;
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    function run() {
        var flag = true;
        for (var i = oKeycodes.length; i--; ) {
            var sKeycode = String(oKeycodes[i]);
            if (!keyMap[sKeycode]) {
                flag = false;
                break;
            }
        }
        if (flag) callback();
    }
    return function() {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
    }
};
