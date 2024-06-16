import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Events from "./pages/Events.jsx";
import Login from "./pages/Login.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import { Button, HStack } from "@chakra-ui/react";

function App() {
  const { session, logout } = useSupabaseAuth();

  return (
    <Router>
      <HStack justifyContent="space-between" p={4}>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        {session ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </HStack>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;