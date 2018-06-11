import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/ListRedux'

it('attempt', () => {
  const state = reducer(INITIAL_STATE, Actions.listRequest('data'))

  expect(state.fetching).toBe(true)
})

it('success', () => {
  const state = reducer(INITIAL_STATE, Actions.listSuccess('hi'))

  expect(state.payload).toBe('hi')
})

it('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.listFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
})
