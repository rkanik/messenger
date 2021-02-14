import { Fragment } from "react"
import { item } from "./conversations/types"
import { _group } from "../consts"

interface PropsTypes {
	active: boolean;
	item: item;
}

interface ThumbnailTypes {
	user: {
		thumbnail: string;
		fullName: string;
		isOnline: boolean;
	};
	classNames?: string,
	small?: boolean;
}
const Thumbnail = ({ user, small = false, classNames = '' }: ThumbnailTypes) => {
	return (
		<div className={`${classNames}${small ? ' w-7 h-7' : ' w-12 h-12'}`.trim()}>
			<img
				src={user.thumbnail} alt={user.fullName}
				className='h-full w-full rounded-full object-center object-cover'
			/>
			{user.isOnline && <div className='absolute right-0 flex items-center justify-center bottom-0 w-4 h-4 rounded-full bg-gray-200'>
				<div className='w-3 h-3 transform scale-90 rounded-full bg-indigo-500'></div>
			</div>}
		</div>
	)
}

const ConversationListItem = ({ active, item }: PropsTypes) => {

	const isGroup = item.type === _group
	const lastMessage = [...item.messages].pop()
	const members = item.members && item.members?.length > 2 ? item.members?.slice(0, 2) : item.members

	return (
		<div
			className={`flex relative cursor-pointer border-l-4 hover:bg-gray-300 transition-colors items-center pl-3 pr-4 py-2${active ? ' bg-gray-200 border-indigo-500' : ' border-gray-100'}`}
		>
			{isGroup ?
				<div className='flex-none flex items-end justify-between relative w-12 h-full'>
					{members && (
						<Fragment>
							<Thumbnail small user={members[0]} classNames='absolute left-0 bottom-0' />
							{members.length > 1 && <Thumbnail small user={members[1]} />}
						</Fragment>
					)}
				</div> :
				<div className='flex-none w-12 h-12 relative'>
					<img
						src={item.user?.thumbnail}
						alt={item.user?.fullName}
						className='h-full w-full rounded-full object-center object-cover'
					/>
					<div className='absolute right-0 flex items-center justify-center bottom-0 w-4 h-4 rounded-full bg-gray-200'>
						<div className='w-3 h-3 transform scale-90 rounded-full bg-indigo-500'></div>
					</div>
				</div>}
			<div className='ml-4 flex-1 '>
				<div className='flex justify-between items-center'>
					<h4 className='text-sm font-medium'>
						{isGroup ? item.group?.name : item.user?.fullName}
					</h4>
					<span className='text-xs text-gray-500'>{lastMessage?.sentAt}</span>
				</div>
				<p className='text-sm single-line text-gray-700'>{lastMessage?.message}</p>
			</div>
		</div>
	)
}

export default ConversationListItem