import { useContext, useEffect, useState } from "react"
import { item } from "../components/conversations/types"
import { AuthContext } from "../context/AuthContext"
import { AuthContextType } from "../context/types"
import { History, Location } from 'history';
import { _direct, _group } from "../consts"

// Components
import Avatar from "../components/utils/Avatar"
import Button from "../components/utils/Button"
import ConversationList from "../components/ConversationList"
import ConversationListItem from "../components/ConversationListItem"
import ConversationSubheader from "../components/ConversationSubheader"
import ProfileMenu from "../components/ProfileMenu"
import ProfileMenuToggler from "../components/ProfileMenuToggler"
import Subheader from "../components/Subheader"
import Dropdown from "../components/utils/Dropdown"

type Props = {
	history: History;
	location: Location
}

const Messages: React.FC<Props> = ({ history, location }) => {

	const $auth = useContext(AuthContext) as AuthContextType

	const [coversations] = useState([
		{
			type: 'group',
			group: {
				members: 10,
				name: 'Awesome Developers',
			},
			members: [
				{
					isOnline: true,
					fullName: 'RK Anik',
					thumbnail: 'https://lh3.googleusercontent.com/ogw/ADGmqu97FFQOW-8eXxwOwfCmqZq4F8QTZWzTdkr97Lb3=s83-c-mo'
				},
				{
					isOnline: false,
					fullName: 'John Doe',
					thumbnail: 'https://lh3.googleusercontent.com/-t1873fHckc4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn7pn__hStaBmHAZVKrFRByOEWjLw/s48-c/photo.jpg'
				},
				{
					isOnline: false,
					fullName: 'Rasel Khandkar',
					thumbnail: 'https://lh3.googleusercontent.com/-Xx5PQAIXvJ0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn9qDxHK7n1gbO4m6pR2tI9kMHQuA/s48-c/photo.jpg'
				},
			],
			messages: [
				{
					isSeen: false,
					sentAt: '5 mins ago',
					message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione unde adipisci, vel dolor ex omnis tenetur natus quam rerum nam facilis dolorum minima exercitationem quaerat, aliquid, architecto consequatur perspiciatis sint?'
				}
			]
		},
		{
			type: 'group',
			group: {
				members: 6,
				name: 'UI Art Design',
			},
			members: [
				{
					isOnline: true,
					fullName: 'RK Anik',
					thumbnail: 'https://lh3.googleusercontent.com/-lf30WvnoBrQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmqIeWXOR8WMqaMYS-GkZcg2LDpMA/s48-c/photo.jpg'
				},
				{
					isOnline: false,
					fullName: 'John Doe',
					thumbnail: 'https://lh3.googleusercontent.com/-t1873fHckc4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn7pn__hStaBmHAZVKrFRByOEWjLw/s48-c/photo.jpg'
				},
				{
					isOnline: false,
					fullName: 'Rasel Khandkar',
					thumbnail: 'https://lh3.googleusercontent.com/-Xx5PQAIXvJ0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn9qDxHK7n1gbO4m6pR2tI9kMHQuA/s48-c/photo.jpg'
				},
			],
			messages: [
				{
					isSeen: false,
					sentAt: '5 mins ago',
					message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione unde adipisci, vel dolor ex omnis tenetur natus quam rerum nam facilis dolorum minima exercitationem quaerat, aliquid, architecto consequatur perspiciatis sint?'
				}
			]
		},
		{
			type: 'direct',
			user: {
				isOnline: false,
				fullName: 'John Doe',
				thumbnail: 'https://lh3.googleusercontent.com/-t1873fHckc4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucn7pn__hStaBmHAZVKrFRByOEWjLw/s48-c/photo.jpg'
			},
			messages: [
				{
					isSeen: false,
					sentAt: '5 mins ago',
					message: 'Hey! What\'s up?'
				}
			]
		}
	])

	const groupCoversations = coversations.filter(({ type }) => type === _group)
	const directCoversations = coversations.filter(({ type }) => type === _direct)

	const handleSignOut = () => {
		$auth.resetState();
		history.replace('/')
	}

	useEffect(() => {

		console.log(history, location)

		$auth.setState({
			user: {
				name: 'RK Anik',
				email: 'rkanik.me@gmail.com',
				thumbnail: 'https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg'
			},
			isAuth: true
		})
	}, [])

	return (
		<div className='flex h-screen'>
			<div className='flex-none flex flex-col w-80 bg-gray-200'>
				<div className='flex-none flex justify-between items-center p-4'>
					<h4 className='text-xl font-semibold flex items-center text-gray-900'>
						<span>Messages</span>
						<span className='inline-flex h-4 w-4 bg-red-500 font-normal ml-2 text-white items-center justify-center text-xs rounded-full'>5</span>
					</h4>
					<Button
						icon md='search'
						className='bg-gray-300 hover:bg-gray-400'
						iconClass='text-base text-gray-500'
					/>
				</div>
				<div className='flex-none flex justify-between text-sm py-2 px-4 text-gray-700'>
					<button className='font-medium text-indigo-700'>All Coversations</button>
					<button className='font-medium'>Archived</button>
					<button className='font-medium'>Starred</button>
				</div>
				<div className='overflow-hidden max-h-56 flex-1 flex flex-col pt-2'>
					<ConversationSubheader text='Groups' />
					<ConversationList
						classNames='mt-2'
						list={groupCoversations}
						item={(item: item, index: number) =>
							<ConversationListItem key={index} active={true} item={item} />
						}
					/>
				</div>
				<div className='overflow-hidden flex-1 flex flex-col pt-2'>
					<ConversationSubheader text='Direct' />
					<ConversationList
						classNames='mt-2'
						list={directCoversations}
						item={(item: item, index: number) =>
							<ConversationListItem key={index} active={true} item={item} />
						}
					/>
				</div>
			</div>
			<div className='flex-1 flex'>
				<div className='flex-1 flex flex-col bg-gray-100 overflow-hidden'>
					<div className='flex-none flex pb-0 z-10'>
						<div className='flex-1 p-4'>
							<div className='flex items-center shadow-md rounded-full py-2 px-3 bg-white'>
								<Avatar size='h-11 w-11' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
								<div className='ml-4'>
									<h4 className='text-base text-gray-900'>UI Art Design</h4>
									<p className='text-sm text-gray-500'>Active now</p>
								</div>
								<div className='ml-auto flex items-center -space-x-2'>
									<div className='h-8 w-8 rounded-full bg-white grid place-items-center hover:next:mx-0  transition-margin cursor-pointer'>
										<div className='h-7 w-7 rounded-full bg-gray-400 text-white grid place-items-center'>
											<i className="material-icons text-base">add</i>
										</div>
									</div>
									<div className='h-8 w-8 rounded-full bg-white grid place-items-center hover:next:mx-0  transition-margin cursor-pointer'>
										<div className='h-7 w-7 rounded-full bg-red-500'></div>
									</div>
									<div className='h-8 w-8 rounded-full bg-white grid place-items-center hover:next:mx-0 transition-margin cursor-pointer'>
										<div className='h-7 w-7 rounded-full bg-green-500'></div>
									</div>
									<div className='h-8 w-8 rounded-full bg-white grid place-items-center hover:next:mx-0 transition-margin cursor-pointer'>
										<div className='h-7 w-7 rounded-full bg-indigo-500'></div>
									</div>
								</div>
								<div className='flex space-x-2 ml-4'>
									<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
										<i className='material-icons text-base text-gray-500'>call</i>
									</button>
									<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
										<i className='material-icons text-base text-gray-500'>videocam</i>
									</button>
									<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
										<i className='material-icons text-base text-gray-500'>more_vert</i>
									</button>
								</div>
							</div>
						</div>
						<div className='w-72 p-4 flex items-center justify-end'>

							<Dropdown
								className='shadow-md'
								toggler={
									<ProfileMenuToggler
										name={$auth.user.name}
										src={$auth.user.thumbnail}
									/>
								}
							>
								<ProfileMenu user={$auth.user} signOut={handleSignOut} />
							</Dropdown>

						</div>
					</div>
					<div className='flex-1 flex overflow-hidden'>
						<div className='flex-1 flex flex-col'>
							<div className='flex-1 flex flex-col relative overflow-hidden'>
								<div className='absolute bg-gradient-to-b from-gray-100 to-transparent inset-x-0 top-0 h-12' />
								<div className='p-4 pt-0 overflow-y-auto flex flex-col-reverse scrollbar'>
									<div className='ml-auto flex items-end flex-row-reverse w-8/12'>
										<div className='flex-none h-6 w-6 rounded-full overflow-hidden mb-5'>
											<img src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg" alt="" className='h-full w-full' />
										</div>
										<div className='mr-2 text-right'>
											<div className='space-y-1'>
												<p className='inline-block p-3 bg-gray-500 text-white text-sm rounded-xl rounded-br-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis rerum vero fugiat, sapiente mollitia, ducimus reiciendis ratione nesciunt temporibus aperiam praesentium commodi corrupti porro in dolore voluptas corporis velit? Ducimus nesciunt necessitatibus rem id cupiditate odio. Earum possimus laborum facere?
									</p>
												<br />
												<p className='inline-block p-3 bg-gray-500 text-white text-sm rounded-xl rounded-br-none'>
													Lorem ipsum dolor
									</p>
												<br />
												<p className='inline-block p-3 bg-gray-500 text-white text-sm rounded-xl rounded-br-none'>
													Lorem ipsum dolor sit amet consectetur
									</p>
											</div>
											<p className='text-xs text-gray-400 mt-1'>3 mins ago</p>
										</div>
									</div>
									<div className='flex items-end w-8/12'>
										<div className='flex-none h-6 w-6 rounded-full overflow-hidden relative mb-5'>
											<img src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg" alt="" className='h-full w-full' />
										</div>
										<div className='ml-2'>
											<div className='space-y-1'>
												<p className='inline-block  p-3 bg-indigo-500 text-white text-sm rounded-xl rounded-bl-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing.
									</p>
											</div>
											<p className='text-xs text-gray-400 mt-1'>3 mins ago</p>
										</div>
									</div>
									<div className='ml-auto flex items-end flex-row-reverse w-8/12'>
										<div className='flex-none h-6 w-6 rounded-full overflow-hidden mb-5'>
											<img src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg" alt="" className='h-full w-full' />
										</div>
										<div className='mr-2 text-right'>
											<div className='space-y-1'>
												<p className='inline-block p-3 bg-gray-500 text-white text-sm rounded-xl rounded-br-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quidem quisquam ullam.
									</p>
											</div>
											<p className='text-xs text-gray-400 mt-1'>3 mins ago</p>
										</div>
									</div>
									<div className='flex items-end w-8/12'>
										<div className='flex-none h-6 w-6 rounded-full overflow-hidden relative mb-5'>
											<img src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg" alt="" className='h-full w-full' />
										</div>
										<div className='ml-2'>
											<div className='space-y-1'>
												<p className='inline-block p-3 bg-indigo-500 text-white text-sm rounded-xl rounded-bl-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque non tempore voluptatem dolorem, temporibus eum?
									</p>
												<p className='inline-block p-3 bg-indigo-500 text-white text-sm rounded-xl rounded-bl-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing.
									</p>
											</div>
											<p className='text-xs text-gray-400 mt-1'>3 mins ago</p>
										</div>
									</div>
									<div className='ml-auto flex items-end flex-row-reverse w-8/12'>
										<div className='flex-none h-6 w-6 rounded-full overflow-hidden mb-5'>
											<img src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg" alt="" className='h-full w-full' />
										</div>
										<div className='mr-2 text-right'>
											<div className='space-y-1'>
												<p className='inline-block p-3 bg-gray-500 text-white text-sm rounded-xl rounded-br-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing elit.
									</p>
												<p className='inline-block p-3 bg-gray-500 text-white text-sm rounded-xl rounded-br-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, alias.
									</p>
											</div>
											<p className='text-xs text-gray-400 mt-1'>3 mins ago</p>
										</div>
									</div>
									<div className='flex items-end w-8/12'>
										<div className='flex-none h-6 w-6 rounded-full overflow-hidden relative mb-5'>
											<img src="https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg" alt="" className='h-full w-full' />
										</div>
										<div className='ml-2'>
											<div className='space-y-1'>
												<div className='inline-block p-3 bg-indigo-500 text-white text-sm rounded-xl rounded-bl-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing elit.
									</div>
												<div className='inline-block p-3 bg-indigo-500 text-white text-sm rounded-xl rounded-bl-none'>
													Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque doloribus quia expedita nobis numquam soluta maxime non sunt illo? Doloribus sunt cumque nostrum quod qui magnam nobis cum iure?
								</div>
											</div>
											<p className='text-xs text-gray-400 mt-1'>3 mins ago</p>
										</div>
									</div>
								</div>
							</div>
							<div className='flex-none p-4 border-t border-gray-200 flex items-center space-x-2'>
								<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
									<i className='material-icons text-base text-gray-500'>videocam</i>
								</button>
								<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
									<i className='material-icons text-base text-gray-500'>add_a_photo</i>
								</button>
								<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
									<i className='material-icons text-base text-gray-500'>add_photo_alternate</i>
								</button>
								<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
									<i className='material-icons text-base text-gray-500'>attachment</i>
								</button>
								<div className='flex-1'>
									<input type="text" className='w-full bg-gray-200 rounded-full text-sm px-4 py-2' placeholder='Type your message' />
								</div>
								<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
									<i className='material-icons text-base text-gray-500'>insert_emoticon</i>
								</button>
								<button className='h-7 w-7 rounded-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 transition-colors'>
									<i className='material-icons text-base text-gray-500'>thumb_up</i>
								</button>
							</div>
						</div>
						<div className='w-72 flex'>
							<div className='flex-1'>
								<Avatar
									size='h-20 w-20'
									className='mx-auto bg-gray-100 p-2'
									src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg'
								/>
								<div className='h-full bg-gray-200 rounded-tl-3xl px-4 pt-14 -mt-10'>
									<h4 className='text-lg font-semibold text-gray-900 text-center'>UI Art Design</h4>


									<div className='mt-8'>
										<button className='flex justify-between'>

										</button>
									</div>


									<Subheader text='Members' className='text-xs mt-8' />
									<div className='flex mt-4 space-x-4'>
										<div className='flex-none'>
											<Avatar
												size='h-24 w-24'
												className='mx-auto bg-gray-100 p-1'
												src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg'
											/>
										</div>
										<div>
											<div className='grid grid-cols-3 gap-2'>
												<Avatar size='h-8 w-8' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
												<Avatar size='h-8 w-8' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
												<Avatar size='h-8 w-8' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
												<Avatar size='h-8 w-8' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
												<Avatar size='h-8 w-8' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
												<Avatar size='h-8 w-8' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
											</div>
											<div className='text-center'>
												<i className="cursor-pointer material-icons text-lg text-gray-500">expand_more</i>
											</div>
										</div>
									</div>

									<Subheader text='Photos & Videos' className='text-xs mt-8' />
									<div className='grid grid-cols-3 gap-2 mt-4'>
										<Avatar circle={false} className='rounded' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
										<Avatar circle={false} className='rounded' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
										<Avatar circle={false} className='rounded' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
										<Avatar circle={false} className='rounded' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
										<Avatar circle={false} className='rounded' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
										<Avatar circle={false} className='rounded' src='https://i.ibb.co/hmYbNmH/rkanik-and-sadnan.jpg' />
									</div>
									<Subheader text='Files' className='text-xs mt-8' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Messages