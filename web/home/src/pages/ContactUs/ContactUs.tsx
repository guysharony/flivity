import { Button, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

function ContactUs() {
	return (
		<div>
			<div className="flex flex-col text-center py-24">
				<div className="mb-10">
					<h1 className="text-7xl mb-10">Get in touch.</h1>
					<span className="text-2xl text-gray-600">Don't Hesitate to Reach Out</span>
				</div>
				<div className="w-full max-w-2xl m-auto text-left">
					<Form
						layout="vertical"
					>
						<Form.Item label="First name" required>
							<Input size={'large'} />
						</Form.Item>
						<Form.Item label="Last name" required>
							<Input size={'large'} />
						</Form.Item>
						<Form.Item label="Business email" required>
							<Input size={'large'} />
						</Form.Item>
						<Form.Item label="Company name" required>
							<Input size={'large'} />
						</Form.Item>
						<Form.Item label="Company size" required>
							<Select size="large" placeholder="Select company size...">
								<Select.Option value="1-100">1-100</Select.Option>
								<Select.Option value="101-1000">101-1000</Select.Option>
								<Select.Option value="1001-10000">1001-10000</Select.Option>
								<Select.Option value="10000+">10000+</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="Message" required>
							<TextArea size="large" rows={10} />
						</Form.Item>
						<Form.Item>
							<Button type="primary" size="large">Submit</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;