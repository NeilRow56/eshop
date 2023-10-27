// export const truncateText = (str: string) => {
//   if (str.length < 25) return str

//   return str.substring(0, 25) + '...'
// }

export const truncateText = (str: string, max = 4) => {
  const array = str.trim().split(' ')
  const ellipsis = array.length > max ? '...' : ''

  return array.slice(0, max).join(' ') + ellipsis
}
