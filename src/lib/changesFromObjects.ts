import { Observable } from 'rxjs'
import {
    distinctUntilChanged,
    groupBy,
    map,
    mergeAll,
    skip,
} from 'rxjs/operators'
import getGoCDContentWrapper from '../lib/getGoCDContentWrapper'

type ObjectsExtractorFn<T> = (contentWrapper: Element) => T[]

type KeyResolverFn<T> = (object: T) => string

type IsStateTheSameFn<T> = (left: T, right: T) => boolean

const changesFromObjects = <T>(
    objectsExtractorFn: ObjectsExtractorFn<T>,
    keyResolver: KeyResolverFn<T>,
    isStateTheSame: IsStateTheSameFn<T>
): Observable<Observable<T>> => {
    const objects$ = new Observable<T[]>(subscriber => {
        const nodeContentWrapper = getGoCDContentWrapper()
        const initialObjects = objectsExtractorFn(nodeContentWrapper)

        const mutationObserver = new MutationObserver(() => {
            const objects = objectsExtractorFn(nodeContentWrapper)
            subscriber.next(objects)
        })

        mutationObserver.observe(nodeContentWrapper, {
            subtree: true,
            childList: true,
        })

        subscriber.next(initialObjects)
    })

    const object$: Observable<T> = objects$.pipe(mergeAll())

    const objectsByKey = object$.pipe(
        // Group by stage name
        groupBy(keyResolver),

        map(group =>
            group.pipe(
                // We are only interested in new states
                distinctUntilChanged(isStateTheSame),
                // We are not interested in the initial state
                skip(1)
            )
        )
    )

    return objectsByKey
}

export default changesFromObjects
