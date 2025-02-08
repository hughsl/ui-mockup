import React, { useState } from 'react';

function TaskCreation() {
  const [taskTitle, setTaskTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating task:', {
      title: taskTitle,
      assignee,
      deadline
    });
    setTaskTitle('');
    setAssignee('');
    setDeadline('');
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Create / Assign Task</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskCreation;
