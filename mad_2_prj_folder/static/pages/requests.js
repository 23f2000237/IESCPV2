import router from "../utils/router.js";
const requests={
    template:`
    <div>
    <div class="card text-bg-info mb-3" style="max-width: 18rem;"  v-for="ad in ads">
  <div class="card-header"> {{ad.Title}} </div>
  <div class="card-body">
    <h5 class="card-title"> Negotiated: ₹{{ad.Negotiated}}</h5>
    <p class="card-text"> {{ad.Message}} </p>
    <div v-if="ad.Status!='Paid'">
    <div v-if="ad.Status =='pending'">
    <div class="card-text" v-if="ad.Status=='Negotiated'"> 
    <input type="number" v-model='ad.Negotiated' required>
    </div>
    <button class="btn btn-success" @click="acc(ad)"> Accept </button>
    <button class="btn btn-warning" @click="neg(ad)" v-if="n"> Negotiate </button>
    <button class="btn btn-info" @click="conf(ad)" v-if="ad.Status=='Negotiated'"> confirm </button>
    <button class="btn btn-danger" @click="rej(ad)"> Reject </button>
    </div>
    </div>
    <div v-else>
    <p class="card-text"> You have accepted this Advertisment </p>
    </div>
  </div>
  </div>
  </div>
    </div>
    `,
    data()
    {
        return{
            ads:[],
            tem:{},
            n:true
        }
    },
    methods:{
        async acc(ad){
            ad.Status='Paid'
            const url=window.location.origin
            const fet_req= await fetch(url+'/api/ads',{method:'PUT',headers: {"Content-Type": "application/json",},body: JSON.stringify(ad)})

        },
        async neg(ad){
            this.n=!this.n
        },
        async conf(ad){
            ad.Status="Negotiated"
            const url=window.location.origin
            const fet_req= await fetch(url+'/api/ads',{method:'PUT',headers: {"Content-Type": "application/json",},body: JSON.stringify(ad)})
        },
        async rej(ad){
            const url=window.location.origin
            const fet_req= await fetch(url+'/api/ads',{method:'DELETE',headers: {"Content-Type": "application/json",},body: JSON.stringify(ad)})
            const ind=this.ads.indexOf(ad)
            this.ads.splice(ind,1)
        }
    },
async mounted(){
    const url=window.location.origin
    const val=await fetch(url+'/api/ads')
    if(val.ok){
        let ads=await val.json()
        this.ads=ads.ads
    }
}
}
export default requests;