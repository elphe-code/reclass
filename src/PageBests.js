class PageBests extends Page {
    constructor() {
        super("BESTS");
    }

    display(){
        super.display();
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += '<style>' + PageBests.CSS.join("\n") + '</style>';
    }
    async showBests(bests)
    {
        super.displayDomains();
        let names = Object.keys(bests);
        let domainsView = document.getElementById('domains');
        let deco = "";
        for(let position = 0; position < names.length; position++)
        {
            deco = "";
            let nom = names[position];
            //nom = checkAndConvertPunycode(nom);
            let div = this.createDivWithText(nom);
            console.log(div);
            if(nom.includes("-")) div.classList.add('dash');
            if(bests[nom]) div.classList.add('best');
            
            domainsView.append(div);
        }
    }
}

PageBests.CSS = [
    '#prefered {padding: 2vw; margin: 2vw; margin-left: 6vw; width: 40vw; font-size: 1.5vw;}',    
    '#prefered {border: solid 1vw black;  border-radius: 2vw;  background-color: #d2e6fc;}'];

