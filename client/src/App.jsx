import { useState, useEffect, useRef } from "react";
import CardContainer from "./components/CardContainer";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
	const [bookmarks, setBookmarks] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isFetching, setIsFetching] = useState(false);
	const [shouldUpdate, setShouldUpdate] = useState(false);

	const emailRef = useRef();
	const passwordRef = useRef();

	async function loginHandler(event) {
		event.preventDefault();
		try {
			setIsFetching(true);
			const response = await fetch("http://localhost:6001/auth/login", {
				method: "POST",
				body: JSON.stringify({
					email: emailRef.current.value,
					password: passwordRef.current.value,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				withCredentials: true,
			});
			const resData = await response.json();
			if (!resData.error) {
				setIsLoggedIn(true);
			} else {
				console.log(resData.error.message);
			}
		} catch (err) {
			console.log(err.message);
		} finally {
			setIsFetching(false);
		}
	}

	useEffect(() => {
		async function fetchBookmarks() {
			try {
				setIsFetching(true);
				const response = await fetch(
					"http://localhost:6001/bookmarks",
					{
						credentials: "include",
						withCredentials: true,
					}
				);
				const { error, data } = await response.json();
				if (!error) {
					setIsLoggedIn(true);
					setBookmarks(data);
				} else {
					console.log(error.message);
				}
			} catch (err) {
				console.log(err.message);
			} finally {
				setIsFetching(false);
			}
		}
		fetchBookmarks();
	}, [isLoggedIn, shouldUpdate]);

	function updateBookmarksHandler() {
		setShouldUpdate((prev) => !prev);
	}

	return (
		<>
			{isLoggedIn && <Header onAddBookmark={updateBookmarksHandler} />}
			{isFetching && <h1>Fetching</h1>}
			{!isFetching && !isLoggedIn && (
				<Login
					onLogin={loginHandler}
					email={emailRef}
					password={passwordRef}
				/>
			)}
			{!isFetching && isLoggedIn && (
				<CardContainer bookmarks={bookmarks} />
			)}
		</>
	);
}

export default App;
