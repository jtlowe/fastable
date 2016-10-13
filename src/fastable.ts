class Fastable {
    containerElement: HTMLElement;
    tableElement: HTMLElement;

    constructor(options: Object) {
        if (options === void 0) { return }
        this.tableElement = document.getElementById("table");
        alert("Worked");
    }
}
