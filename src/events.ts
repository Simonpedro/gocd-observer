import { StageBar } from "./types";

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