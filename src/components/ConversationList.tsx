import { item } from "./conversations/types"

type PropsTypes = {
	item: (item: item, b: number) => JSX.Element,
	classNames?: string,
	list: item[]
}

const ConversationList = ({ item, list, classNames }: PropsTypes) => {
	return (
		<div className={`flex-1 overflow-y-auto scrollbar ${classNames || ''}`.trim()}>
			{list.map((a: item, b: number) => item(a, b))}
		</div>
	)
}

export default ConversationList