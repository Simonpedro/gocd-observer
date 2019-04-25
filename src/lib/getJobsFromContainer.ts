import { IJob } from '../types'

function removeWhiteSpace(value: string) {
    return value.replace(/\s/g, '')
}

function getJobsFromContainer(container): IJob[] {
    return [...container.querySelectorAll('#jobs_grid tr.job').values()].map(
        v => ({
            name: removeWhiteSpace(v.querySelector('td.job_name').textContent),
            state: removeWhiteSpace(
                v.querySelector('td.job_result').textContent
            ),
        })
    )
}

export default getJobsFromContainer
