
const influ_profile={
    template:`
    <div v-if="logged">
    <div v-if="flag">
        <div>
       <h1>Welcome {{name}} </h1>
       <h1>Total earinings this Month: ₹ {{bal}} </h1>
       <h2>Campaigns you are part of</h2>
       <table v-if="par.length>0" class='table-warning table-bordered'>
    <tr>
        <th>Sponsor</th>
        <th>Title</th>
        <th>Message</th>
        <th>Starts on</th>
        <th>Ends on</th>
        <th>Total Budget</th>
        <th>Niche</th>
        <th>         </th>
    </tr>
    <tr v-for="c in par" v-if="(c.flag=='True')">
        <th> {{c.name}} </th>
        <th>{{c.title}}</th>
        <th>{{c.message}}</th>
        <th>{{c.s_date}}</th>
        <th>{{c.e_date}}</th>
        <th> ₹ {{c.budget}}</th>
        <th>{{c.niche}}</th>
        <th><button class='btn btn-primary' @click='visit(c)'>Visit Sponsor's site</button></th>
    </tr>
</table>
       <h2>Other Campaigns that are going on.</h2>
       <table class='table-primary table-bordered'>
    <caption class="caption">Active Campaigns</caption>
    <tr >
        <th scope="col">Sponsor</th>
        <th scope="col">title</th>
        <th scope="col">Message</th>
        <th scope="col">S_date</th>
        <th scope="col">E_date</th>
        <th scope="col">Budget</th>
        <th scope="col">Niche</th>
        </tr>
        <tr v-for="c in camps" v-if="new Date(c.e_date) >= date"> 
            <td>{{c.name}}</td>
            <td>{{c.title}}</td>
            <td>{{c.message}}</td>
            <td>{{c.s_date}}</td>
            <td>{{c.e_date}}</td>
            <td>{{c.budget}}</td>
            <td>{{c.niche}}</td>
            <td>
            <div>
            <button class='btn-info' @click='visit(c)'>Visit Sponsor's site</button>
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
            date:new Date(),
            par:[]
        }
    },
    methods:{
        flag_camp(id){
            console.log(id)
        },
        async visit(c){
            window.open(c.site)
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
                this.par=po
                let npo=vinfo.notpartof
                this.camps=npo
            }
        }
    }
export default influ_profile