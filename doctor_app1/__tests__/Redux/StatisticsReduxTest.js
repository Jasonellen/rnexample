import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/StatisticsRedux'

it('attempt', () => {
  const state = reducer(INITIAL_STATE, Actions.statisticsRequest('data'))

  expect(state.fetching).toBe(true)
})

it('success', () => {
  const state = reducer(INITIAL_STATE, Actions.statisticsSuccess('hi'))

  expect(state.payload).toBe('hi')
})

it('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.statisticsFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
})
