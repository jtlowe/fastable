var Fastable = (function () {
    function Fastable(options) {
        if (options === void 0) {
            return;
        }
        this.container = options.container;
        this.data = options.data;
        this.create();
    }
    Fastable.prototype.create = function () {
        this.table = document.createElement('table');
        this.table.setAttribute('class', 'fastable table table-bordered');
        this.container.appendChild(this.table);
        this.createHeader();
    };
    Fastable.prototype.createHeader = function () {
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');
        var keys = Object.keys(this.data[0]);
        thead.appendChild(tr);
        var length = keys.length;
        for (var i = 0; i < length; i++) {
            var td = document.createElement('td');
            td.textContent = keys[i];
            tr.appendChild(td);
        }
        this.table.appendChild(thead);
    };
    return Fastable;
}());
