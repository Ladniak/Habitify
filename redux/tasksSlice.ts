import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: number | null;
  completed: boolean;
  createdAt?: number | null;
  updatedAt?: number | null;
}

export interface TaskInput {
  title: string;
  description?: string;
  category?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: number | null;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  selectedTask: Task | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      completed: data.completed,
      createdAt: data.createdAt?.toMillis() || null,
    } as Task;
  });
});

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (id: string) => {
    const snap = await getDoc(doc(db, "tasks", id));
    if (!snap.exists()) throw new Error("Task not found");
    const data = snap.data();
    return {
      id: snap.id,
      title: data?.title || "",
      description: data?.description || "",
      category: data?.category || "",
      priority: data?.priority || "medium",
      dueDate: data?.dueDate?.toMillis() || null,
      completed: data?.completed || false,
      createdAt: data?.createdAt?.toMillis() || null,
      updatedAt: data?.updatedAt?.toMillis() || null,
    } as Task;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskInput: TaskInput) => {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...taskInput,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    const newDoc = await getDoc(docRef);
    const data = newDoc.data();
    return {
      id: newDoc.id,
      title: data?.title || "",
      description: data?.description || "",
      category: data?.category || "",
      priority: data?.priority || "medium",
      dueDate: data?.dueDate?.toMillis() || null,
      completed: data?.completed || false,
      createdAt: data?.createdAt?.toMillis() || null,
      updatedAt: data?.updatedAt?.toMillis() || null,
    } as Task;
  }
);

export const toggleTaskStatus = createAsyncThunk(
  "tasks/toggleTaskStatus",
  async (task: Task) => {
    const updated = { ...task, completed: !task.completed };
    await updateDoc(doc(db, "tasks", task.id), {
      completed: updated.completed,
    });
    return updated;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching tasks";
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
        if (state.selectedTask?.id === action.payload.id)
          state.selectedTask = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        if (state.selectedTask?.id === action.payload)
          state.selectedTask = null;
      });
  },
});

export default tasksSlice.reducer;
