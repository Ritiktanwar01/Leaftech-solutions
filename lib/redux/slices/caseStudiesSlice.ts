import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


interface CaseStudy {
  _id: string
  title: string
  client: string
  industry: string
  overview: string
  challenge: string
  solution: string
  results: string
  testimonial?: string
  testimonialAuthor?: string
  testimonialRole?: string
  images: string[]
  technologies: string[]
  timeline: string
  teamSize: number
  metrics: {
    label: string
    value: string
    description?: string
  }[]
  featured: boolean
  status: string
  createdAt: string
  updatedAt: string
}

interface CaseStudiesState {
  caseStudies: CaseStudy[]
  loading: boolean
  error: string | null
}

const initialState: CaseStudiesState = {
  caseStudies: [],
  loading: false,
  error: null,
}

export const fetchCaseStudies = createAsyncThunk("caseStudies/fetchCaseStudies", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/case-studies`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch case studies")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch case studies")
  }
})

export const createCaseStudy = createAsyncThunk(
  "caseStudies/createCaseStudy",
  async (caseStudy: Omit<CaseStudy, "_id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/case-studies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseStudy),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to create case study")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to create case study")
    }
  },
)

export const updateCaseStudy = createAsyncThunk(
  "caseStudies/updateCaseStudy",
  async (
    {
      id,
      caseStudy,
      index,
    }: { id: string; caseStudy: Omit<CaseStudy, "_id" | "createdAt" | "updatedAt">; index?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/case-studies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(caseStudy),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to update case study")
      }

      const data = await response.json()
      return { data, index }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update case study")
    }
  },
)

export const deleteCaseStudy = createAsyncThunk(
  "caseStudies/deleteCaseStudy",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/case-studies/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete case study")
      }

      return id
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to delete case study")
    }
  },
)

export const fetchCaseStudyById = createAsyncThunk(
  "caseStudies/fetchCaseStudyById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/case-studies/${id}`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch case study")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch case study")
    }
  },
)

const caseStudiesSlice = createSlice({
  name: "caseStudies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseStudies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.caseStudies = action.payload
        state.loading = false
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createCaseStudy.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCaseStudy.fulfilled, (state, action) => {
        state.caseStudies.push(action.payload)
        state.loading = false
      })
      .addCase(createCaseStudy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateCaseStudy.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCaseStudy.fulfilled, (state, action) => {
        const { data, index } = action.payload
        if (index !== undefined) {
          state.caseStudies[index] = data
        } else {
          const caseStudyIndex = state.caseStudies.findIndex((cs) => cs._id === data._id)
          if (caseStudyIndex !== -1) {
            state.caseStudies[caseStudyIndex] = data
          }
        }
        state.loading = false
      })
      .addCase(updateCaseStudy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteCaseStudy.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCaseStudy.fulfilled, (state, action) => {
        state.caseStudies = state.caseStudies.filter((caseStudy) => caseStudy._id !== action.payload)
        state.loading = false
      })
      .addCase(deleteCaseStudy.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchCaseStudyById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCaseStudyById.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(fetchCaseStudyById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default caseStudiesSlice.reducer
