const chalk = require('chalk')
const dateFormat = require('date-fns/format')

const cookies = cookies => {
  return cookies.length > 0
    ? cookies
        .map(cookie => {
          const secure = cookie.secure ? `✔ Shared with Non-SSL servers` : ''

          const httpOnly = cookie.httpOnly
            ? `✔ Shared with \`document.cookie\``
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
${chalk.grey(`Created: ${dateFormat(profile.createdAt, 'h:mma D-MMM-YYYY')}`)}
${chalk.grey(`Updated: ${dateFormat(profile.updatedAt, 'h:mma D-MMM-YYYY')}`)}

${profile.device.title ? `• ${profile.device.title}` : ''}
${profile.bandwidth.title ? `• ${profile.bandwidth.title}` : ''}
${profile.jsIsDisabled ? `• Javascript Disabled` : ''}

${cookies(profile.cookies)}
  `
}
