import router from "../utils/router.js"
const admin_profile={
template:`
<div v-model=sp_info>
        <h1>Welcome {{name}}</h1>
        <table v-for="c in camps">
        <caption>Campaigns</caption>
            <tr> 
                <td> {{c[0]}}  {{c[2]}}   </td>
            </tr>
        </table>
        <table class='table-warning table-bordered'>
        <caption>Sponsors</caption>
         <tr>
        <th scope="col">Name</th>
        <th scope="col">email_id</th>
        <th scope="col">Industry</th>
        <th scope="col">Flag</th>
        <th scope="col">Approval</th>
        <th scope="col">site</th>
        </tr>
            <tr v-for="s in sp_info"> 
               <th>{{s[0]}}</th>
               <td>{{s[1]}}</td>
               <td>{{s[2]}}</td>
               <td>
               <div v-if="s[3]=='False'">
               <div class='table-danger'> <button @click="flag(s)" class='btn-success'> Unflag {{text}} </button> </div>
               </div>
               <div v-else>
               <div class='table-success'> <button @click="flag(s)" class='btn-danger'> Flag {{text}}</button> </div>
               </div>
               </td>
               <td>
               <div v-if="s[4]=='False'">
               <div class='table-success'> <button @click="app(s[4])" class='btn-success'> Approve </button> </div>
               </div>
               <div v-else>
               <div class='table-success'>Approved </div>
               </div>
               </td>
               <td><button @click="visit(s[5])" class='btn-success'>Visit site </button></td>        
            </tr>
        </table>
      <table class='table-primary table-bordered'>
    <caption class="caption">Influencers</caption>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">email</th>
        <th scope="col">Category</th>
        <th scope="col">Niche</th>
        <th scope="col">Reach</th>
        <th scope="col">Balance</th>
        <th scope="col">Flag</th>
        <th scope="col">Site</th>
        </tr>
        <tr v-for="i in inf_info"> 
            <td scope="row">{{i[0]}}</td>
            <td >{{i[1]}}</td>
            <td >{{i[2]}}</td>
            <td >{{i[3]}}</td>
            <td>{{i[4]}}</td>
            <td>     {{i[5]}}</td>
            <div v-if="i[6]=='False'">
            <div class='table-danger'> <button @click="flag_inf(i[6])" class='btn-success'> Unflag </button> </div>
               </div>
            <div v-else>
            <div class='table-danger'> <button @click="flag_inf(i[6])" class='btn-danger'> Flag </button> </div>
            </div>
            <td ><button @click="visit(i[7])" class='btn-success'>Visit site </button></td>
        </tr>
</table>
<table class='table-primary table-bordered'>
    <caption class="caption">Campaingn</caption>
    <tr>
        <th scope="col">C_id</th>
        <th scope="col">email</th>
        <th scope="col">title</th>
        <th scope="col">Message</th>
        <th scope="col">S_date</th>
        <th scope="col">E_date</th>
        <th scope="col">Budget</th>
        <th scope="col">Niche</th>
        <th scope="col">Flag</th>
        </tr>
        <tr v-for="c in camp_info"> 
            <td scope="row">{{c[0]}}</td>
            <td >{{c[1]}}</td>
            <td >{{c[2]}}</td>
            <td>{{c[3]}}</td>
            <td >{{c[4]}}</td>
            <td >{{c[5]}}</td>
            <td>{{c[6]}}</td>
            <td>{{c[7]}}</td>
            <td >{{c[8]}}</td>
        </tr>
</table>
    </div>
`,
data (){
    return {
        ads:[],
        camps:[],
        name:'',
        spons:[],
        text:'',
        inf:[],
        sp_info:[],
        inf_info:[],
        camp_info:[]
    }},
    methods:
    {
        async flag(fl){
            //this is to update the details for sposnsors.
            let upval=''//this will be used as a proxy to update
            let ls=this.sp_info.length
            if (fl[3]=='False'){
                upval='True'
                this.text=' '
            }
            else{
                upval='False'
            }
            for(let i=0 ;i<ls;i++){
                if (this.sp_info[i][1]==fl[1]){
                    this.sp_info[i][3]=upval
                }
            }
            const url=window.location.origin
            const req= await fetch(url+'/api/spons',{
                method:"PUT",headers: {
                    "Content-Type": "application/json",
                  },body:JSON.stringify({"Flag":upval,"email":fl[1]})})

        },
        visit(l){
            window.open(l)
        },
        async flag_inf(fl){
            console.log(fl)
        },
        async app(bl){
            const url=window.location.origin
            const req= await fetch(url+'/api/spons',{
                method:"PUT",headers: {
                    "Content-Type": "application/json",
                  },body:JSON.stringify({"Approval":'True',"email":fl[1]})})
        }
    },
 async mounted(){
    const url=window.location.origin
    const val_spons=await fetch(url+'/api/spons')
    const val_admin=await fetch(url+'/profile')
    const val_inf=await fetch(url + '/api/inf')
    const val_camps=await fetch(url+'/api/camps')
    if (val_spons.ok){
       const sinfo=await val_spons.json()
        this.sp_info=sinfo
    }
    if (val_admin.ok){
        const ainfo=await val_admin.json()
        this.name=ainfo.name
    }
    if (val_inf.ok){
        const iinfo=await val_inf.json()
        this.inf_info=iinfo
    }
    if (val_camps.ok){
        const cinfo=await val_camps.json()
        this.camp_info=cinfo
    }
 }
}
export default  admin_profile