let WEBHOOK = 'https://chat.googleapis.com/v1/spaces/AAAApXyNYLA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=PpIv7cw0okRoMHFP9GTLOfcehZS7RVUqbznrWqhl-7g'
// const WEBHOOK = 'https://chat.googleapis.com/v1/spaces/AAAApXyNYLA/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=PpIv7cw0okRoMHFP9GTLOfcehZS7RVUqbznrWqhl-7g&=messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD'
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
        params = {
            'text':
                `Workflow *${github_data.workflow}* iniciado:\n
*Por:* ${github_data.actor}
*Repo:* ${github_data.repository}
*Rama:* ${github_data.ref_name}
*Detalle:* ${github_data.event.head_commit.message}
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
