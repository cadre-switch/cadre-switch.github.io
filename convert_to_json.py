import pandas as pd
import json

# Load the CSV file
df = pd.read_csv('issue-article.csv', encoding='utf-8')

# Remove rows where critical columns like 'Issue' or 'Title' are NaN
df.dropna(subset=['Issue', 'Title'], inplace=True)

# Grouping by 'Issue' and extracting data
grouped = df.groupby("Issue")

# Creating a JavaScript-friendly JSON structure
issues_data = []
for issue, group in grouped:
    articles = group.to_dict(orient='records')
    issue_info = {
        "number": issue,
        "title": articles[0]['Issue Title'],
        "date": articles[0]['Issue Date'],
        "homepageUrl": articles[0]['Issue Homepage'],
        "articles": [
            {
                "title": article['Title'],
                "url": article['Article Website'],
                "authors": article['Author'],
                # Conditional inclusion of authorUrl
                "authorUrl": article['Author Website'] if pd.notna(article['Author Website']) and article['Author Website'].strip() else None,
                "abstract": article.get('Abstract', 'No abstract available'),
                "keywords": article.get('Article Keywords', ''),
                "artistsMentioned": article.get('Artists Mentioned', ''),
                "exhibitionsMentioned": article.get('Exhibitions Mentioned', '')
            } for article in articles if article['Title']  # Only include if 'Title' is not empty
        ]
    }
    issues_data.append(issue_info)

# Convert to JSON and print
json_output = json.dumps(issues_data, indent=4)
print(json_output)
