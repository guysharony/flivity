import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { InputProps } from './Input.interface';
import './Input.style.css';

export default function Input({ label, onChange, type, value, error, className }: InputProps) {
	const errors = typeof error == 'string' ? [error] : error;

	return (
		<div {...{ className }}>
			<div className={`relative flex items-center h-14 border border-${errors ? 'red-800' : 'gray-400'} px-5 w-full rounded-3xl overflow-hidden`}>
				<input type={type} defaultValue={value} className="input w-full h-10 mt-auto font-light outline-none text-gray-800 text-base" onChange={(e) => onChange(e.target.value)} autoCapitalize="none" autoComplete="off" autoCorrect="off" required />
				<label className="absolute transition-all pointer-events-none text-gray-500 font-light text-base">{label}</label>
			</div>
			{
				errors &&
				<div className='flex flex-col px-5 text-left'>
					{
						errors.map((e) => <span key={uuidv4()} className='text-sm text-red-800'>{e}</span>)
					}
				</div>
			}
		</div>
	)
}