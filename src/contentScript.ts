import { Observable } from 'rxjs';
import { groupBy, concatMap, map, distinctUntilChanged, startWith, skip } from 'rxjs/operators';
import getStateBarsFromContainer from './lib/getStateBarsFromContainer';
import { StageBar } from './types';
import { triggerStageBarChanged } from './events';

const stageBars$ = new Observable<StageBar[]>(subscriber => {

    const nodeContentWrapper = document.querySelector('.content_wrapper_inner');
    const initialStageBars = getStateBarsFromContainer(nodeContentWrapper);

    const mutationObserver = new MutationObserver(function() {
        const stagesBars = getStateBarsFromContainer(nodeContentWrapper);
        subscriber.next(stagesBars);
    });

    mutationObserver.observe(nodeContentWrapper, {
        subtree: true,
        childList: true
    });

    subscriber.next(initialStageBars)

});


stageBars$.subscribe((stageBar) => {
    console.log('GoCD polling: ', stageBar)
})

const stageBar$: Observable<StageBar> = stageBars$.pipe(concatMap(x => x))

const stateBarsByName$ = stageBar$.pipe(
    // Group by stage name
    groupBy(sb => sb.name),
    
    map(group => 
        group.pipe(
            // We are only interested in new states
            distinctUntilChanged((x, y) => x.state === y.state),
            // We are not interested in the initial state
            skip(1)
        ))
)

stateBarsByName$.forEach(g => {
    g.subscribe((s) => {
        console.log(s);
        triggerStageBarChanged(s)
    })
})