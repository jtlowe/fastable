interface FastableOptions {
    container: HTMLElement;
    data: Array<Object>;
    limit: number;
    header: Object;
}

class Fastable {
    container: HTMLElement;
    table: HTMLTableElement;
    data: Array<Object>;
    dom: Object;
    limit: number;
    currentPage: number = 1;
    header: Object;

    constructor(options: FastableOptions) {
        if (options === void 0) { return; }
        this.container = options.container;
        this.data = options.data;
        this.limit = options.limit != undefined ? options.limit : 0;
        this.header = options.header != undefined ? options.header : {};

        this.create();
    }

    create() {
        console.time();
        this.table = document.createElement('table');
        this.table.setAttribute('class', 'fastable table table-bordered');
        this.container.appendChild(this.table);

        this.dom = {
            type: 'table', props: { 'class': 'fastable table table-bordered' }, children: []
        }

        this.createHeader();

        this.table.appendChild(document.createElement('tbody'));

        this.createRows();

        // this.table.style.height = this.table.offsetHeight + 'px';


        if (this.limit > 0) {
            this.createPaging();
        }


        console.timeEnd();
    }

    createHeader() {
        var _this = this;
        var thead: HTMLElement = document.createElement('thead');
        var tr: HTMLTableRowElement = document.createElement('tr');
        var keys: Array<string> = Object.keys(this.data[0]);

        thead.appendChild(tr);

        var length = keys.length;

        for (var i = 0; i < length; i++) {
            var td = document.createElement('td');
            var text = keys[i];

            if (this.header.hasOwnProperty(text)) {
                text = this.header[text];
            }

            td.textContent = text;
            td.setAttribute('data-key', keys[i]);
            td.setAttribute('data-sort', '');
            tr.appendChild(td);
        }

        this.table.appendChild(thead);

        tr.addEventListener("click", function (e: Event): void {
            if (e.srcElement && e.srcElement.nodeName == "TD") {

                var currentSortedBy = tr.querySelector('.sorted');

                if (currentSortedBy && e.srcElement.className != 'sorted') {
                    currentSortedBy.setAttribute('data-sort', '');
                    currentSortedBy.className = '';
                }

                var key = e.srcElement.getAttribute('data-key');
                _this.data.sort(function (a, b) {
                    if (a[key] < b[key])
                        return -1;
                    if (a[key] > b[key])
                        return 1;
                    return 0;
                })

                // // do this better
                // if (e.srcElement.getAttribute('data-sort') !== 'ASC') {
                //     e.srcElement.setAttribute('data-sort', 'ASC');
                // }
                // else {
                //     e.srcElement.setAttribute('data-sort', 'DESC')
                //     _this.data.reverse();
                // }


                alert(e.srcElement.getAttribute('data-sort') === 'ASC')

                if (e.srcElement.getAttribute('data-sort') === '') {
                    // sort ascending
                    e.srcElement.setAttribute('data-sort', 'ASC')
                }
                else if (e.srcElement.getAttribute('data-sort') === 'ASC') {
                    e.srcElement.setAttribute('data-sort', 'DESC')
                    _this.data.reverse();
                }
                else if (e.srcElement.getAttribute('data-sort') === 'DESC') {
                    e.srcElement.setAttribute('data-sort', 'ASC')
                }


                e.srcElement.className = 'sorted';

                _this.currentPage = 1;
                _this.clearRows(function () {
                    _this.createRows();
                });

                // console.log(_this.data);

            }
        });
    }

    shouldPage(): boolean {
        var pageIt: boolean = false;

        if (this.limit > 0 && this.data.length > this.limit) {
            pageIt = true
        }

        return pageIt;
    }

    createPaging() {
        var context = this;
        var pagingList = document.createElement("ul");
        var pageCount: number = Math.ceil(this.data.length / this.limit);

        pagingList.className = "pagination";

        for (var i: number = 1; i <= pageCount; i++) {
            var listItem = document.createElement("li");
            var link = document.createElement('a');
            link.setAttribute('data-page', i.toString());
            link.textContent = i.toString();

            listItem.appendChild(link);
            pagingList.appendChild(listItem);
        }

        this.container.appendChild(pagingList);

        pagingList.addEventListener("click", function (e: Event): void {
            if (e.srcElement && e.srcElement.nodeName == "A") {
                context.currentPage = parseInt(e.srcElement.getAttribute('data-page'));
                context.clearRows(function () {
                    context.createRows();
                });

            }
        });
    }

    clearRows(callback: Function) {
        callback = callback || function () { };
        var tbody: HTMLElement = this.table.getElementsByTagName('tbody')[0];

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        callback();
        return this;
    }

    createRows() {
        // var length: number = this.shouldPage() ? this.currentPage * this.data.length + this.limit : this.data.length;
        var tbody: HTMLElement = this.table.getElementsByTagName('tbody')[0];
        var length = this.data.length;
        var pageLength = this.shouldPage() ? this.limit : length;
        var startIndex = (this.currentPage - 1) * this.limit;

        for (var i = 0; i < pageLength; i++) {
            var row: HTMLTableRowElement = this.createRow(this.data[startIndex + i]);
            tbody.appendChild(row);
        }

        this.table.appendChild(tbody);

    }

    createRow(data: Object): HTMLTableRowElement {
        var row: HTMLTableRowElement = document.createElement('tr');

        var keys = Object.keys(data)
        var length = keys.length;

        for (var i = 0; i < length; i++) {
            // var position = i - 5;
            var cell = document.createElement('td');
            cell.textContent = data[keys[i]];
            row.appendChild(cell);
        }

        return row;
    }
}




var sort_by = function (field, reverse, primer) {

    var key = primer ?
        function (x) { return primer(x[field]) } :
        function (x) { return x[field] };

    reverse = !reverse ? 1 : -1;

    return function (a: any, b: any) {
        var aGreater: any = a > b;
        var bGreater: any = b > a;
        return a = key(a), b = key(b), reverse * (aGreater - bGreater);
    }
}