const INITIAL_STATE = {
  matrix: {},
  translated: [],
};

export default function (state = INITIAL_STATE, action) {
  const { payload } = action

  switch (action.type) {

    case 'update_matrix':
      return {
        ...state,
        matrix: {
          ...state.matrix,
          ...payload
        }
      }

    case 'empty_matrix':
      return INITIAL_STATE
      
    default:
      return state;
  }
}
