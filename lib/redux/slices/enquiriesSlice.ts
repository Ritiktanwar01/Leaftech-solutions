import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Enquiry {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  service: string
  status: string
  notes?: string
  createdAt: string
  updatedAt: string
}

interface EnquiriesState {
  enquiries: Enquiry[]
  loading: boolean
  error: string | null
}

const initialState: EnquiriesState = {
  enquiries: [],
  loading: false,
  error: null,
}

export const fetchEnquiries = createAsyncThunk("enquiries/fetchEnquiries", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch enquiries")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch enquiries")
  }
})

export const updateEnquiryStatus = createAsyncThunk(
  "enquiries/updateStatus",
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to update enquiry status")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update enquiry status")
    }
  },
)

export const updateEnquiryNotes = createAsyncThunk(
  "enquiries/updateNotes",
  async ({ id, notes }: { id: string; notes: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries/${id}/notes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to update enquiry notes")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update enquiry notes")
    }
  },
)

const enquiriesSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnquiries.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.enquiries = action.payload
        state.loading = false
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateEnquiryStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateEnquiryStatus.fulfilled, (state, action) => {
        const index = state.enquiries.findIndex((enquiry) => enquiry._id === action.payload._id)
        if (index !== -1) {
          state.enquiries[index] = action.payload
        }
        state.loading = false
      })
      .addCase(updateEnquiryStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateEnquiryNotes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateEnquiryNotes.fulfilled, (state, action) => {
        const index = state.enquiries.findIndex((enquiry) => enquiry._id === action.payload._id)
        if (index !== -1) {
          state.enquiries[index] = action.payload
        }
        state.loading = false
      })
      .addCase(updateEnquiryNotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default enquiriesSlice.reducer
