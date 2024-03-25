class PageClassed extends Page {
    thisPageClassed = this;
    constructor() {
        super("CLASSED");
    }

    display(){
        super.display();
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += PageClassed.HTML;
        body.innerHTML += '<style>' + PageClassed.CSS.join("\n") + '</style>';        
    }
    async showTags(tags)
    {
        let tagsView = document.getElementById('tags');      
        let div = this.createDivWithText('Please select the tag to display : ');
        div.className = "instruction"; 
        tagsView.append(div);

        let position = 0;
        for(let tag of tags)
        {
            position = position+1;
            let div = this.createDivWithText(tag);
            div.addEventListener("click", (e)=>{this.thisPageClassed.selectTag(e.srcElement)});
            tagsView.append(div);
        }
    }
    async showNames(names)
    {
        let domainsView = document.getElementById('classed');
        domainsView.clearChildren();
        for(let name of names)
        {
            console.log("nom + " + name);
            name = checkAndConvertPunycode(name);
    
            let div = this.createDivWithText(name);            
            domainsView.append(div);  
        }
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

        let accessor = new AccessorTags();
        let taggedNames = accessor.getNamesForTag(this.selectedTag);
        this.showNames(taggedNames);
    }

}

PageClassed.CSS = [
    '#tags {background-color:#efefff;border:solid 1vw black; }',
    '#tags {border-radius:3vw;padding:2vw;margin:5vw;}',
    '#tags {display:flex;flex-direction:row; flex-wrap:wrap;}',
    '#tags > div {font-size:3vw; margin:1.25vw; padding:1vw; cursor:pointer;}',
    '#tags > div {background-color:#ccccff; color:#333333; font-weight:bold; }',
    '#tags > div:hover {background-color:#bbbbee; color:#333333;}',
    '#tags > div:focus {background-color:#6666ee; color:white;}',
    '#tags > div.instruction {width:100%; background-color:yellow; color:#000;}',
    '#classed {background-color:#ffffe0;border:solid 1vw black; }',
    '#classed {border-radius:3vw;padding:2vw;margin:5vw;}',
    '#classed {display:flex;flex-direction:row; flex-wrap:wrap;}',
    '#classed > div {font-size:3vw; margin:1.25vw; padding:1vw; }',
    '#classed > div {background-color:#61d0ff; color:#333333; font-weight:bold; }',
    '#classed > div > span {font-size:2vw; border-radius: 1vw; display:inline-block;margin-left:1vw;padding:1vw;}',
    '#classed > div > span {background-color:#aaaacc; }',
];

PageClassed.HTML = '\
    <div id="tags"></div>\
    <div id="classed"></div>\
';


