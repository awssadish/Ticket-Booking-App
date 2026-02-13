import { useState } from "react";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import TicketApp from "./TicketApp";

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );
  const [showSignup, setShowSignup] = useState(false);

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  // 🔐 If NOT logged in → show auth pages
  if (!isAuth) {
    return showSignup ? (
      <Signup onSwitch={() => setShowSignup(false)} />
    ) : (
      <Login
        onLogin={() => setIsAuth(true)}
        onSwitch={() => setShowSignup(true)}
      />
    );
  }

  // ✅ Logged in → show ticket system
  return <TicketApp onLogout={logout} />;
}

export default App;
