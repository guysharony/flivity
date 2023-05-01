import { useState } from 'react';
import { Button, Form, Input } from 'antd';

import { trpc } from '../../utils/trpc';
import request from '../../utils/request';

import withProtection from '../../hoc/with-protection.hoc';

const Signup = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [sent, setSent] = useState<boolean>(false);

	const createUser = trpc.user.create.useMutation({
		onError: (error) => {
			const cause = error.data?.cause;
			if (!cause) {
				return;
			}

			const field_errors = cause.fieldErrors;
			if (!field_errors) {
				return;
			}

			setLoading(false);
		}
	});

	const [form] = Form.useForm<{ email: string; }>();

	const onFinish = async (event: any) => {
		setLoading(true);
		console.log(event);
		await createUser.mutateAsync({
			email: event.email,
		});
		await request.api(`/auth/link/authorize?email=${event.email}`, {
			method: "POST"
		});
		setSent(true);
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
								<h1 className="text-5xl mb-10">Sign up</h1>
								<span className="text-base text-gray-600">Enter email address you want to use with your account.</span>
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
											className='w-full'>Sign up</Button>
									</Form.Item>
								</Form>
							</div>
							<div className='text-left'>
								<span className='text-base text-slate-700'>Already have an account? <Button size='large' href='/signin' type='link'>sign in</Button></span>
							</div>
						</>
				}
			</div>
		</div>
	);
}

export default withProtection(Signup, { authenticated: false });