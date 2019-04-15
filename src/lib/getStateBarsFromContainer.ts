import { StageBar } from "../types";

function getStateBarsFromContainer(container): StageBar[] {
    const nodes = [...container
                   .querySelectorAll('.stage_bar')
                   .values()];
    return nodes.map(stageBarNode => {
        const titleParts = stageBarNode.title.split(" ");
        const stageName = titleParts[0];
        const stageState = titleParts[1];
        return {
            name: stageName,
            state: stageState
        };
    });
}

export default getStateBarsFromContainer;