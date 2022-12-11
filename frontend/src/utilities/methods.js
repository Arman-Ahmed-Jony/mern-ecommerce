export const objectToApiQuaryString = (obj = {}) => {
    Object.keys(obj).forEach((k) => (obj[k] == null || obj[k] === '') && delete obj[k])
    const string = Object.keys(obj).map(function (key) {
      if (typeof obj[key] === 'object') obj[key] = JSON.stringify(obj[key])
      const value = obj[key]
  
      return key + '=' + value
    }).join('&')
    return string ? `?${string}` : ''
  }