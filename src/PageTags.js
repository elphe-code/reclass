class PageTags extends Page {
    constructor() {
        super("TAGS");
    }
    display(){
        super.display();
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += '<style>' + PageMenu.CSS.join("\n") + '</style>';
    }
    showTags(tags)
    {
        let tagsView = document.getElementById('domains');      
        for(let tag of tags)
        {
            tagsView.innerHTML += '<div>'+tag+'</div>';
        }
        tagsView.innerHTML += '<div><a>+</a></div>';        
    }
}

PageTags.CSS = [
    '#domains > div {display:block;}',
];