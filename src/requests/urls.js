const baseUrl = "http://127.0.0.1:8000/api"

const loginUrl = `${baseUrl}/auth/login`


const userInfoUrl = `${baseUrl}/user/info`

const assertUrl = `${baseUrl}/user/assert`

const operateUrl = `${baseUrl}/user/operate`

const operateAllUrl = `${baseUrl}/user/operate/all`

const operateCancelUrl = `${baseUrl}/user/operate/cancel`

const operateConsentUrl = `${baseUrl}/user/operate/consent`

export {
    baseUrl,
    loginUrl,
    userInfoUrl,
    assertUrl,
    operateUrl,
    operateCancelUrl,
    operateAllUrl,
    operateConsentUrl,
}