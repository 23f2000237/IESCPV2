
const influ_profile={
    template:`
    <div v-if="logged">
    <div v-if="flag">
        <div>
       <h1>Welcome {{name}} </h1>
       <h2>Active Campaigns You are Part Of</h2>
       <h1>Total earinings this Month: Rs. {{bal}} </h1>
       <!--Table containing the campaigns they are part of-->
       <h2>Other Campaigns that are going on.</h2>
       <table class='table-primary table-bordered'>
    <caption class="caption">Active Campaigns</caption>
    <tr>
        <th scope="col">C_id</th>
        <th scope="col">title</th>
        <th scope="col">Message</th>
        <th scope="col">S_date</th>
        <th scope="col">E_date</th>
        <th scope="col">Budget</th>
        <th scope="col">Niche</th>
        </tr>
        <tr v-for="c in camps" v-if="new Date(c.e_date) <= date"> 
            <td>{{c.c_id}}</td>
            <td>{{c.title}}</td>
            <td>{{c.message}}</td>
            <td>{{c.s_date}}</td>
            <td>{{c.e_date}}</td>
            <td>{{c.budget}}</td>
            <td>{{c.niche}}</td>
            <td>
            <div>
            <button class='btn-info' @click='visit'>Visit Sponsor's site</button>
            </div>
            </td>
        </tr>
</table>

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
            date:new Date()
        }
    },
    methods:{
        flag_camp(id){
            console.log(id)
        },
        async visit(){
            const url=window.location.origin
            const val=await fetch(url+'/api/spons')
            let site_data=[]
            if (val.ok){
                site_data=await val.json()
                let arr3 = this.camps.map((item, i) => Object.assign({}, item, site_data[i]));
                console.log(this.camps)
            }
        }
    },
    async mounted(){
            const url=window.location.origin
            const val=await fetch(url+'/api/inf')
            if (val.ok){
                let info=await val.json()
                this.name=info.name
                this.logged=true
                this.role=info.role
                this.bal=info.Balance
                this.ad_text=info.text
                this.site=info.site
                }
            const val_camps=await fetch(url + '/api/camps')
            if (val_camps.ok){
                let vinfo=await val_camps.json()
                let po=vinfo.partof
                let npo=vinfo.notpartof
                this.camps=npo
            }
        }
    }
export default influ_profile