import { apiSlice } from "./apiSlice";
import { IProductSchema } from "./types/types";

const productApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		registerProduct : builder.mutation ({
			query: (body) => ({
				url: '/api/product',
				method: 'POST',
				body
			})
		}),
		getProductById: builder.query<IProductSchema, string>({
			query: (id) => ({
				url: `/api/product/${id}`,
				method: 'GET'
			})
		}),
		getProducts: builder.query<IProductSchema[], void>({
			query: () => ({
				url: `/api/products`,
				method: 'GET'
			})
		}),
		updateProductById: builder.mutation ({
			query: ({id,body}) => ({
				url: `/api/product/${id}`,
				method: 'PATCH',
				body
			})
		}),
		addProduct: builder.mutation ({
			query: (body) => ({
				url: `/api/product/add`,
				method: 'POST',
				body
			})
		})
	})
});

export const {
	useGetProductByIdQuery,
	useUpdateProductByIdMutation,
	useGetProductsQuery,
	useRegisterProductMutation,
	useAddProductMutation
} = productApiSlice


