# FIG - Fake Information Generator

A modern, responsive web application for generating fake personal information for testing and development purposes. Built with Svelte and powered by Faker.js.

## ⚠️ Disclaimer

This project is for **educational purposes only**. The generated data is completely fake and should not be used for any malicious purposes.

## Features

- 🎨 Modern and responsive UI design
- 👤 Generate individual fake persons with complete profiles
- 📦 Bulk generation (up to 100 persons at once)
- 💾 Beautiful card layout for displaying generated data
- 🚀 Fast and lightweight - runs entirely in the browser
- 🔌 No backend required - uses Faker.js directly
- 📱 Works offline once loaded

## Prerequisites

- Node.js (v14 or higher)

## Installation

```bash
# Clone the repository
git clone https://github.com/0xt4cs/fig-svelte.git

# Navigate to the project directory
cd fig-svelte

# Install dependencies
npm install
```

## Usage

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

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

## Generated Data Includes

Each generated person includes:
- **Personal Info**: Name, gender, birthdate, bio, zodiac sign
- **Avatar**: Random profile picture
- **Address**: Street, city, state, country, zip code, and coordinates
- **Job Information**: Title, company, and department
- **Contact Details**: Email and phone number
- **Unique ID**: UUID for each person

## Technologies Used

- **Svelte** - Cybernetically enhanced web apps
- **Vite** - Next generation frontend tooling
- **@faker-js/faker** - Generate massive amounts of fake data
- **Modern CSS** - Beautiful, responsive design

## Architecture

This application runs entirely in the browser with no backend requirements. All fake data is generated client-side using the Faker.js library, making it:
- Easy to deploy
- Fast and responsive
- Privacy-friendly (no data sent to servers)
- Works offline after initial load

## Contributing

This is an educational project. Feel free to fork and modify for your own learning purposes.

## License

MIT
