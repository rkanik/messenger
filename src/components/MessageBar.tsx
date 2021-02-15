import React from 'react';
import { useForm } from 'react-hook-form';
import { _buttonTypes } from '../enums';
import Button from './utils/Button';

type Props = {
	onMessage?: (message: string) => void
}
const MessageBar: React.FC<Props> = ({ onMessage }) => {

	const [isMessageEmpty, setIsMessageEmpty] = React.useState(true)
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data: any) => {
		if (onMessage) {
			onMessage(data.message)
			reset({ message: '' })
		}
	};

	const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
		setIsMessageEmpty((e.target as HTMLTextAreaElement).value === '')
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex-none p-4 border-t border-gray-200 flex items-center space-x-2'>

			<Button icon md="videocam" size='h-7 w-7' />
			<Button icon md="add_a_photo" size='h-7 w-7' />
			<Button icon md="add_photo_alternate" size='h-7 w-7' />
			<Button icon md="attachment" size='h-7 w-7' />

			<div className='flex-1'>
				<input
					type="text"
					name="message"
					placeholder='Type your message'
					className='w-full bg-gray-200 rounded-full text-sm px-4 py-2'
					onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(e)}
					ref={register({ required: true })}
				/>
			</div>

			<Button icon md="insert_emoticon" size='h-7 w-7' />

			{isMessageEmpty
				? <Button icon md="thumb_up" size='h-7 w-7' />
				: <Button icon md="send" type={_buttonTypes.submit} size='h-7 w-7' />
			}
		</form>
	)
}
export default MessageBar