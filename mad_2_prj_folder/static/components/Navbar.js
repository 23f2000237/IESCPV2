const Navbar={
    template:`
    <nav>
    <router-link to='/' style="text-decoration:none"><h1 style="color:lilac" > Connex </h1></router-link>
    <router-link to='/login'>Login</router-link>
    <router-link to='/signup'>Signup</router-link>
    <a  href="/logout">Logout</a>
    </nav>`,
    data(){
        return {
            url:window.location.origin + '/logout'
        }
    }
}
export default Navbar;