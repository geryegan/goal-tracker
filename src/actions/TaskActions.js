import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { TASK_UPDATE, TASK_CREATE, TASKS_FETCH_SUCCESS, TASK_EDIT_SUCCESS, TASK_SAVE_SUCCESS } from './types';

export const taskUpdate = ({ prop, value }) => {
    return {
        type: TASK_UPDATE,
        payload: { prop, value }
    };
};

export const taskCreate = ({ title, status, days }) => {
    const { currentUser } = firebase.auth();
    //redux thunk werkaround
    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/tasks`)
         .push({ title, status, days })
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

export const taskEdit = ({ title, status, days, uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
     .set({ title, status, days })
      .then(() => {
          dispatch({ type: TASK_EDIT_SUCCESS });
          Actions.tasks({ type: 'reset' });          
      });
    };
};

export const taskSave = ({ title, status, days, uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
     .set({ title, status, days })
      .then(() => {
              dispatch({ type: TASK_SAVE_SUCCESS });
              Actions.tasks({ type: 'reset' });        
      });
    };
};
export const taskRemove = ({ uid }) => {
    const { currentUser } = firebase.auth();
    return () => {
    firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
     .remove()
      .then(() => console.log('removed!'));
    };
};
