import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createPipelineMessage(request: IApiRequest): string {
    const projectUrl = request.content.project.web_url;
    const repoName = request.content.project.name;
    const branch = request.content.object_attributes.ref;

    const commitUrl = request.content.commit.url;
    const commitTitle = request.content.commit.title;

    let response = `${request.content.user.name} started a pipeline for repository [${repoName}](${projectUrl})\n`
        + `Branch: ${branch}\n`
        + `Status: ${JSON.stringify(request.content.object_attributes.status)}\n`
        + `Commit: [${commitTitle}](${commitUrl})\n`
        + `Pipeline:\n`
        ;

    const stages = request.content.builds.reverse();

    for (const stage of stages) {
        response += computeStatusIcon(stage.status) + ' \tStage: ' + stage.name + ' Status: ' + stage.status + '\n';
    }

    response += `\n[Details](${computePipelineUrl(request)})\n`;

    return response;
}

// https://docs.gitlab.com/ee/api/pipelines.html
function computeStatusIcon(status: string): string {
    switch (status) {
        case 'created':
            return ':white_large_square:';
        case 'pending':
            return ':arrows_clockwise:';
        case 'success':
            return ':white_check_mark:';
        case 'failed':
            return ':x:';
        default:
            return '';
    }
}

function computePipelineUrl(request: IApiRequest): string {
    const webUrl = request.content.project.web_url;
    const pipelineId = request.content.object_attributes.id;

    return `${webUrl}/pipelines/${pipelineId}`;
}
