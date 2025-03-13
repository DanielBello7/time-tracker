module.exports = {
  apps: [
    {
      name: 'core-task',
      exec_mode: 'cluster',
      instances: 1,
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: '.env.development',
        PORT: 3355
      },
    }
  ]
}

