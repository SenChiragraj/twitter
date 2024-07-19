import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

// import Sidebar from "./components/common/Sidebar";
// import RightPanel from "./components/common/RightPanel";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Search from "./pages/search/Search";
import Default from "./pages/Default";
import Messages from "./pages/messages/Messages";
import Bookmarks from './pages/bookmarks/Bookmarks'

function App() {
	const { data: authUser, isLoading } = useQuery({
		// we use queryKey to give a unique name to our query and refer to it later
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				const data = await res.json();
				console.log(data);
				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
				console.log("authUser is here:", data);
				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
		retry: false,
	});

	if (isLoading) {
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	return (
		<div className='px-28 overflow-hidden'>
			{/* Common component, bc it's not wrapped with Routes */}
			{/* {authUser && <Sidebar />} */}
			{/* <div className="w-1/6"></div> */}
				<Routes>
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
				<Route path="/" element={<Default/>}>
					<Route path='' index element={authUser ? <HomePage /> : <Navigate to='/login' />} />
					<Route path='/search' element={authUser ? <Search /> : <Navigate to='/login' />} />
					<Route path='/messages' element={authUser ? <Messages /> : <Navigate to='/login' />} />
					<Route path='/bookmark' element={authUser ? <Bookmarks /> : <Navigate to='/login' />} />
					<Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
					<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
				</Route>
			</Routes>
			{/* {authUser && <RightPanel />}	 */}
			<Toaster />
			{/* <div className="w-1/6"></div> */}
		</div>
	);
}

export default App;
