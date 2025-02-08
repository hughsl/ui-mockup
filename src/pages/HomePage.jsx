import React, { useState, useEffect } from 'react';
import logo from '../assets/site-logo.png';
import userIcon from '../assets/user-icon.png';

// hard-coded data for demo
const projectsData = [
  {
    name: 'Project 1',
    members: ['Member A', 'Member B', 'Member C', 'Member D', 'Member E'],
    tasksToDo: [
      {
        name: 'Task1',
        description: 'Task1Description',
        deadline: '2025-02-12',
        members: ['Member A', 'Member C']
      },
      {
        name: 'Task2',
        description: 'Task2Description',
        deadline: '2025-02-15',
        members: ['Member B']
      },
      {
        name: 'Task3',
        description: 'Task3Description',
        deadline: '2025-02-18',
        members: ['Member A', 'Member D']
      },
      {
        name: 'Task4',
        description: 'Task4Description',
        deadline: '2025-02-22',
        members: ['Member C', 'Member E']
      },
      {
        name: 'Task5',
        description: 'Task5Description',
        deadline: '2025-02-28',
        members: ['Member B', 'Member D', 'Member E']
      }
    ],
    tasksCompleted: [
      {
        name: 'Task6',
        description: 'Task6Description',
        deadline: '2025-02-07',
        members: ['Member A']
      },
      {
        name: 'Task7',
        description: 'Task7Description',
        deadline: '2025-02-09',
        members: ['Member B', 'Member C']
      },
      {
        name: 'Task8',
        description: 'Task8Description',
        deadline: '2025-02-10',
        members: ['Member D', 'Member E']
      }
    ]
  },
  {
    name: 'Project 2',
    members: ['Member F', 'Member G', 'Member H', 'Member I', 'Member J'],
    tasksToDo: [
      {
        name: 'Task1',
        description: 'Task1Description',
        deadline: '2025-02-13',
        members: ['Member F', 'Member H']
      },
      {
        name: 'Task2',
        description: 'Task2Description',
        deadline: '2025-02-16',
        members: ['Member G']
      },
      {
        name: 'Task3',
        description: 'Task3Description',
        deadline: '2025-02-20',
        members: ['Member I', 'Member J']
      }
    ],
    tasksCompleted: [
      {
        name: 'Task6',
        description: 'Task6Description',
        deadline: '2025-02-07',
        members: ['Member G']
      },
      {
        name: 'Task7',
        description: 'Task7Description',
        deadline: '2025-02-08',
        members: ['Member I', 'Member J']
      },
      {
        name: 'Task8',
        description: 'Task8Description',
        deadline: '2025-02-12',
        members: ['Member F', 'Member H']
      },
      {
        name: 'Task9',
        description: 'Task9Description',
        deadline: '2025-02-14',
        members: ['Member G', 'Member I']
      }
    ]
  },
  {
    name: 'Project 3',
    members: ['Member K', 'Member L', 'Member M', 'Member N', 'Member O'],
    tasksToDo: [
      {
        name: 'Task1',
        description: 'Task1Description',
        deadline: '2025-02-10',
        members: ['Member K']
      },
      {
        name: 'Task2',
        description: 'Task2Description',
        deadline: '2025-02-15',
        members: ['Member L', 'Member N']
      },
      {
        name: 'Task3',
        description: 'Task3Description',
        deadline: '2025-02-20',
        members: ['Member M', 'Member O']
      },
      {
        name: 'Task4',
        description: 'Task4Description',
        deadline: '2025-02-25',
        members: ['Member N']
      },
      {
        name: 'Task5',
        description: 'Task5Description',
        deadline: '2025-02-28',
        members: ['Member L', 'Member K']
      },
      {
        name: 'Task6',
        description: 'Task6Description',
        deadline: '2025-03-05',
        members: ['Member O']
      }
    ],
    tasksCompleted: [
      {
        name: 'Task7',
        description: 'Task7Description',
        deadline: '2025-02-07',
        members: ['Member M']
      },
      {
        name: 'Task8',
        description: 'Task8Description',
        deadline: '2025-02-09',
        members: ['Member N', 'Member K']
      },
      {
        name: 'Task9',
        description: 'Task9Description',
        deadline: '2025-02-11',
        members: ['Member L', 'Member O']
      },
      {
        name: 'Task10',
        description: 'Task10Description',
        deadline: '2025-02-14',
        members: ['Member M']
      }
    ]
  }
];

