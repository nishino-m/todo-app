import { fetchTasks, addTask, updateTask } from "../api/todoApi.js";

export const todo = (root) => {
    const h1 = document.createElement("h1");
    h1.textContent = "My Tasks";
    
    const ul = document.createElement("ul");
    root.appendChild(h1);
    root.appendChild(input);
    root.appendChild(addBtn);
    root.appendChild(ul);
    
    addBtn.addEventListener("click", async () => {
        const title = input.value.trim();
        if (!title) return;
        try {

        } catch (err) {
            console.error("タスク追加に失敗:", err);
        }
    });
    
    (async () => {
        try {
            tasks.forEach((task) => appendTask(ul, task));
        } catch (err) {

        }
    })();
};

const appendTask = (ul, task) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.margin = "4px 0";
    
    const completeBtn = document.createElement("button");
    
    const span = document.createElement("span");
    span.textContent = task.title;
    if (task.done) span.style.textDecoration = "line-through";
    

  li.appendChild(span);
  li.appendChild(completeBtn);
  ul.appendChild(li);
}
