module.exports = {
  apps: [
    {
      name: 'EduRevise',
      script: 'dist/src/main.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
