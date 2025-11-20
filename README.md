# Netfree
Netfree

## Firebase Analytics

This project uses Firebase for auth, firestore, storage and now Analytics.

Add the following environment variables to your `.env.local` (replace values with your Firebase project settings):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

The analytics initializer runs on the client only and logs a `page_view` on route changes. To log custom events, import `logEvent` from `firebase/analytics` and call it with the analytics instance from `initAnalytics()` or `getAnalyticsInstance()`.

## Vercel Analytics

This repository also includes Vercel Analytics (client integration via `@vercel/analytics/react`). When deployed on Vercel, the built-in analytics will automatically collect page views and useful performance metrics. No additional client environment variables are required for basic page view tracking — just deploy the site to Vercel and view the results in your Vercel project dashboard under "Analytics".

If you want to log custom events with Vercel Analytics from React, import the `track` helper from `@vercel/analytics` or use the `Analytics` React component for automatic client-side collection. See Vercel docs for advanced configuration.
