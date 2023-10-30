const apiUrl = 'https://api.github.com/users';
const resultContainer = document.getElementById('user-info');
const avatarImage = document.getElementById('avatar-image');
const userName = document.getElementById('user-name');
const locationSpan = document.querySelector('#location span');
const followersSpan = document.querySelector('#followers span');
const followingSpan = document.querySelector('#following span');
const publicReposSpan = document.querySelector('#public-repos span');
const reposList = document.getElementById('repos-list');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    if (username) {
        searchGitHubUser(username);
    }
});

function searchGitHubUser(username) {
    fetch(`${apiUrl}/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(user => {
            displayUserInfo(user);
            return fetch(user.repos_url);
        })
        .then(response => response.json())
        .then(repos => {
            displayRepos(repos);
        })
        .catch(error => {
            resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function displayUserInfo(user) {
    avatarImage.src = user.avatar_url;
    userName.textContent = user.login;
    locationSpan.textContent = user.location || 'N/A';
    followersSpan.textContent = user.followers;
    followingSpan.textContent = user.following;
    publicReposSpan.textContent = user.public_repos;
}

function displayRepos(repos) {
    reposList.innerHTML = '';
    if (repos.length === 0) {
        reposList.innerHTML = '<li>No repositories found.</li>';
    } else {
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.className = 'repo-item';
            repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            reposList.appendChild(repoItem);
        });
    }
}