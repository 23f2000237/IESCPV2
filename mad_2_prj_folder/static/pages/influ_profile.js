import router from '../utils/router.js';
const influ_profile={
    template:`
    <div v-if="logged">
    <div v-if="flag">
        <div>
       <h1>Welcome {{name}} </h1>
       <h1>Total earinings this Month: ₹ {{bal}} </h1>
       <h5>Campaigns you are part of: {{par.length}}</h5>
       <h5> (Note, the count is the number of campaigns confirmed) </h5>
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
<button class='btn btn-danger' @click="reqs()"> Check Requests </button>
<button class='btn btn-link' @click="search()">Search for adverts </button>
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
            <button class='btn btn-info' @click='visit(c)'>Visit Sponsor's site</button>
            </div>
            </td>
            <td>
            <button class='btn btn-outline-success' @click='ask(c)'>Request Advert</button>
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
            par:[],
            email:""
        }
    },
    methods:{
        flag_camp(id){
            console.log(id) 
        },
        async visit(c){
            window.open(c.site)
        },
        reqs(){
            router.push('/reqs')
        },
        async ask(c){
            //the influencer is requesting this campaign, so this will start being with a negotiation status
            let ad={}
            ad.title=window.prompt('What is the title you are proposing ? ')
            ad.Message=window.prompt('What message would you like to post to the Sponsor ?')
            ad.Negotiated=window.prompt("What is your negotiated pay? note: The campaign's total budget is ₹"+c.budget)
            if (ad.title==null){
                ad.title=c.title
            }
            if(ad.Message==null){
                ad.Message=c.message
            }
            if(ad.Negotiated==null| ad.Negotiated>=c.budget){
                ad.Negotiated=0
            }
            ad.C_id=c.c_id
            ad.I_email=this.email
            ad.salary=0
            ad.Status='Negotiated'
            const url=window.location.origin
            const val= await fetch(
                url+'/api/ads',
                {
                    method:'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(ad)
                })
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
                this.email=info.email
                }
            const val_camps=await fetch(url + '/api/camps')
            if (val_camps.ok){
                let vinfo=await val_camps.json()
                let po=vinfo.partof
                this.par=po
                let npo=vinfo.notpartof
                this.camps=npo
                console.log
            }
            const val_ads=await fetch(url+'/api/ads')
            if (val_ads.ok){
                let ainfo=await val_ads.json()
            }
        }
    }
export default influ_profile