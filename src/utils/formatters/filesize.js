import humanize from 'humanize'

const toFilesize = bytes => humanize.filesize(bytes)

export default toFilesize
