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


class AccessorNames
{    
    LINK = 'https://www.namebase.io/api/user/domains/owned?';
    PARA = 'sortKey=acquiredAt&sortDirection=desc&limit=100&minLength=8&offset=';
    LINK_STATS = 'https://www.namebase.io/api/user/wallet';
    constructor() 
    {
        this.para = [];
        this.para['sortKey'] = 'acquiredAt'; // expires
        this.para['sortDirection'] = 'asc'; // desc
        this.para['limit'] = '100';
        this.para['offset'] = '0';        
        //this.resetPara();
    }  
    resetPara()
    {
        this.para['sortKey'] = 'acquired'; // expires
        this.para['sortDirection'] = 'asc'; // desc
        this.para['limit'] = '100';
        this.para['offset'] = '0';        
    }
    preparePara()
    {
        return Object.keys(this.para)
        .map(cle => `${encodeURIComponent(cle)}=${encodeURIComponent(this.para[cle])}`)
        .join('&');
    }
    sleepSomeTime(tenth) 
    {
       return new Promise(resolve => setTimeout(resolve, 10*tenth));
    }
    async getLink(link)
    {
        let data = '';
        try
        {
            let message = await fetch(link);
            data = await message.json();
        }
        catch(e)
        {
            console.log(e);
        }
        return data;                    
    }
    async postLink(data)
    {
        var options = {
              method: "POST",
              headers: {"Content-Type": "application/json",},
        };
        options = Object.assign({}, options, data); 
        const reponse = await fetch(url, options);        
    }
    async transferName(name, address, secret)
    {
        let totp = new jsOTP.totp();
        let token = totp.getOtp(secret);
        
        var data = {};
        data['address'] = address;
        var options = {
              method: "POST",
              headers: {"Content-Type": "application/json","x-totp-tokens":token},
        };
        options['body'] = JSON.stringify(data);        
        let link = 'https://www.namebase.io/api/domains/'+name+'/transfer';
        const response = await fetch(link, options); 
        console.log(response);
    }
    async getLinkNames(link)
    {
        let domains = [];
        try
        {
            let message = await fetch(link);
            let data = await message.json();
            domains = data.domains;
        }
        catch(e)
        {
            console.log(e);
        }
        return domains;                    
    }
    async listNames(page)
    {
        console.log("listNames("+page+")");
        let link = this.LINK + this.PARA + page*100;
        console.log(link);
        return this.getLinkNames(link);
    } 
    async searchNames(search, page)
    {
        let para = this.para;
        if(search['start']) para['startsWith'] = search['start'];
        if(search['min-length']) para['minLength'] = search['min-length'];
        if(search['max-length']) para['maxLength'] = search['max-length'];
        if(search['age'] != 'any') 
        {
            switch(search['age'])
            {
                case 'expiring':
                    para['sortKey'] = 'expires';
                    para['sortDirection'] = 'asc';
                break;
                case 'not expiring':
                    para['sortKey'] = 'expires';
                    para['sortDirection'] = 'desc';
                break;
                case 'newest':
                    para['sortKey'] = 'acquiredAt';
                    para['sortDirection'] = 'desc';
                break;
                case 'oldest':
                    para['sortKey'] = 'acquiredAt';
                    para['sortDirection'] = 'asc';
                break;
                    
            }
        }
        para['offset'] = page*100;
        console.log(para);
      
        let link = this.LINK + this.preparePara();
        console.log(link);
        return this.getLinkNames(link);        
    }
    async listNamesExpiring(x)
    {
        console.log("listNamesExpiring("+x+")");
        this.para['sortKey'] = 'expires'; 
        this.para['offset'] = x*100;
        console.log(this.para);
        
        let link = this.LINK + this.preparePara();
        console.log(link);
        return this.getLinkNames(link);
    } 
    async countNamesInWallet()
    {
        let data = await this.getLink(this.LINK_STATS);
        return data.totalCountOwnedDomains;
    }
    
}

class AccessorTags
{
    listTags()
    {
        let tags = [];
        tags[tags.length] = 'en';
        tags[tags.length] = '2W';
        tags[tags.length] = '3L';
        tags[tags.length] = 'emoji';
        tags[tags.length] = 'emoji2';
        tags[tags.length] = 'creation';
        tags[tags.length] = 'selling';
        return tags;
    }
    applyTag(name, tag)
    {
        console.log("applyTag("+name+","+tag+")");
        let tagged = localStorage.getItem("tagged") || {};
        console.log(tagged);
        tagged = JSON.parse(tagged);
        tagged[name] = tag;
        console.log("tagged:"+JSON.stringify(tagged));
        localStorage.setItem("tagged", JSON.stringify(tagged));                
    }
    removeTag(name, tag)
    {
        console.log("applyTag("+name+","+tag+")");
        let tagged = localStorage.getItem("tagged") || '{}';
        tagged = JSON.parse(tagged);
        tagged[name] = '';
        console.log("tagged:"+JSON.stringify(tagged));
        localStorage.setItem("tagged", JSON.stringify(tagged));                                
    }
    getTaggedNames()
    {
        console.log("getTaggedNames()");
        let tagged = localStorage.getItem("tagged") || '{}';
        tagged = JSON.parse(tagged);
        return tagged;
    }
    getNamesForTag(tag)
    {
        console.log("getTaggedNames()");
        let tagged = localStorage.getItem("tagged") || '{}';
        tagged = JSON.parse(tagged);
        let filtered = Object.keys(tagged).filter(name => tagged[name] == tag);
        //console.log(filtered);
        return filtered;
    }
    eraseAllTags()
    {
        let tagged = [];
        localStorage.setItem("tagged", JSON.stringify(tagged));   
    }
}
