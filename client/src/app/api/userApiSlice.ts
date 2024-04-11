import { apiSlice } from "./apiSlice";
import { IUserSchema } from "./types/types";

const userApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		register : builder.mutation ({
			query: (body) => ({
				url: '/api/user/register',
				method: 'POST',
				body
			})
		}),
		getUserById: builder.query<IUserSchema, string>({
			query: (id) => ({
				url: `/api/user/${id}`,
				method: 'GET'
			})
		}),
		updateUserById: builder.mutation ({
			query: ({id,body}) => ({
				url: `/api/user/${id}`,
				method: 'PATCH',
				body
			})
		})
	})
});

export const {
	useRegisterMutation,
	useGetUserByIdQuery,
	useUpdateUserByIdMutation
} = userApiSlice