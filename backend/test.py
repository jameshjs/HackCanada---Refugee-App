import requests

url = 'http://127.0.0.1:8000/document/upload'
file = {'file': open('testing-documents/test-pdf.pdf', 'rb')}
resp = requests.post(url=url, files=file) 
data = resp.json()
print(data)

url = 'http://127.0.0.1:8000/document/validate'
body = { "user_input": "Potaotes", "upload_id": data["id"], "question_id": 1}
resp = requests.post(url=url, json=body) 
print(resp.json())