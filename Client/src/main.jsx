/* eslint-disable no-undef */
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from "./App.jsx";
import "./index.css";
import UserProvider from "./contexts/UserContext.jsx";
createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={"1060538151130-fugnan197mqpku6dp2a9vlhnb0vi9l1j.apps.googleusercontent.com"}>
        <Router>
            <UserProvider>
                <App />
            </UserProvider>
        </Router>
    </GoogleOAuthProvider>
);
