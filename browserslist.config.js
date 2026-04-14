module.exports = {
  apps: [
    {
      name: 'LumicaTech',
      shortName: 'LumiTech',
      description: 'Software a Medida en Castellón',
      url: '/',
      display: 'standalone',
      background_color: '#131313',
      theme_color: '#135bec',
      orientation: 'portrait',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          density: '1.0'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          density: '2.0'
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '2000x2000',
          type: 'image/png',
          density: '3.0'
        }
      ],
      shortcuts: [
        {
          name: 'Reservar Cita',
          short_name: 'Reservar',
          description: 'Agenda una reunión',
          url: '/booking',
          icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }]
        }
      ]
    }
  ]
}