import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();

	return (
		<div>
			<div className="flex flex-col text-center py-24">
				<div className="mb-10">
					<h1 className="text-7xl mb-10">Lorem ipsum dolor sit amet.<br></br>Dolor consectetur.</h1>
					<span className="text-2xl text-gray-600">Lorem ipsum dolor sit amet, consectetur.</span>
				</div>
				<div className="flex gap-2 mb-10 items-center justify-center">
					<Button type="primary" size="large" shape='round' href={new URL('/signin', import.meta.env.VITE_APPLICATION_URL).href} ghost>Start now</Button>
					<Button type="link" size="large" onClick={() => navigate('/contact-us')}>Contact us</Button>
				</div>
				<div className="w-full h-96 border-dashed border-black border rounded">

				</div>
			</div>
		</div>
	);
}

export default Home;