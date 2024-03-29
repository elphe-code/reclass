class PagePortfolio extends Page {
    thisPagePortfolio = this;
    PAGES = 1;
    OFFSET = 0;
    
    constructor() {
        super("PORTFOLIO");
        PagePortfolio.thisPagePortfolio = this;
        this.page = 0;
    }
    display()
    {
        super.display();
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += PagePortfolio.HTML.replace("[FILTERS]",PagePortfolio.HTML_FILTERS);
        body.innerHTML += '<style>' + PagePortfolio.CSS.join("\n") + '</style>';
        super.displayDomains();

        this.prepareFilters();     
    }
    prepareFilters()
    {
        console.log("prepareFilters()");
        let filterButton = document.getElementById('filter-button');
        filterButton.onclick = (e) => {PagePortfolio.thisPagePortfolio.searchWithFilters();};
        let pageBack = document.getElementById('page-back');
        pageBack.onclick = (e) => {PagePortfolio.thisPagePortfolio.turnPage(-1);};
        let pageForward = document.getElementById('page-forward');
        pageForward.onclick = (e) => {PagePortfolio.thisPagePortfolio.turnPage(1);};
        console.log(filterButton.onclick);
    }
    // I keep the page even when changing the search
    turnPage(increment) 
    {
        let page = PagePortfolio.thisPagePortfolio.page;
        page = page+increment;
        if(page < 0) page = 0;
        PagePortfolio.thisPagePortfolio.page = page;
        document.getElementById('no-page').innerHTML = (page+1);
        PagePortfolio.thisPagePortfolio.searchWithFilters();
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
    async showNames(domains)
    {
        let domainsView = document.getElementById('domains');
        domainsView.innerHTML = '';
        for(let position = 0; position < domains.length && this.open; position++)
        {
            console.log("open " + this.open);
            let domain = domains[position];
            let name = domain.name;
            console.log("name + " + name);
            name = checkAndConvertPunycode(name);
            //domainsView.innerHTML += '<div>'+name+'</div>';
    
            let div = this.createDivWithText(name);
            console.log(div);
            
            div.addEventListener("click", (e)=>{this.thisPagePortfolio.chooseBest(e.srcElement)});
            domainsView.append(div);
            
        }
    }
    async showSomeNames()
    {
        let DEFAULT_AGE = 'expiring';
        let search = {};
        search['age'] = DEFAULT_AGE;

        let namesAccessor = new AccessorNames();
        let domains = await namesAccessor.searchNames(search,0);
        this.showNames(domains);
    }

    // EVENTS 

    async chooseBest(best)
    {
        console.log('chooseBest');
        console.log(best);
        best.style.backgroundColor = 'pink';
        let accessor = new AccessorBest();
        accessor.addBest(best.innerHTML);
    }
}

PagePortfolio.CSS = [
    '#filters { margin-left:5vw; width:88vw;padding:2vw; border:solid 0.2vw #476654; border-radius:3vw;}',
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

    '#filters { margin-top:3vw; }',
    '.domains {border-radius:3vw;padding:2vw;margin:3vw 5vw 5vw 5vw;}',
    
];

PagePortfolio.HTML = `
[FILTERS]
`;
PagePortfolio.HTML_FILTERS = `
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
        <a href="#portfolio" id="filter-button">SEARCH</a>
        &nbsp;&nbsp;&nbsp;
        <label for="page-forward">PAGE</label>
        <button href="#portfolio" id="page-back"><<</button>
        <span id="no-page">1</span>
        <button href="#portfolio" id="page-forward">>></button>
    </div>
`;
