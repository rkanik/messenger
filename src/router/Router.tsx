import { BrowserRouter, Switch } from 'react-router-dom'

// Wrapper
import Route from './Route'

// Layout
import Default from '../layouts/DefaultLayout'

// Pages
import Home from '../pages/Home'
import Messages from '../pages/Messages'

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact path='/'
					component={Home}
					layout={Default}
				/>
				<Route
					exact path='/messages'
					component={Messages}
					layout={Default}
				/>
			</Switch>
		</BrowserRouter>
	)
}

export default Router