import requests

url = "https://leetcode.com/graphql"

query = """
query getQuestionDetail($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    title
    titleSlug
    difficulty
    likes
    dislikes
    content
    sampleTestCase
    codeSnippets {
      lang
      langSlug
      code
    }
    stats
  }
}
"""

variables = {
    "titleSlug": "two-sum"
}

json_data = {
    "operationName": "getQuestionDetail",
    "query": query,
    "variables": variables
}

response = requests.post(url, json=json_data)

data = response.json()

print(data['data']['question']['title'])       # Two Sum
print(data['data']['question']['difficulty'])  # Easy
print(data['data']['question']['content'])     # HTML content of problem
