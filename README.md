# Recipe Book App

A React Native Expo app for managing recipes, built with Tamagui for beautiful UI components.

## Current Features
- ✅ Light/Dark Mode Toggle
- ✅ Tamagui UI Components
- ✅ Responsive Design
- ✅ Tab Navigation

## Future Features (To Be Added)
- 🔐 User Authentication (Firebase)
- 📝 Recipe Management
- 🖼️ Image Upload
- 🔍 Search & Filter
- 📱 Offline Support

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the App:**
   ```bash
   npm start
   ```

3. **Run on Device/Emulator:**
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   ```

## Environment Variables

Currently no environment variables are required. When authentication is added later, you'll need:

```
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
# ... other Firebase config
```

## Tech Stack

- **Frontend**: React Native + Expo
- **UI**: Tamagui
- **Navigation**: React Navigation
- **Authentication**: Firebase (planned)
- **Backend**: NestJS (planned)

## Project Structure

```
recipe-book-app/
├── components/          # Reusable UI components
├── navigation/          # Navigation configuration
├── screens/            # App screens
│   └── home.tsx       # Main home screen
├── utils/              # Utility functions
│   └── firebase.ts    # Firebase config (for future use)
└── tamagui.config.ts   # Tamagui configuration
```

## Notes

- Authentication has been removed for now but will be re-implemented later
- The app currently shows a simple welcome screen with theme toggle
- Firebase is configured but not actively used
- Ready for recipe management features to be added
