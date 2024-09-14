import Home from '../pages/home.js';
import login from '../pages/login_signup_logout.js'
import {signup,logout} from '../pages/login_signup_logout.js'

const routes=[
    {path:'/',component:Home},
    {path:'/login',component:login},
    {path:'/signup',component:signup},
    {path:'/logout',component:logout}
]
const router=new VueRouter({routes,})
export default router