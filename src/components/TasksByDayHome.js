import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { View, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Task from './Task';
import { AlertModal, Button } from './common';
import { Card, CardSection } from './gridercommon';
import { tasksFetch } from '../actions';
import styles from '../styles/styles';

class TasksByDayHome extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      alertModalVisible: false
     };
  }
  componentWillMount() {
      this.props.tasksFetch();
      this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
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
  navToCalendar() {
    Actions.cal();
  }
  styleStatus() {
    let completedCount = 0;
    this.props.tasks.forEach(
      (task) => {
        if (task.status === 'Complete') {
          completedCount++;
        }
      }
    );
    if (completedCount === this.props.tasks.length && completedCount > 0) {
      return styles.congratulatory;
    } 
    return styles.standard;
  }
  styleStatusCont() {
    let completedCount = 0;
    this.props.tasks.forEach(
      (task) => {
        if (task.status === 'Complete') {
          completedCount++;
        }
      }
    );
    if (completedCount === this.props.tasks.length && completedCount > 0) {
      return styles.congratsContainer;
    } 
    return styles.container;
  }
  renderRow(task) {
      return <Task title={task.title} status={task.status} task={task} />;
  }

    render() {
        return (
      <View style={this.styleStatusCont()}>
        <Card style={this.styleStatusCont()}>
          <CardSection style={this.styleStatusCont()}>
                <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
                style={this.styleStatus()} 
                />
          </CardSection>

          <CardSection style={this.styleStatusCont()}>   
                  <Button onPress={this.navToCreateTask.bind(this)}>
                    Create Task
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
    const dayOfWeek = moment().format('dddd');
    const tasks = _.map(state.tasks, (val, uid) => {
      if (val.days[dayOfWeek]) {
        return { ...val, uid };
      }
    }).filter((val) => (val !== undefined));
    return { tasks };
};

export default connect(mapStateToProps, { tasksFetch })(TasksByDayHome);
