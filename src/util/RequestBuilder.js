class Request {
    constructor(url, pathVar = "", page = 1, size = 3) {
        this.url = url;
        this.page = page;
        this.size = size;
        this.pathVar = pathVar;
    }

    toUrlString() {
        return (
            this.url + this.pathVar + "?page=" + this.page + "&size=" + this.size
        );
    }
}

class RequestBuilder {
    setUrl(url) {
        this.url = url;
        return this;
    }

    setPage(page) {
        this.page = page;
        return this;
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    setPathVar(pathVar) {
        this.pathVar = pathVar;
        return this;
    }

    build() {
        return new Request(this.url, this.pathVar, this.page, this.size);
    }
}

export default RequestBuilder;
