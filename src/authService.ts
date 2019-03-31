import auth0, { AuthorizeOptions } from 'auth0-js'
import { EventEmitter } from 'events'

const localStorageKey = 'loggedIn'
const loginEvent = 'loginEvent'

const webAuth = new auth0.WebAuth({
  domain: 'dev-nkguxt77.eu.auth0.com',
  // redirectUri: `${window.location.origin}`,
  redirectUri: 'http://localhost:8080/authcallback',
  clientID: 'xu2LCVsGrM7lEpTBy9W0b_Q9T3ELeeLl',
  responseType: 'id_token',
  scope: 'openid profile email'
})

class AuthService extends EventEmitter {
  idToken: string | undefined = undefined
  profile: any
  tokenExpiry: Date | null = null

  // Starts the user login flow
  // The login method has been setup to support specifing custom state that will be returned to the application after authentication.
  login(customState: any) {
    webAuth.authorize({
      appState: customState
    } as AuthorizeOptions)
  }

  // Handles the callback request from Auth0
  handleAuthentication(): Promise<string> {
    console.log('handleAuthentication') // DEBUG
    return new Promise<string>((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err)
        } else {
          if (authResult === null) {
            console.error('authResult is null')
          } else {
            this.localLogin(authResult)
            resolve(authResult.idToken)
          }
        }
      })
    })
  }

  // localLogin
  localLogin(authResult: auth0.Auth0DecodedHash) {
    console.log('localLogin') // DEBUG
    this.idToken = authResult.idToken
    this.profile = authResult.idTokenPayload
    console.log('idToken', this.idToken) // DEBUG
    console.log('profile', this.profile) // DEBUG

    // Convert the JWT expiry time from seconds to milliseconds
    if (this.profile === null) {
      console.error('this.profile is null')
    } else {
      this.tokenExpiry = new Date(this.profile.exp * 1000)
    }

    localStorage.setItem(localStorageKey, 'true')

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState || {}
    })
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        return reject('Not logged in')
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult)
        }
      })
    })
  }

  logOut() {
    console.log('logOut') // DEBUG
    localStorage.removeItem(localStorageKey)
    this.idToken = undefined
    this.tokenExpiry = null
    this.profile = null

    webAuth.logout({
      returnTo: window.location.origin
    })

    this.emit(loginEvent, { loggedIn: false })
  }

  isAuthenticated() {
    console.log('isAuthenticated') // DEBUG
    return (
      this.tokenExpiry !== null &&
      new Date() < this.tokenExpiry &&
      localStorage.getItem(localStorageKey) === 'true'
    )
  }
}

export default new AuthService()
