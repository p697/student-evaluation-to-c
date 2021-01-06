const INITIAL_STATE = {
  name: '',
  sno: '',
  clazz: '',
  isOpen: false,
  openTime: '',
};

export default function (state = INITIAL_STATE, action) {
  const { payload } = action

  switch (action.type) {

    case 'update_checkInfo':
      return {
        ...state,
        ...payload,
      }

    case 'empty_checkInfo':
      return INITIAL_STATE
      
    default:
      return state;
  }
}
