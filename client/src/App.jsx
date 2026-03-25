import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ClerkLoaded,
  ClerkLoading,
  RedirectToSignIn,
  useAuth,
} from "@clerk/react";
import AppLayout from "./components/layout/AppLayout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AuthSetup from "./components/auth/AuthSetup";

const DashboardPage = lazy(() => import("./pages/dashboard/DashboardPage"));
const FolderDetailsPage = lazy(
  () => import("./pages/folders/FolderDetailsPage"),
);
const PlaylistSheetsPage = lazy(
  () => import("./pages/playlist/PlaylistSheetsPage"),
);
const ProblemEditorPage = lazy(
  () => import("./pages/problem/ProblemEditorPage"),
);
const ProfileAnalysisPage = lazy(
  () => import("./pages/profile-analysis/ProfileAnalysisPage"),
);

const PageLoader = () => (
  <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
    Loading page...
  </div>
);

const ProtectedLayout = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/" />;
  }

  return (
    <>
      <AuthSetup />
      <AppLayout />
    </>
  );
};

function App() {
  return (
    <>
      <ClerkLoading>
        <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
          Loading authentication...
        </div>
      </ClerkLoading>

      <ClerkLoaded>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />

            <Route path="/" element={<ProtectedLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="folder/:id" element={<FolderDetailsPage />} />
              <Route path="problem/:id" element={<ProblemEditorPage />} />
              <Route path="playlist" element={<PlaylistSheetsPage />} />
              <Route
                path="profile-analysis"
                element={<ProfileAnalysisPage />}
              />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ClerkLoaded>
    </>
  );
}

export default App;
