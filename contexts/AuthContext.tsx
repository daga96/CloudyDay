import { app } from "@/firebaseConfig";
import { useStorageState } from "@/hooks/useStorageState";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, type PropsWithChildren } from "react";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => Promise<Boolean>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => false,
  signOut: async () => {},
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
            return true;
          } catch (error) {
            console.error("Error signing in:", error);
            return false;
          }
        },
        signOut: async () => {
          try {
            await signOut(auth);
            setSession(null);
          } catch (error) {
            console.error("Error signing out:", error);
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
