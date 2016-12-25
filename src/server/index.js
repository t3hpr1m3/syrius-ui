'use strict'

import { app } from './app'
import config from 'config'

//
// I'm not sure this is necessary anymore, but I'm too lazy to check for the
// new "approved way to set the port
//
app.set('port', config.get('port'))

const server = app.listen(app.get('port'), () => {
  console.log('Server listening on ' + server.address().port + ' ...')
})

//
// Not sure if I'll ever actually use the app, but exporting it just to be safe
//
export { app, server }
