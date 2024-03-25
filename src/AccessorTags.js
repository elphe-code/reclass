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
