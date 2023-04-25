import React from "react";
import { useOutletContext } from "react-router-dom";

import { ISession } from "../context/session.context";

interface ISessionContext {
  session: ISession;
  setSession: React.Dispatch<
    React.SetStateAction<Partial<ISession> | undefined>
  >;
}

const useSessionContext = () => {
  const context = useOutletContext<ISessionContext>();

  return context as ISessionContext;
};

export default useSessionContext;
