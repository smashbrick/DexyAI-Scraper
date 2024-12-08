from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS, cross_origin
from swiftshadow.classes import Proxy
from fp.fp import FreeProxy



app = Flask(__name__)


CORS(app)


@app.route('/getKeyword')
def getKeyword():
    print("getKeyword")
    JobName = request.args.get('job-name')
    if not JobName:
        return jsonify({"error": "Missing 'Job name' parameter"}), 400
    
    swift = Proxy(autoRotate=True, cachePeriod=60)

    proxy = swift.proxy()
    print(proxy)

    proxies = {
        proxy[1]: proxy[0]
    }

    url = "https://wellfound.com/location/united-states"

    print("Getting first response")
    response = requests.get(url, proxies=proxies)
    cookies = response.cookies

    headers = {
        'accept': '/',
        'accept-language': 'en-US,en;q=0.9',
        'apollographql-client-name': 'talent-web',
        'content-type': 'application/json',
        # 'cookie': '_hjSessionUser_1444722=eyJpZCI6IjUxMzQ2YjBmLTI3MzAtNWFjNi05ZDdmLTRiZmMyNWI0MTQ3MCIsImNyZWF0ZWQiOjE3MjIzMjY1Mjk3OTQsImV4aXN0aW5nIjp0cnVlfQ==; _wellfound=7b50bdbafa0815a7f0b08066d4c238f1.o; _ga=GA1.1.1685700096.1730791707; ajs_anonymous_id=8157b16f-5a0d-4e73-8958-4be076af6615; _clck=1b8q41g%7C2%7Cfre%7C0%7C1798; _clsk=1b7vyi7%7C1733243786366%7C1%7C1%7Cu.clarity.ms%2Fcollect; _hjSession_1444722=eyJpZCI6IjIyNTEyYjc4LTUxYTktNDlkMy1hMzYzLTkxNzY1ZWVkN2M5MiIsImMiOjE3MzMyOTIzODMyOTgsInMiOjEsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; cf_clearance=l.1W2kTHNkBq6c0bGYOVZY4QaXws4tflndbYLol4a.c-1733292384-1.2.1.1-t66E.3AZ1ltIpccDih1ALN3nz26IgaeQZtWwXYoNpf5GgBjwu0Gcj.T6Z0QCMavJjPXhs.DVsgXMcPZMNJDLHH62PwwU0mJPR_fxk9wNYLiCD.937Dkn3mo6aY7k859Ho_iT2cn3jSgRUFPAxr33cW7L2LJ2aSzq1NGGr0yBaal_VDxeEDtfZ36N66D3jrI7pFSPHZ1pk.UQpR_6JYiLOIdXRsXGscSN.mytU8xNlUBE9VPt5iZOLjWPWYYTRZYX._SR9YiQNiRchdEsbOUGmEx4ymd.jn_D0NFaRomtPFfE8UbFbaQoyOGpAkrdJfTRHO2gtQxLN.tenPMTPCdzDhU2HPQB4ti1wS_JNcotzEubmjQe..RrIbLWI8c2P7CKp4EMHJzB6Z8MLT_AQCo8SQ; _ga_705F94181H=GS1.1.1733292383.4.1.1733293321.60.0.0; datadome=iEla3bopCsMQgsBG9VtOs6PRbVYcHzzXqRn1YVAZ8G_EFg_rhLt6EBAhlWkwpCCm20kDvja0WAh8XCnij5coPQX1ZOcNCW27PrsqOsC_mZebiFd8rhs1E1jAUQoWfcTm',
        'origin': 'https://wellfound.com',
        'priority': 'u=1, i',
        'referer': 'https://wellfound.com/location/chennai-tn',
        'sec-ch-device-memory': '8',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-arch': '""',
        'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.86", "Chromium";v="131.0.6778.86", "Not_A Brand";v="24.0.0.0"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-model': '"Nexus 5"',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'same-origin',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        'x-angellist-dd-client-referrer-resource': '/location/:location',
        'x-apollo-operation-name': 'RoleKeywordAutocomplete',
        'x-apollo-signature': '1733289896-IoXZkX9sMAHIW3YuypbFqJ9RyVhgQWVm1gtLuR7J85Y%3D',
        'x-requested-with': 'XMLHttpRequest',
    }


    json_data = {
        'operationName': 'RoleKeywordAutocomplete',
        'variables': {
            'query': JobName,
        },
        'extensions': {
            'operationId': 'tfe/1f5bf58d8ab69047db5c5f11694120735b2ff3dae591b9655752dc8834367cd6',
        },
    }

 

    response = requests.post('https://wellfound.com/graphql', cookies=cookies, headers=headers, json=json_data, proxies=proxies, verify=False)
    print('Response')
    print("Response-----------\n\n")
    print(response.text)

    print("Headers-----------\n\n")
    print(response.headers)

    print("Content-----------\n\n")
    print(response.content)
    # print(response.json())
    return response.json()

