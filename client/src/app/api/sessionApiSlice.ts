import { apiSlice } from './apiSlice';
import { setAccess, setRefresh, loggedOut, setUser } from '../slices/sessionSlice';
import { ISession } from './types/types';


const sessionApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<ISession, { username: string; password: string; }>({
			query: (body) => ({
				url: '/api/user/login',
				method: 'POST',
				body
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					setTimeout(() => {
						dispatch(setAccess(data.accessToken));
						dispatch(setRefresh(data.refreshToken));
						dispatch(setUser(data.user));
					}, 1000);

				} catch (e: any) {
					dispatch(loggedOut());
					dispatch(apiSlice.util.resetApiState());
				}
			},
		}),
		logout: builder.mutation<any, { refreshToken: string; }>({
			query: (body) => ({
				url: '/api/user/logout',
				method: 'POST',
				body
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
				} catch (err) {
					console.log('error', err);
				} finally {
					dispatch(loggedOut());
					dispatch(apiSlice.util.resetApiState());
				}
			},
		}),
	})
});

export const {
	useLoginMutation,
	useLogoutMutation
} = sessionApiSlice;