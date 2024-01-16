require('dotenv').config()
const { env } = process

const config = {
  PORT: parseInt(env.PORT) || 8020,
  HOSTNAME: require('os').hostname(),
  IS_TESTING: env.IS_TESTING === 'true',
  APP_NAME: env.APP_NAME || 'EXPRESS-SAMPLE',
  EXEC_ENV: env.EXEC_ENV || 'dev'
}

module.exports = config
