import { Container, Heading, VStack, Button } from "@chakra-ui/react";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading>Login</Heading>
        <SupabaseAuthUI />
      </VStack>
    </Container>
  );
};

export default Login;