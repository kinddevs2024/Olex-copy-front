# Olex-copy-front

A React Native frontend for the premium car marketplace copy.

## Structure

- `App.js`: entry point and screen routing logic.
- `app.json`: Expo configuration for QR-code friendly startup.
- `src/theme.js`: centralized color and typography tokens.
- `src/data.js`: local fallback data and filter field definitions.
- `src/api/cars.js`: backend API service abstraction.
- `src/screens/`: page-level UI screens.
- `src/components/`: reusable UI components.

## Run locally

1. Open `Olex-copy-front`.
2. Run `npm install`.
3. Run `npm start`.
4. Scan the Expo QR code on your phone or run on a simulator.

## Notes

- The frontend now loads live car listings from the backend when available.
- Local fallback data is used if backend fetch fails.
- UI is organized into reusable screens and services for neat file management.
