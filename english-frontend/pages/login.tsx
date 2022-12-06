import { useEffect } from "react";
import { useLoginPopup } from "../components/LoginPopup";

export default function Login() {

  const { showLoginPopup } = useLoginPopup()

  useEffect(() => {
    showLoginPopup()
  }, [showLoginPopup])

  return (
    <></>
  );
}
