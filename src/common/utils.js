var utils = (function() {
    // http://pietschsoft.com/post/2009/07/29/javascript-Easily-Extend-an-Object-Element
    // Create Global "extend" method
    var extend = function(obj, extObj) {
        if (arguments.length > 2) {
            for (var a = 1; a < arguments.length; a++) {
                extend(obj, arguments[a]);
            }
        } else {
            for (var i in extObj) {
                obj[i] = extObj[i];
            }
        }
        return obj;
    };

    return { extend: extend };
}());