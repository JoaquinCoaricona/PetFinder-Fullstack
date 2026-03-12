import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/AuthContext";
import FeedPage from "./pages/FeedPage";
import SinglePost from "./components/SinglePost";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditPostPage from "./pages/EditPostPage";
import { Toaster } from 'react-hot-toast';
import NotFoundPage from "./pages/NotFoundPage";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./components/AnimatedPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
        <Route path="/feed" element={<AnimatedPage><FeedPage /></AnimatedPage>} />
        <Route path="/post/:id" element={<AnimatedPage><SinglePost /></AnimatedPage>} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/createPost" element={<AnimatedPage><CreatePostPage /></AnimatedPage>} />
          <Route path="/editPost/:id" element={<AnimatedPage><EditPostPage/></AnimatedPage>} />
          <Route path="/profile" element={<AnimatedPage><ProfilePage /></AnimatedPage>} />
        </Route>

        <Route path="*" element={<AnimatedPage><NotFoundPage /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-stone-50">
        <div className="text-emerald-600 font-bold animate-pulse text-xl">
          Cargando PetFinder...
        </div>
      </div>
    );

  return (
    <div className="App">
      <BrowserRouter>
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }} 
        />
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;