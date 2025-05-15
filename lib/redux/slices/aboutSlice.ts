import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface AboutState {
  content: {
    title: string
    subtitle: string
    story: string
    mission: string
    vision: string
    values: Array<{
      title: string
      description: string
      icon: string
    }>
    team: Array<{
      name: string
      position: string
      bio: string
      image: string
    }>
  } | null
  loading: boolean
  error: string | null
}

const initialState: AboutState = {
  content: null,
  loading: false,
  error: null,
}

export const fetchAboutContent = createAsyncThunk("about/fetchContent", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch about content")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch about content")
  }
})

export const updateAboutContent = createAsyncThunk("about/updateContent", async (content: any, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to update about content")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to update about content")
  }
})

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAboutContent.fulfilled, (state, action) => {
        state.content = action.payload
        state.loading = false
      })
      .addCase(fetchAboutContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateAboutContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAboutContent.fulfilled, (state, action) => {
        state.content = action.payload
        state.loading = false
      })
      .addCase(updateAboutContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default aboutSlice.reducer
