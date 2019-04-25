import { Observable } from 'rxjs'
import {
    distinctUntilChanged,
    groupBy,
    map,
    mergeAll,
    skip,
} from 'rxjs/operators'
import { triggerStageBarChanged } from '../events'
import getGoCDContentWrapper from '../lib/getGoCDContentWrapper'
import getStateBarsFromContainer from '../lib/getStateBarsFromContainer'
import { IStageBarState } from '../types'

const stageBars$ = new Observable<IStageBarState[]>(subscriber => {
    const nodeContentWrapper = getGoCDContentWrapper()
    const initialStageBars = getStateBarsFromContainer(nodeContentWrapper)

    const mutationObserver = new MutationObserver(() => {
        const stagesBars = getStateBarsFromContainer(nodeContentWrapper)
        subscriber.next(stagesBars)
    })

    mutationObserver.observe(nodeContentWrapper, {
        subtree: true,
        childList: true,
    })

    subscriber.next(initialStageBars)
})

const stageBar$: Observable<IStageBarState> = stageBars$.pipe(mergeAll())

const stateBarsByName$ = stageBar$.pipe(
    // Group by stage name
    groupBy(sb => sb.name),

    map(group =>
        group.pipe(
            // We are only interested in new states
            distinctUntilChanged((x, y) => x.state === y.state),
            // We are not interested in the initial state
            skip(1)
        )
    )
)

stateBarsByName$.forEach(g => {
    g.subscribe(s => {
        triggerStageBarChanged(s)
    })
})
