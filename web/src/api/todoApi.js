// src/api/todoApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchTasks = async () => (await api.get("/tasks")).data.data;
export const addTask    = async (title) => (await api.post("/tasks", { title })).data.data;
export const updateTask = async (id) => (await api.post(`/tasks/${id}/complete`)).data.data;
