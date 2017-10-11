/**
 * Created by saman on 10/9/17.
 */


export const requireAuth = (store) => (nextState, replace) => {
  let isAuthenticated = store.getState().get('global').get('isAuthenticated')
  console.log(store.getState().get('language'))
  console.log(isAuthenticated)
  console.log(nextState)

  if (nextState.location.pathname === '/') {
    return
  }
  if (!isAuthenticated) {
    replace('/')
  }
}

export const requireNotAuth = (store) => (nextState, replace) => {
  let isAuthenticated = store.getState().get('global').get('isAuthenticated')
  console.log(store.getState().get('global'))
  console.log(replace)
  if (nextState.location.pathname === '/') {
    return
  }
  if (isAuthenticated) {
    replace('/')
  }

}
