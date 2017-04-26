import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import TasksHome from './components/TasksHome';
import CreateTask from './components/CreateTask';
import LoginForm from './components/LoginForm';
import TasksByDay from './components/TasksByDayHome';
import TaskEdit from './components/TaskEdit';

const RouterComponent = () => {
  const { transparentBorder, navBarStyle, textStyle } = styles;
  return (
    <Router
      navigationBarStyle={transparentBorder} 
      sceneStyle={{ borderWidth: 0, paddingTop: 65 }}
      barButtonIconStyle={{ tintColor: '#FFF' }}
    >
      <Scene key="auth">
        <Scene 
        navigationBarStyle={navBarStyle} 
        titleStyle={textStyle}
        key="login" 
        component={LoginForm} 
        title="GoalTracker" 
        />
      </Scene>

      <Scene key='main' navigationBarStyle={navBarStyle} titleStyle={textStyle}>
        <Scene navigationBarStyle={navBarStyle} key="tasks" component={TasksHome} title="Tasks" />
        <Scene 
          navigationBarStyle={navBarStyle} 
          key="createTask" 
          component={CreateTask} 
          title="Create Task" 
        />
        <Scene 
          navigationBarStyle={navBarStyle} 
          key="navTaskEdit" 
          component={TaskEdit} 
          title="Edit Task" 
        />
        <Scene 
        navigationBarStyle={navBarStyle} 
        key="tasksByDay" 
        component={TasksByDay} 
        title="Today's Tasks" 
        />
      </Scene>

    </Router>
  );
};

const styles = {
  transparentBorder: {  
      borderBottomColor: 'transparent', 
      borderBottomWidth: 65
  },
  navBarStyle: {
    backgroundColor: '#4CAF50'
  },
  textStyle: { 
    backgroundColor: '#4CAF50', 
    color: '#FFF' 
  }
};

export default RouterComponent;
