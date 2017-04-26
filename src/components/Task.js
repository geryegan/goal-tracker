import React, { Component } from 'react';
import { Animated, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from './common';
import styles from '../styles/styles';
import { taskEdit, taskRemove } from '../actions';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         status: this.props.status,
         fadeAnim: new Animated.Value(0) 
        };
    }
    
    componentDidMount() {
        Animated.timing(this.state.fadeAnim, { toValue: 1 }).start();                
    }


    completeTask() {
     const { title, uid, days } = this.props.task;
        if (this.props.status === 'Complete') {
            this.props.taskEdit({ title, status: 'Incomplete', days, uid });
        } else if (this.props.status === 'Incomplete') {
            this.props.taskEdit({ title, status: 'Complete', days, uid });
            }
        }
    removeTask() {
     const { uid } = this.props.task;
        this.props.taskRemove({ uid });
        }
    buttonTextConditional() {
        if (this.props.status === 'Incomplete') {
            return 'Complete';
        } 
            return 'Incomplete';
    }
    render() {
        return (
        <Animated.View style={{ padding: 5, opacity: this.state.fadeAnim }}>
            <Text style={styles.welcome}> {this.props.title} </Text>
            <Text style={styles.welcome}> {this.props.status} </Text>
            <Text style={styles.welcome}> {this.props.days} </Text>
            <Button onPress={this.completeTask.bind(this)} >
                Tap to mark {this.buttonTextConditional()}
            </Button>
            <Button onPress={this.removeTask.bind(this)}>
                Delete Task
            </Button>
        </Animated.View>);
    }
}

export default connect(null, { taskEdit, taskRemove })(Task);
