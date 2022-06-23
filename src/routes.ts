import withPageTitle from 'components/PageTitle';
import { dAppName } from 'config';
import CreateSession from 'pages/app/createsession';
import Dashboard from 'pages/app/dashboard';
import SignUp from 'pages/signup';

export const routeNames = {
	signup: '/signup',
	dashboard: '/dashboard',
	createsession: '/createsession'
};

const routes = [
	{
		path: routeNames.signup,
		title: 'SignUp',
		component: SignUp
	},
	{
		path: routeNames.dashboard,
		title: 'Dashboard',
		component: Dashboard
	},
	{
		path: routeNames.createsession,
		title: 'CreateSession',
		component: CreateSession
	},
];

const mappedRoutes = routes.map((route: any) => {
	const title = route.title
		? `${route.title} • ${dAppName}`
		: `${dAppName}`;

	const requiresAuth = Boolean(route.authenticatedRoute);
	const wrappedComponent = withPageTitle(title, route.component);

	return {
		path: route.path,
		component: wrappedComponent,
		authenticatedRoute: requiresAuth
	};
});

export default mappedRoutes;
