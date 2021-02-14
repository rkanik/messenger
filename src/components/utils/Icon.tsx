import { classify } from "../../helpers"

type Props = {
	md?: string,
	className?: string
}

const Icon = ({ md, className = 'text-base' }: Props) => {
	return (
		<i
			className={classify([
				className, {
					'material-icons': md
				}
			])}
		>
			{md || ''}
		</i>
	)
}

export default Icon