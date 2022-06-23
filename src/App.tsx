import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from 'state/store';
import Layout from './components/Layout';
import Home from './pages';
import PageNotFound from './pages/404';
import routes, { routeNames } from './routes';

import {
	metamask_disconnected,
} from './state/actions/auth';

const PrivateRoute = ({ children, path }) => {
	const { walletConnected, userLogined } = useSelector(
		(state: RootState) => (
			{
				walletConnected: state.auth.walletConnected,
				userLogined: state.auth.userLogined
			})
	);

	console.log(walletConnected, userLogined);
	if (!walletConnected) {
		return <Navigate to={'/'} />;
	}
	if (!userLogined && path !== routeNames.signup) {
		return <Navigate to={routeNames.signup} />;
	}
	return children;
};

function App() {
	const dispatch: any = useDispatch();

	useEffect(() => {
		if ((window as any).ethereum) {
			(window as any).ethereum.on('accountsChanged', handleAccountsChanged);
		}
	}, []);

	function handleAccountsChanged(accounts) {
		if (accounts.length === 0) {
			dispatch(metamask_disconnected());
		}
	}

	return (
		<Router>
			<Layout>
				<Routes>
					{
						routes.map((route, index) => (
							< Route
								path={route.path}
								key={'route-key-' + index}
								element={
									<PrivateRoute path={route.path}>
										<route.component />
									</PrivateRoute>
								}
							/>
						))
					}
					<Route path="/" element={<Home />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</Layout>
		</Router >
	);
}

export default App;
