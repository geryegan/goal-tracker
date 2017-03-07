import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { TASK_UPDATE, TASK_CREATE, TASKS_FETCH_SUCCESS } from './types';

export const taskUpdate = ({ prop, value }) => {
    return {
        type: TASK_UPDATE,
        payload: { prop, value }
    };
};

export const taskCreate = ({ title, status }) => {
    const { currentUser } = firebase.auth();
    //redux thunk werkaround
    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/tasks`)
         .push({ title, status })
          .then(() => {
              dispatch({ type: TASK_CREATE });
              Actions.tasks({ type: 'reset' });
            }
          );
    };
};

export const tasksFetch = () => {
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/tasks`)
         .on('value', snapshot => {
             dispatch({
                 type: TASKS_FETCH_SUCCESS,
                 payload: snapshot.val()
             });
         });
    };
};