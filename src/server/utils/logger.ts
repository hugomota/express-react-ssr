const log4js = require('log4js')

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout',
      layout: { type: 'pattern', pattern: '[%d] [%p] [cx_cr_web_app] - %-15.15c : %m' },
    },
  },
  categories: { default: { appenders: ['stdout'], level: 'INFO' } },
})

export const log = (el: string) => log4js.getLogger(el)

export const logElapsedTime = (startHrTime: [number, number], message: string = '', instance: string = '') => {
  const elapsedHrTime = process.hrtime(startHrTime)
  const elapsedTimeInMs = (elapsedHrTime[0] * 1e9 + elapsedHrTime[1]) / 1e6
  const total = parseFloat(elapsedTimeInMs.toString()).toFixed(3)

  log4js.getLogger(instance).info(`${message} execution took ${total}ms`)
}
