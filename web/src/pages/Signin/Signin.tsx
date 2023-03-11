import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import request from '../../utils/request';

import Input from '../../components/Input/Input';

import { Form } from './Signin.interface';

export default function Signin() {
	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<Form>({
		values: {
			email: '',
		},
		errors: {}
	});
	const [sent, setSent] = useState<boolean>(false);

	const authenticate = async () => {
		setLoading(true);

		try {
			await request.api(`/auth/link/authorize?email=${form.values.email}`, {
				method: "POST"
			});

			setSent(true);
		} catch (error: any) {
			if ('email' in error) {
				setForm({
					values: form.values,
					errors: {
						email: error.email
					}
				});
			}
		}
		setLoading(false);
	}

	const onChange = (name: string, value: string) => {
		setForm({
			values: {
				...form.values,
				[name]: value
			},
			errors: {
				...form.errors,
				[name]: undefined
			}
		});
	}

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
								<span className='text-base text-slate-900'>{`Please, click on the link we have sent to ${form.values.email} to continue.`}</span>
							</div>
						</>
						: <>
							<div className='mb-10'>
								<span className='text-3xl text-slate-900'>Sign in</span>
							</div>
							<div className='flex flex-col mb-10 gap-4'>
								<Input label='Email' type='text' value={form.values.email} error={form.errors.email} onChange={(v) => onChange('email', v)} />
							</div>
							<button className={`flex items-center justify-center h-14 border bg-blue-800 text-white px-5 w-full rounded-3xl overflow-hidden${loading ? ' pointer-events-none opacity-50' : ''}`} onClick={() => authenticate()}>Sign in</button>
							<div className='mt-10'>
								<span className='text-base text-slate-900'>Don't have an account yet? <Link className='text-blue-800' to={'/signup'}>Sign up</Link></span>
							</div>
						</>
				}
			</div>
		</div>
	);
}