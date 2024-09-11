
const handleLogout =  () => {
    const access_token = localStorage.getItem('access_token')
    const google_access_token = localStorage.getItem('google_access_token')
    if (access_token || google_access_token) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('google_access_token')
    }
    window.location.reload()
}
export default handleLogout