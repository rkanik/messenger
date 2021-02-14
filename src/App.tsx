import { AuthProvider } from './context/AuthContext';
import Router from './router/Router'

function App() {
	return (
		<div id='app'>
			<AuthProvider >
				<Router />
			</AuthProvider>
		</div>
	);
}

export default App;
