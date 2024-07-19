import { useState, useEffect } from "react";
import SearchPeople from "../../components/search-people/SearchPeople";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("");
  const [result, setResults] = useState();
	const [timeoutId, setTimeoutId] = useState(null);
	const [feedType, setFeedType] = useState("forYou");


  // Function to handle the API call
  const fetchResults = async (searchTerm) => {
		try {
			console.log('first')
      const res = await SearchPeople(searchTerm);
      setResults(res);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    // Clear the previous timeout if there is one
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to call the API after 1000ms
    const newTimeoutId = setTimeout(() => {
      if (search) {
        fetchResults(search);
      }
    }, 1000);

    // Save the timeoutId to state
    setTimeoutId(newTimeoutId);

    // Cleanup function to clear the timeout if the component unmounts or search changes
    return () => clearTimeout(newTimeoutId);
  }, [search]);

  return (
    <div className="w-full border-gray-700 p-5">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="w-full p-2 px-3 rounded-full bg-gray-900"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="flex w-full border-b border-gray-700 mb-2">
        <div
          className={
            "text-xs text-gray opacity-70 flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          }
          onClick={() => setFeedType("forYou")}
        >
          For you
          {feedType === "forYou" && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
          )}
        </div>
        <div
          className={
            "text-xs text-gray opacity-70 flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          }
          onClick={() => setFeedType("trending")}
        >
          Trending
          {feedType === "trending" && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
          )}
        </div>
        <div
          className={
            "text-xs text-gray opacity-70 flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          }
          onClick={() => setFeedType("news")}
        >
          News
          {feedType === "news" && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
          )}
        </div>
        <div
          className="text-xs text-gray opacity-70 flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
          onClick={() => setFeedType("sports")}
        >
          Sports
          {feedType === "sports" && (
            <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"></div>
          )}
        </div>
      </div>
      {result && result.length > 0 && result.map((res, key) => (
        <Link
          to={`/profile/${res.username}`}
          key={key}
          className="mt-auto flex gap-2 align-middle justify-between items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
        >
          <div className="avatar hidden md:inline-flex">
            <div className="w-8 rounded-full mt-1">
              <img src={res?.profileImg || "/avatar-placeholder.png"} />
            </div>
          </div>
          <div className="flex justify-between flex-1">
            <div className="hidden md:block">
              <p className="text-white font-bold text-sm ">{res?.fullName}</p>
              <p className="text-slate-500 text-sm">@{res?.username}</p>
            </div>
          </div>
        </Link>
      ))}
      <div className="border mt-6 p-2 rounded-xl border-gray-700 h-20">
        <p className="font-bold">What&apos;s happening</p>
      </div>
    </div>
  );
};

export default Search;
