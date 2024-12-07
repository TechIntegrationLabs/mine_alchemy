import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { Activities } from './pages/Activities';
import { Community } from './pages/Community';
import { Settings } from './pages/Settings';
import { StepWork } from './pages/StepWork';
import { Navigation } from './components/Navigation';
import { QuoteBar } from './components/QuoteBar';

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
          socialButtonsBlockButton: 'normal-case',
          socialButtonsProviderIcon: 'w-5 h-5',
          card: 'shadow-sm',
          headerTitle: 'text-xl',
          headerSubtitle: 'text-gray-600'
        }
      }}
    >
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
          <main className="flex-1 container mx-auto px-4 py-8 mt-16 md:mt-20">
            <Routes>
              <Route path="/sign-in/*" element={
                <div className="max-w-md mx-auto mt-12">
                  <SignIn 
                    routing="path" 
                    path="/sign-in" 
                    appearance={{
                      elements: {
                        card: 'shadow-sm'
                      }
                    }}
                  />
                </div>
              } />
              <Route path="/sign-up/*" element={
                <div className="max-w-md mx-auto mt-12">
                  <SignUp 
                    routing="path" 
                    path="/sign-up"
                    appearance={{
                      elements: {
                        card: 'shadow-sm'
                      }
                    }}
                  />
                </div>
              } />
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/journal" element={
                <PrivateRoute>
                  <Journal />
                </PrivateRoute>
              } />
              <Route path="/activities" element={
                <PrivateRoute>
                  <Activities />
                </PrivateRoute>
              } />
              <Route path="/community" element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              } />
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />
              <Route path="/stepwork" element={
                <PrivateRoute>
                  <StepWork />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <QuoteBar />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;