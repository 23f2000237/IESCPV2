import router from "../utils/router.js"
import crecam from "../components/cre_cam.js"
const spons_profile={
    template:`<div v-if="approval">
    <div v-if="flag=='True'">
    <h1> Welcome {{name}} </h1>
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
        <tr v-for="c in camps" v-if="new Date(c.e_date) >= date"> 
            <td>{{c.c_id}}</td>
            <td>{{c.title}}</td>
            <td>{{c.message}}</td>
            <td>{{c.s_date}}</td>
            <td>{{c.e_date}}</td>
            <td>{{c.budget}}</td>
            <td>{{c.niche}}</td>
            <td>
            <div>
            <button class='btn-info'>Update</button>
            <button class='btn-danger'>Delete</button>
            </div>
            </td>
        </tr>
</table>
<button class='btn-success' @click='cre_cam'> Create a new campaign </button>
    </div>
    <div v-if='flag=="False"'>
    <p>You are flagged!!</p>
    </div>
    </div>
    <div v-else>
    </div>`,
data(){
    return {
        name:'',
        ind:'',
        email:'',
        flag:'',
        approval:'',
        site:'',
        camps:[],
        date:new Date() ,
        create:false,
    }
},
methods:{
    cre_cam(){
        router.push('/cre_cam/'+this.email)
    }
},
async mounted(){
    const url=window.location.origin
    const val=await fetch(url+'/api/spons')
    if (val.ok){
        let info=await val.json()
        info=info[0]
        this.name=info.name
        this.ind=info.ind
        this.email=info.email
        this.flag=info.flag
        this.approval=info.approval
        this.site=info.site
    }
    const val_camps=await fetch(url + '/api/camps')
   if (val_camps.ok){
    let cinfo=await val_camps.json()
    this.camps=cinfo
    console.log(new Date(this.camps[0].e_date)<= this.date)
   }
}
}
export default spons_profile