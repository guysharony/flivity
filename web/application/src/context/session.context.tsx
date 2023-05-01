import React, { createContext, useState } from "react";

import request from "../utils/request";

export interface ISession {
	id: string;
	email: string;
	email_verified: boolean;
	account_configured: boolean;
}

export interface IContext {
	session?: ISession;
	setSession: React.Dispatch<React.SetStateAction<ISession | undefined>>;
	removeSession: () => Promise<void>;
}

export const SessionContext = createContext<any>(undefined);

export const SessionProvider = ({ children }: any) => {
	const [ready, setReady] = useState<boolean>(false);
	const [session, setSession] = useState<ISession | undefined>(undefined);

	const init = (value: React.SetStateAction<ISession | undefined>) => {
		setReady(true);
		setSession(value);
	}

	const removeSession = async () => {
		await request.logout(init);
	}

	React.useEffect(() => {
		let isReady = true;

		request.initialize(isReady, init)
			.catch((err) => {
				console.log(err);
			});

		return () => {
			isReady = false
		};
	}, [setSession]);

	if (!ready) {
		return null;
	}

	return (
		<SessionContext.Provider value={{
			session: session,
			setSession: setSession,
			removeSession: removeSession
		}}>
			{children}
		</SessionContext.Provider>
	);
};