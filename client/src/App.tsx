import { Home } from './pages/Home';
import { Bingo } from './pages/Bingo';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<Home />} />
			<Route path='room/:roomId' element={<Bingo />} />
		</>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
