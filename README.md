
# Transliteration Web App

This is a web application for transliterating Hindi words into their English counterparts. The app is built with a Flask backend and a React frontend, with TypeScript for type safety and Tailwind CSS for rapid styling. The backend is Dockerized and hosted on AWS EC2, while the frontend is hosted on Vercel. SSL is configured using Let's Encrypt with Cloudflare handling DNS.


## Frontend

- The frontend is a React app built with TypeScript and styled using Tailwind CSS.
- It is deployed and hosted on Vercel and can be accessed at:
https://transliteration.abid-sayyed.space/


## Backend

The backend is a Flask app, which handles the transliteration logic.
- The backend is Dockerized for easier deployment and portability.
- It is hosted on AWS EC2 with SSL enabled using Let's Encrypt.
- The backend uses the indic_transliteration library for transliterating Hindi to English.
## Running Locally

Clone the project:

```bash
  git clone https://github.com/abid-sayyed/transliteration-app.git

```
In the Backend folder, create a .env file with the following content::

```bash
  FRONTEND_URL=http://localhost:5173

```

In the Frontend folder, create a .env file with the following content::

```bash
  VITE_API_URL=http://localhost:5000

```

### Run the frontend:

```bash
cd frontend
npm install
npm run dev

```

### Run the backend

Navigate to the backend folder and run:

```bash
cd backend
pip install -r requirements.txt
flask run --debug

```

Alternatively, you can run the Flask app in Docker also

```bash
docker compose up -d --build

```



## Current Limitations and Future Improvements

At present, most transliteration libraries, such as Google Translate and Microsoft Translator, are paid services. The indic_transliteration library, while free, is not 100% accurate and occasionally makes mistakes. To improve accuracy, we can leverage Large Language Models (LLMs) for enhanced transliteration and other advanced features. These models often have free usage limits, allowing us to process Hindi words and generate more accurate English transliterations by sending them to models like GEMINI or similar services.


## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Vite
- Backend: Flask, Python, indic_transliteration library
- Hosting: Vercel (Frontend), AWS EC2 (Backend)
- DNS: Cloudflare
- SSL: Let's Encrypt

