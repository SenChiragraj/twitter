import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import { Link } from "react-router-dom";
import RightPanel from "./RightPanel";

export const SearchBar = () => {

  const [search, setSearch] = useState("");

	async function handleSubmit(e) {
		e.preventDefault()
		console.log(search);
    }

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className=" w-full border-gray-700 ">
			<form action="" method="post" onSubmit={e => handleSubmit(e)}>
				<input type="text"  className="w-full p-2 px-3 rounded-full bg-gray-900" placeholder="Search" onChange={e => setSearch(e.target.value)} />
      </form>
      <div className="border mt-6 p-2 rounded-xl border-gray-700 h-20">
        <p className="font-bold">Whats happening</p>
      </div>
      <div className="border mt-6 rounded-lg border-gray-700">
        {/* <p className="font-bold mb-6">Want to follow</p> */}
        {authUser && <RightPanel/>}
      </div>
		</div>
  )
}