function HomePage() {
  // Which project is selected
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);

  // Task selection states
  const [selectedTask, setSelectedTask] = useState(null); // the actual task object
  // 'todo' or 'completed' or null
  const [selectedTaskCategory, setSelectedTaskCategory] = useState(null);

  // Hover states for projects
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(-1);
  // Hover states for tasks (To Do)
  const [hoveredTodoIndex, setHoveredTodoIndex] = useState(-1);
  // Hover states for tasks (Completed)
  const [hoveredCompletedIndex, setHoveredCompletedIndex] = useState(-1);

  // *** NEW STATE FOR TASK CREATION ***
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  // Which list is being created into: 'todo' or 'completed'
  const [creatingCategory, setCreatingCategory] = useState(null);

  // We'll keep a small form state for the new task
  const [newTaskData, setNewTaskData] = useState({
    name: '',
    description: '',
    deadline: '',
    members: []
  });

  // The currently selected project object, or null if none selected
  const selectedProject =
    selectedProjectIndex >= 0 ? projectsData[selectedProjectIndex] : null;

  // Ensure the page can occupy the entire browser window
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100%';

    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.height = '';
    };
  }, []);

  // Handler for selecting a project
  const handleProjectClick = (index) => {
    setSelectedProjectIndex(index);
    // Reset any selected task when changing projects
    setSelectedTask(null);
    setSelectedTaskCategory(null);

    // Also reset creation state
    setIsCreatingTask(false);
    setCreatingCategory(null);
  };

  // Handler for selecting a task in "to do" or "completed"
  const handleTaskClick = (taskObj, category, index) => {
    setSelectedTask(taskObj);
    setSelectedTaskCategory(category);

    // Close create mode if it was open
    setIsCreatingTask(false);
    setCreatingCategory(null);

    // Sync hover states
    if (category === 'todo') {
      setHoveredTodoIndex(index);
      setHoveredCompletedIndex(-1);
    } else {
      setHoveredCompletedIndex(index);
      setHoveredTodoIndex(-1);
    }
  };

  // *** CLICK HANDLER FOR "+ Add Task" BUTTON ***
  const handleAddTaskClick = (category) => {
    setIsCreatingTask(true);
    setCreatingCategory(category);

    // Reset selected task
    setSelectedTask(null);
    setSelectedTaskCategory(null);

    // Reset the newTaskData
    setNewTaskData({
      name: '',
      description: '',
      deadline: '',
      members: []
    });
  };

  // *** STYLED "ADD TASK" BUTTON ***
  const renderAddTaskButton = (category) => {
    const isSelected = isCreatingTask && creatingCategory === category;

    return (
      <div
        onClick={() => handleAddTaskClick(category)}
        style={{
          position: 'relative',
          padding: '0.75rem',
          margin: '0.5rem 0',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          textAlign: 'center',
          transition: 'background-color 0.3s',
          color: '#777', // lighter grey text
          backgroundColor: isSelected ? '#e0e0e0' : 'transparent'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e0e0e0';
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '5px',
              backgroundColor: 'black'
            }}
          />
        )}
        + Add Task
      </div>
    );
  };

  // *** FORM HANDLERS ***
  const handleFormChange = (field, value) => {
    setNewTaskData((prev) => ({ ...prev, [field]: value }));
  };

  // For handling "button-like" member selection
  const handleToggleMember = (member) => {
    setNewTaskData((prev) => {
      let updatedMembers = [...prev.members];
      if (updatedMembers.includes(member)) {
        // remove it
        updatedMembers = updatedMembers.filter((m) => m !== member);
      } else {
        // add it
        updatedMembers.push(member);
      }
      return { ...prev, members: updatedMembers };
    });
  };

  const handleCreateTask = () => {
    if (!selectedProject) return;

    const newTask = {
      name: newTaskData.name || 'New Task',
      description: newTaskData.description || '',
      deadline: newTaskData.deadline || '',
      members: newTaskData.members || []
    };

    if (creatingCategory === 'todo') {
      selectedProject.tasksToDo.push(newTask);
    } else {
      selectedProject.tasksCompleted.push(newTask);
    }

    // Force a "refresh" so the UI updates
    projectsData[selectedProjectIndex] = { ...selectedProject };

    // Reset creation state
    setIsCreatingTask(false);
    setCreatingCategory(null);

    // Optionally, select the newly created task
    setSelectedTask(newTask);
    setSelectedTaskCategory(creatingCategory);
  };

  const handleCancelCreate = () => {
    setIsCreatingTask(false);
    setCreatingCategory(null);
    setNewTaskData({ name: '', description: '', deadline: '', members: [] });
  };

  // *** STYLE HELPERS FOR INPUTS ***
  const inputStyle = {
    backgroundColor: '#f0f0f0',
    border: 'none',
    outline: 'none',
    width: '100%',
    padding: '0.5rem',
    marginTop: '0.3rem',
    transition: 'background-color 0.3s',
    resize: 'none'
  };

  const handleInputFocus = (e) => {
    e.currentTarget.style.backgroundColor = '#e0e0e0';
  };

  const handleInputBlur = (e) => {
    e.currentTarget.style.backgroundColor = '#f0f0f0';
  };

  // *** STYLE HELPERS FOR BUTTONS ***
  const buttonStyle = {
    backgroundColor: '#ddd',
    border: 'none',
    padding: '0.75rem 1rem',
    marginRight: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    borderRadius: '0px'
  };

  // *** RENDER CREATE TASK FORM OR TASK DETAILS ***
  const renderRightColumn = () => {
    // If creating a task => show the form
    if (isCreatingTask && selectedProject) {
      return (
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Create a New Task
          </h2>

          {/* TASK NAME */}
          <div style={{ marginBottom: '1rem' }}>
            <strong>Name:</strong>
            <br />
            <input
              type="text"
              style={inputStyle}
              value={newTaskData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Task name"
            />
          </div>

          {/* TASK DESCRIPTION (auto-growing textarea) */}
          <div style={{ marginBottom: '1rem' }}>
            <strong>Description:</strong>
            <br />
            <textarea
              style={inputStyle}
              value={newTaskData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="Task description"
              rows={1}
              onInput={(e) => {
                // Auto-grow
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>

          {/* DEADLINE */}
          <div style={{ marginBottom: '1rem' }}>
            <strong>Deadline:</strong>
            <br />
            <input
              type="text"
              style={inputStyle}
              value={newTaskData.deadline}
              onChange={(e) => handleFormChange('deadline', e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="e.g. 2025-03-10"
            />
          </div>

          {/* ASSIGN MEMBERS */}
          <div style={{ marginBottom: '1rem' }}>
            <strong>Assign Members:</strong>
            <div style={{ marginTop: '0.5rem' }}>
              {selectedProject.members.map((member) => {
                const isSelected = newTaskData.members.includes(member);
                return (
                  <div
                    key={member}
                    onClick={() => handleToggleMember(member)}
                    style={{
                      padding: '0.5rem',
                      marginBottom: '0.25rem',
                      borderRadius: '0px',
                      transition: 'background-color 0.3s',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#bbb' : '#ddd',
                      fontWeight: isSelected ? 'bold' : 'normal',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#ccc';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.backgroundColor = '#ddd';
                      }
                    }}
                  >
                    {member}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CREATE / CANCEL BUTTONS */}
          <div>
            <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#bbb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
              onClick={handleCreateTask}
            >
              Create Task
            </button>
            <button
              style={buttonStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#bbb')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ddd')}
              onClick={handleCancelCreate}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    // If we have a selected task => show details
    if (selectedTask) {
      return (
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Task Details
          </h2>
          <h3>{selectedTask.name}</h3>
          <p>
            <strong>Description:</strong> {selectedTask.description}
          </p>
          <p>
            <strong>Deadline:</strong> {selectedTask.deadline}
          </p>
          <p>
            <strong>Members:</strong>{' '}
            {selectedTask.members && selectedTask.members.length > 0 ? (
              <ul style={{ marginLeft: '1rem' }}>
                {selectedTask.members.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            ) : (
              'None assigned'
            )}
          </p>
        </div>
      );
    }

    // Otherwise => "No task selected..."
    return <p style={{ fontStyle: 'italic' }}>No task selected...</p>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Banner */}
      <div
        style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: '#333',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
        }}
        >
        <img src={logo} alt="GroupGrade Logo" style={{ height: '40px', verticalAlign: 'middle' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>GroupGrade</span>
        <img
            src={userIcon}
            alt="User Icon"
            style={{
            height: '45px',
            position: 'absolute',
            right: '20px',
            cursor: 'pointer'
            }}
        />
      </div>


      {/* Main Content: 4 Columns */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* COLUMN 1: Projects (25%) */}
        <div
          style={{
            width: '25%',
            backgroundColor: '#f5f5f5',
            padding: '1rem'
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Projects</h2>

          {projectsData.map((project, index) => {
            const isSelected = index === selectedProjectIndex;
            const isHovered = index === hoveredProjectIndex;

            return (
              <div
                key={project.name}
                onClick={() => handleProjectClick(index)}
                onMouseEnter={() => setHoveredProjectIndex(index)}
                onMouseLeave={() => setHoveredProjectIndex(-1)}
                style={{
                  position: 'relative',
                  padding: '1rem',
                  margin: '0.5rem 0',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  transition: 'background-color 0.3s',
                  backgroundColor: isHovered ? '#e0e0e0' : 'transparent'
                }}
              >
                {/* If selected, show black bar on the right */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: '5px',
                      backgroundColor: 'black'
                    }}
                  />
                )}
                {project.name}

                {/* Show members if this project is selected */}
                {isSelected && (
                  <div
                    style={{
                      marginTop: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 'normal',
                      textAlign: 'left'
                    }}
                  >
                    <strong>Members:</strong>
                    {project.members.map((member) => (
                      <div key={member} style={{ marginLeft: '1rem' }}>
                        - {member}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* COLUMN 2: Tasks To Do (25%) */}
        <div
          style={{
            width: '25%',
            backgroundColor: '#ffffff',
            padding: '1rem',
            borderRight: '1px solid #ddd'
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Tasks To Do</h2>
          {selectedProject ? (
            selectedProject.tasksToDo.length > 0 ? (
              selectedProject.tasksToDo.map((taskObj, index) => {
                const isSelected =
                  selectedTaskCategory === 'todo' && selectedTask === taskObj;
                const isHovered = index === hoveredTodoIndex;

                return (
                  <div
                    key={taskObj.name}
                    onClick={() => handleTaskClick(taskObj, 'todo', index)}
                    onMouseEnter={() => setHoveredTodoIndex(index)}
                    onMouseLeave={() => setHoveredTodoIndex(-1)}
                    style={{
                      position: 'relative',
                      padding: '0.75rem',
                      margin: '0.5rem 0',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      transition: 'background-color 0.3s',
                      backgroundColor: isHovered ? '#e0e0e0' : 'transparent'
                    }}
                  >
                    {/* Black bar if the task is selected */}
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: '5px',
                          backgroundColor: 'black'
                        }}
                      />
                    )}
                    {taskObj.name}

                    {/* If this task is selected, show assigned members below it */}
                    {isSelected && taskObj.members.length > 0 && (
                      <div
                        style={{
                          marginTop: '0.5rem',
                          fontSize: '0.9rem',
                          fontWeight: 'normal',
                          textAlign: 'left'
                        }}
                      >
                        <strong>Assigned:</strong>
                        {taskObj.members.map((m) => (
                          <div key={m} style={{ marginLeft: '1rem' }}>
                            - {m}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No tasks to do.</p>
            )
          ) : (
            <p style={{ fontStyle: 'italic' }}>Select a project...</p>
          )}

          {/* + Add Task button for "to do" */}
          {selectedProject && renderAddTaskButton('todo')}
        </div>

        {/* COLUMN 3: Completed Tasks (25%) */}
        <div
          style={{
            width: '25%',
            backgroundColor: '#ffffff',
            padding: '1rem',
            borderRight: '1px solid #ddd'
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Completed Tasks
          </h2>
          {selectedProject ? (
            selectedProject.tasksCompleted.length > 0 ? (
              selectedProject.tasksCompleted.map((taskObj, index) => {
                const isSelected =
                  selectedTaskCategory === 'completed' && selectedTask === taskObj;
                const isHovered = index === hoveredCompletedIndex;

                return (
                  <div
                    key={taskObj.name}
                    onClick={() => handleTaskClick(taskObj, 'completed', index)}
                    onMouseEnter={() => setHoveredCompletedIndex(index)}
                    onMouseLeave={() => setHoveredCompletedIndex(-1)}
                    style={{
                      position: 'relative',
                      padding: '0.75rem',
                      margin: '0.5rem 0',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      transition: 'background-color 0.3s',
                      backgroundColor: isHovered ? '#e0e0e0' : 'transparent'
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: '5px',
                          backgroundColor: 'black'
                        }}
                      />
                    )}
                    {taskObj.name}

                    {/* If this task is selected, show assigned members below it */}
                    {isSelected && taskObj.members.length > 0 && (
                      <div
                        style={{
                          marginTop: '0.5rem',
                          fontSize: '0.9rem',
                          fontWeight: 'normal',
                          textAlign: 'left'
                        }}
                      >
                        <strong>Assigned:</strong>
                        {taskObj.members.map((m) => (
                          <div key={m} style={{ marginLeft: '1rem' }}>
                            - {m}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No completed tasks yet.</p>
            )
          ) : (
            <p style={{ fontStyle: 'italic' }}>Select a project...</p>
          )}

          {/* + Add Task button for "completed" */}
          {selectedProject && renderAddTaskButton('completed')}
        </div>

        {/* COLUMN 4: Task Details or Task Creation Form (25%) */}
        <div style={{ width: '25%', padding: '1rem' }}>
          {selectedProject ? renderRightColumn() : <p>Please select a project</p>}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
