import ConnectModal from "./Component/ConnectModal/ConnectModal";
import NavBar from "./Component/NavBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./utils/firebase.config";
import UserBlog from "./Component/UserBlog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./Component/Feed";
import About from "./Component/About";
import Posts from "./Component/Posts";
import Bookmark from "./Component/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayName, setUid } from "./features/user.slice";
import Footer from "./Component/Footer";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getPosts } from "./features/post.slice";

function App() {
    const uid = useSelector((state) => state.user.uid);
    const dispatch = useDispatch();

    useEffect(() => {
        getDocs(collection(db, "posts")).then((res) =>
            dispatch(
                getPosts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            )
        );
    }, [dispatch]);

    onAuthStateChanged(auth, (currentUser) => {
        dispatch(setUid(currentUser.uid));
        dispatch(setDisplayName(currentUser.displayName));
    });
    return (
        <BrowserRouter>
            <div className="main">
                <header>
                    <h1 className={uid ? "" : "notConnected"}>
                        Le blog du developpeur junior
                    </h1>
                    {uid && <NavBar />}
                </header>
                {uid && <UserBlog />}
                {!uid && <ConnectModal />}
                <Routes>
                    {uid && (
                        <>
                            <Route path="/" element={<Feed />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/posts" element={<Posts />} />
                            <Route path="/bookmark" element={<Bookmark />} />
                        </>
                    )}
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
