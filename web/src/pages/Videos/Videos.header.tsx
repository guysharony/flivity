import { IVideosHeader } from "./Videos.header.interface";

const VideosHeader = ({ videos }: IVideosHeader) => {
	return (
		<div className="pb-4">
			<div className="flex py-6">
				<div>
					<span>{`My Videos (${videos.length})`}</span>
				</div>
			</div>
		</div>
	);
}

export default VideosHeader;