import { AppNavigator } from '../../navigationController';

function navigation (state, action) {
    let nextState;
    switch (action.type) {
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
}

export default navigation