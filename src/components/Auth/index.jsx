import { Center, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { PulseLoader } from "react-spinners";

const Auth = ({ children }) => {
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user;

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <Center h="100vh">
      <PulseLoader color="var(--chakra-colors-primary-600)" size={20} />
    </Center>
  );
};

export default Auth;
