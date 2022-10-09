import request from "../utils/request";

export function requestIssues(
    repoOwner: string,
    repoName: string,
    page: number = 1,
    perPage: number = 20
) {
    // https://api.github.com/repos/kingcos/yangmao.icu/issues?page=1&per_page=1
    return request.get(`https://api.github.com/repos/${repoOwner}/${repoName}?page=${page}&per_page=${perPage}`);
}
