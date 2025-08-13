# 🔍 Acne Detect App

> AI-powered acne detection mobile application for instant skin analysis

## 📱 Overview

A React Native mobile app that uses machine learning to detect and analyze acne on facial skin. Get instant results and personalized skincare recommendations.

## ✨ Features

- 📸 Real-time camera acne detection
- 🤖 AI-powered skin analysis
- 📊 Detailed acne severity assessment
- 💡 Personalized treatment recommendations
- 📈 Progress tracking over time
- 🔒 Secure local data storage

## 🛠️ Tech Stack

- **Framework:** React Native
- **Language:** TypeScript/JavaScript
- **AI/ML:** TensorFlow Lite or Custom ML Model
- **Camera:** React Native Camera
- **Storage:** AsyncStorage/SQLite
- **Testing:** Jest, Detox

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Senayldz/Acne-Detect-App.git
cd Acne-Detect-App
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **iOS Setup** (iOS only)
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

4. **Start Metro server**
```bash
npm start
# or
yarn start
```

5. **Run the app**
```bash
# Android
npm run android

# iOS
npm run ios
```

## 📖 Usage

1. **Take a Photo:** Use the camera to capture your face
2. **AI Analysis:** The app processes the image using ML models
3. **Get Results:** View acne detection results and severity
4. **Track Progress:** Save results to monitor skin improvement
5. **Get Recommendations:** Receive personalized skincare advice

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # App screens/pages
├── services/           # API and ML model services
├── utils/              # Helper functions
├── assets/             # Images, fonts, etc.
├── types/              # TypeScript type definitions
└── navigation/         # Navigation configuration
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run e2e
```

## 📦 Build

```bash
# Android
npm run build:android

# iOS
npm run build:ios
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Senay Yildiz** - [@Senayldz](https://github.com/Senayldz)

## 🐛 Issues

Found a bug? Please open an issue [here](https://github.com/Senayldz/Acne-Detect-App/issues).

---

⭐ Star this repo if you find it helpful!
