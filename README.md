# FIG - Fake Information Generator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Svelte](https://img.shields.io/badge/Svelte-4A4A55?style=flat&logo=svelte&logoColor=FF3E00)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

A modern, responsive web application for generating fake personal information for testing and development purposes. Built with Svelte, Vite, and Tailwind CSS.

## ⚠️ Disclaimer

This project is for **educational and testing purposes only**. The generated data is completely fake and should not be used for any malicious or illegal activities. Use responsibly for development, testing, and privacy purposes only.

## ✨ Features

- 🎨 **Modern UI Design** - Responsive interface with dark mode support
- 🌍 **Multi-Country Support** - 21+ countries with localized data generation
- 👤 **Individual Generation** - Generate single fake persons with comprehensive profiles
- 📦 **Bulk Generation** - Generate 5, 10, or 25 persons at once
- 🚀 **Fast & Lightweight** - Runs entirely in the browser, no backend required
- 🔌 **Offline Capable** - Works offline once loaded
- 💾 **Local Storage** - Saves preferences and settings
- 📱 **Mobile Friendly** - Works seamlessly on all devices

## 🌍 Supported Countries

### Enhanced Countries (Detailed Local Data)
- 🇵🇭 **Philippines** - Complete Filipino names, addresses, and cultural context
- 🇹🇭 **Thailand** - Thai names, provinces, and business context
- 🇻🇳 **Vietnam** - Vietnamese names, provinces, and cultural data
- 🇲🇾 **Malaysia** - Multi-ethnic Malaysian data with cultural diversity
- 🇮🇩 **Indonesia** - Indonesian names, provinces, and local context

### Standard Countries
- 🌍 **International** (Global)
- 🇮🇳 **India**
- 🇺🇸 **United States**
- 🇬🇧 **United Kingdom**
- 🇨🇦 **Canada**
- 🇦🇺 **Australia**
- 🇩🇪 **Germany**
- 🇫🇷 **France**
- 🇪🇸 **Spain**
- 🇮🇹 **Italy**
- 🇯🇵 **Japan**
- 🇰🇷 **South Korea**
- 🇨🇳 **China**
- 🇧🇷 **Brazil**
- 🇲🇽 **Mexico**
- 🇷🇺 **Russia**

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/fig-svelte.git

# Navigate to the project directory
cd fig-svelte

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:4949`


- **Frontend Framework**: [Svelte](https://svelte.dev/) - Reactive web framework
- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool and dev server
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Data Generation**: [@faker-js/faker](https://fakerjs.dev/) - Generate fake data
- **Language**: JavaScript ES6+

## 📁 Project Structure

```
fig/
├── public/                 # Static assets
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable Svelte components
│   │   ├── config/         # Configuration files
│   │   ├── models/         # Data models
│   │   └── services/       # Business logic services
│   ├── App.svelte         # Main application component
│   ├── main.js            # Application entry point
│   └── app.css            # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── README.md              # Project documentation
```

## 🎯 Usage

1. **Select Country**: Choose from 21+ supported countries
2. **Generate Data**: Click "Generate Person" for individual or bulk generation
3. **View Results**: See generated person cards with detailed information
4. **Export Data**: Copy or save generated data for your projects
5. **Dark Mode**: Toggle between light and dark themes

## 🔧 Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding New Countries

1. Add country configuration to `src/lib/config/countries.js`
2. Include names, addresses, and cultural data
3. Update the country selector in the UI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Svelte](https://svelte.dev/) for the amazing reactive framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [@faker-js/faker](https://fakerjs.dev/) for comprehensive fake data generation
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review existing issues for solutions

---

