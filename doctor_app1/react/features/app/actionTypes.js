import { Symbol } from '../base/react';

/**
 * The type of the actions which signals that a specific App will mount (in the
 * terms of React).
 *
 * {
 *     type: APP_WILL_MOUNT,
 *     app: App
 * }
 */
export const APP_WILL_MOUNT = Symbol('APP_WILL_MOUNT');

/**
 * The type of the actions which signals that a specific App will unmount (in
 * the terms of React).
 *
 * {
 *     type: APP_WILL_UNMOUNT,
 *     app: App
 * }
 */
export const APP_WILL_UNMOUNT = Symbol('APP_WILL_UNMOUNT');

/*
 * 视频会议状态变更
 */
export const MEETING_STATUS_WILL_CHANGE = Symbol('MEETING_STATUS_WILL_CHANGE');
