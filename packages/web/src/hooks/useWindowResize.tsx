import { useEffect } from "react";

type Callback = () => void;

const useWindowResize = (callback: Callback) => {
  useEffect(() => {
    window.addEventListener("resize", callback);

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, [callback]);
};

export default useWindowResize;
