import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Project {
  _id: string
  title: string
  category: string
  description: string
  image: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface ProjectsState {
  projects: Project[]
  loading: boolean
  error: string | null
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
}

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch projects")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to fetch projects")
  }
})

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project: Omit<Project, "_id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to create project")
    }
  },
)

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (
    { id, project, index }: { id: string; project: Omit<Project, "_id" | "createdAt" | "updatedAt">; index?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to update project")
      }

      const data = await response.json()
      return { data, index }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Failed to update project")
    }
  },
)

export const deleteProject = createAsyncThunk("projects/deleteProject", async (id: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to delete project")
    }

    return id
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Failed to delete project")
  }
})

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload
        state.loading = false
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload)
        state.loading = false
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { data, index } = action.payload
        if (index !== undefined) {
          state.projects[index] = data
        } else {
          const projectIndex = state.projects.findIndex((p) => p._id === data._id)
          if (projectIndex !== -1) {
            state.projects[projectIndex] = data
          }
        }
        state.loading = false
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project._id !== action.payload)
        state.loading = false
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default projectsSlice.reducer
