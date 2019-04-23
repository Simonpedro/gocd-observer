import { StageBar } from "../types";

function removeParentheses(value: string) {
    return value.replace(/[()]/g, '');
}

function getStateBarsFromContainer(container): StageBar[] {
    const nodes = [...container
                   .querySelectorAll('.stage_bar')
                   .values()];
    return nodes.map(stageBarNode => {
        const [stageName, rawStageState] = stageBarNode.title.split(" ");
        const stageState = removeParentheses(rawStageState);
        return {
            name: stageName,
            state: stageState
        };
    });
}

export default getStateBarsFromContainer;