import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createIssueMessage(request: IApiRequest): string {
    const projectUrl = request.content.project.web_url;
    const repoName = request.content.project.name;
    const issueName = request.content.object_attributes.title;
    const issueUrl = request.content.object_attributes.url;

    let text;
    if (request.content.object_attributes.last_edited_by_id == null) {
        text = `${request.content.user.name} created a new issue in repository [${repoName}](${projectUrl})
        • [${issueName}](${issueUrl})`;
    } else {
        text = `${request.content.user.name} updated an issue in repository [${repoName}](${projectUrl})
        • [${issueName}](${issueUrl})`;
    }
    return text;
}
