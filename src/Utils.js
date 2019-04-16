
// GRID side size
export const size = 3
// GRID moves before start
export const dificult = 200

export const asideInMatrix = (tiles, number) => {
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

  // TODO fix this imperative code
  const newTiles = [...tiles]
  const numberValue = tiles[numberIndex]
  const zeroValue = tiles[zeroIndex]
  ;[newTiles[numberIndex], newTiles[zeroIndex]] = [zeroValue, numberValue]
  return aside ? newTiles : tiles
}

export const randomizer = (steps, matrix) => {
  const zeroIndex = matrix.indexOf(size ** 2)
  const options = [
    matrix[zeroIndex + 1],
    matrix[zeroIndex - 1],
    matrix[zeroIndex + size],
    matrix[zeroIndex - size]
  ].filter(Boolean)

  const randomNumber = options[Math.floor(Math.random() * options.length)]
  // change with aside tild
  const newMatrix = asideInMatrix(matrix, randomNumber)
  // does return a new matrix ?
  return steps > 0 ? randomizer(steps - (matrix !== newMatrix ? 1 : 0), newMatrix) : newMatrix
}
