import React from 'react';
import { IProfileImage } from "./ProfileImage.interface";


export default function ProfileImage({ src, alt, className }: IProfileImage) {
	return (
		<div className={`${className ? `${className} ` : ''}rounded-full overflow-hidden aspect-square relative`}>
			<img src={src} alt={alt} className='w-full h-full' />
		</div>
	)
}