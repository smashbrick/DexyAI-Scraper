from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS
from swiftshadow.classes import Proxy

app = Flask(__name__)
CORS(app)

# Requesting keyword for job name search
@app.route('/scrape', methods=['GET'])
def sending_data():
    try:
        # Get the job name parameter
        job_params = request.args.get('job-name') or ""
        if not job_params.strip():
            return jsonify({"error": "Job name parameter is required."}), 400

        # Scrape the data
        html_content = scrape(job_params)
        if not html_content:
            return jsonify({"error": "Failed to fetch HTML content."}), 500

        # Parse the HTML
        soup = BeautifulSoup(html_content, 'html.parser')

        # Extract data
        job_data = []

        job_titles = soup.find_all('a', class_='mr-2 text-sm font-semibold text-brand-burgandy hover:underline')
        company_names = soup.find_all('h2', class_='inline text-md font-semibold')
        company_sizes = soup.find_all('span', class_='text-xs italic text-neutral-500')
        company_locations = soup.find_all('span', class_='pl-1 text-xs')

        max_jobs = 5
        for i in range(min(len(job_titles), max_jobs)):
            job_data.append({
                "job_title": job_titles[i].text.strip(),
                "company_name": company_names[i].text.strip() if i < len(company_names) else "",
                "company_size": company_sizes[i].text.strip() if i < len(company_sizes) else "",
                "company_location": company_locations[i].text.strip() if i < len(company_locations) else "",
            })

        return jsonify(job_data)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Error making request to external site.", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "An unexpected error occurred.", "details": str(e)}), 500


# Sending a fetch request for the particular job keyword
def scrape(jobParams):
    try:
        swift = Proxy(autoRotate=True, cachePeriod=60)

        proxy = swift.proxy()
        proxies = {
            proxy[1]: proxy[0]
     
        }

        url = "https://wellfound.com/location/india"

        # # Initial request to set cookies
        # response = requests.get(url, proxies=proxies, timeout=10)
        # response.raise_for_status()
        # cookies = response.cookies

        cookies = {
            'ajs_anonymous_id': 'eaa4038e-6e2d-415e-8f40-8af139514b9c',
            '_wellfound': '9185b88612086613f012d68a882d6bc6.o',
            '_hjSessionUser_1444722': 'eyJpZCI6ImYwNzQxYjQ4LWQ3MDQtNTVjNS1hNjJkLTJiM2I2ZjYzYjM5NiIsImNyZWF0ZWQiOjE3MzM2ODQzMzI3MjcsImV4aXN0aW5nIjp0cnVlfQ==',
            '_hjSession_1444722': 'eyJpZCI6IjE1MGQ1YWRmLWVkYWUtNDQzMC1hNGQ0LWI5MzRmMDc1ZGFmZCIsImMiOjE3MzM2ODQzMzI3MjgsInMiOjEsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MX0=',
            'cf_clearance': 'EAKkUGoOePebUq03yMP90YV8_ETtxWoK9GjvbWv4RZI-1733684333-1.2.1.1-io4DXCJnlnwUriqNiOS1iazzkA4fQnXIZ_LXFtZGp3ii4d6TQYHjt9YLXo09FAQgTdNShZ7frAMvNqC9_f_g0lp3RLV7kqX5Z1aoyMpm3jCuAS26FDevf9vUDwXC_dxHrKwBNx9L1pf_lyC8DFoLxId1iuKHjQ7u4bb7LIggVkoPEehcWcvQ_oeaIUmLuZmraDYIyD3VsqyoYbwLk0y.o.SnTRdHiTyJiXeeADubj_qr2dEoWFwjsF6B47Q4qz0Ir59JJX7XpA9EfnLqzjhjKetrbTbTrkxuzirgvZ9ZTY_SRT9ubRoFmPIS6kQiQ3QxBmcYiYpGBV3BijDAfmPKEIVU.DZmyrEFS.G6Nwm9oSCHLGV5Z5j8YCQHSqbfiY6nPvkumj_xwPgTFWViAY55JQ',
            '_ga': 'GA1.1.228803313.1733684333',
            '_ga_705F94181H': 'GS1.1.1733684333.1.0.1733684333.60.0.0',
            'datadome': 'gQpR101pUsaez6SH7NmCQvRvWfx37Nfwf3LfzLkph8wHefnGGc8ofXPQCniiq4pZLC2QkJIUnnsLrkbGBqz_YyxNQ2EW5jsMC80DO9L9~SO1oSdhThe359hCU3RJToIL',
        }

        
        headers = {
            'accept': '/',
            'accept-language': 'en-US,en;q=0.9',
            'apollographql-client-name': 'talent-web',
            'content-type': 'application/json',
            'origin': 'https://wellfound.com',
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Mobile Safari/537.36',
            'referer': 'https://wellfound.com/location/chennai-tn',
        }

        job_url = f'https://wellfound.com/role/l/{jobParams}'
        response = requests.get(job_url, cookies=cookies, headers=headers, proxies=proxies,  verify=False)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        
        return response.text

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None


if __name__ == "__main__":
    app.run(debug=True)
