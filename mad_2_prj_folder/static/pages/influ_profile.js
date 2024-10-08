
const influ_profile={
    template:`
    <div v-if="logged">
    <div v-if="flag">
        <div v-if="role=='Inf'">
        <h1>Total earinings this Month: Rs.{{bal}}</h1>
       <a v-bind:href=site>Your site</a>
       <h1>Welcome {{name}} </h1>
       <h2>Active Campaigns You are Part Of</h2>
       <!--Table containing the campaigns they are part of-->
       <h2>Other Campaigns that are going on.</h2>
       <!--Table containing the campaigns they are not part of but can apply -->
       <table><tr v-for="c in camps"><td>{{c[0]}}      {{c[2]}}   </td></tr></table>
       </div>
</div>
<div v-else>
    <h1>You are flagged. Please contact the admin</h1>
</div>
</div>
<div v-else>
<h1> You are not logged in, Please log in </h1>
<a href='/#/login'>Login</a>
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
            site:'',
            camps:[],
            spons:[],
        }
    },
    methods:{
        flag_camp(id){
            console.log(id)
        }
    },
    async mounted(){
            const url=window.location.origin
            const val=await fetch(url+'/api/inf')
            if (val.ok){
                let info=await val.json()
                console.log(info)
                this.name=info.name
                this.logged=true
                this.role=info.role
                this.bal=info.bal
                this.ad_text=info.text
                this.site=info.site
                this.camps=info.camps
                }
            }
        }
export default influ_profile