@app.route('/location')
def location():
    locationName = request.args.get('location-name')
    if not locationName:
        return jsonify({"error": "Missing 'locationName' parameter"}), 400

    print("Here")
    swift = Proxy(autoRotate=True, cachePeriod=60)

    proxy = swift.proxy()
    print(proxy)

    proxies = {
        proxy[1]: proxy[0]
    }

    url = "https://wellfound.com/location/united-states"

    print("Getting first response")
    response = requests.get(url, proxies=proxies)
    cookies = response.cookies

    headers = {
        'accept': '/',
        'accept-language': 'en-US,en;q=0.9',
        'apollographql-client-name': 'talent-web',
        'content-type': 'application/json',
        # 'cookie': '_hjSessionUser_1444722=eyJpZCI6IjUxMzQ2YjBmLTI3MzAtNWFjNi05ZDdmLTRiZmMyNWI0MTQ3MCIsImNyZWF0ZWQiOjE3MjIzMjY1Mjk3OTQsImV4aXN0aW5nIjp0cnVlfQ==; _wellfound=7b50bdbafa0815a7f0b08066d4c238f1.o; _ga=GA1.1.1685700096.1730791707; ajs_anonymous_id=8157b16f-5a0d-4e73-8958-4be076af6615; _clck=1b8q41g%7C2%7Cfre%7C0%7C1798; _clsk=1b7vyi7%7C1733243786366%7C1%7C1%7Cu.clarity.ms%2Fcollect; _hjSession_1444722=eyJpZCI6IjIyNTEyYjc4LTUxYTktNDlkMy1hMzYzLTkxNzY1ZWVkN2M5MiIsImMiOjE3MzMyOTIzODMyOTgsInMiOjEsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; cf_clearance=l.1W2kTHNkBq6c0bGYOVZY4QaXws4tflndbYLol4a.c-1733292384-1.2.1.1-t66E.3AZ1ltIpccDih1ALN3nz26IgaeQZtWwXYoNpf5GgBjwu0Gcj.T6Z0QCMavJjPXhs.DVsgXMcPZMNJDLHH62PwwU0mJPR_fxk9wNYLiCD.937Dkn3mo6aY7k859Ho_iT2cn3jSgRUFPAxr33cW7L2LJ2aSzq1NGGr0yBaal_VDxeEDtfZ36N66D3jrI7pFSPHZ1pk.UQpR_6JYiLOIdXRsXGscSN.mytU8xNlUBE9VPt5iZOLjWPWYYTRZYX._SR9YiQNiRchdEsbOUGmEx4ymd.jn_D0NFaRomtPFfE8UbFbaQoyOGpAkrdJfTRHO2gtQxLN.tenPMTPCdzDhU2HPQB4ti1wS_JNcotzEubmjQe..RrIbLWI8c2P7CKp4EMHJzB6Z8MLT_AQCo8SQ; _ga_705F94181H=GS1.1.1733292383.4.1.1733293321.60.0.0; datadome=iEla3bopCsMQgsBG9VtOs6PRbVYcHzzXqRn1YVAZ8G_EFg_rhLt6EBAhlWkwpCCm20kDvja0WAh8XCnij5coPQX1ZOcNCW27PrsqOsC_mZebiFd8rhs1E1jAUQoWfcTm',
        'origin': 'https://wellfound.com',
        'priority': 'u=1, i',
        'referer': 'https://wellfound.com/location/chennai-tn',
        'sec-ch-device-memory': '8',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-arch': '""',
        'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.86", "Chromium";v="131.0.6778.86", "Not_A Brand";v="24.0.0.0"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-model': '"Nexus 5"',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'same-origin',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        'x-angellist-dd-client-referrer-resource': '/location/:location',
        'x-apollo-operation-name': 'RoleKeywordAutocomplete',
        'x-apollo-signature': '1733289896-IoXZkX9sMAHIW3YuypbFqJ9RyVhgQWVm1gtLuR7J85Y%3D',
        'x-requested-with': 'XMLHttpRequest',
    }


    json_data = {
        'operationName': 'LocationTagAutocompleteField',
        'variables': {
            'query': locationName,
            'options': {},
        },
        'extensions': {
            'operationId': 'tfe/9b79e3f292313c0d3fd7afcae87ba698b6b9f0a2a9b41038763c3f2308cf5954',
        },
    }

  

    response = requests.post('https://wellfound.com/graphql', cookies=cookies, headers=headers, json=json_data, proxies=proxies, verify=False)
    return response.json()

