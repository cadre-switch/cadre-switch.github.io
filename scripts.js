document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('issues-container');

    issuesData.forEach(issue => {
        const issueDiv = document.createElement('div');
        issueDiv.className = 'issue';

        // Create a hyperlink for the issue image and information
        const issueLink = document.createElement('a');
        issueLink.href = issue.homepageUrl;
        issueLink.style.textDecoration = 'none';

        const img = document.createElement('img');
        const imageName = issue.number.toLowerCase().replace(/\s+/g, '-');
        img.src = `/images/${imageName}.jpg`;
        img.className = 'issue-image';
        issueLink.appendChild(img);

        // Wrapper for title/date/button layout
        const issueInfo = document.createElement('div');
        issueInfo.className = 'issue-info';

        const issueTitle = document.createElement('div');
        issueTitle.className = 'issue-title';
        issueTitle.textContent = `${issue.number}: ${issue.title}`;

        const issueMeta = document.createElement('div');
        issueMeta.className = 'issue-meta';

        const issueDate = document.createElement('span');
        issueDate.className = 'issue-date';
        issueDate.textContent = issue.date;

        const issueToggleButton = document.createElement('button');
        issueToggleButton.innerHTML = '&#x25BC;';
        issueToggleButton.className = 'toggle-button issue-toggle';
        issueToggleButton.type = 'button';

        issueMeta.appendChild(issueDate);
        issueMeta.appendChild(issueToggleButton);

        issueInfo.appendChild(issueTitle);
        issueInfo.appendChild(issueMeta);

        issueLink.appendChild(issueInfo);
        issueDiv.appendChild(issueLink);

        container.appendChild(issueDiv);

        const articlesDiv = document.createElement('div');
        articlesDiv.className = 'details';
        articlesDiv.style.display = 'none';
        issueDiv.appendChild(articlesDiv);

        issue.articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';

            let authorInfo;
            if (article.authorUrl) {
                authorInfo = `<a href="${article.authorUrl}">${article.authors}</a>`;
            } else {
                authorInfo = `${article.authors}`;
            }

            articleDiv.innerHTML = `<a href="${article.url}">${article.title}</a> by ${authorInfo}`;

            const articleToggleButton = document.createElement('button');
            articleToggleButton.innerHTML = '&#x25BC;';
            articleToggleButton.className = 'toggle-button';
            articleToggleButton.type = 'button';
            articleDiv.appendChild(articleToggleButton);

            const abstractDiv = document.createElement('div');
            abstractDiv.className = 'details';
            abstractDiv.style.display = 'none';
            abstractDiv.textContent = article.abstract;
            articleDiv.appendChild(abstractDiv);

            articleToggleButton.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                abstractDiv.style.display = abstractDiv.style.display === 'none' ? 'block' : 'none';
                articleToggleButton.innerHTML = abstractDiv.style.display === 'none' ? '&#x25BC;' : '&#x25B2;';
            });

            articlesDiv.appendChild(articleDiv);
        });

        issueToggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            articlesDiv.style.display = articlesDiv.style.display === 'none' ? 'block' : 'none';
            issueToggleButton.innerHTML = articlesDiv.style.display === 'none' ? '&#x25BC;' : '&#x25B2;';
        });
    });
});