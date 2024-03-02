const SPACE = 'AAAApXyNYLA';
const KEY = 'AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI';
const TOKEN = 'PpIv7cw0okRoMHFP9GTLOfcehZS7RVUqbznrWqhl-7g';
// let WEBHOOK = `https://chat.googleapis.com/v1/spaces/${SPACE}/messages?key=${KEY}&token=${TOKEN}`;
// let WEBHOOK_REACT = `https://chat.googleapis.com/v1/spaces/${SPACE}/messages/REEMPLAZAR/reactions?key=${KEY}&token=${TOKEN}`;
let WEBHOOK = `https://chat.googleapis.com/v1/spaces/${SPACE}/messages`;
let WEBHOOK_REACT = `https://chat.googleapis.com/v1/spaces/${SPACE}/messages/REEMPLAZAR/reactions`;
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
    } else if (tipo == 'report') {
        WEBHOOK = `${WEBHOOK}=messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`
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
        const hasFailures = args[4] === 'true';
        console.log('res>>>', hasFailures, args[4]);
        const messageId = `${threadId.split('/')[3]}.${threadId.split('/')[3]}`;
        WEBHOOK = WEBHOOK_REACT.replace('REEMPLAZAR', messageId);
        //https://getemoji.com
        params = {
            emoji: {
                'unicode': hasFailures ? '🔴' : '🟢'
            },
        }
    }

    let data = JSON.stringify(params)

    data = data.replace(/[\u007F-\uFFFF]/g, function (chr) {
        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
    })

    const fetch = require('node-fetch')

    const TOKEN = await getJWT(tipo);
    // console.log('TOKEN:::', TOKEN);

    if (!TOKEN) throw new Error('No se pudo obtener el token de autenticación');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    };

    const response = await fetch(WEBHOOK, { method: 'POST', headers, body: data });
    const rpta = await response.json();

    console.log('rpta::', rpta);

    if (tipo == 'init') {
        const core = require('@actions/core');
        core.setOutput("gchatthreadid", rpta.thread.name);
    }

})();

function getJWT(tipo) {
    return new Promise(async (resolve, reject) => {
        const { google } = require('googleapis');
        const gkeys = require('./serv_accnt.json');
        let jwtParams =
        //new google.auth.JWT(
        {
            email: gkeys.client_email,
            key: gkeys.private_key,
            scopes: []
        };
        if (tipo == 'init' || tipo == 'report') {
            jwtParams.scopes = jwtParams.scopes.concat([
                'https://www.googleapis.com/auth/chat.bot',
            ]);
        } else if (tipo == 'end') {
            jwtParams.subject = 'diego@smiledu.com';
            jwtParams.scopes = jwtParams.scopes.concat([
                'https://www.googleapis.com/auth/chat.import',
                'https://www.googleapis.com/auth/chat.messages',
                'https://www.googleapis.com/auth/chat.messages.reactions',
                'https://www.googleapis.com/auth/chat.messages.reactions.create'
            ]);
        }
        //);
        // console.log('jwtParams:::', jwtParams);
        const jwtClient = new google.auth.JWT(jwtParams);
        try {
            const obj = await jwtClient.authorize();
            console.log('obj::', obj);
            return resolve(obj.access_token);
        } catch (error) {
            console.log('error.getJWT:::', error);
            return reject(error);
        }
    });
}