import Home from '../pages/home.js';
import login from '../pages/login_signup_logout.js'
import {signup,logout} from '../pages/login_signup_logout.js'
import user_profile from '../pages/influ_profile.js';
const routes=[
    {path:'/',component:Home},
    {path:'/login',component:login},
    {path:'/signup',component:signup},
    {path:'/logout',component:logout},
    {path:'/profile',component:user_profile}
]
const router=new VueRouter({routes,})
export default router