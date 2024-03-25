var page = new Page();
class App
{
    async navigate()
    {
        let path = window.location.pathname;
        let hash = window.location.hash;
        console.log(hash);
        page.close();
        if(hash == "")
        {
            //page = new Page();
            //page.display();
            page = new PageAbout();
            page.display();
        }
        if(hash == "#portfolio")
        {
            page = new PagePortfolio();
            page.display();
            page.showSomeNames();
        }
        if(hash == "#classify")
        {
            console.log('#classify');
            page = new PageClassify();
            page.display();
            let tagsAccessor = new AccessorTags();
            let tags = tagsAccessor.listTags();
            console.log(tags)
            page.showPages();
            page.showTags(tags);
        }
        if(hash == "#classed")
        {
            page = new PageClassed();
            page.display();
            let tagsAccessor = new AccessorTags();
            let tags = tagsAccessor.listTags();
            console.log(tags)
            page.showTags(tags);
        }
        if(hash == "#bests")
        {
            page = new PageBests();
            page.display();
            let bestsAccessor = new AccessorBest();
            let bests = await bestsAccessor.listBests();
            console.log(bests);
            page.showBests(bests);
        }
        if(hash == "#tags")
        {
            page = new PageTags();
            page.display();
            let tagsAccessor = new AccessorTags();
            let tags = tagsAccessor.listTags();
            console.log(tags)
            page.showTags(tags);
        }
        if(hash == "#transfer")
        {
            page = new PageTransfer();
            page.display();
        }
        if(hash == "#about")
        {
            page = new PageAbout();
            page.display();
        }
    }
}

var app = new App();
//window.addEventListener('hashchange', app.navigate);
// only one event handler - no add event listener
window.onhashchange = app.navigate;
app.navigate();
