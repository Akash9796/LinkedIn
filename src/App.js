import React, { useState, useEffect } from "react";
import { app, db } from "./firebase";

import { useDispatch, useSelector } from "react-redux";
import {
  setActiveUser,
  setUserLogoutState,
  selectUserEmail,
  selectUserName,
  selectUserPhoto,
} from "./userSlice";

import {
  signOut,
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPhoto = useSelector(selectUserPhoto);
  const [posts, setPosts] = useState([]);
  const postCollection = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const postData = await getDocs(postCollection);
      setPosts(postData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(posts);
    };
    getPosts();
  }, []);

  const auth = getAuth(app);

  const handleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      window.localStorage.setItem("user", JSON.stringify(result.user));
      dispatch(
        setActiveUser({
          userName: result.user.displayName,
          userPhoto: result.user.photoURL,
          userEmail: result.user.email,
        })
      );
    });
  };

  const logout = () => {
    signOut(auth).then(() => {
      dispatch(setUserLogoutState());
      window.location.pathname = "/";
      localStorage.removeItem("user");
    });
  };

  const [user, setuser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      setuser(data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={<Login user={user} handleAuth={handleAuth} />}
          />
          <Route
            exact
            path="/home"
            element={
              <>
                <Header logout={logout} />
                <Home postCollection={postCollection} posts={posts} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
