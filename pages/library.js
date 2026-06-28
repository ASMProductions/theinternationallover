import { useEffect } from "react";

export default function Library() {
  useEffect(() => {
    window.location.replace("/");
  }, []);
  return null;
}
