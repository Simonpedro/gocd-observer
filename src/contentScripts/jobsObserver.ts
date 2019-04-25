import { Observable } from 'rxjs'
import {
    distinctUntilChanged,
    groupBy,
    map,
    mergeAll,
    skip,
} from 'rxjs/operators'
import { triggerJobChanged } from '../events'
import getGoCDContentWrapper from '../lib/getGoCDContentWrapper'
import getJobsFromContainer from '../lib/getJobsFromContainer'
import { IJob } from '../types'

const jobs$ = new Observable<IJob[]>(subscriber => {
    const nodeContentWrapper = getGoCDContentWrapper()
    const initialJobs = getJobsFromContainer(nodeContentWrapper)

    const mutationObserver = new MutationObserver(() => {
        const jobs = getJobsFromContainer(nodeContentWrapper)
        subscriber.next(jobs)
    })

    mutationObserver.observe(nodeContentWrapper, {
        subtree: true,
        childList: true,
    })

    subscriber.next(initialJobs)
})

const job$: Observable<IJob> = jobs$.pipe(mergeAll())

const jobByName$ = job$.pipe(
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

jobByName$.forEach(g => {
    g.subscribe(s => {
        triggerJobChanged(s)
    })
})
