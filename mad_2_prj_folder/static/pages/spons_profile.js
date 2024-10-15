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
<div v-if="create" >
<button class='btn-danger' @click='cre_cam'>Not now</button>
</div>
<div v-else>
<button class='btn-success' @click='cre_cam'>Create new Campaign</button>
</div>
<div v-if="create">
<table>
    <tr>
        <th scope="col">title</th>
        <th scope="col">Message</th>
        <th scope="col">S_date</th>
        <th scope="col">E_date</th>
        <th scope="col">Budget</th>
        <th scope="col">Niche</th>
        <th scope="col">       </th>
        </tr>
        <tr>
        <td> <input type="text" placeholder='Enter your title' v-model='new_camp.title' required> </td>
        <td> <input type="text" placeholder='Explain your campaign' v-model="new_camp.Message" required></td>
        <td> <input type="date" v-model="new_camp.S_date" required> </td>
        <td> <input type="date" v-model="new_camp.E_date" required> </td>
        <td> <input type="number" v-model="new_camp.Budget" required> </td>
        <td> <input type="text" placeholder='Enter your niche' v-model="new_camp.Niche" required> </td>
        </tr>
</table>
<p v-if="new_camp.Niche.length > 1">
You are creating a new campaign called {{new_camp.title}} starting on {{new_camp.S_date}} and ending on {{new_camp.E_date}} with a budget of &#8377{{new_camp.Budget}}
<button class='btn-info' @click='cre'> Yes Create </button>
</p>
</div>
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
        new_camp:{
            title:'',
            Message:'',
            S_date:new Date(),
            E_date:new Date(),
            Budget:0,
            Niche:'',
            Flag:'True',
            s_email:''
        }
    }
},
methods:{
    cre_cam(){
        this.create=!this.create
    },
    async cre(){
        this.new_camp.s_email=this.email
        const url=window.location.origin
        const val= await fetch(
            url+'/api/camps',
            {
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(this.new_camp)
            })
        if (val.ok){
            let info = await val.json()
            console.log(info)
        }   
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
   }
}
}
export default spons_profile