import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Profession, Role, User } from "@hienpham512/angouleme-types";
import { auth, db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  errorNotification,
  successNotification,
  warnNotification,
} from "@/utils/notifications";

import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signinWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const { email, uid, displayName, photoURL,  } = res.user;
        getDocs(
          query(collection(db, "users"), where("email", "==", email))
        ).then((docs) =>
          docs.docs.length === 0
            ? setDoc(doc(db, "users", uid), {
              id: uid,
              firstName:
                displayName?.slice(
                  0,
                  displayName?.split(" ")[displayName?.split(" ").length - 1]
                    .length
                ) || "Anonymous",
              lastName:
                displayName?.split(" ")[displayName?.split(" ").length - 1] ||
                "Anonymous",
              email: email,
              avatar: photoURL,
              isAprroved: false,
              role: "USER" as Role,
              createAt: new Date(),
              updateAt: new Date(),
              profession: "OTHERS" as Profession,
              readBooks: [],
              onGoingBooks: [],
              ratedBooks: [],
              card: [],
              gender: "other"
            } as unknown as User)
            : null
        );
        navigate("/home/main");
      })
      .catch((err) => console.log(err));
  };

  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/home/main"))
      .catch((e) => errorNotification(`Signin failed, please try again`));
  }

  const signup = (
    { firstName,
      lastName,
      gender,
      birthDate,
      email,
      password,
      confirmPassword,
      isStudent
    }
      : {
        firstName: string,
        lastName: string,
        gender: string,
        birthDate: string,
        email: string,
        password: string,
        confirmPassword: string,
        isStudent: boolean
      }
  ) => {
    if (password !== confirmPassword)
      warnNotification("Password and Confirm Password do not match");
    else
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) =>
          setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            firstName,
            lastName,
            gender,
            birthDate,
            email,
            avatar: "",
            isAprroved: false,
            role: "USER" as Role,
            createAt: new Date(),
            updateAt: new Date(),
            profession: isStudent ? "STUDENT" : ("OTHERS" as Profession),
            readBooks: [],
            onGoingBooks: [],
            ratedBooks: [],
            card: [],
          } as unknown as User)
            .then(() => {
              successNotification(`Signup successfully`);
              navigate("/home/main");
            })
            .catch((err) =>
              errorNotification(`Signup failed, please try again`)
            )
        )
        .catch((err) => errorNotification(`Signup failed, please try again`));
  };

  const signout = () =>
    signOut(auth)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));


  return { signin, signup, signout, signinWithGoogle };
};
