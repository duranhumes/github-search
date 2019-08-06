'use strict';

class Query {
    constructor() {
        const params = new URLSearchParams(window.location.search);

        this.query = params.get('query') || '';
        this.pageSize = params.get('perPage') || 10;
        this.page = params.get('page') || 1;
    }

    set(key, value) {
        const { search, pathname } = window.location;
        const params = new URLSearchParams(search);
        params.set(key, value);
        this[key] = value;

        window.history.pushState({}, '', `${pathname}?${params}`);
    }

    update(key, value) {
        const { search, pathname } = window.location;
        const params = new URLSearchParams(search);
        params.set(key, value);
        this[key] = value;

        window.location = `${pathname}?${params}`;
    }

    set perPage(size) {
        this.pageSize = size;
    }

    set currentQuery(query) {
        this.query = query;
    }

    set currentPage(page) {
        this.page = page;
    }

    get perPage() {
        return this.pageSize;
    }

    get currentQuery() {
        return this.query;
    }

    get currentPage() {
        return this.page;
    }
}
