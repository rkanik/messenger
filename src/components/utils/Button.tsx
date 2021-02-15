import Icon from "./Icon"
import { classify } from "../../helpers"
import { _buttonTypes } from "../../enums"

type Props = {
	type?: _buttonTypes;
	md?: string;
	size?: string;
	icon?: boolean;
	children?: JSX.Element[];
	className?: string;
	iconClass?: string,
}

const Button = ({ md, size, icon, type = _buttonTypes.button, children, className, iconClass }: Props) => {
	if (icon)
		return <IconButton
			md={md}
			type={type}
			size={size}
			className={className || 'bg-gray-200 hover:bg-gray-300'}
			iconClass={iconClass || 'text-base text-gray-500'}
		/>
	return (
		<button className={className || ''}>
			{children}
		</button>
	)
}

type IBProps = {
	md?: string,
	size?: string,
	type?: _buttonTypes;
	className?: string,
	iconClass?: string,
}
const IconButton = ({
	md, type,
	size = 'h-8 w-8',
	className = 'bg-gray-200 hover:bg-gray-300',
	iconClass = 'text-gray-500'
}: IBProps) => {
	return (
		<button type={type} className={classify([
			size, className,
			'rounded-full grid place-items-center transition-colors',
		])}>
			{md && <Icon md={md} className={iconClass} />}
		</button>
	)
}

export default Button