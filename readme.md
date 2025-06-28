# EcoFinder - TPS UPDATE 🌱

## Description
EcoFinder is a web-based application that helps users locate waste management facilities in Indonesia, including TPS (Tempat Pembuangan Sementara), TPA (Tempat Pembuangan Akhir), and Bank Sampah. The application provides an interactive map interface with real-time search capabilities and location-based services to promote better waste management practices.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [API Configuration](#api-configuration)
- [Requirements](#requirements)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)
- [License](#license)

## Features
- 🗺️ **Interactive Google Maps Integration** - Real-time map display with embedded iframe
- 📍 **Location-based Search** - Find waste facilities near your current location
- 🔍 **Category Filtering** - Search for specific types of facilities (TPS, TPA, Bank Sampah)
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI/UX** - Beautiful bento-style card layout with Tailwind CSS
- 🌐 **Real-time Data** - Fetches live data from Google Maps via SerpAPI
- 🔄 **Auto-refresh** - Dynamic loading states and smooth transitions
- 🧭 **Turn-by-turn Directions** - Direct integration with Google Maps for navigation

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- SerpAPI account and API key

### Step-by-step Installation

1. **Clone or download the project**
   ```bash
   cd "Ecofinder"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   # Create .env file
   New-Item .env -ItemType File
   ```
   
   Add your SerpAPI key to the `.env` file:
   ```env
   SERPAPI_API_KEY=your_serpapi_key_here
   ```
   
   > **Get your SerpAPI key**: Visit [SerpAPI](https://serpapi.com/) to create an account and obtain your API key.

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## Usage

### Basic Usage
1. **Enter Location**: Type a city or area name (e.g., "Pekanbaru")
2. **Select Category**: Choose from TPS, TPA, or Bank Sampah
3. **Search**: Click the "Search" button or use "My Location" for current position
4. **View Results**: Browse the list of found locations on the right panel
5. **Navigate**: Click on any location to view it on the map
6. **Get Directions**: Use the "Get Directions" button for turn-by-turn navigation

### Advanced Features
- **Geolocation**: Click "My Location" to automatically detect your current position
- **Interactive Map**: Click on search results to center the map on that location
- **Real-time Updates**: The app fetches live data from Google Maps
- **Mobile Responsive**: Optimized for both desktop and mobile usage

## File Structure
```
TPS UPDATE/
├── .env                    # Environment variables (SerpAPI key)
├── package.json           # Project dependencies and scripts
├── server.js             # Express.js backend server
├── readme.md            # Project documentation
├── public/              # Frontend static files
│   ├── index.html      # Main HTML file
│   ├── css/
│   │   └── style.css   # Custom CSS styles
│   └── js/
│       └── script.js   # Frontend JavaScript logic
└── node_modules/       # Installed dependencies
```

## API Configuration

### SerpAPI Integration
The application uses SerpAPI to fetch real-time data from Google Maps. 

**Required Environment Variables:**
```env
SERPAPI_API_KEY=your_api_key_here
PORT=3000  # Optional, defaults to 3000
```

**API Endpoint:**
```
GET /api/search?q={query}&ll={latitude,longitude}
```

## Requirements

### System Requirements
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Browser**: Modern browser with JavaScript enabled
- **Internet Connection**: Required for map data and API calls

### Dependencies
```json
{
  "express": "^4.18.2",
  "node-fetch": "^2.7.0",
  "dotenv": "^16.3.1"
}
```

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SerpAPI** - Google Maps data provider
- **dotenv** - Environment variable management

### Frontend
- **HTML5** - Markup structure
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Client-side functionality
- **Google Maps Embed API** - Map visualization
- **Ionicons** - Icon library
- **Google Fonts (Poppins)** - Typography

### Features
- **Responsive Design** - Mobile-first approach
- **Modern UI/UX** - Glassmorphism and bento card design
- **Real-time Search** - Live data fetching
- **Geolocation API** - Browser location services

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: Description of your feature"
   ```
6. **Push to your fork**
7. **Create a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Test on both desktop and mobile devices
- Ensure API key security (never commit `.env` files)
- Update documentation for new features

## License

This project is licensed under the ISC License. See the `package.json` file for details.

---

## Credits

**Developed by**: Gekkai Project  
**Project Type**: Open Source  
**Version**: 1.0.0

## Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) section
2. Ensure your `.env` file is properly configured
3. Verify your SerpAPI key is valid and has sufficient credits
4. Make sure all dependencies are installed correctly

---

*Happy waste management! 🌍♻️*
