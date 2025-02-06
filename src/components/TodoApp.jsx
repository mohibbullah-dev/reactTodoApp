import { useState } from "react";

const TodoApp = () => {
  // logic starts from here
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Please add a task!");
      return;
    }

    setTasks([...tasks, { id: Date.now(), text: newTask, isEditting: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const ToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditting: !task.isEditting } : task
      )
    );
  };
  const UpdateTask = (id, new_ask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: new_ask } : task))
    );
  };

  return (
    <div className="container flex justify-center items-center h-[100vh] m-auto bg-blue-950">
      <div className="w-lg bg-white p-5 flex flex-col rounded-md shadow-me">
        <h2 className="text-blue-400 font-bold text-5xl text-center">
          Todo-App
        </h2>

        <div className="py-2 px-4 mt-10 flex gap-2.5">
          <input
            className="flex-1 outline-none focus:outline-none
            py-2 px-4 focus:ring-2 focus:ring-blue-400 border-1 border-gray-300
            rounded-md text-md
            "
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
          />

          <button
            onClick={() => addTask()}
            className="py-2 px-4 outline-none border-none
              bg-blue-400 text-white rounded-md cursor-pointer hover:bg-blue-500 font-semibold"
          >
            Add task
          </button>
        </div>
        <div>
          <ul className="space-y-3 bg-white rounded-md p-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex py-4 px-4 gap-2.5 bg-amber-50   border-1 border-gray-300 rounded-md"
              >
                {task.isEditting ? (
                  <input
                    className="flex py-4 px-4 gap-2.5 bg-amber-50   border-1 border-gray-300 rounded-md"
                    type="text"
                    value={task.text}
                    onChange={(e) => UpdateTask(task.id, e.target.value)}
                  />
                ) : (
                  <span
                    className="flex-1 py-2 px-4 focus:outline-none
                     rounded-md transition cursor-pointer"
                  >
                    {task.text}
                  </span>
                )}

                <div className="flex gap-3">
                  <button
                    className="py-2 px-4 focus:outline-none bg-blue-400
           rounded-md text-white transition cursor-pointer
  hover:bg-blue-500 font-semibold"
                    onClick={() => ToggleTask(task.id)}
                  >
                    {task.isEditting ? "save" : "edit"}
                  </button>

                  <button
                    className="py-2 px-4 focus:outline-none rounded-md text-white 
      transition 
      cursor-pointer font-semibold bg-red-400 hover:bg-red-500"
                    onClick={() => deleteTask(task.id)}
                  >
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
