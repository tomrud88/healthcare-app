# Healthcare App - AI-Powered Medical Consultation

A modern React TypeScript application that provides AI-powered health consultations and doctor booking functionality using Google's Gemini AI.

## Features

- **AI Health Assistant**: Get personalized health advice powered by Google Gemini
- **Doctor Finder**: Find and book appointments with specialist doctors
- **Symptom Analysis**: AI-powered analysis of symptoms with specialty recommendations
- **Interactive Chat**: Natural conversation flow with intelligent input validation
- **Responsive Design**: Modern, mobile-friendly interface

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd healthcare-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your Gemini API key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file

### Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (Gemini)
- **State Management**: React Hooks
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/          # React components
│   ├── ConsultationDialog.tsx
│   ├── DoctorCard.tsx
│   └── ...
├── services/           # AI and API services
│   └── aiService.ts
├── data/              # Static data
│   └── doctors.ts
└── pages/             # Page components
    └── ...
```

## AI Features

The application uses Google's Gemini AI to provide:

- **Health Guidance**: Personalized advice based on symptoms
- **Symptom Analysis**: Professional triage recommendations
- **Specialty Matching**: Suggests appropriate medical specialties
- **Conversation Context**: Maintains context across interactions

## Important Notes

⚠️ **Medical Disclaimer**: This application provides general health information only and should not replace professional medical advice. Always consult with qualified healthcare providers for medical concerns.

🔒 **Security**: API keys are configured for client-side use during development. For production, implement server-side API calls to protect credentials.

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
