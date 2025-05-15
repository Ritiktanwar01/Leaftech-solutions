import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface DashboardState {
  stats: {
    visitors: {
      total: number
      change: string
    }
    enquiries: {
      total: number
      change: string
    }
    projects: {
      total: number
      change: string
    }
    conversionRate: {
      rate: number
      change: string
    }
    visitorData: { date: string; count: number }[]
    enquiryTypes: { label: string; value: number; color: string }[]
  }
  loading: boolean
  error: string | null
}

const initialState: DashboardState = {
  stats: {
    visitors: {
      total: 0,
      change: "+0%",
    },
    enquiries: {
      total: 0,
      change: "+0%",
    },
    projects: {
      total: 0,
      change: "+0%",
    },
    conversionRate: {
      rate: 0,
      change: "+0%",
    },
    visitorData: [],
    enquiryTypes: [],
  },
  loading: false,
  error: null,
}

export const fetchDashboardStats = createAsyncThunk("dashboard/fetchStats", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard stats")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch dashboard stats")
  }
})

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload
        state.loading = false
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default dashboardSlice.reducer
