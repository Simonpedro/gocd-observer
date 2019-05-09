const isRootPipelinesPage = () => {
    const url = location.pathname.match(/go\/pipelines$/)
    return !!url
}

export default isRootPipelinesPage
