import { ISession } from "../context/session.context";

const request = () => {
  let initialized: boolean = false;
  let accessToken: string | undefined;
  let user: Record<string, any> | undefined;

  const getApiUrl = (input: string) => {
    const url = new URL(input, process.env.REACT_APP_API_URL);

    return url.href;
  };

  const getSession = async () => {
    const url = getApiUrl("/session");

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  };

  return {
    get initialized() {
      return initialized;
    },
    initialize: async (
      isReady: boolean,
      setSession: (value: ISession | undefined) => void
    ) => {
      const session = await getSession();

      if (session.user && session.accessToken) {
        user = session.user;
        accessToken = session.accessToken;

        console.log("User: ", session.user);
        console.log("Access Token: ", session.accessToken);
      }

      if (isReady) {
        setSession(user as ISession);
      }

      initialized = true;
    },
    api: async function (
      this: any,
      input: string | RequestInfo | URL,
      init?: RequestInit | undefined
    ) {
      if (!initialized) {
        throw new Error("Request not initialized.");
      }

      const url = getApiUrl(input.toString());

      const headers: HeadersInit = {
        Accept: "application/json, text/plain, /*",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const response = await fetch(url, {
        ...init,
        headers: headers,
        credentials: "include",
      });

      if (this.isTrpc) {
        return response;
      }

      const contentType = response.headers.get("Content-Type");
      const isJson = contentType && contentType.includes("application/json");

      const body = isJson ? await response.json() : response;

      if (response.status === 400) {
        throw body;
      }

      return body;
    },
  };
};

export default request();
