import axios from 'axios'
import Config from '../../Config'

class AppState {
    authenticated = false // to check if authenticated or not
    user = {} // store all the user details
    history: any

    constructor() { }

    async checkToken() {
        try {
            const response = await axios.post(`${Config.apiUrl}/auth/checkToken`, { token: localStorage.getItem('authToken') })
            // console.log(response.data.authenticated ? 'Logged in' : 'unauthorized')
            return response.data
        } catch (error) {
            console.error('checkToken', error)
            return false
        }
    }

    setHistory(history: any) {
        this.history = history
    }

    setUser(user: any) {
        this.user = user
    }

    setAuthenticated(authenticated: any) {
        this.authenticated = authenticated
    }

    logout() {
        localStorage.setItem('authToken', '')
        this.setAuthenticated(false)
        this.setUser(null)
    }
}

export default AppState
