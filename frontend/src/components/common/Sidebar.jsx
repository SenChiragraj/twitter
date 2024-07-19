import XSvg from "../svgs/X";

import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { RiNotificationLine } from "react-icons/ri";
import { GoPerson } from "react-icons/go";
import { FaRegEnvelope } from "react-icons/fa";

import { MdOutlineBookmarkBorder } from "react-icons/md";

import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const Sidebar = () => {
	const queryClient = useQueryClient();
	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/api/auth/logout", {
					method: "POST",
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const [selectedMenu, setSelectedMenu] = useState("home");


	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
				<Link to='/' className='flex justify-center md:justify-start'>
					<XSvg className='px-2 w-10 h-10 rounded-full fill-white hover:bg-stone-900' />
				</Link>
				<ul className='flex flex-col mt-4'>
					<li className='flex justify-center md:justify-start' onClick={() => setSelectedMenu('home')}>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<GoHomeFill className='w-5 h-5' />
							<span className={`${selectedMenu === 'home' ? 'font-bold' : ''} text-sm hidden md:block`}>Home</span>

						</Link>
					</li>
					<li className='flex justify-center md:justify-start' onClick={() => setSelectedMenu('search')}>
						<Link
							to='/search'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoSearch className='w-5 h-5' />
							<span className={`${selectedMenu === 'search' ? 'font-bold' : ''} text-sm hidden md:block`}>Search</span>

						</Link>
					</li>
					<li className='flex justify-center md:justify-start' onClick={() => setSelectedMenu('notification')}>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<RiNotificationLine className='w-5 h-5' />

							<span className={`${selectedMenu === 'notification' ? 'font-bold' : ''} text-sm hidden md:block`}>Notifications</span>

						</Link>
					</li>
					<li className='flex justify-center md:justify-start' onClick={() => setSelectedMenu('messages')}>
						<Link
							to='/messages'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaRegEnvelope className='w-5 h-5' />

								<span className={`${selectedMenu === 'messages' ? 'font-bold' : ''} text-sm hidden md:block`}>Messages</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start' onClick={() => setSelectedMenu('bookmark')}>
						<Link
							to='/bookmark'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<MdOutlineBookmarkBorder className='w-5 h-5' />

							<span className={`${selectedMenu === 'bookmark' ? 'font-bold' : ''} text-sm hidden md:block`}>Bookmarks</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start' onClick={() => setSelectedMenu('profile')}>
						<Link
							to={`/profile/${authUser?.username}`}
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<GoPerson className='w-5 h-5' />

							<span className={`${selectedMenu === 'profile' ? 'font-bold' : ''} text-sm hidden md:block`}>Profile</span>
						</Link>
					</li>
				</ul>
				{authUser && (
					<Link
						to={`/profile/${authUser.username}`}
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={authUser?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-white font-bold text-sm w-20 truncate'>{authUser?.fullName}</p>
								<p className='text-slate-500 text-sm'>@{authUser?.username}</p>
							</div>
							<BiLogOut
								className='w-5 h-5 cursor-pointer'
								onClick={(e) => {
									e.preventDefault();
									logout();
								}}
							/>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;
