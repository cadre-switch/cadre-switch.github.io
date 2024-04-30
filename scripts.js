document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('issues-container');

    issuesData.forEach(issue => {
        const issueDiv = document.createElement('div');
        issueDiv.className = 'issue';

        // Create a hyperlink for the issue image and information
        const issueLink = document.createElement('a');
        issueLink.href = issue.homepageUrl;
        issueLink.style.textDecoration = 'none'; // Optional, to remove underline from links

        const img = document.createElement('img');
        // Transform issue number to lowercase and replace spaces with dashes
        const imageName = issue.number.toLowerCase().replace(/\s+/g, '-');
        img.src = `/images/${imageName}.jpg`; // Assumes images are stored in an 'images' directory
        img.className = 'issue-image';
        issueLink.appendChild(img);

        const issueInfo = document.createElement('span');
        issueInfo.innerHTML = `${issue.number}: ${issue.title} (${issue.date})`;
        issueLink.appendChild(issueInfo);

        issueDiv.appendChild(issueLink);

        const issueToggleButton = document.createElement('button');
        issueToggleButton.innerHTML = '&#x25BC;'; // Downward caret
        issueToggleButton.className = 'toggle-button';
        issueDiv.appendChild(issueToggleButton);

        container.appendChild(issueDiv);

        const articlesDiv = document.createElement('div');
        articlesDiv.className = 'details';
        issueDiv.appendChild(articlesDiv); // Append details right under the toggle

        issue.articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';

            // Handling conditional author hyperlink
            let authorInfo;
            if (article.authorUrl) {
                authorInfo = `<a href="${article.authorUrl}">${article.authors}</a>`;
            } else {
                authorInfo = `${article.authors}`;
            }

            articleDiv.innerHTML = `<a href="${article.url}">${article.title}</a> by ${authorInfo}`;

            const articleToggleButton = document.createElement('button');
            articleToggleButton.innerHTML = '&#x25BC;'; // Downward caret
            articleToggleButton.className = 'toggle-button';
            articleDiv.appendChild(articleToggleButton);

            const abstractDiv = document.createElement('div');
            abstractDiv.className = 'details';
            abstractDiv.textContent = article.abstract;
            articleDiv.appendChild(abstractDiv); // Append abstract right under the toggle

            articleToggleButton.addEventListener('click', function(e) {
                e.stopPropagation();
                abstractDiv.style.display = abstractDiv.style.display === 'none' ? 'block' : 'none';
                articleToggleButton.innerHTML = abstractDiv.style.display === 'none' ? '&#x25BC;' : '&#x25B2;'; // Change icon
            });

            articlesDiv.appendChild(articleDiv); // Ensure articles are part of the main container
        });

        issueToggleButton.addEventListener('click', function() {
            articlesDiv.style.display = articlesDiv.style.display === 'none' ? 'block' : 'none';
            issueToggleButton.innerHTML = articlesDiv.style.display === 'none' ? '&#x25BC;' : '&#x25B2;'; // Change icon
        });
    });
});
