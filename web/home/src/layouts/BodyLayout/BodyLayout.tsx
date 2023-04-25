import { BodyLayoutProps } from "./BodyLayout.interface";

export default function BodyLayout({ children }: BodyLayoutProps) {
	return (
		<div className='flex-auto overflow-auto h-full'>
			<div className="mx-auto max-w-7xl h-full px-4 sm:px-6 flex flex-col">
				{children}
			</div>
		</div>
	)
}