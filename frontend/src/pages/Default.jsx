import { Outlet } from "react-router-dom"
import Sidebar from "../components/common/Sidebar"
import { SearchBar } from "../components/common/SearchBar"

const Default = () => {
  return (
    <div className="flex max-h-screen">
      <div className="">
        <Sidebar/>
      </div>
      <div className="overflow-y-auto w-3/6 border border-gray-700 ">
        <div className=""><Outlet /></div>
      </div>
      <div className="p-5 w-2/6">
        <SearchBar/>
      </div>
    </div>
  )
}

export default Default