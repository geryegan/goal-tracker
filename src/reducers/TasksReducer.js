import { TASK_UPDATE, TASK_CREATE, TASKS_FETCH_SUCCESS, TASK_SAVE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    title: '',
    status: '',
    days: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false  
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TASK_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case TASK_CREATE:
            return { ...INITIAL_STATE };
        case TASKS_FETCH_SUCCESS:
            return { ...state };
        case TASK_SAVE_SUCCESS:
            return { ...INITIAL_STATE };
        default:
            return { ...state };
    }
};
