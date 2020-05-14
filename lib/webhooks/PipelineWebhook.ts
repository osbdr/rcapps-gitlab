import { IApiRequest } from '@rocket.chat/apps-engine/definition/api';

export function createPipelineMessage(request: IApiRequest): string {
    if (request.content.object_kind !== 'pipeline') {
        console.log(request.content.object_kind);
        return 'Not a pipeline request';
    }
    let response = 'Project Name: ' + JSON.stringify(request.content.project.name) + '\n'
        + 'Status: ' + JSON.stringify(request.content.object_attributes.status) + '\n'
        + 'Commit id: ' + JSON.stringify(request.content.commit.id) + '\n'
        + 'Pipeline:\n'
        ;

    const stages = request.content.builds.reverse();

    for (const stage of stages) {
        response += computeStatusIcon(stage.status) + ' \tStage: ' + stage.name + ' Status: ' + stage.status + '\n';
    }

    response += `[Details](${computePipelineUrl(request)})\n`;

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
