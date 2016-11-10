var Fastable = (function () {
    function Fastable(options) {
        this.currentPage = 1;
        if (options === void 0) {
            return;
        }
        this.container = options.container;
        this.data = options.data;
        this.limit = options.limit != undefined ? options.limit : 0;
        this.create();
    }
    Fastable.prototype.create = function () {
        console.time();
        this.table = document.createElement('table');
        this.table.setAttribute('class', 'fastable table table-bordered');
        this.container.appendChild(this.table);
        this.dom = {
            type: 'table', props: { 'class': 'fastable table table-bordered' }, children: []
        };
        this.createHeader();
        this.table.appendChild(document.createElement('tbody'));
        this.createRows();
        // this.table.style.height = this.table.offsetHeight + 'px';
        if (this.limit > 0) {
            this.createPaging();
        }
        console.timeEnd();
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
    Fastable.prototype.shouldPage = function () {
        var pageIt = false;
        if (this.limit > 0 && this.data.length > this.limit) {
            pageIt = true;
        }
        return pageIt;
    };
    Fastable.prototype.createPaging = function () {
        var context = this;
        var pagingList = document.createElement("ul");
        var pageCount = Math.ceil(this.data.length / this.limit);
        pagingList.className = "pagination";
        for (var i = 1; i <= pageCount; i++) {
            var listItem = document.createElement("li");
            var link = document.createElement('a');
            link.setAttribute('data-page', i.toString());
            link.textContent = i.toString();
            listItem.appendChild(link);
            pagingList.appendChild(listItem);
        }
        this.container.appendChild(pagingList);
        pagingList.addEventListener("click", function (e) {
            if (e.srcElement && e.srcElement.nodeName == "A") {
                context.currentPage = parseInt(e.srcElement.getAttribute('data-page'));
                context.clearRows(function () {
                    context.createRows();
                });
            }
        });
    };
    Fastable.prototype.clearRows = function (callback) {
        callback = callback || function () { };
        var tbody = this.table.getElementsByTagName('tbody')[0];
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        callback();
        return this;
    };
    Fastable.prototype.createRows = function () {
        // var length: number = this.shouldPage() ? this.currentPage * this.data.length + this.limit : this.data.length;
        var tbody = this.table.getElementsByTagName('tbody')[0];
        var length = this.data.length;
        var pageLength = this.shouldPage() ? this.limit : length;
        var startIndex = (this.currentPage - 1) * this.limit;
        for (var i = 0; i < pageLength; i++) {
            var row = this.createRow(this.data[startIndex + i]);
            tbody.appendChild(row);
        }
        this.table.appendChild(tbody);
    };
    Fastable.prototype.createRow = function (data) {
        var row = document.createElement('tr');
        var keys = Object.keys(data);
        var i = keys.length;
        while (i--) {
            var position = 5 - i;
            var cell = document.createElement('td');
            cell.textContent = data[keys[position]];
            row.appendChild(cell);
        }
        return row;
    };
    return Fastable;
}());
