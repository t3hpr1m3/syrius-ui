'use strict'

import { app } from './app'
import config from 'config'

app.set('port', config.get('port'))

const server = app.listen(app.get('port'), () => {
  console.log('Server listening on ' + server.address().port + ' ...')
})

export { app, server }
