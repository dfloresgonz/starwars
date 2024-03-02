const SPACE = 'AAAApXyNYLA';
const KEY = 'AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI';
const TOKEN = 'PpIv7cw0okRoMHFP9GTLOfcehZS7RVUqbznrWqhl-7g';
let WEBHOOK = `https://chat.googleapis.com/v1/spaces/${SPACE}/messages?key=${KEY}&token=${TOKEN}`;
let WEBHOOK_REACT = `https://chat.googleapis.com/v1/spaces/${SPACE}/messages/REEMPLAZAR/reactions?key=${KEY}&token=${TOKEN}`;
// let WEBHOOK = 'https://chat.googleapis.com/v1/spaces/AAAApXyNYLA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=PpIv7cw0okRoMHFP9GTLOfcehZS7RVUqbznrWqhl-7g'
const SUCCESS = '\u2705️';
const FAILED = '\u274c️';

(async function () {

    const args = process.argv;
    const tipo = args[2].split('=')[1]
    console.log('tipo:', tipo);

    let texto = ``
    let params = {}

    // ***********************************************************************

    if (tipo == 'init') { // el 1ero
        const github_data = JSON.parse(args[3])
        let detalle = '';
        if (github_data.event.head_commit) {
            detalle = github_data.event.head_commit.message;
        } else if (github_data.event.release) {
            detalle = `Release - ${github_data.event.release.tag_name}`;
        } else {
            detalle = 'desconocido';
        }
        params = {
            'text':
                `Workflow *${github_data.workflow}* iniciado:\n
*Por:* ${github_data.actor}
*Repo:* ${github_data.repository}
*Rama:* ${github_data.ref_name}
*Detalle:* ${detalle}
`
        }
    } else if (tipo == 'report') { // los
        WEBHOOK = `${WEBHOOK}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`
        const steps = JSON.parse(args[5])
        for (const [key, value] of Object.entries(steps)) {
            texto += `${value.outcome == 'success' ? SUCCESS : FAILED} ${key}\n`
        }

        params = {
            'text': `
${args[4] == 'success' ? SUCCESS : FAILED} *${args[3]}* (Job)
${texto}
`
        }

        if (args[6]) {
            params.thread = {
                name: args[6]
            }
        }
    } else if (tipo == 'end') { // el ultimo
        const threadId = args[3];
        const messageId = `${threadId.split('/')[3]}.${threadId.split('/')[3]}`;
        WEBHOOK = WEBHOOK_REACT.replace('REEMPLAZAR', messageId);
        params = {
            emoji: {
                'unicode': SUCCESS
            },
            name: 'GithubActions CI/CD Pipeline',
            user: {
                name: 'GithubActions',
                type: 'BOT'
            }
        }
    }

    let data = JSON.stringify(params)

    data = data.replace(/[\u007F-\uFFFF]/g, function (chr) {
        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
    })

    const fetch = require('node-fetch')

    const response = await fetch(WEBHOOK, { method: 'POST', body: data });
    const rpta = await response.json();

    console.log('rpta::', rpta);

    if (tipo == 'init') {
        const core = require('@actions/core');
        core.setOutput("gchatthreadid", rpta.thread.name);
    }

})();
