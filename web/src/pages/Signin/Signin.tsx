import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/Input';

import { Form } from './Signin.interface';

export default function Signin() {
	const [form, setForm] = useState<Form>({
		values: {
			email: '',
		},
		errors: {}
	});

	const authenticate = async () => {
		const result = await fetch(`https://1hvhs7yb3k.execute-api.eu-west-1.amazonaws.com/auth/link/authorize?email=${form.values.email}`, {
			method: "POST"
		});

		console.log(result);
	}

	const onChange = (name: string, value: string) => {
		setForm({
			values: {
				...form.values,
				[name]: value
			},
			errors: form.errors
		});
	}

	return (
		<div className='flex flex-col justify-center items-center mx-auto max-w-md h-full'>
			<div className='w-full'>
				<div className='mb-10'>
					<span className='text-3xl text-slate-900'>Sign in</span>
				</div>
				<div className='flex flex-col mb-10 gap-4'>
					<Input label='Email' type='text' value={form.values.email} error={form.errors.email} onChange={(v) => onChange('email', v)} />
				</div>
				<button className='flex items-center justify-center h-14 border bg-blue-800 text-white px-5 w-full rounded-3xl overflow-hidden' onClick={() => authenticate()}>Sign in</button>
				<div className='mt-10'>
					<span className='text-base text-slate-900'>You don't have an account yet? <Link className='text-blue-800' to={'/signup'}>Sign up</Link></span>
				</div>
			</div>
		</div>
	);
}