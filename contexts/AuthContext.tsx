import { app } from "@/firebaseConfig";
import { useStorageState } from "@/hooks/useStorageState";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useContext, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const auth = getAuth(app);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;

            setSession(JSON.stringify(user.email));
          } catch (error) {
            console.error("Error signing in:", error);
          }
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
