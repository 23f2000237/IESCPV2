const admin_profile={
template:`
<div>
        <h1>Welcome {{name}}</h1>
        <table v-for="c in camps">
        <caption>Campaigns</caption>
            <tr> 
                <td> {{c[0]}}  {{c[2]}}   </td>
            </tr>
        </table>
        <table class='table-warning'>
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
               <div class='table-danger'> <button @click="flag(s[3])" class='btn-success'> Unflag </button> </div>
               </div>
               <div v-else>
               <div class='table-success'> <button @click="flag(s[3])" class='btn-danger'> Flag </button> </div>
               </div>
               </td>
               <td>
               <div v-if="s[4]=='False'">
               <div class='table-success'> <button @click="flag(s[4])" class='btn-success'> Approve </button> </div>
               </div>
               <div v-else>
               <div class='table-success'>Approved </div>
               </div>
               </td>
               <td><button @click="visit(s[5])" class='btn-success'>Visit site </button></td>        
            </tr>
        </table>
        <table>
        <caption>Influencers</caption>
        <tr v-for="i in inf">
        <td>{{i[0]}}</td>
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
        sp_info:[]
    }},
    methods:
    {
        async flag(fl){
            console.log(fl)
        },
        visit(l){
            window.location.replace(l)
        }
    },
 async mounted(){
    const url=window.location.origin
    const val_spons=await fetch(url+'/api/spons')
    const val_admin=await fetch(url+'/profile')
    if (val_spons.ok){
       const sinfo=await val_spons.json()
        this.sp_info=sinfo
    }
    if (val_admin.ok){
        const ainfo=await val_admin.json()
        this.name=ainfo.name
    }
 }
}
export default  admin_profile