import Cookies from 'js-cookie'

export const getEnumValueByKey = (enumObject: Object, value: string) => {
  return Object.entries(enumObject).find(([key, val]) => key === value)?.[1]
}

export const getEnumKeyByValue = (enumObject: Object, value: string) => {
  return Object.entries(enumObject).find(([key, val]) => key === value)?.[0]
}

export const checkIfLoggedIn = () => {
  const token = Cookies.get('jwtToken')
  if (!token) {
    return false
  }
  if (Object.entries(token).length > 0) {
    return true
  } else {
    return false
  }
}

export const logOut = () => {
  const cookieData = Object.entries(Cookies.get())
  for (const [key] of cookieData) {
    Cookies.remove(key)
  }
}
