


-----

# **Road Trip Planner 🚗💨🚗🌍**

The Cars24 Road Trip Planner is a full-stack MERN web application built as a conceptual project. It serves as a one-stop platform for travel enthusiasts to discover, create, share, and explore road trips around the world. Users can publish their journeys with detailed routes, upload multiple photos, and engage with a community of fellow travelers through likes and comments.

# 🎯 Project Objectives
- Allow users to **create and publish** custom road trips.  
- Provide an interface to **browse trips** created by others.  
- Support features like **photos, ratings, reviews** for better user engagement.   
- Build a **responsive, user-friendly design** accessible across devices.  

## **✨ Core Features**

  * **Full CRUD Functionality:** Users can **C**reate, **R**ead, **U**pdate, and **D**elete their road trip plans.
  * **Secure User Authentication:** Complete registration and login system using **JSON Web Tokens (JWT)** and **bcrypt.js** for password hashing.
  * **Authorization & Private Routes:** Secure routes ensure only authenticated users can create or manage trips. The UI dynamically adapts based on login status.
  * **Multiple Image Uploads:** Users can upload multiple images for each trip, which are hosted on the **Cloudinary** cloud service.
  * **Interactive Community Features:**
      * **Likes:** Users can like and unlike trips to show appreciation.
      * **Comments:** A full commenting system for users to discuss trips.
  * **External API Integrations:** The application is enriched with live data from three different services:
      * **Live Weather:** Real-time weather forecasts for start and final destinations from the **Weather API**.
      * **Route Planning:** Interactive maps displaying the route, distance, and duration, powered by **OpenRouteService**.
      * **Nearby Attractions:** A list of nearby points of interest for the destination city, fetched from the **Geoapify Places API**.
  * **Themed & Responsive UI:** A modern, responsive user interface built with **React** and styled with **Tailwind CSS**, featuring a custom theme.

## **🛠️ Technology Stack**

  * **Framework:** MERN (MongoDB, Express.js, React.js, Node.js)
  * **Database:** MongoDB Atlas
  * **Backend:** Node.js, Express.js
  * **Frontend:** React.js
  * **Authentication:** JSON Web Tokens (JWT), bcrypt.js
  * **Styling:** Tailwind CSS
  * **File Uploads:** Multer, Cloudinary
  * **Mapping:** React-Leaflet, OpenRouteService
  * **APIs:** Geoapify (Places), WeatherAPI

## **🚀 Getting Started**

### **Prerequisites**

  * Node.js and npm
  * Git
  * A code editor (like VS Code)

### **Installation & Setup**

1.  **Clone the Repository**

    ```bash
    git clone <your-github-repo-url>
    cd CARS24-Roadtrip-Planner
    ```

2.  **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

      * Create a `.env` file in the `backend` root and add the following variables:
        ```
        MONGODB_CONNECTION_STRING=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        WEATHER_API_KEY=your_weatherapi_key
        ORS_API_KEY=your_openrouteservice_key
        GEOAPIFY_API_KEY=your_geoapify_key
        CLOUDINARY_CLOUD_NAME=your_cloudinary_name
        CLOUDINARY_API_KEY=your_cloudinary_key
        CLOUDINARY_API_SECRET=your_cloudinary_secret
        ```
      * Start the backend server:
        ```bash
        npm start
        ```

3.  **Frontend Setup**

    ```bash
    cd ../frontend
    npm install
    npm start
    ```
# 👨‍💻 Contributors
- **Yash Lawaniya** (Developer - Menternship Project under Cars24) -->
