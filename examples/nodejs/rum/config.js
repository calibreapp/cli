#!/usr/bin/env node

import { Rum } from 'calibre'

const site = 'calibre'

const result = await Rum.config({ site })
console.log(JSON.stringify(result, null, 2))
