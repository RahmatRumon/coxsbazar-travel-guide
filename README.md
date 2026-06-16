# 🏖️ Cox's Bazar Travel Guide

**Cox's Bazar Travel Guide** is an interactive, web-based map application designed to help tourists explore the beautiful locations of Cox's Bazar and St. Martin's Island. Built with vanilla web technologies, it features a custom 3D map view, live routing, and categorized tourist spots.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white)

## ✨ Key Features

*   **🗺️ Interactive 3D Map:** A customized Leaflet.js map with manual 3D tilt and rotation capabilities using modern CSS transforms (Shift + Drag on Desktop / Two-finger rotate on Mobile).
*   **📍 19 Curated Spots:** Includes verified solid-ground locations for popular destinations across Cox's Bazar, St. Martin's, and Chhera Dwip.
*   **🚗 Real-time Distance Calculation:** Uses the **OSRM API** to calculate driving distance and estimated time between any two selected spots. Includes a Haversine (air-distance) fallback if the server is busy.
*   **🎯 Live Geolocation:** Users can find their current location on the map, complete with out-of-bounds error handling.
*   **🌍 Satellite & Street View:** Seamless toggle between OpenStreetMap (OSM) default view and Esri World Imagery (Satellite).
*   **🗂️ Category Filters:** Effortlessly filter spots by categories: Beach (সৈকত), Nature (প্রকৃতি), Island (দ্বীপ), and Heritage (ঐতিহ্য).
*   **📱 Fully Responsive:** Features a mobile-friendly, smooth-sliding sidebar and optimized touch controls.

## 🛠️ Technologies Used

*   **Frontend:** HTML5, CSS3, JavaScript (ES6)
*   **Map Library:** [Leaflet.js](https://leafletjs.com/)
*   **Routing API:** [OSRM (Open Source Routing Machine)](http://project-osrm.org/)
*   **Map Tiles:** OpenStreetMap & Esri World Imagery

## 🚀 How to Run Locally

Since this is a vanilla HTML/CSS/JS project, you don't need to install any heavy packages or node modules. 

1.  **Clone the repository:**
```bash
    git clone [https://github.com/your-username/coxsbazar-travel-guide.git](https://github.com/your-username/coxsbazar-travel-guide.git)
    ```
2.  **Navigate to the project folder:**
```bash
    cd coxsbazar-travel-guide
    ```
3.  **Run the application:**
    Simply open the `index.html` file in your favorite web browser.
    *(Alternatively, use an extension like VS Code Live Server for a better development experience).*

## 🔗 Live Demo
*You can view the live demo of this project here:* **[Live Demo Link]** *(GitHub Pages-এ লাইভ করার পর এখানে লিংকটি বসিয়ে দেবেন)*

## 💡 Usage

*   **Map Rotation:** Press and hold `Shift` + `Drag` to rotate the map on desktop. Use two fingers on mobile.
*   **Reset View:** Click the 🧭 (Compass) button to reset the map's zoom and rotation to the default North-facing view.
*   **Get Directions:** Click "দিকনির্দেশনা" on any spot's popup card to open exact driving routes on Google Maps.

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
