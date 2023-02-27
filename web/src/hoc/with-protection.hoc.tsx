import React from "react";
import { useNavigate } from "react-router-dom";
import useSession from "../hooks/session.hook";

interface IWithProtection {
	authenticated?: boolean;
	configured?: boolean;
}

const withProtection = <T extends Record<string, any>>(
	WrappedComponent: React.ComponentType<T>,
	params?: IWithProtection
) => {
	const displayName =
		WrappedComponent.displayName || WrappedComponent.name || "Component";

	const ComponentWithProtection = (props: T) => {
		const session = useSession();
		const navigate = useNavigate();

		let mustAuthenticated = !params || params.authenticated;
		let mustConfigured = !params || params.configured;

		let isAuthentiated = !!session.session;
		let isConfigured = !!(session.session && session.session.account_configured);

		if (mustAuthenticated === false && mustConfigured === true) {
			throw new Error("A configured user is always authenticated.");
		}

		if (mustAuthenticated === undefined && mustConfigured === undefined) {
			mustAuthenticated = true;
			mustConfigured = true;
		}

		React.useEffect(() => {
			if (mustAuthenticated === true && isAuthentiated === false) {
				navigate("/signup");
				return;
			}

			if (
				mustAuthenticated === true &&
				mustConfigured === true &&
				isAuthentiated === true &&
				isConfigured === false
			) {
				navigate("/account_configuration");
				return;
			}

			if ((mustAuthenticated === false && isAuthentiated === true) || (mustConfigured === false && isConfigured === true)) {
				navigate("/");
				return;
			}
		}, [isAuthentiated, isConfigured, mustAuthenticated, mustConfigured, navigate]);

		console.log('Must authenticate: ', mustAuthenticated);
		console.log('Must configure: ', mustConfigured);

		return <WrappedComponent {...(props as T)} />;
	};

	ComponentWithProtection.displayName = `withProtection(${displayName})`;

	return ComponentWithProtection;
}

export default withProtection;