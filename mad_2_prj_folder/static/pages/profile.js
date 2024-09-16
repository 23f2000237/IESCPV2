const user_profile={
    template:`
    <div>
    <div v-if="logged">
    <h1 class="text-center"> Welcome {{name}} </h1>
    <div v-if="role=='Inf'">
    <h3>Total earnings Rs.{{bal}}</h3>
    </div>
    <div v-else-if="role=='Spons'">
    <h3> Your Industry  {{ind}}</h3>
    </div>
    </div>
    <div v-else>
    <h1 class="row justify-content-center"> You are not logged in please login </h1>
    </div>
    <h1 v-if="site"><a href="site">Your site</a> </h1>
    <div v-if="role=='Admin'">
    <h1>Hello Megha!!</h1>
    <h2>{{ad_text}}</h2>
    </div>
    </div>
    `,
    data(){
        return {
            role:'',
            name:'',
            bal:0,
            logged:false,
            flag:true,  
            ind:'',
            ad_text:'',
            site:''
        }
    },
    async mounted(){
            const url=window.location.origin
            const val=await fetch(url+'/profile')
            if (val.ok){
                let info=await val.json()
                this.name=info.name
                this.logged=true
                this.role=info.role
                this.bal=info.bal
                this.ind=info.ind
                this.ad_text=info.text
                this.site=info.site
            }
        },
    }
export default user_profile