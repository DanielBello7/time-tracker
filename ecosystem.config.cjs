module.exports = {
  apps: [
    {
      name: 'core-task',
      exec_mode: 'cluster',
      instances: 1,
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_local: {
        APP_ENV: '.env.development'
      },
      env_production: {
        APP_ENV: '.env.production'
      }
    }
  ]
}

