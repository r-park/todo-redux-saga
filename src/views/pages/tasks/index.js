import { List } from 'immutable';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { taskActions, getVisibleTasks } from 'src/core/tasks';
import TaskFilters from '../../components/task-filters';
import TaskForm from '../../components/task-form';
import TaskList from '../../components/task-list';


const TasksPage = ({createTask, location, removeTask, tasks, updateTask}) => {
  const { filter } = location.query;

  return (
    <div className="g-row">
      <div className="g-col">
        <TaskForm handleSubmit={createTask} />
      </div>

      <div className="g-col">
        <TaskFilters filter={filter} />
        <TaskList
          filter={filter}
          removeTask={removeTask}
          tasks={tasks}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
};

TasksPage.propTypes = {
  createTask: PropTypes.func.isRequired,
  filterTasks: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  removeTask: PropTypes.func.isRequired,
  tasks: PropTypes.instanceOf(List),
  updateTask: PropTypes.func.isRequired
};


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = state => ({
  tasks: getVisibleTasks(state)
});

const mapDispatchToProps = {
  createTask: taskActions.createTask,
  filterTasks: taskActions.filterTasks,
  removeTask: taskActions.removeTask,
  updateTask: taskActions.updateTask
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);
