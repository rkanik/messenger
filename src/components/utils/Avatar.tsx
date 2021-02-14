import { classify, letter } from "../../helpers"

type PropsTypes = {
	alt?: string;
	src?: string;
	circle?: boolean;
	size?: string | number,
	className?: string;
}

const Avatar = ({ alt, src, size = '', circle = true, className = '' }: PropsTypes) => {
	return (
		<div className={classify([
			size, className,
			'overflow-hidden relative', {
				'rounded-full': circle
			}])}>
			{src
				? <img
					src={src} alt={alt || ''}
					className={classify([
						'h-full w-full object-cover object-center', {
							'rounded-full': circle
						}
					])}
				/>
				: <div
					className='h-full w-full text-base font-semibold grid place-items-center bg-gray-300'
				>
					{letter()}
				</div>
			}
		</div>
	)
}

export default Avatar