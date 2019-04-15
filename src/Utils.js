
export const size = 3

export const asideInMatrix = (tiles, number) => {
  // TODO think in algoritm to know if its aside 0 number
  const zeroIndex = tiles.indexOf(size ** 2)
  const numberIndex = tiles.indexOf(number)
  const aside = (
    numberIndex + 1 === zeroIndex &&
    !!(zeroIndex % size) ||
    numberIndex - 1 === zeroIndex &&
    !!(numberIndex % size) ||
    numberIndex + size === zeroIndex ||
    numberIndex - size === zeroIndex
  )

  // TODO fix this imperative shit

  const newTiles = [...tiles]
  const numberValue = tiles[numberIndex]
  const zeroValue = tiles[zeroIndex]
  ;[newTiles[numberIndex], newTiles[zeroIndex]] = [zeroValue, numberValue]
  return aside ? newTiles : tiles
}

export const randomizer = (steps, matrix) => {
  const randomNumber = Math.round(Math.random() * matrix.length)

  const newMatrix = asideInMatrix(matrix, randomNumber)

  return steps > 0 ? randomizer(steps - (matrix !== newMatrix ? 1 : 0), newMatrix) : newMatrix
}
