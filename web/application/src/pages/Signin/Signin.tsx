import { useState } from 'react';
import { Button, Form, Input } from 'antd';

import request from '../../utils/request';

import withProtection from '../../hoc/with-protection.hoc';

const Signin = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [sent, setSent] = useState<boolean>(false);

	const [form] = Form.useForm<{ email: string; }>();

	const onFinish = async (event: any) => {
		setLoading(true);
		try {
			await request.api(`/auth/link/authorize?email=${event.email}`, {
				method: "POST"
			});
			setSent(true);
		} catch (e: any) {
			if ('email' in e) {
				form.setFields([
					{
						name: 'email',
						errors: [e.email],
					},
				]);
			}
		}
		setLoading(false);
	}

	/* eslint-disable no-template-curly-in-string */
	const validateMessages = {
		required: '${label} is required.',
		types: {
			email: '${label} is not a valid email.',
		},
	};

	return (
		<div className='flex flex-col justify-center items-center mx-auto max-w-md h-full'>
			<div className='w-96 text-center'>
				{
					sent
						? <>
							<div className='mb-10'>
								<span className='text-3xl text-slate-900'>Check your inbox</span>
							</div>
							<div className='mt-10'>
								<span className='text-base text-slate-900'>{`Please, click on the link we have sent to ${form.getFieldValue('email')} to continue.`}</span>
							</div>
						</>
						: <>
							<div className="mb-10">
								<h1 className="text-5xl mb-10">Sign in</h1>
								<span className="text-base text-gray-600">Enter email address of the account you want to sign in to.</span>
							</div>
							<div className='text-left'>
								<Form
									layout="vertical"
									disabled={loading}
									onFinish={onFinish}
									form={form}
									validateMessages={validateMessages}
								>
									<Form.Item
										label="Email"
										name="email"
										rules={[
											{ required: true, type: 'email' }
										]}>
										<Input
											size={'large'}
											disabled={loading} />
									</Form.Item>
									<Form.Item>
										<Button
											type={'primary'}
											size={'large'}
											htmlType={"submit"}
											disabled={loading}
											className='w-full'>Sign in</Button>
									</Form.Item>
								</Form>
							</div>
							<div className='text-left'>
								<span className='text-base text-slate-700'>Don't have an account yet? <Button size='large' href='/signup' type='link'>sign up</Button></span>
							</div>
						</>
				}
			</div>
		</div>
	);
}

export default withProtection(Signin, { authenticated: false });