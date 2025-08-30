import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, database } from "@/firebase";

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthStore {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  error: string;
  isAuthenticated: boolean;
  currentUser: User | null;
  profile: UserProfile | null;

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setError: (error: string) => void;

  register: () => Promise<boolean>;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  fetchProfile: (uid: string) => Promise<void>;
}

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  error: "",
  isAuthenticated: false,
  currentUser: null,
  profile: null,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setError: (error) => set({ error }),
  register: async () => {
    const { email, password, confirmPassword, firstName, lastName } = get();

    if (password !== confirmPassword) {
      set({ error: "Passwords do not match" });
      return false;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Save profile in Firestore
      await setDoc(doc(database, "users", cred.user.uid), {
        firstName,
        lastName,
        email,
      });

      set({ error: "" });
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
      return false;
    }
  },

  login: async () => {
    const { email, password } = get();

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await get().fetchProfile(cred.user.uid);

      set({ currentUser: cred.user, isAuthenticated: true, error: "" });
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
      return false;
    }
  },

  logout: async () => {
    await signOut(auth);
    set({
      currentUser: null,
      isAuthenticated: false,
      profile: null,
      email: "",
      password: "",
    });
  },

  fetchProfile: async (uid: string) => {
    const userDoc = await getDoc(doc(database, "users", uid));
    if (userDoc.exists()) {
      set({ profile: userDoc.data() as UserProfile });
    }
  },
}));

onAuthStateChanged(auth, async (user) => {
  if (user) {
    useAuthStore.setState({ currentUser: user, isAuthenticated: true });
    await useAuthStore.getState().fetchProfile(user.uid);
  } else {
    useAuthStore.setState({
      currentUser: null,
      isAuthenticated: false,
      profile: null,
    });
  }
});
