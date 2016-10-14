var Fastable = (function () {
    function Fastable(options) {
        if (options === void 0) {
            return;
        }
        this.containerElement = options.containerElement;
        this.data = options.data;
        console.log(this.data);
    }
    return Fastable;
}());
