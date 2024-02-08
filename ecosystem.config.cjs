module.exports = {
  apps: [
    {
      name: 'activity-tracker',
      exec_mode: 'cluster',
      instances: 1,
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_local: {
        APP_ENV: 'local'
      },
      env_development: {
        APP_ENV: 'dev'
      },
      env_production: {
        APP_ENV: 'prod'
      }
    }
  ]
}

