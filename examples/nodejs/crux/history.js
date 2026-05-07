#!/usr/bin/env node

import { Crux } from 'calibre'

const site = 'calibre'

const result = await Crux.history({ site, timePeriod: 'six-months' })
console.log(JSON.stringify(result, null, 2))
