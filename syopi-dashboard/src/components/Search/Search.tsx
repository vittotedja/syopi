import React , { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResult from "./SearchResult";
import Navbar from "../Navbar";
import SelectPage from "./SelectPage";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [count, setCount] = useState(0)
  const keyword = searchParams.get("keyword") || ""
  const page = searchParams.get("page") || 1
  return (
  <div className="Search">
    <Navbar />
    <SearchResult keyword={keyword} page={page} setCount={setCount}/>
    <SelectPage keyword={keyword} page={page} count={count} />
  </div>
  )
}

export default SearchPage;
