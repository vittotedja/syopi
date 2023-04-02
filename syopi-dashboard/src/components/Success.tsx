import { useSearchParams, useNavigate } from "react-router-dom";

export default function Success(){
    let navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("payment_intent") || "";
    return(
    <>
    Your Payment is Successful
    Recommended Products for You
    {searchTerm}

    <button onClick={() => navigate('/')}>Back to Home</button>
    </>)
}