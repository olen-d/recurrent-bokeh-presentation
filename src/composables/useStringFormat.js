export const titleCase = string => {
  const words = string.split(' ')

  const capitalized = words.map(word => {
    return word[0].toUpperCase() + word.substring(1)
  })

  const replaced = capitalized.join(" ")
  return replaced
}
