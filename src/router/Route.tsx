import { ElementType } from 'react';
import { Route } from 'react-router-dom'

type PropsTypes = {
	path: string,
	exact: boolean,
	layout: ElementType,
	component: ElementType
}

const RouteWrapper = ({
	layout: Layout,
	component: Component,
	...rest
}: PropsTypes) => {
	return (
		<Route {...rest} render={(props: any) => (
			<Layout {...props}>
				<Component {...props} />
			</Layout>
		)} />
	);
}

export default RouteWrapper