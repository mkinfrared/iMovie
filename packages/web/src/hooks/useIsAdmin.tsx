import { useSelector } from "react-redux";

import { selectUserRole } from "store/reducers/user/selectors";

const useIsAdmin = () => {
  const role = useSelector(selectUserRole);

  return role === "admin";
};

export default useIsAdmin;
