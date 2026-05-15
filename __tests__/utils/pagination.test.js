import { fetchAll } from '../../src/utils/pagination'

describe('fetchAll', () => {
  it('returns items from a single page', async () => {
    const calls = []
    const fetchFn = async args => {
      calls.push(args)
      return {
        items: [{ id: 1 }, { id: 2 }],
        pageInfo: { hasNextPage: false, endCursor: null }
      }
    }

    const results = await fetchAll(fetchFn, { site: 'test' })

    expect(results).toEqual([{ id: 1 }, { id: 2 }])
    expect(calls).toHaveLength(1)
    expect(calls[0]).toEqual({
      site: 'test',
      count: 100,
      cursor: undefined
    })
  })

  it('accumulates items across multiple pages', async () => {
    const calls = []
    const responses = [
      {
        items: [{ id: 1 }],
        pageInfo: { hasNextPage: true, endCursor: 'cursor-1' }
      },
      {
        items: [{ id: 2 }],
        pageInfo: { hasNextPage: true, endCursor: 'cursor-2' }
      },
      {
        items: [{ id: 3 }],
        pageInfo: { hasNextPage: false, endCursor: null }
      }
    ]
    const fetchFn = async args => {
      calls.push(args)
      return responses[calls.length - 1]
    }

    const results = await fetchAll(fetchFn, { site: 'test' })

    expect(results).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
    expect(calls).toHaveLength(3)
    expect(calls[0]).toEqual({
      site: 'test',
      count: 100,
      cursor: undefined
    })
    expect(calls[1]).toEqual({
      site: 'test',
      count: 100,
      cursor: 'cursor-1'
    })
    expect(calls[2]).toEqual({
      site: 'test',
      count: 100,
      cursor: 'cursor-2'
    })
  })

  it('returns an empty array when the first page is empty', async () => {
    const calls = []
    const fetchFn = async args => {
      calls.push(args)
      return {
        items: [],
        pageInfo: { hasNextPage: false, endCursor: null }
      }
    }

    const results = await fetchAll(fetchFn, { site: 'test' })

    expect(results).toEqual([])
    expect(calls).toHaveLength(1)
  })
})
