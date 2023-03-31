import { useSearchParams } from "react-router-dom";

export default function Success(){
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("payment_intent") || "";
    return(
    <>
    Your Payment is Successful
    Recommended Products for You
    {searchTerm}
    </>)
}