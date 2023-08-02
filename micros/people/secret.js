const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager')
const client = new SecretsManagerClient({ region: 'us-east-1' })

const secretParams = {
    SecretId: 'starwars/passbd',
}

const getPassword = async () => {
    const command = new GetSecretValueCommand(secretParams);
    const dbSecret = await client.send(command)
    const secretString = dbSecret.SecretString || '';

    if(!secretString) throw {msj: 'Password no existe.'}
    
    const password = JSON.parse(secretString)
    
    if(!password) throw {msj: 'Password no existe'}
    
    return password.STARWARS_PASS
}

exports.getPassword = getPassword