@app.route('/scrape')
def sendingData():
    jobParams = request.args.get('job-name') or ""
    locationParams = request.args.get('location-name') or ""

    # Get the HTML content of the page
    html_content = scrape(jobParams, locationParams)

  
    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    # print(soup)
    
    job_titles = []

    # Extract job titles
    for a in soup.find_all('h2', class_='inline text-md font-semibold'):
        print(a.text)
        job_titles.append(a.text)  # Extract text and append to list

    # return {'job_titles': job_titles}  # Return the job titles as a JSON response
    return job_titles




def scrape(jobParams,locationParams):
    print("Here")
    swift = Proxy(autoRotate=True, cachePeriod=60)

    proxy = swift.proxy()
    print(proxy)

    proxies = {
        proxy[1]: proxy[0]
    }

    url = "https://wellfound.com/location/united-states"

    print("Getting first response")
    response = requests.get(url, proxies=proxies)
    cookies = response.cookies


    headers = {
        'accept': '/',
        'accept-language': 'en-US,en;q=0.9',
        'apollographql-client-name': 'talent-web',
        'content-type': 'application/json',
        # 'cookie': '_hjSessionUser_1444722=eyJpZCI6IjUxMzQ2YjBmLTI3MzAtNWFjNi05ZDdmLTRiZmMyNWI0MTQ3MCIsImNyZWF0ZWQiOjE3MjIzMjY1Mjk3OTQsImV4aXN0aW5nIjp0cnVlfQ==; _wellfound=7b50bdbafa0815a7f0b08066d4c238f1.o; _ga=GA1.1.1685700096.1730791707; ajs_anonymous_id=8157b16f-5a0d-4e73-8958-4be076af6615; _clck=1b8q41g%7C2%7Cfre%7C0%7C1798; _clsk=1b7vyi7%7C1733243786366%7C1%7C1%7Cu.clarity.ms%2Fcollect; _hjSession_1444722=eyJpZCI6IjIyNTEyYjc4LTUxYTktNDlkMy1hMzYzLTkxNzY1ZWVkN2M5MiIsImMiOjE3MzMyOTIzODMyOTgsInMiOjEsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; cf_clearance=l.1W2kTHNkBq6c0bGYOVZY4QaXws4tflndbYLol4a.c-1733292384-1.2.1.1-t66E.3AZ1ltIpccDih1ALN3nz26IgaeQZtWwXYoNpf5GgBjwu0Gcj.T6Z0QCMavJjPXhs.DVsgXMcPZMNJDLHH62PwwU0mJPR_fxk9wNYLiCD.937Dkn3mo6aY7k859Ho_iT2cn3jSgRUFPAxr33cW7L2LJ2aSzq1NGGr0yBaal_VDxeEDtfZ36N66D3jrI7pFSPHZ1pk.UQpR_6JYiLOIdXRsXGscSN.mytU8xNlUBE9VPt5iZOLjWPWYYTRZYX._SR9YiQNiRchdEsbOUGmEx4ymd.jn_D0NFaRomtPFfE8UbFbaQoyOGpAkrdJfTRHO2gtQxLN.tenPMTPCdzDhU2HPQB4ti1wS_JNcotzEubmjQe..RrIbLWI8c2P7CKp4EMHJzB6Z8MLT_AQCo8SQ; _ga_705F94181H=GS1.1.1733292383.4.1.1733293321.60.0.0; datadome=iEla3bopCsMQgsBG9VtOs6PRbVYcHzzXqRn1YVAZ8G_EFg_rhLt6EBAhlWkwpCCm20kDvja0WAh8XCnij5coPQX1ZOcNCW27PrsqOsC_mZebiFd8rhs1E1jAUQoWfcTm',
        'origin': 'https://wellfound.com',
        'priority': 'u=1, i',
        'referer': 'https://wellfound.com/location/chennai-tn',
        'sec-ch-device-memory': '8',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-arch': '""',
        'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.86", "Chromium";v="131.0.6778.86", "Not_A Brand";v="24.0.0.0"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-model': '"Nexus 5"',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'same-origin',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        'x-angellist-dd-client-referrer-resource': '/location/:location',
        'x-apollo-operation-name': 'RoleKeywordAutocomplete',
        'x-apollo-signature': '1733289896-IoXZkX9sMAHIW3YuypbFqJ9RyVhgQWVm1gtLuR7J85Y%3D',
        'x-requested-with': 'XMLHttpRequest',
    }

    # url = 'https://wellfound.com/role/l/' + jobParams + '/' + locationParams
    url = 'https://wellfound.com/role/l/software-engineer/india'
    print(url)

   

    response = requests.get(url, cookies=cookies, headers=headers,  proxies=proxies, verify=False)

    return response.text



if __name__ == '__main__':
    app.run(port=8000, debug=True)

