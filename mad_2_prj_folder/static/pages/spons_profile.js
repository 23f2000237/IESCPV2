import router from "../utils/router.js"
import crecam from "../components/cre_cam.js"

function inval_date(st){
    !isNaN(new Date(st))
}

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
            <button class='btn-info' @click='upd(c)'>Update</button>
            <button class='btn-danger' @click='del(c)'>Delete</button>
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
    <p>You are not approved </p>
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
        url:window.location.origin,
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
        }
        window
    },
    async del(c){
      const ind=this.camps.indexOf(c)
      if(confirm("Are you sure ?")){
       const del_req=fetch(
        this.url+'/api/camps',
        {
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.camps[ind])
        })
        this.camps.splice(ind,1)
      }
    },
    async upd(c){
        let op={}
        op['C_id']=c.c_id
        op['title']=window.prompt('Are you changing your title from '+c['title']+' ? (click o', c['title'])
        c['title']=op['title']
        op['Message']=window.prompt('Are you changing your message from '+c['message']+' ?',c['message'])
        c['message']=op['Message']
        op['S_date']=window.prompt('Are you changing '+op['title']+"'s Start date from "+c['s_date']+' ?',c['s_date'])
        c['s_date']=op['S_date']
        op['E_date']=window.prompt('Are you changing '+op['title']+"'s End date from "+c['e_date']+' ?',c['e_date'])
        c['e_date']=op['E_date']
        op['Budget']=Number(window.prompt('Are you changing '+op['title']+"'s Budget from "+c['budget']+' ?',c['budget']))
        c['budget']=op['Budget']
        op['Niche']=window.prompt('Are you changing'+op['title']+"'s Niche from "+c['niche']+' ?',c['niche'])
        c['niche']=op['Niche']
        const put_req=await fetch(
            this.url+'/api/camps',
            {
                method:'PUT',
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(op)
            }
        )
    },    
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