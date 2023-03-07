import React, { ReactNode } from 'react';

import { ISession } from '../../context/session.context';
import useSession from '../../hooks/session.hook';

import { BodyLayoutProps } from "./BodyLayout.interface";

export default function BodyLayout({ children }: BodyLayoutProps) {
	const session = useSession();

	const childrenWithProps = React.Children.map(children, (child: ReactNode) => {
		if (React.isValidElement<Record<string, any>>(child)) {
			return React.cloneElement(child, {
				context: {
					session: session.session as ISession,
					setSession: (value?: Partial<ISession>) => {
						if (value) {
							session.setSession({ ...session.session, ...value } as ISession);
						} else {
							session.setSession(undefined);
						}
					}
				}
			});
		}
		return child;
	});

	return (
		<div className="mx-auto max-w-7xl h-full px-4 sm:px-6">
			{childrenWithProps}
		</div>
	)
}