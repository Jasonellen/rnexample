### Sagas Folder

It's important to note that when an action is dispatched to the store, the middleware first forwards the action to the reducers and then notifies the Sagas. This means that when you query the Store's State, you get the State after the action has been applied. However, this behavior is only guaranteed if all subsequent middlewares call next(action) synchronously. If any subsequent middleware calls next(action) asynchronously (which is unusual but possible), then the sagas will get the state from before the action is applied. Therefore it is recommended to review the source of each subsequent middleware to ensure it calls next(action) synchronously, or else ensure that redux-saga is the last middleware in the call chain.

https://redux-saga.github.io/redux-saga/docs/api/index.html#middleware-api
