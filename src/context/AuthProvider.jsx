import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, googleProvider, storage } from "../../firebase";

export const AuthContext = createContext({
  user: null,
  isLoading: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async (email, password) => {
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User successfully registered!");

      if (file) {
        const storageRef = ref(storage, `users/${res.user.uid}/profilePicture`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Handle progress (optional)
          },
          (error) => {
            console.log(error);
            toast.error("Error uploading file");
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              setUser({ ...res.user, photoURL: downloadURL });
              toast.success("Profile updated successfully!");
            } catch (error) {
              console.log(error);
              toast.error("Error updating profile");
            }
          }
        );
      } else {
        await updateProfile(res.user, { displayName });
        setUser({ ...res.user, displayName });
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists! Kindly use a different email.");
      }
      console.error("Error during sign up:", error.message);
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in!");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else {
        toast.error("Login failed. Try again.");
        console.error("Error during login:", error.message);
      }
    }
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Successfully logged out.");
    } catch (error) {
      console.error("Error during sign out:", error.message);
      toast.error("Error signing out.");
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = user ? true : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signOutUser,
        isLoggedIn,
        error,
        displayName,
        setDisplayName,
        setFile,
        file,
        setError,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
