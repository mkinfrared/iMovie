import { useSelector } from "react-redux";

import { selectUserId } from "store/reducers/user/selectors";

const useAuthenticationCheck = () => {
  const userId = useSelector(selectUserId);

  return !!userId;
};

export default useAuthenticationCheck;
