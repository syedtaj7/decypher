# Decypher Website Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id

# API Keys for AI services
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication with Email/Password and Google providers
4. Enable Firestore Database
5. Enable Storage
6. Copy the configuration values to your `.env.local` file

## Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Features Implemented

- ✅ Modern, responsive design with Tailwind CSS
- ✅ Hero section with animated AI robot illustration
- ✅ "What is Decypher" section with flip-in cards
- ✅ Installation steps with animated progress
- ✅ Features section with animated icons
- ✅ Preloaded documents page (Instagram, Facebook, Snapchat T&Cs)
- ✅ AI chatbot interface with document upload
- ✅ Sign-in/Sign-up page with form validation
- ✅ Firebase integration setup
- ✅ Framer Motion animations throughout
- ✅ Mobile-responsive design

## Next Steps

1. Set up Firebase project and add environment variables
2. Implement actual AI document processing
3. Add user dashboard
4. Implement document storage and retrieval
5. Add Google Drive integration
6. Deploy to Firebase Hosting or Vercel

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Roboto, Poppins)
