import React, { useState, useEffect } from 'react';
import logo from '../assets/site-logo.png';
import userIcon from '../assets/user-icon.png';

<link rel="icon" href="/favicon.ico"></link>

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
  // selected proj state
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(-1);

  // selected task state
  const [selectedTask, setSelectedTask] = useState(null); 

  const [selectedTaskCategory, setSelectedTaskCategory] = useState(null);

  // hover states projects
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(-1);
  // Hover states for tasks
  const [hoveredTodoIndex, setHoveredTodoIndex] = useState(-1);
  const [hoveredCompletedIndex, setHoveredCompletedIndex] = useState(-1);

  // task creation state
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  // new task category
  const [creatingCategory, setCreatingCategory] = useState(null);

  // new task data
  const [newTaskData, setNewTaskData] = useState({
    name: '',
    description: '',
    deadline: '',
    members: []
  });

  // selected project
  const selectedProject =
    selectedProjectIndex >= 0 ? projectsData[selectedProjectIndex] : null;

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

  // selecting project
  const handleProjectClick = (index) => {
    setSelectedProjectIndex(index);
    // reset selected task when changing proj
    setSelectedTask(null);
    setSelectedTaskCategory(null);

    // reset creation state
    setIsCreatingTask(false);
    setCreatingCategory(null);
  };

  // selecting task
  const handleTaskClick = (taskObj, category, index) => {
    setSelectedTask(taskObj);
    setSelectedTaskCategory(category);

    // close create task page on task click
    setIsCreatingTask(false);
    setCreatingCategory(null);

    // hover states
    if (category === 'todo') {
      setHoveredTodoIndex(index);
      setHoveredCompletedIndex(-1);
    } else {
      setHoveredCompletedIndex(index);
      setHoveredTodoIndex(-1);
    }
  };

  // add task button clicks
  const handleAddTaskClick = (category) => {
    setIsCreatingTask(true);
    setCreatingCategory(category);

    // deselect task
    setSelectedTask(null);
    setSelectedTaskCategory(null);

    // reset new task data
    setNewTaskData({
      name: '',
      description: '',
      deadline: '',
      members: []
    });
  };

  // add task button
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

  // new task form
  const handleFormChange = (field, value) => {
    setNewTaskData((prev) => ({ ...prev, [field]: value }));
  };

  // toggleable buttons to assign members
  const handleToggleMember = (member) => {
    setNewTaskData((prev) => {
      let updatedMembers = [...prev.members];
      if (updatedMembers.includes(member)) {
        updatedMembers = updatedMembers.filter((m) => m !== member);
      } else {
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

    projectsData[selectedProjectIndex] = { ...selectedProject };

    setIsCreatingTask(false);
    setCreatingCategory(null);

    // select newly created task
    setSelectedTask(newTask);
    setSelectedTaskCategory(creatingCategory);
  };

  const handleCancelCreate = () => {
    setIsCreatingTask(false);
    setCreatingCategory(null);
    setNewTaskData({ name: '', description: '', deadline: '', members: [] });
  };

  // new task input styles
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

  // butto styles
  const buttonStyle = {
    backgroundColor: '#ddd',
    border: 'none',
    padding: '0.75rem 1rem',
    marginRight: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    borderRadius: '0px'
  };

  // create new task form
  const renderRightColumn = () => {
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
                // text area expands when desc reaches new line
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

    // show details of selected task
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

    // no task selected
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


      {/* homepage - 4 Columns */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* COLUMN 1: projects */}
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
                {/* black bar beside selected project */}
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

                {/* dropdown to show members when selected */}
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

        {/* COLUMN 2: Tasks To Do */}
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
                    {/* black bar beside sleected task */}
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

                    {/* show assignbed members below selected task */}
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

          {/* add task button for "to do" */}
          {selectedProject && renderAddTaskButton('todo')}
        </div>

        {/* COLUMN 3: Completed Tasks */}
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

                    {/* show assigned members below when selected */}
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

          {/* add task button for "completed" */}
          {selectedProject && renderAddTaskButton('completed')}
        </div>

        {/* COLUMN 4: task details/creation form */}
        <div style={{ width: '25%', padding: '1rem' }}>
          {selectedProject ? renderRightColumn() : <p>Please select a project</p>}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
