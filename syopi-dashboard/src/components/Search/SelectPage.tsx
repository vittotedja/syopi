import React from "react";
import { useNavigate } from "react-router-dom";


function SelectPage(props: any) {
  const navigate = useNavigate()
  const keyword = props.keyword
  const page = props.page
  const pages = Math.ceil(props.count/10)

  return (
  <div className="selectPage">
    {Array(pages).fill(0).map((_, i) => {
        return(
            <button key={i+1} onClick={() => navigate(`/search?keyword=${keyword}&page=${i+1}`)}>{i+1}</button>
        )
    })}
  </div>
  )
}

export default SelectPage;
