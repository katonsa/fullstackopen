const reducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterAnecdotes = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}

export default reducer