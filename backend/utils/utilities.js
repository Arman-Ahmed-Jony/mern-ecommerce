exports.removeEmptyValue = (object) => {
  Object.keys(object).forEach((key) => {
    !object[key] && delete object[key]
  })
  return object
}
