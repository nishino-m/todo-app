import { fetchTasks, addTask, updateTask } from "../api/todoApi.js";

export const todo = (root) => {
  const h1 = document.createElement("h1");
  h1.textContent = "My Tasks";

  const input = document.createElement("input");
  input.placeholder = "Type a new task...";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Task";

  const ul = document.createElement("ul");

  root.appendChild(h1);
  root.appendChild(input);
  root.appendChild(addBtn);
  root.appendChild(ul);

  addBtn.addEventListener("click", async () => {
    const title = input.value.trim();
    if (!title) return;
    try {
      const newTask = await addTask(title);
      appendTask(ul, newTask);
      input.value = "";
    } catch (err) {
      console.error("タスク追加に失敗:", err);
    }
  });

  // 初期ロード
  (async () => {
    try {
      const tasks = await fetchTasks();
      tasks.forEach((task) => appendTask(ul, task));
    } catch (err) {
      console.error("タスク取得に失敗:", err);
    }
  })();
}

const appendTask = (ul, task) => {
  const li = document.createElement("li");
 

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";

  const span = document.createElement("span");
  span.textContent = task.title;
  if (task.done) span.style.textDecoration = "line-through";

  completeBtn.addEventListener("click", async () => {
    try {
      const updated = await updateTask(task.id, true);

      if (updated.done) {
        li.remove();
      }
    } catch (err) {
      console.error("完了更新に失敗:", err);
    }
  });

  li.appendChild(span);
  li.appendChild(completeBtn);
  ul.appendChild(li);
}
