import Icon from "./Icon"
import { classify } from "../../helpers"

type Props = {
	md?: string;
	size?: string;
	icon?: boolean;
	children?: JSX.Element[];
	className?: string;
	iconClass?: string,
}

const Button = ({ md, size, icon, children, className = '', iconClass }: Props) => {
	if (icon)
		return <IconButton
			md={md}
			size={size}
			className={className}
			iconClass={iconClass}
		/>
	return (
		<button className={className}>
			{children}
		</button>
	)
}

type IBProps = {
	size?: string,
	md?: string,
	className?: string,
	iconClass?: string,
}
const IconButton = ({
	md,
	size = 'h-8 w-8',
	className = 'bg-gray-200 hover:bg-gray-300',
	iconClass = 'text-gray-500'
}: IBProps) => {
	return (
		<button className={classify([
			size, className,
			'rounded-full grid place-items-center transition-colors',
		])}>
			{md && <Icon md={md} className={iconClass} />}
		</button>
	)
}

export default Button