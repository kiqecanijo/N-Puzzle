
export const size = 4
export const asideInMatrix = (tiles, number) => {
  // TODO think in algoritm to know if its aside 0 number
  const zeroIndex = tiles.indexOf(0)
  const numberIndex = tiles.indexOf(number)
  const aside = (
    numberIndex + 1 === zeroIndex &&
    !(numberIndex % size) ||
    numberIndex - 1 === zeroIndex &&
    !(zeroIndex % size) ||
    numberIndex + size === zeroIndex ||
    numberIndex - size === zeroIndex
  )

  let newTiles = tiles

  newTiles[zeroIndex] = tiles[numberIndex]
  newTiles[numberIndex] = tiles[zeroIndex]

  // return { zeroIndex, numberIndex, aside }
  return newTiles
}
