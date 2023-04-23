import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { trpc } from '../../utils/trpc';

import Input from '../../components/Input/Input';
import withProtection from '../../hoc/with-protection.hoc';
import useSessionContext from '../../hooks/sessionContext.hook';

import { Form } from './AccountConfiguration.interface';

const AccountConfiguration = () => {
	const navigate = useNavigate();
	const context = useSessionContext();

	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<Form>({
		values: {
			firstName: '',
			lastName: '',
		},
		errors: {}
	});

	const setupUser = trpc.user.setup.useMutation({
		onSuccess: (data) => {
			context.setSession({
				id: data.id,
				email: data.email,
				email_verified: data.hasEmailVerified,
				account_configured: data.hasAccountConfigured,
			});
		},
		onError: (error) => {
			const cause = error.data?.cause;
			if (!cause) {
				return;
			}

			const field_errors = cause.fieldErrors;
			if (!field_errors) {
				return;
			}

			setForm({
				values: form.values,
				errors: field_errors
			});
			setLoading(false);
		}
	});

	const setup = async () => {
		setLoading(true);

		await setupUser.mutateAsync({
			id: context.session.id,
			firstName: form.values.firstName,
			lastName: form.values.lastName,
		});

		navigate('/');
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
			<div className='w-full text-center'>
				<div className='mb-10'>
					<span className='text-3xl text-slate-900'>Configure your account</span>
				</div>
				<div className='flex flex-col mb-10 gap-4'>
					<div className='flex gap-4'>
						<Input label='First name' className='w-full' type='text' value={form.values.firstName} error={form.errors.firstName} onChange={(v) => onChange('firstName', v)} />
						<Input label='Last name' className='w-full' type='text' value={form.values.lastName} error={form.errors.lastName} onChange={(v) => onChange('lastName', v)} />
					</div>
				</div>
				<button className={`flex items-center justify-center h-14 border bg-blue-800 text-white px-5 w-full rounded-3xl overflow-hidden${loading ? ' pointer-events-none opacity-50' : ''}`} onClick={() => setup()}>Create account</button>
			</div>
		</div>
	);
}

export default withProtection(AccountConfiguration, { authenticated: true, configured: false });