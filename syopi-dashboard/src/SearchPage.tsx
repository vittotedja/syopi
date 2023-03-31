import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  return (
  <div>
    {searchTerm}
</div>);

}

export default SearchPage;
