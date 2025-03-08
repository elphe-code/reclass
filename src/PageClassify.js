class PageClassify extends Page {
    thisPageClassify = this;
    OFFSET = 0;
    PAGES = 1;
    page = 0;
    
    constructor() {
        super("CLASSIFY");
        PageClassify.thisPageClassify = this;
        PageClassify.thisPageClassify.page = 0;
    }

    display(){
        super.display();
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += PageClassify.HTML.replace("[FILTERS]",PageClassify.HTML_FILTERS);
        body.innerHTML += '<style>' + PageClassify.CSS.join("\n") + '</style>';

        this.prepareFilters();     
    }
    prepareFilters()
    {
        let filterButton = document.getElementById('filter-button');
        filterButton.onclick = (e) => {PageClassify.thisPageClassify.searchWithFilters();};
        let pageBack = document.getElementById('page-back');
        pageBack.onclick = (e) => {PageClassify.thisPageClassify.turnPage(-1);};
        let pageForward = document.getElementById('page-forward');
        pageForward.onclick = (e) => {PageClassify.thisPageClassify.turnPage(1);};
    }
    // I keep the page even when changing the search
    turnPage(increment) 
    {
        let page = PageClassify.thisPageClassify.page;
        page = page+increment;
        if(page < 0) page = 0;
        PageClassify.thisPageClassify.page = page;
        document.getElementById('no-page').innerHTML = (page+1);
        PageClassify.thisPageClassify.searchWithFilters();
    }
    async searchWithFilters()
    {
        console.log('searchWithFilters()');

        let filterStart = document.getElementById('filter-start');
        let filterLengthType = document.getElementById('filter-length-type');
        let filterLength = document.getElementById('filter-length');
        let filterAge = document.getElementById('filter-age');
        let filterPage = document.getElementById('no-page');

        let start = filterStart.value;
        let length = filterLength.value;
        let lengthType = filterLengthType.value;
        let age = filterAge.value;
        let page = parseInt(filterPage.innerHTML) - 1;

        let search = {};
        if(start) search['start'] = start;
        if(lengthType == 'min' && length) search['min-length'] = length;
        if(lengthType == 'max' && length) search['max-length'] = length;
        if(age) search['age'] = age;
        console.log(search);

        let namesAccessor = new AccessorNames();
        let domains = await namesAccessor.searchNames(search,page);
        this.showNames(domains);
    }    
    async showTags(tags)
    {
        let tagsView = document.getElementById('tags');      
        let div = this.createDivWithText('Please select the tag to apply : ');
        div.className = "instruction"; 
        tagsView.append(div);

        let position = 0;
        for(let tag of tags)
        {
            position = position+1;
            let div = this.createDivWithText(tag);
            div.addEventListener("click", (e)=>{this.thisPageClassify.selectTag(e.srcElement)});
            tagsView.append(div);
        }
    }
    async showNames(domains)
    {
        console.log('showNames()');
        let accessor = new AccessorTags();
        let taggedNames = accessor.getTaggedNames();
        console.log("TAGGED NAMES");
        console.log(taggedNames);
        let domainsView = document.getElementById('domains');
        domainsView.innerHTML = '';
        
        for(let position = 0; position < domains.length && this.open; position++)
        {
            //console.log("open " + this.open);
            let domain = domains[position];
            let nom = domain.name;
            //console.log("nom + " + nom);
            nom = convertFromPunycode(nom);
    
            let div = this.createDivWithText(nom);
            let tag = taggedNames[nom];
            //console.log('TAG:' + tag);
            if(tag)
            {
                let span = this.createSpanWithText(tag);
                div.append(span);                
                div.onclick = (e)=>{this.thisPageClassify.revokeTag(e.srcElement)};
            }
            else
            {
                div.onclick = (e)=>{this.thisPageClassify.attributeTag(e.srcElement)};
            }

            //div.addEventListener("click", (e)=>{this.thisPageClassify.attributeTag(e.srcElement)});
            domainsView.append(div);  
        }
    }
    async showPages()
    {
        console.log('showPages()');
        let namesAccessor = new AccessorNames();
        //for(let page = 0 + OFFSET; page < PAGES + OFFSET; page++)
        let page = 0;
        //{
            let domains = await namesAccessor.listNames(page);
            this.showNames(domains);
            await namesAccessor.sleepSomeTime(500);
        //}
    }

    // EVENTS 

    selectedTagElement = null;
    selectedTag = null;
    async selectTag(element)
    {
        console.log(element);
        if(this.selectedTagElement)
        {
            this.selectedTagElement.style.backgroundColor = '#ccccff';
            this.selectedTagElement.style.color = 'black';         
        }
        
        this.selectedTagElement = element;
        this.selectedTag = element.innerHTML;
        
        element.style.backgroundColor = 'black'; // todo class
        element.style.color = 'white'; // todo class
    }
    
    async attributeTag(element)
    {
        if(!this.selectedTag) return;
        let accessor = new AccessorTags();
        let name = element.innerHTML.split('<span>')[0];
        accessor.applyTag(name, this.selectedTag);
        element.innerHTML = name + '<span>'+this.selectedTag+'</span>';
        //element.replaceWith(element.cloneNode(true)); // Suporess all listeners // or eventually use onclick
        //element.addEventListener("click", (e)=>{this.thisPageClassify.revokeTag(e.srcElement)});
        element.onclick = (e)=>{this.thisPageClassify.revokeTag(e.srcElement)};
    }

    async revokeTag(element)
    {
        let accessor = new AccessorTags();
        let name = element.innerHTML.split('<span>')[0];
        accessor.applyTag(name, "");
        element.innerHTML = name;// + '<span></span>';
        //element.replaceWith(element.cloneNode(true)); // Suporess all listeners // or eventually use onclick
        //element.addEventListener("click", (e)=>{this.thisPageClassify.attributeTag(e.srcElement)});
        element.onclick = (e)=>{this.thisPageClassify.attributeTag(e.srcElement)};
    }
}

