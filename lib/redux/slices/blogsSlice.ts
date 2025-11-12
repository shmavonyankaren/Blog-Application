import { createSlice } from "@reduxjs/toolkit";

import type { BlogType as Blog } from "@/lib/types";

import type { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BlogsState {
  blogs: Blog[];
}

const initialState: BlogsState = {
  blogs: [],
};

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: initialState,
  reducers: {
    getBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
    },
    addBlog(state, action: PayloadAction<Blog>) {
      state.blogs.push(action.payload);
    },
    deleteBlog(state, action: PayloadAction<number>) {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    deleteAll(state) {
      state.blogs = [];
    },
  },
});

export const { getBlogs, addBlog, deleteBlog, deleteAll } = blogsSlice.actions;

export const selectBlogs = (state: RootState) => state.blogs.blogs;

export default blogsSlice.reducer;
