const dotenv = require('dotenv');

module.exports = async ({ options, resolveConfigurationProperty }) => {
  let envVars = dotenv.config({ path: '../../libs/.env.local' }).parsed;
  if (!envVars) {
    envVars = dotenv.config({ path: '../../../libs/.env.local' }).parsed;
  }
  return envVars;
};