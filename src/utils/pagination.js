const fetchAll = async (fetchFn, args) => {
  let allResults = []
  let cursor = undefined
  const batchArgs = { ...args, count: 100 }

  while (true) {
    const result = await fetchFn({ ...batchArgs, cursor })

    allResults = allResults.concat(result.items)

    if (!result.pageInfo.hasNextPage) break
    cursor = result.pageInfo.endCursor
  }

  return allResults
}

export { fetchAll }
