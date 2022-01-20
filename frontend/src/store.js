import {createStore} from "redux"

const selectOpt = text => {
  return {
    type: "option",
    text
  }
}

const reducer = (state = ['hello'], action) => {
  console.log(action)
  switch (action.type) {
    case state:
      return ['hello']
    case state:
      return ['hello']
  }
}

export const actionCreators = {
  selectOpt,
}

const store = createStore(reducer)
export default store;