
export const size = 3
export const asideInMatrix = (tiles, number) => {
  // TODO think in algoritm to know if its aside 0 number
  const zeroIndex = tiles.indexOf(0)
  const numberIndex = tiles.indexOf(number)
  return (
    numberIndex + 1 === zeroIndex ||
    numberIndex - 1 === zeroIndex ||
    numberIndex + size === zeroIndex ||
    numberIndex - size === zeroIndex
  )
}