PageClassify.CSS = [
    '#tags {background-color:#efefff;border:solid 1vw black; }',
    '#tags {border-radius:3vw;padding:2vw;margin:5vw 5vw 2vw 5vw;}',
    '#tags {display:flex;flex-direction:row; flex-wrap:wrap;}',
    '#tags > div {font-size:3vw; margin:1.25vw; padding:1vw; cursor:pointer;}',
    '#tags > div {background-color:#ccccff; color:#333333; font-weight:bold; }',
    '#tags > div:hover {background-color:#bbbbee; color:#333333;}',
    '#tags > div:focus {background-color:#6666ee; color:white;}',
    '#tags > div.instruction {width:100%; background-color:yellow; color:#000;}',
        
    '#filters { margin-left:5vw; width:88vw;padding:2vw; border:solid 0.2vw #476654;border-radius:3vw;}',
    '#filters { background: rgb(12,113,80);background: linear-gradient(90deg, rgba(12,113,80,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%);font-size:2vw;}',    
    '#filters label, #filters span { font-weight:bold;color:white;}',
    '#filters select, #filters option {font-weight:bold;color:#111111;background-color:#abeeab;}',
    '#filters input {font-weight:bold;color:#111111;background-color:#abeeab;}',
    '#filters #filter-start { width:5vw;}',
    '#filters #filter-length { width:10vw;}',
    '#filters #filter-button { padding:0.5vw;font-weight:bold;}',
    '#filters #filter-button { background-color:#333333;color:white;}',
    '#filters #filter-button:hover { background-color:black;color:white;}',
    '#filters #page-back { padding:0.5vw;font-weight:bold;}',
    '#filters #page-back{ background-color:#333333;color:white;}',    
    '#filters #page-forward { padding:0.5vw;font-weight:bold;}',
    '#filters #page-forward { background-color:#333333;color:white;border:none;}',   
    
    '#domains {background-color:#ffffe0;border:solid 1vw black; }',
    '#domains {border-radius:3vw;padding:2vw;margin:2vw 5vw 5vw 5vw;}',
    '#domains {display:flex;flex-direction:row; flex-wrap:wrap;}',
    '#domains > div {font-size:3vw; margin:1.25vw; padding:1vw; cursor:pointer;}',
    '#domains > div > span {font-size:2vw; border-radius: 1vw; display:inline-block;margin-left:1vw;padding:1vw;}',
    '#domains > div {background-color:#affaac; color:#333333; font-weight:bold; }',
    '#domains > div > span {background-color:#3ea63a; color:black; }',
];

PageClassify.HTML = `
    <div id="tags"></div>
    [FILTERS]
    <div id="pages">
                
    </div>
    <div><div id="domains" class="domains"></div></div>
`;

PageClassify.HTML_FILTERS = `
    <div id="filters">
        <label for="filter-start">START</label>
        <input id="filter-start" type="text"/>
        <label for="filter-length">LENGTH</label>
        <select id="filter-length-type">
            <option>any</option>
            <option>min</option>
            <option>max</option>
        </select>
        <input id="filter-length" type="text"/>
        <label for="filter-age">AGE</label>
        <select id="filter-age">
            <option>any</option>
            <option>expiring</option>
            <option>not expiring</option>
            <option>newest</option>
            <option>oldest</option>
        </select>
        <a href="#classify" id="filter-button">SEARCH</a>
        &nbsp;&nbsp;&nbsp;
        <label for="page-forward">PAGE</label>
        <button href="#classify" id="page-back"><<</button>
        <span id="no-page">1</span>
        <button href="#classify" id="page-forward">>></button>
    </div>
`;
