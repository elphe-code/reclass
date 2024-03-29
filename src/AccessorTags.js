class AccessorTags
{
    TAGGED_NAME = "tagged";
    
    listTags()
    {        
        let tagsFromUser = TAGS_FROM_USER.split("\n");
        tagsFromUser = tagsFromUser.map(e => e.trim());
        tagsFromUser = tagsFromUser.filter(e => e.length > 0);
        
        if(tagsFromUser.length > 0) return tagsFromUser;
        
        //var TAGS = ['en','2W','3L','emoji','emoji2','creation','selling'];
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
        console.log("AccessorTags.applyTag("+name+","+tag+")");
        let tagged = localStorage.getItem(this.TAGGED_NAME) || '{}';
        console.log("init bug");
        console.log(tagged);
        tagged = JSON.parse(tagged);
        tagged[name] = tag;
        console.log("tagged:"+JSON.stringify(tagged));
        localStorage.setItem(this.TAGGED_NAME, JSON.stringify(tagged));                
    }
    getTaggedNames()
    {
        console.log("AccessorTags.getTaggedNames()");
        let tagged = localStorage.getItem(this.TAGGED_NAME) || '{}';
        tagged = JSON.parse(tagged);
        return tagged;
    }
    getNamesForTag(tag)
    {
        console.log("AccessorTags.getTaggedNames()");
        let tagged = localStorage.getItem(this.TAGGED_NAME) || '{}';
        tagged = JSON.parse(tagged);
        let filtered = Object.keys(tagged).filter(name => tagged[name] == tag);
        //console.log(filtered);
        return filtered;
    }
    removeTag(name, tag)
    {
        console.log("AccessorTags.removeTag("+name+","+tag+")");
        let tagged = localStorage.getItem(this.TAGGED_NAME) || '{}';
        tagged = JSON.parse(tagged);
        tagged[name] = '';
        console.log("tagged:"+JSON.stringify(tagged));
        localStorage.setItem(this.TAGGED_NAME, JSON.stringify(tagged));                                
    }
    removeNames(names)
    {
        console.log("AccessorTags.removeNames()");
        let tagged = localStorage.getItem(this.TAGGED_NAME) || '{}';
        tagged = JSON.parse(tagged);
        for(let name of names)
        {
            tagged[name] = '';        
        }
        console.log("tagged:"+JSON.stringify(tagged));
        localStorage.setItem(this.TAGGED_NAME, JSON.stringify(tagged));                                
    }
    eraseAllTags()
    {
        let tagged = {};
        localStorage.setItem(this.TAGGED_NAME, JSON.stringify(tagged));   
    }
}

//let accessorTags = new AccessorTags();
//accessorTags.eraseAllTags();