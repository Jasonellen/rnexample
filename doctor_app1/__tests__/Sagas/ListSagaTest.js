/* ***********************************************************
* Wiring Instructions
* To make this test work, you'll need to:
*  - Add a Fixture named getList to the
*    ./App/Services/FixtureApi file. You can just keep adding
*    functions to that file.
*************************************************************/

import FixtureAPI from '../../App/Services/FixtureApi'
import { call, put } from 'redux-saga/effects'
import { getList } from '../../App/Sagas/ListSaga'
import ListActions from '../../App/Redux/ListRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

it('first calls API', () => {
  const step = stepper(getList(FixtureAPI, {data: 'taco'}))
  // first yield is the API
  expect(step()).toEqual(call(FixtureAPI.getList, 'taco'))
})

it('success path', () => {
  const response = FixtureAPI.getList('taco')
  const step = stepper(getList(FixtureAPI, {data: 'taco'}))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ListActions.listSuccess(21)))
})

it('failure path', () => {
  const response = {ok: false}
  const step = stepper(getList(FixtureAPI, {data: 'taco'}))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ListActions.listFailure()))
})
