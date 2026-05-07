#!/usr/bin/env node

import { Crux } from 'calibre'

const site = 'calibre'

const result = await Crux.summary({ site })
console.log(JSON.stringify(result, null, 2))
