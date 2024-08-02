// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import HomePage from './components/HomePage';
// import SignIn from './components/SignIn';
// import SignUp from './components/SignUp';
// import ChatMessenger from './components/ChatMessenger';
// import ECommercePage from './components/ECommercePage';
// import SocialMediaPage from './components/SocialMediaPage';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/chat" element={<ChatMessenger />} />
//         <Route path="/ecommerce" element={<ECommercePage />} />
//         <Route path="/social" element={<SocialMediaPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignupPage from './components/SignUp';
import ChatMessenger from './components/ChatMessenger';
import ECommercePage from './components/ECommercePage';
import SocialMediaPage from './components/SocialMediaPage';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatMessenger />
              </PrivateRoute>
            }
          />
          <Route
            path="/ecommerce"
            element={
              <PrivateRoute>
                <ECommercePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/social"
            element={
              <PrivateRoute>
                <SocialMediaPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

