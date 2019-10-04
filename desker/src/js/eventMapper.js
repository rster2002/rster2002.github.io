export default a => {
    a.title = "";
    a.img = a.actor["avatar_url"];
    var payload = a.payload;

    switch (a.type) {
        case "PushEvent":
            a.title += `<span class="tag blue"><img src="./src/icons/push.png" /></span>`;
            let i = a.payload.commits[payload.size - 1].message;
            i = i.split("\n");
            i = i[0];
            a.title += i;
            break;
        case "PullRequestEvent":
            a.title += `<span class="tag orange"><img src="./src/icons/pull.png" /></span>`;
            a.title += `pull by ${payload.pull_request.user.login}`;
            break;
        case "DeleteEvent":
            a.title += `<span class="tag red"><img src="./src/icons/bin.png" /></span>`;
            if (a.payload["ref_type"] === "branch") {
                a.title += `<span class="tag grey">${a.payload.ref}</span>`;
            }
            break;
        case "CreateEvent":
            if (payload["ref_type"] === "branch") {
                a.title += `<span class="tag purple"><img src="./src/icons/split.png" /></span>`;
                a.title += `<span class="tag grey">${payload.ref}</span>`;
            }
            break;
        case "ReleaseEvent":
            a.title += `<span class="tag orange"><img src="./src/icons/release.png" /></span>`;
            a.title += a.payload.release.name;
            break;
        case "IssueCommentEvent":
            a.title += `<span class="tag green"><img src="./src/icons/comment.png" /></span>`;
            a.title += `comment on '${payload.issue.title}'`;
            break;
        case "IssuesEvent":
            if (payload.action === "reopened") {
                a.title += `<span class="tag red"><img src="./src/icons/up.png" /></span>`;
                a.title += `reopened '${payload.issue.title}'`;
            } else if (payload.action === "closed") {
                a.title += `<span class="tag green"><img src="./src/icons/done.png" /></span>`;
                a.title += `closed '${payload.issue.title}'`;
            } else if (payload.action === "opened") {
                a.title += `<span class="tag red"><img src="./src/icons/issue.png" /></span>`;
                a.title += `opened '${payload.issue.title}'`;
            }
            break;
        case "WatchEvent":
            if (payload.action === "started") {
                a.title += `<span class="tag orange"><img src="./src/icons/watch.png" /></span>`;
                a.title += `'${a.actor.login}' started watching this repo`;
            }
            break;
        case "ForkEvent":
            a.title += `<span class="tag purple"><img src="./src/icons/split.png" /></span>`;
            a.title += `'${a.actor.login}' created a fork`;
            break;
        case "GollumEvent":
            a.title += `<span class="tag purple"><img src="./src/icons/document-edited.png" /></span>`;
            a.title += `${a.actor.login} modified the wiki page ${payload.pages[0].page_name}`;
            break;
    }

    return a;
};
