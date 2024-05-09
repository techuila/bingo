import { Home } from './pages/Home';
import { Bingo } from './pages/Bingo';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider
} from 'react-router-dom';
import supabase from './utils/supabase';
import { headers } from './constants/headers';
import { ToastProvider } from './components/Toast';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initRoom = async ({ params }: any) => {
	const { data, error } = await supabase.functions.invoke(
		`room/${params.roomId}`,
		{
			headers,
			method: 'GET'
		}
	);
	if (error) console.error(error);

	return data;
};

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<Home />} />
			<Route path='room/:roomId' element={<Bingo />} loader={initRoom} />
		</>
	)
);

function App() {
	return (
		<ToastProvider>
			<RouterProvider router={router} />
		</ToastProvider>
	);
}

export default App;
