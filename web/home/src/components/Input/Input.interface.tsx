export interface InputProps {
	label: string;
	onChange: (value: string) => void;
	type: 'text' | 'password';
	value: string;
	className?: string;
	error?: string | string[];
}