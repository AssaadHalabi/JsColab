

export const getUrlReferrer = () => {
    let queryParams = window.location.search;
    if (queryParams) {
        return `${window.location.pathname}?${queryParams}`
    } else if(window.location.pathname !== '/'){
        return `${window.location.pathname}`
    }
    return '';
}

export const getUrlSearchParams = () => {
    const urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(window.location.href);
    let queryParams = urlParts![3];
    if (queryParams) {
        return urlParts![3]
    } 
    return '';
}