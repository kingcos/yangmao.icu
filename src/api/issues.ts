import request from "../utils/request";

export interface Activity {
  city: string;
  type: string;
  title: string;
  requirement: string; // 要求
  steps: string; // 路径
  usage: string; // 使用
  value: string; // 幅度
  time: string; // 时间
  jump: string; // 跳转
}

export interface Issue {
  state: string;
  title: string;
  body: string;
  user: {
    login: string;
  };
}

export const requestActivities = () => {
  const userId = "kingcos";
  const repo = "yangmao.icu";

  return new Promise<Activity[]>((resolve, reject) => {
    requestIssues(userId, repo)
      .then((issues) => {
        console.log(issues)
        resolve(
          issues
            .filter((issue) => issue.user.login === userId)
            .map((issue) => {
              const activity: Activity = {
                city: issue.title.split("-")[0],
                type: issue.title.split("-")[1],
                title: issue.title.split("-")[2],
                requirement: issue.body.split("\r\n")[0]?.replace("要求：", ""),
                steps: issue.body.split("\r\n")[1]?.replace("路径：", ""),
                usage: issue.body.split("\r\n")[2]?.replace("使用：", ""),
                value: issue.body.split("\r\n")[3]?.replace("幅度：", ""),
                time: issue.body.split("\r\n")[4]?.replace("时间：", ""),
                jump: issue.body.split("\r\n")[5]?.replace("跳转：", ""),
              };
              console.log(activity);
              return activity;
            })
        );
      })
      .catch(reject);
  });
};

export function requestIssues(
  repoOwner: string,
  repoName: string,
  page: number = 1,
  perPage: number = 20
): Promise<Issue[]> {
  // https://api.github.com/repos/kingcos/yangmao.icu/issues?page=1&per_page=1
  return new Promise<Issue[]>((resolve, reject) => {
    request
      .get<Issue[]>(
        `https://api.github.com/repos/${repoOwner}/${repoName}/issues?page=${page}&per_page=${perPage}`
      )
      .then((response) => {
        if (response.data instanceof Array) {
            console.log(response.data);
            resolve(response.data);
        } else {
            reject()
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
