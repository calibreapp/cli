#!/usr/bin/env node

import { Rum } from 'calibre'

const site = 'calibre'

const result = await Rum.pages({ site, limit: 25 })
console.log(JSON.stringify(result, null, 2))
