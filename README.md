# FIG - Fake Information Generator

A modern, responsive web application for generating fake personal information for testing and development purposes. Built with Svelte using object-oriented principles and powered by comprehensive data generators.

## ⚠️ Disclaimer

This project is for **educational and testing purposes only**. The generated data is completely fake and should not be used for any malicious or illegal activities. Use responsibly for development, testing, and privacy purposes only.

## Features

- 🎨 Modern and responsive UI design with dark mode support
- 🌍 Multi-country support with localized data generation
- 👤 Generate individual fake persons with comprehensive profiles
- 📦 Bulk generation (5, 10, or 25 persons at once)
- 🚀 Fast and lightweight - runs entirely in the browser
- 🔌 No backend required - uses advanced data generation algorithms
- 💾 Local storage support for preferences
- 📱 Works offline once loaded

## Prerequisites

- Node.js (v14 or higher)

## Installation

```bash
# Clone the repository
git clone https://github.com/0xt4cs/fig.git

# Navigate to the project directory
cd fig

# Install dependencies
npm install
```

## Usage

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:4949`

## Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Deployment

Since this is a static site, you can deploy it to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Surge.sh
- Or any web server

Just run `npm run build` and deploy the contents of the `dist` folder.

## Supported Countries

The application supports multiple countries with localized data generation:

- 🌍 International (Global)
- 🇵🇭 Philippines (with regional specificity)
- 🇺🇸 United States
- 🇨🇦 Canada
- 🇬🇧 United Kingdom
- 🇦🇺 Australia
- 🇯🇵 Japan
- 🇰🇷 South Korea
- 🇮🇳 India
- 🇸🇬 Singapore
- 🇹🇭 Thailand
- 🇲🇾 Malaysia
- 🇮🇩 Indonesia
- 🇻🇳 Vietnam

Each country generates authentic data including proper address formats, phone number patterns, and cultural context.

## Generated Data Includes

Each generated person includes:
- **Personal Info**: Name (with cultural variations), gender, birthdate, bio, zodiac sign
- **Avatar**: Random profile picture
- **Enhanced Names**: Middle names, nicknames, and cultural group identification
- **Address**: Street, city, state/province, country, zip code, coordinates, and regional data
- **Job Information**: Title, company, and department (with regional specialization)
- **Contact Details**: Email and authentic phone numbers (mobile/landline with proper formats)
- **Cultural Context**: Region-specific biographical information and local preferences
- **Unique ID**: UUID for each person

### Philippine Data Enhancements

For Philippine data generation, the application provides exceptional accuracy:
- **Regional Specificity**: 8+ major regions with authentic local data
- **Authentic Addresses**: Real barangays, subdivisions, and proper ZIP codes
- **Phone Numbers**: Actual network prefixes and area codes
- **Cultural Accuracy**: Regional languages, traditions, and local context
- **Name Variations**: Regional naming patterns and authentic Filipino nicknames

## Technologies Used

- **Svelte** - Modern reactive framework for building user interfaces
- **Vite** - Next generation frontend build tooling
- **@faker-js/faker** - Core fake data generation library
- **Object-Oriented Architecture** - Clean, maintainable, and extensible codebase
- **Design Patterns** - Factory, Observer, and Strategy patterns implementation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Modern JavaScript** - ES6+ features and best practices

## Architecture & Design Patterns

This application follows modern software engineering principles:

- **Object-Oriented Programming**: Clean separation of concerns with dedicated service classes
- **Factory Pattern**: Centralized person generation with country-specific implementations
- **Observer Pattern**: Event-driven notification system
- **Strategy Pattern**: Pluggable algorithms for different data generation strategies
- **Single Responsibility Principle**: Each class has a single, well-defined purpose
- **DRY Principle**: No code duplication, reusable components throughout
- **Extensibility**: Easy to add new countries or modify existing functionality

### Key Services

- **PersonGeneratorService**: Main factory for generating person data
- **NotificationService**: Handles all user notifications and feedback
- **StorageService**: Manages local storage operations
- **PhoneNumberGenerator**: Country-specific phone number formatting
- **PhilippineDataGenerator**: Specialized service for authentic Filipino data

## Application Overview

This application runs entirely in the browser with no backend requirements. All data generation is performed client-side using advanced algorithms and comprehensive datasets, making it:

- **Easy to deploy**: Static files that can be hosted anywhere
- **Fast and responsive**: Optimized performance with smooth animations
- **Privacy-friendly**: No data sent to external servers
- **Offline capable**: Works without internet after initial load
- **Cross-platform**: Runs on any modern web browser
- **Developer-friendly**: Clean, well-documented codebase

## Contributing

This project welcomes contributions for educational and development purposes. Feel free to:
- Fork the repository for your own learning
- Suggest improvements or new features
- Report issues or bugs
- Add support for additional countries

## Developer

Developed with ❤️ by [0xt4cs](https://github.com/0xt4cs)

## License

MIT License - Feel free to use this project for educational and development purposes.
