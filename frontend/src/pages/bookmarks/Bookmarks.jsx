import { useQuery } from "@tanstack/react-query";
import Posts from "../../components/common/Posts";
// import useFollow from "../../hooks/useFollow";

const Bookmarks = () => {


	// const { follow, isPending } = useFollow();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className='border-r border-gray-700 min-h-screen' >
				<div className='flex justify-between items-center p-4 border-b border-gray-700'>
					<p className='font-bold'>Bookmarks</p>
				</div>
				{/* {isLoading && (
					<div className='flex justify-center h-full items-center'>
						<LoadingSpinner size='lg' />
					</div>
				)} */}
        <Posts feedType={"bookmark"} username={authUser.username} userId={authUser?._id} />
			</div>
	);
}

export default Bookmarks