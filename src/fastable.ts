interface FastableOptions {
    container: HTMLElement;
    data: Object;
}

class Fastable {
    container: HTMLElement;
    table: HTMLElement;
    data: Object;

    constructor(options: FastableOptions) {
        if (options === void 0) { return; }
        this.container = options.container;
        this.data = options.data;

        this.create();
    }

    create() {
        this.table = document.createElement('table');
        this.table.setAttribute('class', 'fastable table table-bordered');
        this.container.appendChild(this.table);

        this.createHeader();
    }

    createHeader() {
        var thead: HTMLElement = document.createElement('thead');
        var tr: HTMLTableRowElement = document.createElement('tr');
        var keys: Array<string> = Object.keys(this.data[0]);

        thead.appendChild(tr);

        var length = keys.length;

        for (var i = 0; i < length; i++) {
            var td = document.createElement('td');
            td.textContent = keys[i];
            tr.appendChild(td);
        }

        this.table.appendChild(thead);
    }
}
