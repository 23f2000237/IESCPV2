import router from "../utils/router.js"
const prof={
    template:`
    <div>
    This should not be visible
    </div>`,
    async mounted(){
        const url=window.location.origin
        const val=await fetch(url+'/profile')
        if (val.ok){
            let info=await val.json()
            this.logged=true
            this.role=info.role
            switch(this.role){
                case 'Inf':{
            router.push('/inf/profile')
            break;
            }
            case 'spons':{
                router.push('/spons/profile')
                break;
            }
            case 'Admin':{
                router.push('/admin/profile')
            }
        }
        }
    },
}
export default prof 