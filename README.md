
# AI-Powered Repository Social Platform

This is a full-stack social platform for sharing and discovering code repositories. It uses AI to automatically generate summaries and extract tech stacks from uploaded repositories.

## Features

*   **User Authentication:** Users can sign up and log in using JWT authentication.
*   **Repository Upload:** Users can upload repositories as zip files, docs, or code with metadata.
*   **AI-Powered Summaries:** The platform uses the Gemini API to automatically generate summaries for uploaded repositories.
*   **Tech Stack Extraction:** The platform uses the Gemini API to automatically extract the tech stack from uploaded repositories.
*   **Social Features:** Users can like, comment on, and discuss repositories.
*   **Follow/Unfollow Users:** Users can follow and unfollow other users.
*   **Personalized Feed:** Users have a personalized feed that shows repositories from users they follow.
*   **Trending Repositories:** Users can browse a list of trending repositories.
*   **Semantic Search:** Users can search for repositories using natural language.
*   **Personalized Recommendations:** Users receive personalized recommendations for repositories to discover.

## Tech Stack

*   **Backend:** Node.js, Express, MongoDB, Mongoose
*   **Frontend:** React, Tailwind CSS
*   **AI:** Google Gemini API

## Setup

### Prerequisites

*   Node.js
*   MongoDB
*   A Google Gemini API key

### Backend Setup

1.  Navigate to the `backend` directory.
2.  Install dependencies: `npm install`
3.  Create a `.env` file and add the following:

    ```
    ATLAS_URI=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  Start the server: `npm start`

### Frontend Setup

1.  Navigate to the `frontend` directory.
2.  Install dependencies: `npm install`
3.  Start the client: `npm start`

