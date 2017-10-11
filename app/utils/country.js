/**
 * Created by saman on 10/9/17.
 */
const countries = require('./country.json')

export const getCountries = (phoneCode = false) => {
  let ret = []
  countries.forEach((c) => {
    let country = {}
    country.flag = c.alpha2Code.toLowerCase()
    country.key = c.alpha2Code
    country.value = c.alpha2Code
    country.text = c.name
    if (phoneCode)
      country.text += ' (+' + c.callingCodes[0] + ')'
    // country.code = c.callingCodes[0]
    ret.push(country)
  })
  return ret
}
