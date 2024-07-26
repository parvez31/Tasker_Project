import { useState } from "react";
import SearchBar from "./SearchBar";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

const defaultTask = {
  id: crypto.randomUUID(),
  title: "Learn React",
  description: "Learning React from Everywhere. 😍",
  tags: ["web", "react", "nextjs"],
  priority: "High",
  isFavorite: false,
};
const TaskBoard = () => {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editToUpdate, setEditToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setEditToUpdate(task);
    setShowAddModal(true);
  };

  const onCloseModal = () => {
    setShowAddModal(false);
    setEditToUpdate(null);
  };

  const handleDeleteTask = (taskId) => {
    console.log(taskId);
    const deleteTask = tasks.filter((task) => task.id !== taskId);
    setTasks(deleteTask);
  };

  const handleAllDeleteTask = () => {
    console.log("hI");
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFavorite = (taskId) => {
    // console.log(taskId);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTask = [...tasks];

    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;

    setTasks(newTask);
  };

  const handleSearch = (searchTerm) => {
    console.log(searchTerm);

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...filtered]);
  };

  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={handleAddEditTask}
            onClose={onCloseModal}
            editToUpdate={editToUpdate}
          />
        )}
        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onAddClick={() => setShowAddModal(true)}
              deleteAllTask={handleAllDeleteTask}
            />
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                editTask={handleEditTask}
                deleteTaskId={handleDeleteTask}
                isFav={handleFavorite}
              />
            ) : (
              <NoTaskFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskBoard;
