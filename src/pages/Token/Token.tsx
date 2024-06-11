import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Token = () => {

  const navigate = useNavigate();
  const { hash } = useLocation()
  
  if (hash.includes("error")) {
    alert("Error in hash")
    navigate("/");
  }

  const accessCode = hash.split("=")[1]

  useEffect(() => {
    if (accessCode) {
      localStorage.setItem("token", JSON.stringify(accessCode));
      navigate("/templates");
    } else {
      navigate("/");
    }
  }, []);

  return <></>
}

export default Token