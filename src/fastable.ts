interface FastableOptions {
    containerElement: HTMLElement;
    data: Object;
}

class Fastable {
    containerElement: HTMLElement;
    tableElement: HTMLElement;
    data: Object;

    constructor(options: FastableOptions) {
        if (options === void 0) { return }
        this.containerElement = options.containerElement;
        this.data = options.data;

        console.log(this.data)
    }
}
