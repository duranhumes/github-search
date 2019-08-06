'use strict';

class UI {
    constructor() {
        this.query = new Query();
        this.profilesContainter = document.querySelector('#profiles');
        this.paginationContainer = document.querySelector('#pagination');
    }

    showProfile(user = {}) {
        if (!user) return '';

        const UNDEFINED_STRING = 'None';
        const DEFAULT_IMG_URL =
            'https://avatars2.githubusercontent.com/u/44?v=4';

        this.profilesContainter.innerHTML += `
		<div class="card card-body mb-3">
			<div class="row">
				<div class="col-md-3">
					<img class="img-fluid mb-2 w-100" src="${user.avatar_url ||
                        DEFAULT_IMG_URL}" alt="${user.name ||
            UNDEFINED_STRING}" />
					<a href="${user.html_url ||
                        ''}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
				</div>
				<div class="col-md-9">
					<span class="badge badge-primary">Public Repos: ${user.public_repos ||
                        UNDEFINED_STRING}</span>
					<span class="badge badge-secondary">Public Gists: ${user.public_gists ||
                        UNDEFINED_STRING}</span>
					<span class="badge badge-success">Followers: ${user.followers ||
                        UNDEFINED_STRING}</span>
					<span class="badge badge-info">Following: ${user.following ||
                        UNDEFINED_STRING}</span>
					<br />
					<br />
					<ul class="list-group">
						<li class="list-group-item">Name: ${user.name || UNDEFINED_STRING}</li>
						<li class="list-group-item">Email: ${user.email || UNDEFINED_STRING}</li>
						<li class="list-group-item">Company: ${user.company || UNDEFINED_STRING}</li>
						<li class="list-group-item">Website/Blog: ${user.blog || UNDEFINED_STRING}</li>
						<li class="list-group-item">Bio: ${user.bio || UNDEFINED_STRING}</li>
						<li class="list-group-item">Member Since: ${this.formatDate(user.created_at) ||
                            UNDEFINED_STRING}</li>
					</ul>
				</div>
			</div>
		</div>
		`;
    }

    buildPagination({ currentPage = 1, perPage = 10, total = 0 }) {
        const totalPages = Math.ceil(total / perPage);
        const prevDisabled = Number(currentPage) === 1 ? 'disabled' : '';
        const nextDisabled =
            Number(currentPage) === totalPages ? 'disabled' : '';

        this.paginationContainer.innerHTML = `
				<ul class="pagination">
						<li class="page-item ${prevDisabled}">
								<a class="page-link" href="#" id="prev">Prev</a>
						</li>
						<li class="page-item ${nextDisabled}">
								<a class="page-link" href="#" id="next">Next</a>
						</li>
				</ul>
				`;

        const paginationButtons = document.querySelectorAll('.page-link');
        paginationButtons.forEach(pb =>
            pb.addEventListener('click', e => {
                e.preventDefault();

                if (e.target.id === 'prev') {
                    this.query.update('page', Number(currentPage) - 1);
                }

                if (e.target.id === 'next') {
                    this.query.update('page', Number(currentPage) + 1);
                }
            })
        );
    }

    formatDate(date = '') {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    showAlert(msg = '', className = '') {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.search-container');
        const search = document.querySelector('.search');

        if (document.querySelector('.alert')) {
            return;
        }

        container.insertBefore(div, search);

        const alert = document.querySelector('.alert');
        if (alert) {
            const alertTimeout = setTimeout(() => {
                alert.remove();
                clearTimeout(alertTimeout);
            }, 15000);
        }
    }

    clearAlert() {
        const alert = document.querySelector('.alert');
        if (!alert) {
            return;
        }

        alert.remove();
    }

    clear() {
        this.profilesContainter.innerHTML = '';
        this.paginationContainer.innerHTML = '';
    }
}
