/**
 * Encapsulates chrome event system using reactive streams (observables) and functions.
 * This module exports functions to trigger events and observales to be consumed.
 */
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { IStageBarState } from './types'

export enum GoCDEventType {
    StageBarChanged = 'StageBarChanged',
}

/**
 * Triggers an event using the chrome runtime
 *
 * @param event
 */
const triggerEvent = (event: GoCDEvent) => {
    chrome.runtime.sendMessage(undefined, event)
}

/**
 * Trigger a StageBarChanged event
 *
 * @param stageBar
 */
export const triggerStageBarChanged = (stageBar: IStageBarState) => {
    triggerEvent({
        type: GoCDEventType.StageBarChanged,
        data: stageBar,
    })
}

// Observable that represents all events. Listen to all event using the chrome runtime.
export const events$ = new Observable<GoCDEvent>(subscriber => {
    chrome.runtime.onMessage.addListener(event => {
        subscriber.next(event)
    })
})

// Observable that represents changes in the stage bars.
export const stageBarChanges$ = events$.pipe(
    filter(event => event.type === GoCDEventType.StageBarChanged)
)

// Types definitions for this module
interface IGoCDEvent<T> {
    type: GoCDEventType
    data: T
}
export interface IStageBarChanged extends IGoCDEvent<IStageBarState> {
    type: typeof GoCDEventType.StageBarChanged
}
export type GoCDEvent = IStageBarChanged
