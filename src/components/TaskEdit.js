import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Picker, Text } from 'react-native';
import { Button } from './common';
import { Input, Card, CardSection, } from './gridercommon';
import { taskUpdate, taskSave } from '../actions';
import DayPicker from './DayPicker';

class TaskEdit extends Component {
    componentWillMount() {
      _.each(this.props.task, (value, prop) => {
        this.props.taskUpdate({ prop, value });
      });
    }
    onButtonPress() {
        const { title, status, days } = this.props;
        this.props.taskSave({ 
            title,
            status,
            days,
            uid: this.props.task.uid });
    }
    render() {
        return (
            <View style={styles.container}>
                <Card>
                    <CardSection>
                        <Input
                        placeholderTextColor={'#FFF'}
                        placeholder='Add a Task!' 
                        value={this.props.title}
                        onChangeText={value => this.props.taskUpdate({ prop: 'title', value })}
                        label='Task Title'
                        />
                    </CardSection>

                    <CardSection >
                        <Text style={styles.pickerLabelStyle}>Status</Text>
                        <Picker 
                        selectedValue={this.props.status}
                        onValueChange={value => this.props.taskUpdate({ prop: 'status', value })}
                        style={{ flex: 1 }}
                        >
                            <Picker.Item label='Incomplete' value='Incomplete' />
                            <Picker.Item label='Complete' value='Complete' />
                        </Picker>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Edit Task
                        </Button>
                    </CardSection>
                    <CardSection>
                        <DayPicker />
                    </CardSection>
                </Card>
            </View>
            
        );
    }
}

const styles = {
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        color: '#FFF'
    },
    container: {
          flex: 1,
          backgroundColor: '#4CAF50'
    }
};


const mapStateToProps = (state) => {
    const { title, status, days } = state.tasksForm;
    return { title, status, days };
};

export default connect(mapStateToProps, { taskUpdate, taskSave })(TaskEdit);
