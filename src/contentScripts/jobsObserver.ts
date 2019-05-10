import { triggerJobChanged } from '../events'
import changesFromObjects from '../lib/changesFromObjects'
import getJobsFromContainer from '../lib/getJobsFromContainer'

console.log('Content script jobObserver injected')

const jobByName$ = changesFromObjects(
    getJobsFromContainer,
    job => job.name,
    (left, right) => left.state === right.state
)

jobByName$.forEach(g => {
    g.subscribe(s => {
        triggerJobChanged(s)
    })
})
