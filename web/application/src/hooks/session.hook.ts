import { useContext } from "react";

import { IContext, SessionContext } from "../context/session.context";

const useSession = () => {
  const context = useContext(SessionContext);

  return context as IContext;
};

export default useSession;
