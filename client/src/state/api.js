import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AuthService from '../utils/auth';

export const postApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
      baseUrl: process.env.REACT_APP_BASE_URL,
      prepareHeaders: (headers, { getState }) => {
        if (AuthService.logged()) {
          headers.set("Authorization", `Bearer ${AuthService.getToken()}`);
        }
        return headers;
      },
  }),
    tagTypes: ['Posts', 'Expenses'],
    endpoints: (build) => ({
      getPosts: build.query({
        query: () => 'posts',
        // Provides a list of `Posts` by `id`.
        // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
        // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
        providesTags: (result) =>
          // is result available?
          result
            ? // successful query
              [
                ...result.map(({ id }) => ({ type: 'Posts', id })),
                { type: 'Posts', id: 'LIST' },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
              [{ type: 'Posts', id: 'LIST' }],
      }),
      addUser: build.mutation({
        query: ({email, password, username}) => ({
          url: 'api/users',
          method: 'POST',
          body: { email, password, username },
        }),
        invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
      }),
      loginUser: build.mutation({
        query: ({password, username}) => ({
          url: 'api/users/login',
          method: 'POST',
          body: { password, username },
        }),
        invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
      }),
      addExpense: build.mutation({
        query: ({name, frequency, expectedPaymentDate, expectedPaymentAmount, user}) => ({
          url: 'api/expenses/add',
          method: 'POST',
          body: { name, frequency, expectedPaymentDate, expectedPaymentAmount, user },
        }),
        invalidatesTags: ['Expenses'],
      }),
      addPost: build.mutation({
        query(body) {
          return {
            url: `post`,
            method: 'POST',
            body,
          }
        },
        // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
        // that newly created post could show up in any lists.
        invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
      }),
      getPost: build.query({
        query: (id) => `post/${id}`,
        providesTags: (result, error, id) => [{ type: 'Posts', id }],
      }),
      getExpenses: build.query({
        query: () => ({
          url: 'api/expenses/all',
          method: 'GET',
        }),
        providesTags: ['Expenses'],
      }),
      updatePost: build.mutation({
        query(data) {
          const { id, ...body } = data
          return {
            url: `post/${id}`,
            method: 'PUT',
            body,
          }
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
        invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
      }),
      deletePost: build.mutation({
        query(id) {
          return {
            url: `post/${id}`,
            method: 'DELETE',
          }
        },
        // Invalidates all queries that subscribe to this Post `id` only.
        invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
      }),
    }),
})
  
export const {
    useGetPostsQuery,
    useGetExpensesQuery,
    useAddPostMutation,
    useGetPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddUserMutation,
    useLoginUserMutation,
    useAddExpenseMutation,
} = postApi











