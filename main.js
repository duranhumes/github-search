'use strict';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const totalResults = document.querySelector('#total-results');
const profiles = document.querySelector('#profiles');

const github = new Github();
const query = new Query();
const ui = new UI();

const search = async () => {
    ui.clear();
    ui.clearAlert();

    if (!searchInput.value && query.currentQuery) {
        searchInput.value = query.currentQuery;
    }

    const searchValue = searchInput.value;
    if (!searchValue) {
        ui.showAlert('No search query', 'danger');
        ui.clear();

        return;
    }

    // Resets/syncs the page and perPage when
    // the search input value and the url bar value
    // are different, the url value is updated further
    // down.
    if (searchValue !== query.currentQuery) {
        ui.clear();
        query.set('perPage', 10);
        query.set('page', 1);
    }

    const options = {
        per_page: query.perPage,
        page: query.currentPage,
    };

    const { users, total, errorMessage } = await github.searchUsers(
        searchValue,
        options
    );
    if (total === 0) {
        ui.showAlert('No results found', 'warning');
        ui.clear();

        return;
    }
    if (errorMessage) {
        ui.showAlert(errorMessage, 'danger');
        ui.clear();

        return;
    }

    users.forEach(async u => {
        const user = await github.getUser(u.login, total);

        ui.showProfile(user);
    });

    query.set('query', searchValue);
    query.set('perPage', query.perPage);
    query.set('page', query.currentPage);

    ui.buildPagination({
        total,
        currentPage: query.page,
        perPage: query.perPage,
    });

    totalResults.innerHTML = `Total Results: ${total}`;
};

searchInput.addEventListener('input', e => {
    e.preventDefault();
    query.set('query', e.target.value);
});

searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    await search();
});

document.addEventListener('DOMContentLoaded', async e => {
    e.preventDefault();
    if (profiles.innerHTML === '') {
        await search();
    }
});
