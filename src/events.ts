import { StageBar } from "./types";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

export enum GoCDEventType {
    StageBarChanged = "StageBarChanged"
}

interface GoCDEventInterface<T> {
    type: GoCDEventType
    data: T
}

export interface StageBarChanged extends GoCDEventInterface<StageBar> {
    type: typeof GoCDEventType.StageBarChanged
}

export type GoCDEvent = StageBarChanged

const triggerEvent = (event: GoCDEvent) => {
    chrome.runtime.sendMessage(undefined, event)
}

export const triggerStageBarChanged = (stageBar: StageBar) => {
    triggerEvent({
        type: GoCDEventType.StageBarChanged,
        data: stageBar
    })
}

export const events$ = new Observable<GoCDEvent>(subscriber => {
    
    chrome.runtime.onMessage.addListener((event) => {
        subscriber.next(event)
    });

})

export const stageBarChanges$ = events$.pipe(filter(e => e.type === GoCDEventType.StageBarChanged))