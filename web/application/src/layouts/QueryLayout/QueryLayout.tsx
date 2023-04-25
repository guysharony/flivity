import { ReactNode } from "react";

interface IQueryLayout {
	queries: any[];
	children: ReactNode | ReactNode[];
}

const QueryLayout = ({ queries, children }: IQueryLayout) => {
	if (queries.every(query => query.data)) {
		return <>{children}</>;
	}

	return (
		<div>
			<span>Loading...</span>
		</div>
	)
}

export default QueryLayout;