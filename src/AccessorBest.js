class AccessorBest 
{
    async initBests()
    {
        let bests = localStorage.getItem("bests");
        bests = JSON.parse(bests) || {};
        //if(!bests) bests = {};    
        saveBests(bests);
    }
    
    async addBest(best)
    {
        console.log("addBest("+best+")");
        let bests = localStorage.getItem("bests") || {};
        bests = JSON.parse(bests);
        bests[best] = 1;
        console.log("bests:"+JSON.stringify(bests));
        localStorage.setItem("bests", JSON.stringify(bests));
    }
    
    async listBests()
    {
        let bests = localStorage.getItem("bests");
        return JSON.parse(bests);
    }
    
    async saveBests(bests)
    {
        localStorage.setItem("bests", JSON.stringify(bests));
    }
    
}

