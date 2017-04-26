import React, { Component } from 'react';
import _ from 'lodash';
import { View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Task from './Task';
import { AlertModal, Button } from './common';
import { Card, CardSection } from './gridercommon';
import { tasksFetch } from '../actions';
import styles from '../styles/styles';

class TasksHome extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      alertModalVisible: false
     };
  }
  componentWillMount() {
      this.props.tasksFetch();
      this.createDataSource(this.props);
      console.log(this.props.tasks);
  }
  componentWillReceiveProps(nextProps) {
      //nextProps are the next set of props that this component will be rendered cloneWithRows
      //this.props is still the old set of props
      this.createDataSource(nextProps);
  }
  createDataSource({ tasks }) {
      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(tasks);
  }
  navToCreateTask() {
    Actions.createTask();
  }
  removeTask(index) {
    const tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({
      tasks
    });
  }
  closeModal() {
      this.setState({ alertModalVisible: false });
  }
  navToDayView() {
    Actions.tasksByDay();
  }
  renderRow(task) {
      return <Task title={task.title} status={task.status} task={task} />;
  }
    render() {
        return (
      <View style={styles.container}>
        <Card>
          <CardSection>
                <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                style={{ width: 300, height: 420, backgroundColor: '#4CAF50' }} 
                />
          </CardSection>

          <CardSection>   
                  <Button onPress={this.navToCreateTask.bind(this)}>
                    Create Task
                  </Button> 
                  <Button onPress={this.navToDayView.bind(this)}>
                    Today's Tasks
                  </Button>
          </CardSection>
                <AlertModal 
                  visible={this.state.alertModalVisible} 
                  modalText='Please add a task name!'
                  closeModal={this.closeModal.bind(this)}
                  closeText='OK'
                />
        </Card>
      </View>
        );
    }
}

const mapStateToProps = (state) => {
    const tasks = _.map(state.tasks, (val, uid) => {
        console.log('redux state.tasks', state.tasks);
        return { ...val, uid };
    });
    return { tasks };
};

export default connect(mapStateToProps, { tasksFetch })(TasksHome);
