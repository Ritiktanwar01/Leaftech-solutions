import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface ContactState {
  contactInfo: {
    address: {
      street: string
      city: string
      state: string
      zip: string
      country: string
    }
    phone: {
      main: string
      support: string
    }
    email: {
      general: string
      support: string
      careers: string
    }
    hours: string
    mapEmbed: string
    socialLinks: Array<{
      platform: string
      url: string
    }>
  } | null
  loading: boolean
  error: string | null
}

const initialState: ContactState = {
  contactInfo: null,
  loading: false,
  error: null,
}

export const fetchContactInfo = createAsyncThunk("contact/fetchInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch contact information")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch contact information")
  }
})

export const updateContactInfo = createAsyncThunk(
  "contact/updateInfo",
  async (contactInfo: any, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/contact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactInfo),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to update contact information")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update contact information")
    }
  },
)

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.contactInfo = action.payload
        state.loading = false
      })
      .addCase(fetchContactInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateContactInfo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateContactInfo.fulfilled, (state, action) => {
        state.contactInfo = action.payload
        state.loading = false
      })
      .addCase(updateContactInfo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default contactSlice.reducer
