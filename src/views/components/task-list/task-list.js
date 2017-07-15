import React from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import TaskItem from '../task-item';

import './task-list.css';


const TaskList = ({removeTask, tasks, updateTask}) => {
  let taskItems = tasks.map((task, index) => {
    return (
      <TaskItem
        removeTask={removeTask}
        key={index}
        task={task}
        updateTask={updateTask}
      />
    );
  });

  return (
    <div className="task-list">
      {taskItems}
    </div>
  );
};

TaskList.propTypes = {
  removeTask: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(List),
  updateTask: PropTypes.func.isRequired
};


export default TaskList;
