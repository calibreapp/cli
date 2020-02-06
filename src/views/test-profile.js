const chalk = require('chalk')
const dateFormat = require('date-fns/format')

const cookies = cookies => {
  return cookies.length > 0
    ? cookies
        .map(cookie => {
          const secure = cookie.secure ? '✔ Shared with Non-SSL servers' : ''

          const httpOnly = cookie.httpOnly
            ? '✔ Shared with `document.cookie`'
            : ''

          return `
- Cookie
  Name: ${cookie.name}
  Value: ${cookie.value}
  Domain: ${cookie.domain}
  Path: ${cookie.path}

  ${secure}
  ${httpOnly}
    `
        })
        .join('\n')
    : ''
}

module.exports = profile => {
  return `
${chalk.bold.cyan(`⬢ ${profile.name}`)} (${profile.uuid})
${chalk.grey(
  `Created: ${dateFormat(new Date(profile.createdAt), 'h:mma d-MMM-yyyy')}`
)}
${chalk.grey(
  `Updated: ${dateFormat(new Date(profile.updatedAt), 'h:mma d-MMM-yyyy')}`
)}

${profile.device ? `• ${profile.device.title}` : ''}
${profile.bandwidth ? `• ${profile.bandwidth.title}` : ''}
${profile.jsIsDisabled ? '• Javascript Disabled' : ''}
${profile.adBlockerIsEnabled ? '• Adblocker Enabled' : ''}

${cookies(profile.cookies)}
  `
}
