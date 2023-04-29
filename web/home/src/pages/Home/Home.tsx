import { Button } from "antd";

function Home() {
	return (
		<div>
			<div className="flex flex-col text-center py-24">
				<div className="mb-10">
					<h1 className="text-7xl mb-10">Lorem ipsum dolor sit amet.<br></br>Dolor consectetur.</h1>
					<span className="text-2xl text-gray-600">Lorem ipsum dolor sit amet, consectetur.</span>
				</div>
				<div className="flex gap-2 mb-10 items-center justify-center">
					<Button size="large" shape="round" className="text-blue-800 border-blue-800">Start now</Button>
					<Button type="text" size="large" shape="round" className="text-blue-800">Contact us</Button>
				</div>
				<div className="w-full h-96 border-dashed border-black border rounded">

				</div>
			</div>
		</div>
	);
}

export default Home;