'use strict';

class Github {
    constructor() {
        const clientId = 'a9779b35180351d0adb5';
        const clientSecret = 'f82b287d4cefb99d56908e5c9a929c09ff9312cc';

        this.authUrlEnd = `client_id=${clientId}&client_secret=${clientSecret}`;
        this.baseURL = 'https://api.github.com';
    }

    async searchUsers(input, options) {
        const { per_page, page } = options;
        const pagination = `per_page=${per_page}&page=${page}`;
        const usersUrl = `${
            this.baseURL
        }/search/users?q=${input}&${pagination}&${this.authUrlEnd}`;

        const users = await fetch(usersUrl);
        const data = await users.json();

        return {
            users: data.items,
            total: data.total_count,
            status: users.status,
            errorMessage: data.message || '',
        };
    }

    async getUser(username) {
        const userUrl = `${this.baseURL}/users/${username}?${this.authUrlEnd}`;

        const user = await fetch(userUrl);

        return user.json();
    }
}
