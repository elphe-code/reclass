var TAGS_FROM_USER =`
en
es
2W
emoji
emoji2
creation
selling
`;

class Html
{
    createDivWithText(text)
    {
        //console.log('createDivWithText()');
        const newDiv = document.createElement("div");
        const newContent = document.createTextNode(text);
        newDiv.appendChild(newContent);
        return newDiv;
    }
    createSpanWithText(text)
    {
        //console.log('createSpanWithText()');
        const newSpan = document.createElement("span");
        const newContent = document.createTextNode(text);
        newSpan.appendChild(newContent);
        return newSpan;
    }
    createLabelWithText(text)
    {
        //console.log('createLabelWithText()');
        const newLabel = document.createElement("label");
        const newContent = document.createTextNode(text);
        newLabel.appendChild(newContent);
        return newLabel;
    }
    createInputWithValue(value)
    {
        //console.log('createInputWithValue()');
        const newInput = document.createElement("input");
        return newInput;
    }    
}
class Layout extends Html{
    
    display()
    {
        console.log("Layout.display()");
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML = '<style>' + Layout.CSS.join("\n") + '</style>';
        body.innerHTML += '<style>' + Layout.CSS_TOGGLE.join("\n") + '</style>';
    }
    
    currentState = false;
    activateToggleDynamically(id, boxName, labelOff, labelOn, callback, value)
    {
        this.currentState = value;
        let divTag = createDivWithText("");
        let labelOffTag = createLabelWithText(labelOff);
        let inputTag = createInputWithValue("");
        inputTag.id = id; inputTag.className = "toggle-state hide-me";
        let labelForToggle = createLabelWithText("");
        labelForToggle.for = id;
        labelForToggle.className = "toggle";
        let labelOnTag = createLabelWithText(labelOn);
        divTag.appendChild(labelOffTag);
        divTag.appendChild(inputTag);
        divTag.appendChild(labelForToggle);
        divTag.appendChild(labelOnTag);
        let box = document.getElementById(boxName);
        box.appendChild(divTag);
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += '<style>' + Visual.CSS_TOGGLE.join("\n") + '</style>';
        let toggle = document.querySelector('#'+id);
        toggle.checked = value;
        console.log('id='+'#'+id);
        console.log(toggle);
        toggle.addEventListener('click', function() {
            console.log('event()');
            let stateSpan = document.querySelector('#'+id);
            var currentState;
            if (toggle.checked) {
                this.currentState = true;
            } else {
                this.currentState = false;
            }
            stateSpan.innerHTML = this.currentState;
            callback(this.currentState);
        }, false);
    }
    activateToggle(id, boxName, labelOff, labelOn, callback, value)
    {
        let box = document.getElementById(boxName);
        box.innerHTML +=  Layout.HTML_TOGGLE.replaceAll('[ID]',id).replace('[LABEL_OFF]',labelOff).replace('[LABEL_ON]',labelOn);
        
        let toggle = document.querySelector('#'+id);
        toggle.checked = value;
        this.currentState = value;
        callback(this.currentState);
        console.log('id='+'#'+id);
        console.log(toggle);
        toggle.addEventListener('click', function() {
            console.log('event()');
            let stateSpan = document.querySelector('#'+id);
            var currentState;
            if (toggle.checked) {
                this.currentState = true;
            } else {
                this.currentState = false;
            }
            stateSpan.innerHTML = this.currentState;
            callback(this.currentState);
        }, false);
    }

}

Layout.HTML_TOGGLE = '\
    <div class="toggle-box">\
        <span class="label-toggle">[LABEL_OFF]</span>\
        <input id="[ID]" class="toggle-state hide-me" type="checkbox" aria-labelledby="[ID]"> \
        <label for="[ID]" class="toggle"></label> \
        <span class="label-toggle">[LABEL_ON]</span>\
    </div>\
    ';
Layout.CSS_TOGGLE = [
    'input[type="checkbox"]{float:left;clear:none;}',  
    'input[type="checkbox"] {appearance: none;background-color: #fff;margin: 0;font: inherit;color: currentColor;width: 1.15em;height: 1.15em;border: 0.15em solid currentColor;border-radius: 0.15em;transform: translateY(-0.075em);}',
    'input[type="checkbox"] {display: grid; place-content: center;}',
    'input[type="checkbox"]::before {  content: "";  background-color:green; width: 0.65em;  height: 0.65em;  transform: scale(0);  transition: 120ms transform ease-in-out;  box-shadow: inset 1em 1em var(--form-control-color);}',
    'input[type="checkbox"]:checked::before {  transform: scale(1);}', 
    '.toggle { position: relative; display:inline-block;margin-top: 0.5vw;width: 15.0vw;height: 7.8vw;}',
    '.toggle { background-color: hsl(0, 0%, 85%);border-radius: 7.5vw;cursor: pointer;transition: background-color 0.25s ease-in; }',
    ".toggle::after { content: ''; position: absolute; top: 0.6vw; left: 0.6vw; width: 6.6vw; height: 6.6vw; }",
    '.toggle::after { background-color: white; border-radius: 50%; transition: all 0.25s ease-out;}',
    '.toggle-state:checked + .toggle { background-color: hsl(102, 58%, 39%); }',
    '.toggle-state:checked + .toggle::after { transform: translateX(7.2vw);}',
    '.hide-me { opacity: 0; height: 0; width: 0; margin:0;}',
    '.label-toggle {position:absolute;display:inline-block; vertical-align:middle;font-size:5vw;top:0;left:20vw;margin:0; font-weight:bold;color:hsl(0, 0%, 85%);}',
    '.toggle-box{position:relative;height:9vw;line-height:9vw;padding:0;background-color:black;}',
];
Layout.CSS = [
    '.hourglass {  display: inline-block;  position: relative;  width: 20vw;  height: 20vw;}',
    '.hourglass::after {  content: " ";  display: block;  border-radius: 50%;  width: 0;  height: 0;  margin: 2vw;  box-sizing: border-box;  border: 8vw solid #fff;  border-color: #fff transparent #fff transparent;  animation: hourglass 1.2s infinite;}',
    '.hourglass.stop::after {  content: " ";  display: block;  border-radius: 50%;  width: 0;  height: 0;  margin: 2vw;  box-sizing: border-box;  border: 8vw solid #fff;  border-color: #fff transparent #fff transparent;  animation: stop 1.2s infinite;}',
    '@keyframes hourglass {  0% { transform: rotate(0); animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }  50% { transform: rotate(900deg); animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }  100% { transform: rotate(1800deg); }}',
    '@keyframes stop {from { transform: rotate(0); }to { transform: rotate(0); }}',
];

class Page extends Layout {
    constructor(title) {
        super();
        this.title = (title)?title:"&nbsp;";
        console.log(this.title);
        this.open = false;
    }
    decorate()
    {
    }

    display () {
        console.log("Page.display()");
        super.display();
        this.open = true;
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML +=  Page.HTML_MENU + Page.HTML.replace('[TITLE]',this.title);
        body.innerHTML += '<style>' + Page.CSS.join("\n") + '</style>';
        this.decorate();
    }
    displayDomains(){
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += Page.HTML_DOMAINS;        
    }
    close(){this.open = false;}
}

Page.HTML = '<header><h1>[TITLE]</h1></header>';
Page.HTML_DOMAINS = '<div><div id="domains" class="domains"></div></div>';
Page.HTML_MENU = '\
    <div><div id="menu">\
        <div><a href="#portfolio">PORTFOLIO</a></div>\
        <div><a href="#bests">BESTS</a></div>\
        <div><a href="#classify">CLASSIFY</a></div>\
        <div><a href="#classed">CLASSED</a></div>\
        <div><a href="#transfer">TRANSFER</a></div>\
        <div><a href="#about">ABOUT</a></div>\
    </div></div>';

Page.CSS = [
    '*{float:none;clear:both;}',
    'header {background-color:black;padding:2vw;width:100vw;}',
    'header h1 {color:white; font-weight:bold;font-size:10vw;}',
    '#page {padding-left:2.5vw;padding-right:2.5vw;}',
    '#page h3 {margin-top:2vw;font-weight:bold;font-size:5vw;font-family:Arial;}',
    '#page ul {margin-left:2.5vw;margin-bottom:2vw;}',
    '#page p {margin-top:2vw;margin-bottom:2vw;}',
    '#page ul {font-family:Verdana;}',
    '#page a {font-weight:bold;color:orange;}',
    '#page p {font-size:3vw;font-family:Arial; }',
    '.domains {background-color:#efefff;border:solid 1vw black; }',
    '.domains {border-radius:3vw;padding:2vw;margin:5vw;}',
    '.domains {display:flex;flex-direction:row; flex-wrap:wrap;}',
    '.domains > div {font-size:3vw; margin:1.25vw; padding:1vw; cursor:pointer;}',
    '.domains > div {background-color:#ccccff; color:#333333; font-weight:bold; }',
    '.domains > div:hover {background-color:#bbbbee; color:#333333;}',
    '.domains > div.best {background-color:pink;}',
    '.domains > div.dash {background-color:yellow;}',
    '#menu {padding-left:1.5vw;height:10vw;width:1000%;display:flex;flex-direction:row;}',
    '#menu > div {padding-left:1.5vw; padding-right:1.5vw;font-size:3vw;padding-top:3vw;}',
    '#menu > div:hover {background-color:#cccccc;}',
    '#menu > div > a {color:black;font-weight:bold;}',
];



class PageAbout extends Page {
    constructor() {
        super("ABOUT");
    }
    display(){
        super.display();
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += PageAbout.HTML;
        body.innerHTML += '<style>' + PageAbout.CSS.join("\n") + '</style>';
        body.innerHTML += PageAbout.HTML_IMAGE.replace("[SRC]", PageAbout.IMAGE_COFFEE);
        this.activateEvents();
    }
    activateEvents()
    {
        let cryptoLink = document.getElementById('crypto-link');
        cryptoLink.onclick = (e)=>{
            let link = e.srcElement;
            let copiedBox = document.getElementById('copied');
            copiedBox.style.display = 'inline-block';
            navigator.clipboard.writeText(link.title);
        }
    }
}

PageAbout.CSS = [
    '#domains > div {display:block;}',
    '#coffee-girl {margin-left:2.5vw; width:45vw; }',
    '#coffee-girl {border:solid 1vw black;cursor:pointer;}',
    '#coffee-girl:hover {opacity:0.5;}',
    '#encouraging { list-style-type: circle; color:black; }',
    '#encouraging li { font-size:2.5vw; }',
    '#encouraging li { list-style-type: circle; color:black;}',
    '#copied { display:none; color:green;font-weight:bold;margin-left:1vw;}',
];

PageAbout.HTML = `
    <div id="page"> 
        <h3>RECLASS/</h3>
        
        <p>RECLASS is a labelling tool 
        allowing to transfert names of each category 
        to a different wallet</p>
        <p>If you like it and it saved you some time,
        please consider encouraging me by : </p>
        
        <div><ul id="encouraging"> 
            <li>Buying me a <a href="https://www.buymeacoffee.com/elphe" target="_blank">coffee</a></li> 
            <li>Sending some  <a id="crypto-link" href="#" title="hs1qlp8vmgj8vg8qa3ej5zhk82vjzxsr4xuwjqaqly">crypto</a> 
            <span id="copied">Copied</span></li> 
            <li>Investing in .PROUDLY <a href="https://porkbun.com/tld/proudly" target="_blank">domains</a></li> 
            <li>Proposing me cool <a href="https://discord.gg/K3GyWuUeyp" target="_blank">contracts</a></li> 
        </ul></div> 
    </div> 
    `;

PageAbout.HTML_IMAGE = '<a href="#"><img id="coffee-girl" title="Nadine coding" src="[SRC]"/></a>';
PageAbout.IMAGE_COFFEE = `data:image/webp;base64,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pLZ3k5UqAAQyh9EvtXoOtOsOsjFnYqgBpxP0AAAg3+AGKFhklqmFwkgHx2gfKy9DBHOH3lhM9ucO15EhQnORBr4szPFEEVLDEz8ecuAGDnsVHUAYAABDMlBBqpoBAAABmqpqdW1iAAAAHmp1bWRjMnBhABEAEIAAAKoAOJtxA2MycGEAAAA53Wp1bWIAAABHanVtZGMybWEAEQAQgAAAqgA4m3EDdXJuOnV1aWQ6MDNkYTYwODktZWU3Ni00OGIxLWJiOTctOTJmNjFjMmY0Y2RhAAAAAbtqdW1iAAAAKWp1bWRjMmFzABEAEIAAAKoAOJtxA2MycGEuYXNzZXJ0aW9ucwAAAADcanVtYgAAACZqdW1kY2JvcgARABCAAACqADibcQNjMnBhLmFjdGlvbnMAAAAArmNib3KhZ2FjdGlvbnOCo2ZhY3Rpb25sYzJwYS5jcmVhdGVkbXNvZnR3YXJlQWdlbnRnREFMTMK3RXFkaWdpdGFsU291cmNlVHlwZXhGaHR0cDovL2N2LmlwdGMub3JnL25ld3Njb2Rlcy9kaWdpdGFsc291cmNldHlwZS90cmFpbmVkQWxnb3JpdGhtaWNNZWRpYaFmYWN0aW9ubmMycGEuY29udmVydGVkAAAArmp1bWIAAAAoanVtZGNib3IAEQAQgAAAqgA4m3EDYzJwYS5oYXNoLmRhdGEAAAAAfmNib3KlamV4Y2x1c2lvbnOBomVzdGFydBoAArhuZmxlbmd0aBk6C2RuYW1lbmp1bWJmIG1hbmlmZXN0Y2FsZ2ZzaGEyNTZkaGFzaFggaoOjyt+agB3BqMnlkyaO6CqcZPXo5bsAXHub5Wj1ADljcGFkSAAAAAAAAAAAAAABump1bWIAAAAkanVtZGMyY2wAEQAQgAAAqgA4m3EDYzJwYS5jbGFpbQAAAAGOY2JvcqhoZGM6dGl0bGVqaW1hZ2Uud2VicGlkYzpmb3JtYXRkd2VicGppbnN0YW5jZUlEeCx4bXA6aWlkOmZhYzYwZmYxLTkwYzMtNDI1ZC1iNTA3LTU4Y2Y5ZmRiMDBmMG9jbGFpbV9nZW5lcmF0b3J4GU9wZW5BSS1BUEkgYzJwYS1ycy8wLjI4LjR0Y2xhaW1fZ2VuZXJhdG9yX2luZm/2aXNpZ25hdHVyZXgZc2VsZiNqdW1iZj1jMnBhLnNpZ25hdHVy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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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d2VicGlkYzpmb3JtYXRkd2VicGppbnN0YW5jZUlEeCx4bXA6aWlkOjQ2MWI5OGEyLTdkNzQtNDFiNS04MDgwLTJlNzNlNmIwYmUzOW9jbGFpbV9nZW5lcmF0b3J2Q2hhdEdQVCBjMnBhLXJzLzAuMjguNHRjbGFpbV9nZW5lcmF0b3JfaW5mb/Zpc2lnbmF0dXJleBlzZWxmI2p1bWJmPWMycGEuc2lnbmF0dXJlamFzc2VydGlvbnODomN1cmx4OXNlbGYjanVtYmY9YzJwYS5hc3NlcnRpb25zL2MycGEudGh1bWJuYWlsLmluZ3JlZGllbnQuanBlZ2RoYXNoWCBwPwpv6ycTn6dwxLYTMHDWPj2eAEnux2JNpjPt4jeM1KJjdXJseCpzZWxmI2p1bWJmPWMycGEuYXNzZXJ0aW9ucy9jMnBhLmluZ3JlZGllbnRkaGFzaFggEyrd1o9NZzICcwKPkewJ9HVAZJsJKD/Hf4tSKh2lyByiY3VybHgpc2VsZiNqdW1iZj1jMnBhLmFzc2VydGlvbnMvYzJwYS5oYXNoLmRhdGFkaGFzaFggUtRrXW8VrYzTjLkwPIEPThBPZ5MuPxQIYBvW5+C5lHtjYWxnZnNoYTI1NgAANhlqdW1iAAAAKGp1bWRjMmNzABEAEIAAAKoAOJtxA2MycGEuc2lnbmF0dXJlAAAANeljYm9y0oRDoQEmo2ZzaWdUc3ShaXRzdFRva2Vuc4GhY3ZhbFkXQTCCFz0wAwIBADCCFzQGCSqGSIb3DQEHAqCCFyUwghchAgEDMQ8wDQYJYIZIAWUDBAIBBQAwgYMGCyqGSIb3DQEJEAEEoHQEcjBwAgEBBglghkgBhv1sBwEwMTANBglghkgBZQMEAgEFAAQguubGYhgWoQ/WuopN1POA0K9xyOV1pGZT7aAhqB77t/ICEQC34GAHPD8aC/Qx+AfXR+LUGA8yMDI0MDMyMzAyMDEzMloCCQCi8C4flWeQkaCCEwkwggbCMIIEqqADAgECAhAFRK/zlJ0IOaa/2z9f5WEWMA0GCSqGSIb3DQEBCwUAMGMxCzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwgSW5jLjE7MDkGA1UEAxMyRGlnaUNlcnQgVHJ1c3RlZCBHNCBSU0E0MDk2IFNIQTI1NiBUaW1lU3RhbXBpbmcgQ0EwHhcNMjMwNzE0MDAwMDAwWhcNMzQxMDEzMjM1OTU5WjBIMQswCQYDVQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4xIDAeBgNVBAMTF0RpZ2lDZXJ0IFRpbWVzdGFtcCAyMDIzMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAo1NFhx2DjlusPlSzI+DPn9fl0uddoQ4J3C9Io5d6OyqcZ9xiFVjBqZMRp82qsmrdECmKHmJjadNYnDVxvzqX65RQjxwg6seaOy+WZuNp52n+W8PWKyAcwZeUtKVQgfLPywemMGjKg0La/H8JJJSkghraarrYO8pd3hkYhftF6g1hbJ3+cV7EBpo88MUueQ8bZlLjyNY+X9pD04T10Mf2SC1eRXWWdf7dEKEbg8G45lKVtUfXeCk5a+B4WZfjRCtK1ZXO7wgX6oJkTf8j48qG7rSkIWRw69XloNpjsy7pBe6q9iT1HbybHLK3X9/w7nZ9MZllR1WdSiQvrCuXvp/k/XtzPjLuUjT71Lvr1KAsNJvj3m5kGQc3AZEPHLVRzapMZoOIaGK7vEEbeBlt5NkP4FhB+9ixLOFRr7StFQYU6mIIE9NpHnxkTZ0P387RXoyqq1AVybPKvNfEO2hEo6U7Qv1zfe7dCv95NBB+plwKWEwAPoVpdceDZNZ1zY8SdlalJPrXxGshuugfNJgvOuprAbD3+yqG7HtSOKmYCaFxsmxxrz64b5bV4RAT/mFHCoz+8LbH1cfebCTwv0KCyqBxPZySkwS0aXAnDU+3tTbRyV8IpHCj7ArxES5k4MsiK8rxKBMhSVF+BmbTO77665E42FEHypS34lCh8zrTioPLQHsCAwEAAaOCAYswggGHMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMCAGA1UdIAQZMBcwCAYGZ4EMAQQCMAsGCWCGSAGG/WwHATAfBgNVHSMEGDAWgBS6FtltTYUvcyl2mi91jGogj57IbzAdBgNVHQ4EFgQUpbbvE+fvzdBkodVWqWUxo97V40kwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDovL2NybDMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZEc0UlNBNDA5NlNIQTI1NlRpbWVTdGFtcGluZ0NBLmNybDCBkAYIKwYBBQUHAQEEgYMwgYAwJAYIKwYBBQUHMAGGGGh0dHA6Ly9vY3NwLmRpZ2ljZXJ0LmNvbTBYBggrBgEFBQcwAoZMaHR0cDovL2NhY2VydHMuZGlnaWNlcnQuY29tL0RpZ2lDZXJ0VHJ1c3RlZEc0UlNBNDA5NlNIQTI1NlRpbWVTdGFtcGluZ0NBLmNydDANBgkqhkiG9w0BAQsFAAOCAgEAgRrW3qCptZgXvHCNT4o8aJzYJf/LLOTN6l0ikuyMIgKpuM+AqNnn48XtJoKKcS8Y3U623mzX4WCcK+3tPUiOuGu6fF29wmE3aEl3o+uQqhLXJ4Xzjh6S2sJAOJ9dyKAuJXglnSoFeoQpmLZXeY/bJlYrsPOnvTcM2Jh2T1a5UsK2nTipgedtQVyMadG5K8TGe8+c+njikxp2oml101DkRBK+IA2eqUTQ+OVJdwhaIcW0z5iVGlS6ubzBaRm6zxbygzc0brBBJt3eWpdPM43UjXd9dUWhpVgmagNF3tlQtVCMr1a9TMXhRsUo063nQwBw3syYnhmJA+rUkTfvTVLzyWAhxFZH7doRS4wyw4jmWOK22z75X7BC1o/jF5HRqsBV44a/rCcsQdCaM0qoNtS5cpZ+l3k4SF/Kwtw9Mt911jZnWon49qfH5U81PAC9vpwqbHkB3NpE5jreODsHXjlY9HxzMVWggBHLFAx+rrz+pOt5Zapo1iLKO+uagjVXKBbLafIymrLS2Dq4sUaGa7oX/cR3bBVsrquvczroSUa31X/MtjjA2Owc9bahuEMs305MfR5ocMB3CtQC4Fxguyj/OOVSWtasFyIjTvTs0xf7UGv/B3cfcZdEQcm4RtNsMnxYL2dHZeUbc7aZ+WssBkbvQR7w8F/g29mtkIBEr4AQQYowggauMIIElqADAgECAhAHNje3JFR82Ees/ShmKl5bMA0GCSqGSIb3DQEBCwUAMGIxCzAJBgNVBAYTAlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5jb20xITAfBgNVBAMTGERpZ2lDZXJ0IFRydXN0ZWQgUm9vdCBHNDAeFw0yMjAzMjMwMDAwMDBaFw0zNzAzMjIyMzU5NTlaMGMxCzAJBgNVBAYTAlVTMRcwFQYDVQQKEw5EaWdpQ2VydCwgSW5jLjE7MDkGA1UEAxMyRGlnaUNlcnQgVHJ1c3RlZCBHNCBSU0E0MDk2IFNIQTI1NiBUaW1lU3RhbXBpbmcgQ0EwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDGhjUGSbPBPXJJUVXHJQPE8pE3qZdRodbSg9GeTKJtoLDMg/la9hGhRBVCX6SI82j6ffOciQt/nR+eDzMfUBMLJnOWbfhXqAJ9/UO0hNoR8XOxs+4rgISKIhjf69o9xBd/qxkrPkLcZ47qUT3w1lbU5ygt69OxtXXnHwZljZQp09nsad/ZkIdGAHvbREGJ3HxqV3rwN3mfXazL6IRktFLydkf3YYMZ3V+0VAshaG43IbtArF+y3kp9zvU5EmfvDqVjbOSmxR3NNg1c1eYbqMFkdECnwHLFuk4fsbVYTXn+149zk6wsOeKlSNbwsDETqVcplicu9Yemj052FVUmcJgmf6AaRyBD40NjgHt1biclkJg6OBGz9vae5jtb7IHeIhTZgirHkr+g3uM+onP65x9abJTyUpURK1h0QCirc0PO30qhHGs4xSnzyqqWc0Jon7ZGs506o9UD4L/wojzKQtwYSH8UNM/STKvvmz3+DrhkKvp1KCRB7UK/BZxmSVJQ9FHzNklNiyDSLFc1eSuo80VgvCONWPfcYd6T/jnA+bIwpUzX6ZhKWD7TA4j+s4/TXkt2ElGTyYwMO1uKIqjBJgj5FBASA31fI7tk42PgpuE+9sJ0sj8eCXbsq11GdeJgo1gJASgADoRU7s7pXcheMBK9Rp6103a50g5rmQzSM7TNsQIDAQABo4IBXTCCAVkwEgYDVR0TAQH/BAgwBgEB/wIBADAdBgNVHQ4EFgQUuhbZbU2FL3MpdpovdYxqII+eyG8wHwYDVR0jBBgwFoAU7NfjgtJxXWRM3y5nP+e6mK4cD08wDgYDVR0PAQH/BAQDAgGGMBMGA1UdJQQMMAoGCCsGAQUFBwMIMHcGCCsGAQUFBwEBBGswaTAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AuZGlnaWNlcnQuY29tMEEGCCsGAQUFBzAChjVodHRwOi8vY2FjZXJ0cy5kaWdpY2VydC5jb20vRGlnaUNlcnRUcnVzdGVkUm9vdEc0LmNydDBDBgNVHR8EPDA6MDigNqA0hjJodHRwOi8vY3JsMy5kaWdpY2VydC5jb20vRGlnaUNlcnRUcnVzdGVkUm9vdEc0LmNybDAgBgNVHSAEGTAXMAgGBmeBDAEEAjALBglghkgBhv1sBwEwDQYJKoZIhvcNAQELBQADggIBAH1ZjsCTtm+YqUQiAX5m1tghQuGwGC4QTRPPMFPOvxj7x1Bd4ksp+3CKDaopafxpwc8dB+k+YMjYC+VcW9dth/qEICU0MWfNthKWb8RQTGIdDAiCqBa9qVbPFXONASIlzpVpP0d3+3J0FNf/q0+KLHqrhc1DX+1gtqpPkWaeLJ7giqzl/Yy8ZCaHbJK9nXzQcAp876i8dU+6WvepELJd6f8oVInw1YpxdmXazPByoyP6wCeCRK6ZJxurJB4mwbfeKuv2nrF5mYGjVoarCkXJ38SNoOeY+/umnXKvxMfBwWpx2cYTgAnEtp/Nh4cku0+jSbl3ZpHxcpzpSwJSpzd+k1OsOx0ISQ+UzTl63f8lY5knLD0/a6fxZsNBzU+2QJshIUDQtxMkzdwdeDrknq3lNHGS1yZr5Dhzq6YBT70/O3itTK37xJV77QpfMzmHQXh6OOmc4d0j/R0o08f56PGYX/sr2H7yRp11LB4nLCbbbxV7HhmLNriT1ObyF5lZynDwN7+YAN8gFk8n+2BnFqFmut1VwDophrCYoCvtlUG3OtUVmDG0YgkPCr2B2RP+v6TR81fZvAT6gt4y3wSJ8ADNXcL50CN/AAvkdgIm2fBldkKmKYcJRyvmfxqkhQ/8mJb2VVQrH4D6wPIOK+XW+6kvRBVK5xMOHds3OBqhK/bt1nz8MIIFjTCCBHWgAwIBAgIQDpsYjvnQLefv21DiCEAYWjANBgkqhkiG9w0BAQwFADBlMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMSQwIgYDVQQDExtEaWdpQ2VydCBBc3N1cmVkIElEIFJvb3QgQ0EwHhcNMjIwODAxMDAwMDAwWhcNMzExMTA5MjM1OTU5WjBiMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMSEwHwYDVQQDExhEaWdpQ2VydCBUcnVzdGVkIFJvb3QgRzQwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQC/5pBzaN675F1KPDAiMGkz7MKnJS7JIT3yithZwuEppz1Yq3aaza57G4QNxDAf8xukOBbrVsaXbR2rsnnyyhHS5F/WBTxSD1Ifxp4VpX6+n6lXFllVcq9ok3DCsrp1mWpzMpTREEQQLt+C8weE5nQ7bXHiLQwb7iDVySAdYyktzuxeTsiT+CFhmzTrBcZe7FsavOvJz82sNEBfsXpm7nfISKhmV1efVFiODCu3T6cw2Vbuyntd463JT17lNecxy9qTXtyOj4DatpGYQJB5w3jHtrHEtWoYOAMQjdjUN6QuBX2I9YI+EJFwq1WCQTLX2wRzKm6RAXwhTNS8rhsDdV14Ztk6MUSaM0C/CNdaSaTC5qmgZ92kJ7yhTzm1EVgX9yRcRo9k98FpiHaYdj1ZXUJ2h4mXaXpI8OCiEhtmmnTK3kse5w5jrubU75KSOp493ADkRSWJtppEGSt+wJS00mFt6zPZxd9LBADMfRyVw4/3IbKyEbe7f/LVjHAsQWCqsWMYRJUadmJ+9oCw++hkpjPRiQfhvbfmQ6QYuKZ3AeEPlAwhHbJUKSWJbOUOUlFHdL4mrLZBdd56rF+NP8m800ERElvlEFDrMcXKchYiCd98THU/Y+whX8QgUWtvsauGi0/C1kVfnSD8oR7FwI+isX4KJpn15GkvmB0t9dmpsh3lGwIDAQABo4IBOjCCATYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQU7NfjgtJxXWRM3y5nP+e6mK4cD08wHwYDVR0jBBgwFoAUReuir/SSy4IxLVGLp6chnfNtyA8wDgYDVR0PAQH/BAQDAgGGMHkGCCsGAQUFBwEBBG0wazAkBggrBgEFBQcwAYYYaHR0cDovL29jc3AuZGlnaWNlcnQuY29tMEMGCCsGAQUFBzAChjdodHRwOi8vY2FjZXJ0cy5kaWdpY2VydC5jb20vRGlnaUNlcnRBc3N1cmVkSURSb290Q0EuY3J0MEUGA1UdHwQ+MDwwOqA4oDaGNGh0dHA6Ly9jcmwzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEFzc3VyZWRJRFJvb3RDQS5jcmwwEQYDVR0gBAowCDAGBgRVHSAAMA0GCSqGSIb3DQEBDAUAA4IBAQBwoL9DXFXnOF+go3QbPbYW1/e/Vwe9mqyhhyzshV6pGrsi+IcaaVQi7aSId229GhT0E0p6Ly23OO/0/4C5+KH38nLeJLxSA8hO0Cre+i1Wz/n096wwepqLsl7Uz9FDRJtDIeuWcqFItJnLnU+nBgMTdydE1Od/6Fmo8L8vC6bp8jQ87PcDx4eo0kxAGTVGamlUsLihVo7spNU96LHc/RzY9HdaXFSMb++hUD38dglohJ9vytsgjTVgHAIDyyCwrFigDkBjxZgiwbJZ9VVrzyerbHbObyMt9H5xaiNrIv8SuFQtJ37YOtnwtoeW/VvRXKwYw02fc7cBqZ9Xql4o4rmUMYIDdjCCA3ICAQEwdzBjMQswCQYDVQQGEwJVUzEXMBUGA1UEChMORGlnaUNlcnQsIEluYy4xOzA5BgNVBAMTMkRpZ2lDZXJ0IFRydXN0ZWQgRzQgUlNBNDA5NiBTSEEyNTYgVGltZVN0YW1waW5nIENBAhAFRK/zlJ0IOaa/2z9f5WEWMA0GCWCGSAFlAwQCAQUAoIHRMBoGCSqGSIb3DQEJAzENBgsqhkiG9w0BCRABBDAcBgkqhkiG9w0BCQUxDxcNMjQwMzIzMDIwMTMyWjArBgsqhkiG9w0BCRACDDEcMBowGDAWBBRm8CsywsLJD4JdzqqKycZPGZzPQDAvBgkqhkiG9w0BCQQxIgQgIKwFmGfJCYX46aHxftMUjkKGS6shXM1nb61b9VJdaN0wNwYLKoZIhvcNAQkQAi8xKDAmMCQwIgQg0vbkbe10IszR1EBXaEE2b4KK2lWarjMWr00amtQMeCgwDQYJKoZIhvcNAQEBBQAEggIAeEnw/CnIuAalAFsws8WiNHA691tf4tkhkW+IBja+JtbdzwWbtLS+sesm9XXBy0DMJv3eJn3s/5fLP4cm5ntC18OknZOMyZyS7A1bpmZWbj52fK+b5yepxHD1FAq/xdgY97Cxpj9+f82u0ZhhlWnWnELFLzIJsJpJtA58wKaXlrsEiu3prxp1rAJClAVbQk5rEYLRyQny3fJMaHSzK/NPkp5Vyw5bMJAg+83FG9mjWcTxvMhqolTpJA/nRHZlgowSZvscU1p1NF+24ckgXmQYXiPF3X1X41UMlGOLT3pwWHkIe6QNN0JD3N6Je+Ij7y/Xt5QR30HYv6A8BXHDGOIt8rC75bkH1kEvSzKxUeBNk6zv4PKmHV+w7Sbd3Xgd7V++3X5U87sOnKwy4Ly7l/CjzwXavL2kVMyT1w6520ONPLMIa7B/cjkw5lB0c1XDhNnRaPr5uSdplPawrKmNbRLtDEq1nilEYy9xXumz8bXQfJ5djWKH951VIA4AWcbyWZ2v5P1GA+JtgmuMijtxeVsg7znWQEYm9BXp0iOJU815gBYiSKenW1d8E0zFDLEYZ4c4DBeD9PmMsdCAnGDQbEX3XoqH3Ll6lm7iCZ16mmMVyYgzWOEsPmNjCCazGd4NzDB0Jg40Z5I/B0rGpzbxIrm2R8vvYIH8qU8hbr+XLbdUIv9neDVjaGFpboJZAy0wggMpMIICEaADAgECAhROSRZr826+/LLlQdgddc/q6E2hDjANBgkqhkiG9w0BAQwFADBKMRowGAYDVQQDDBFXZWJDbGFpbVNpZ25pbmdDQTENMAsGA1UECwwETGVuczEQMA4GA1UECgwHVHJ1ZXBpYzELMAkGA1UEBhMCVVMwHhcNMjQwMTMwMTUzNTM2WhcNMjUwMTI5MTUzNTM1WjBWMQswCQYDVQQGEwJVUzEPMA0GA1UECgwGT3BlbkFJMRAwDgYDVQQLDAdDaGF0R1BUMSQwIgYDVQQDDBtUcnVlcGljIExlbnMgQ0xJIGluIENoYXRHUFQwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARu5XJT4dFShFBrBPDqRYLH3vwxvPE2a2jGXte3kVDezs9k7ZOlahz5rqxeDV49IOPRGic/zsw22yWDg5bqzWf/o4HFMIHCMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUWh9rZtOU57BBg32cDHtdxXNLS7MwTQYIKwYBBQUHAQEEQTA/MD0GCCsGAQUFBzABhjFodHRwOi8vdmEudHJ1ZXBpYy5jb20vZWpiY2EvcHVibGljd2ViL3N0YXR1cy9vY3NwMBMGA1UdJQQMMAoGCCsGAQUFBwMEMB0GA1UdDgQWBBSarqQMZOfdr170MkxyrhQKb2hzoDAOBgNVHQ8BAf8EBAMCBaAwDQYJKoZIhvcNAQEMBQADggEBAEiHfJ3areefcZus9MoEQaRjp1aS9Tzu6d1isWpR8ZNrnCe/wiPWJETrH85OMzfzVRG2kkNJ+K2knSxRXM3h//OD0/jw31ee9fDRj+I9/OaxuxWVuNNynuQS/jXlqDAhsJFIIlSJIGpkF9Axx/N3QNRdLNYk5zUKHjE9owkQ4fLSlLTwtFWuExNoJFIuPjLsRuxw5ycLdAmPBHL/OukCZztBPj00Ca7t1UMkjBNsbhzAmS34fm1lTW6qFpAG5Oi3WiOnqAvRKkH56i4Te/WBFR37Fr4949JusRuYGBRztJuRs4vPSKQT7wkksBYgeAiHqLjOt6y6GcdwR3pLeKgk4xNZBH4wggR6MIICYqADAgECAhRp/JDEzIlQgjoeqF/Sgv8o1f2TkDANBgkqhkiG9w0BAQwFADA/MQ8wDQYDVQQDDAZSb290Q0ExDTALBgNVBAsMBExlbnMxEDAOBgNVBAoMB1RydWVwaWMxCzAJBgNVBAYTAlVTMB4XDTIxMTIwOTIwMzk0NloXDTI2MTIwODIwMzk0NVowSjEaMBgGA1UEAwwRV2ViQ2xhaW1TaWduaW5nQ0ExDTALBgNVBAsMBExlbnMxEDAOBgNVBAoMB1RydWVwaWMxCzAJBgNVBAYTAlVTMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwRYSw6dQwZjMzmv4jqTxxWr6cpaI2AUz+4rsgvJlgOdBnJrE4WAVxwToKGv1x9reCooi+sWno/YKKP4HYjsKywl5ZXkOWJqUPJYvL2LVFljMiqiXykiQAlnrCDbnry+lPft/k+93sb7oejj4FB5EF1Bo4flnqRdJ9b9Nyvv2vIGhn2RI4VgIelyrekH7hoY6AaHupnLeIKLdwqhRNZ2Ml6tydDL5E5ub+rtZ/dTYV0zIre+hcR+FbB/n2B3wvSrkNGaIvpkTsH2x32Ftzb5u1vPf6DMXUyr/A3WWo5rb5xYqkR0Yx0u2AxFU1vOZxnGLk75wUrkS5caFfWgYwQKybwIDAQABo2MwYTAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQYMBaAFFi68anyDedFBgqwKadalzDqJz0LMB0GA1UdDgQWBBRaH2tm05TnsEGDfZwMe13Fc0tLszAOBgNVHQ8BAf8EBAMCAYYwDQYJKoZIhvcNAQEMBQADggIBAHU4hnoXEULwV3wGsLt33TuNhcppxeRBWjOMIXqGcX9F7Yt8U9Cq5zG4cz93U2GgYZ+mToXq8/DIPduM55BXFbBffJE2Y5OpaFbpRcdPOycUipySawFdgisHR8vRBFY/q9RDGy40FurSU9CiDQrljZcXRA4Zu//ZYYYGwntNW1p/DnFZXzjV/3bhjt+dKTNAYuolo9omFVXJ5XxQMKE/SqG43ZF6S3wLqCTI1CvildOWAsyqAtUPtcbCsvfCQAAgs+LLPtHWycmtQothXay+Q+f3q1AHoY67gu2Tb0HqbKicjAcc9B+WxCXhXbzHDaWsAu25k61pKvjsKzY4az/CfoiJbRwQUJ53yyahR7TkG9k4Sr5Lg7Y9IrLdBD9ShaJvtBCJrztepeg5dPwGLm8jxSX7kjOrF7OmYBARc9+9Pou1IO05Lqh3BE5CxLwWtrgtQSJUnJ4eTMBcmhJ/Vd2EopxAmGiK5Wn/5LK7m5O5/0pLdV1zLO5EymbBYSdx7FCpI9MhUTaBjatWj6Z4CRvdVfJ0UzP5Fecwp0kTTLmoI7Kxqv6l1N/K1MU3tzyJ2D6zrs5Jb0xsyUh76/NRjt+M19N8ANBpmDKllDGWmMEm5yEJHRrnt1pwNuDVKRKfpMJvisVt47sJKf+CinhVrmGJKrt76Z/9UP+eXERitt2CJ+nRY3BhZFkWegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPZYQA+qvoJDTcYduCl8yylw9B+DgycpYRHGpw8eQ7NdiUeiKPt+Ppcd9hEb1Oia4nWYDWOEUP4pQpTTZSkuB6QYS2Y=`;

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
            //nom = convertFromPunycode(nom);
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
            name = convertFromPunycode(name);
    
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
            name = convertFromPunycode(name);
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
            }
            
            div.addEventListener("click", (e)=>{this.thisPageClassify.attributeTag(e.srcElement)});
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
class PageTransfer extends Page {
    thisPageTransfer = this;
    
    tagActive = false;
    monthActive = true;
    tag = ''; 
    months = [];
    tooBig = 5000;
    
    constructor() {
        super("TRANSFER");
        PageTransfer.thisPageTransfer = this; // all pages are singleton
    }
    async display(){
        super.display();
        let body = document.getElementsByTagName('body')[0];
        body.innerHTML += PageTransfer.HTML;
        body.innerHTML += '<style>' + PageTransfer.CSS.join("\n") + '</style>';
        
        this.activateToggle('toggle-state-tags','tags-activation','','TAGS DEACTIVATED', this.reactToTagToggle, false);
        this.prepareTagSelection();
        this.activateToggle('toggle-state-months','months-activation','','MONTHS DEACTIVATED', this.reactToMonthToggle, true);
        await this.initMonthSelection();
        this.showAnalyzeButton(); 

        let transferButton = document.getElementById('transfer-submit');
        transferButton.onclick = (e)=>{PageTransfer.thisPageTransfer.transferNames();};
    }
    async displayTagSelection(really)
    {
        let boxSelectionTag = document.getElementById('selection-tag');
        boxSelectionTag.style.display = ((really)?'block':'none');
        if(really)
        {
            let selectField = boxSelectionTag.getElementsByTagName('select')[0];
            selectField.onchange = (e)=>{PageTransfer.thisPageTransfer.reactToTagSelection(e.srcElement)};            
        }
    }
    async displayMonthSelection(really)
    {
        let nextBox = document.getElementById('months-configuration');
        nextBox.style.display = ((really)?'block':'none');
    }
    prepareTagSelection()
    {
        let tagsAccessor = new AccessorTags();
        let tags = tagsAccessor.listTags();
        this.tag = tags[0];
        
        let box = document.getElementById("tags-selection");
        let optionsHTML = '';
        for(let tag of tags)
        {
            optionsHTML += '<option>' + tag + '</option>';
        }
        let boxSelectionTag = document.getElementById('selection-tag');
        boxSelectionTag.innerHTML += PageTransfer.HTML_SELECT_TAG.replace("[OPTIONS]",optionsHTML);
    }

    async computeNextDate()
    {
        // find next month to expire
        let namesAccessor = new AccessorNames();
        let domains = await namesAccessor.listNamesExpiring(0);
        console.log(domains);
        let nextDomain = domains[0];
        let nextDate = nextDomain.estimatedExpirationDate;
        return nextDate;
    }
    showNextMonths(nextDate)
    {
        let id = "";
        let nextBox = document.getElementById('checkboxes');
        id = formatDateToId(nextDate);
        nextBox.innerHTML += '<input type="checkbox" id="'+id+'" checked="checked"/>'; 
        nextBox.innerHTML += '<span>'+formatMonthToText(nextDate)+'</span>'; 
        nextDate['month']++;
        id = formatDateToId(nextDate);
        nextBox.innerHTML += '<input type="checkbox" id="' + id + '"/>'; 
        nextBox.innerHTML += '<span>'+formatMonthToText(nextDate)+'</span>'; 
        nextDate['month']++;
        id = formatDateToId(nextDate);
        nextBox.innerHTML += '<input type="checkbox" id="' + id + '"/>'; 
        nextBox.innerHTML += '<span>'+formatMonthToText(nextDate)+'</span>'; 
    }
    async initMonthSelection()
    {
        this.displayMonthSelection(false);
        let nextDate = parseDate(await this.computeNextDate());
        console.log(nextDate);
        let nextDateBox = document.getElementById('month-next');
        nextDateBox.innerHTML = formatDateToText(nextDate);  
        
        let namesAccessor = new AccessorNames();
        let total = await namesAccessor.countNamesInWallet();
        let average = Math.round(total/24);
        console.log("Total " + total);
        let averageBox = document.getElementById('month-average');
        averageBox.innerHTML = 'Estimate : average of ' +average+ ' names per month'; 

        await this.showNextMonths(nextDate);
        this.displayMonthSelection(true);
    }
    async reactToTagToggle(state)
    {
        console.log('reactToTagToggle()');
        let box = document.getElementById('toggle-state-tags').parentNode;
        let labelAfter = box.getElementsByClassName('label-toggle')[1];
        if(state)
        {
            PageTransfer.thisPageTransfer.tagActive = true;
            labelAfter.innerHTML = 'TAGS ACTIVATED';
            PageTransfer.thisPageTransfer.displayTagSelection(true);
        }
        else
        {
            PageTransfer.thisPageTransfer.tagActive = false;
            labelAfter.innerHTML = 'TAGS DEACTIVATED';            
            PageTransfer.thisPageTransfer.displayTagSelection(false);
        }
        console.log(box);
    }
    async reactToMonthToggle(state)
    {
        console.log('reactToMonthToggle()');
        let box = document.getElementById('toggle-state-months').parentNode;
        let labelAfter = box.getElementsByClassName('label-toggle')[1];
        if(state)
        {
            labelAfter.innerHTML = 'MONTHS ACTIVATED';
            PageTransfer.thisPageTransfer.monthActive = true;
            PageTransfer.thisPageTransfer.displayMonthSelection(true);

            let analyzeButton = document.getElementById("analyze");
            let monthsConfiguration = document.getElementById("months-configuration");
            monthsConfiguration.append(analyzeButton);
            
        }
        else
        {
            labelAfter.innerHTML = 'MONTHS DEACTIVATED';            
            PageTransfer.thisPageTransfer.monthActive = false;
            PageTransfer.thisPageTransfer.displayMonthSelection(false);
            
            let analyzeButton = document.getElementById("analyze");
            let tagsConfiguration = document.getElementById("tags-configuration");
            tagsConfiguration.append(analyzeButton);
        }
    }
    reactToTagSelection(select)
    {
        //var value = select.value;
        console.log('reactToTagSelection()');
        this.tag = select.options[select.selectedIndex].text;
        let tagsAccessor = new AccessorTags();
        let tags = tagsAccessor.getNamesForTag(this.tag);
        console.log(tags);
    }
    async reactToMonthSelection()
    {
        let namesAccessor = new AccessorNames();
        let page = 0;
        //{
            let domains = await namesAccessor.listNamesExpiring(page);
            this.showNames(domains);
            await sleepSomeTime(500);
        //}
        
    }
    async showNames(domains)
    {
        console.log('showNames()');
        let domainsView = document.getElementById('domains');
        
        for(let position = 0; position < domains.length && this.open; position++)
        {
            let domain = domains[position];
            let nom = domain.name;
            nom = convertFromPunycode(nom);
    
            let div = this.createDivWithText(nom);
            domainsView.append(div);  
        }
    }
    showAnalyzeButton()
    {
        let analyzeButton = document.getElementById("analyze");
        analyzeButton.onclick = ()=>{PageTransfer.thisPageTransfer.reactToAnalyzeClick();};
        analyzeButton.style.display = 'block';
    }
    showWaitingBox(really)
    {
        let waitingBox = document.getElementById("waiting-box");
        waitingBox.style.display = (really)?'flex':'none';
        if(really)
        {
            let waitingBox = document.getElementById('waiting');
            waitingBox.classList.remove('stop');
        }
    }
    async readMonthsChosen()
    {
        let checkboxesBox = document.getElementById("checkboxes");
        let checkboxes = checkboxesBox.getElementsByTagName('input');
        console.log(checkboxes);
        let dates = [];
        for(let checkbox of checkboxes)
        {
            if(checkbox.checked)
            {
                console.log(checkbox.id);
                //dates[dates.length] = parseDateFromId(checkbox.id);
                dates[dates.length] = (checkbox.id);
            }
        }
        console.log("dates array : ");
        console.log(dates); 
        PageTransfer.thisPageTransfer.months = dates;        
    }
    displayChoices()
    {
        let conclusionBox = document.getElementById("conclusions");
        let tag = PageTransfer.thisPageTransfer.tag;
        let months = PageTransfer.thisPageTransfer.months;
        let tagActive = PageTransfer.thisPageTransfer.tagActive;
        let monthActive = PageTransfer.thisPageTransfer.monthActive;
        let choices = [];
        if(tagActive) choices[choices.length]  = ' the tag ' + tag;
        if(monthActive) choices[choices.length]  = ' the month'+((months.length>1)?'s':'')+' ' + months.join(' + ');        
        if(tagActive || monthActive) conclusionBox.innerHTML = '<p>You chose ' + choices.join(' and ') + '</p>';
        else conclusionBox.innerHTML = '<p>Please choose a tag or a month</p>';        
    }
    confirmTransfersReady(transfers)
    {
        let conclusionBox = document.getElementById("conclusions");
        conclusionBox.innerHTML += '<p>You have '+ transfers.length + ' transfers waiting such as : '
            + listArrayWithEllipsis(transfers) +'</p>';
    }
    showTransferInfos()
    {
        let transferInfosBox = document.getElementById('transfer-infos');
        transferInfosBox.style.display = 'block';
    }
    async reactToAnalyzeClick()
    {
        console.log("reactToAnalyzeClick()");
        this.showWaitingBox(true);
        this.readMonthsChosen(); 
        this.displayChoices();
        let transfers = await this.analyzeChoices();
        PageTransfer.thisPageTransfer.transfers = transfers;
        this.showWaitingBox(false);
        this.confirmTransfersReady(transfers);
        this.showTransferInfos();

    }
    page = 0;
    lastName = null;
    async listNamesForMonth(target)
    {
        let monthNames = [];
        let namesAccessor = new AccessorNames(); 
        let isDateOK = true;
        let isTooBig = false
        do
        {
            let names = await namesAccessor.listNamesExpiring(this.page++);
            this.lastName = names[names.length-1]; // for month overlapping
            await namesAccessor.sleepSomeTime(200);
            let checkName = names[names.length-1];
            let checkDate = parseDate(checkName.estimatedExpirationDate);
            
            isDateOK = (checkDate['month'] == target['month']) && (checkDate['year'] == target['year']);
            //console.log('isDateOk' + isDateOK);
            if(!isDateOK)
            {
                names = names.filter((name) => {
                    let date = parseDate(name.estimatedExpirationDate);
                    if(date['year'] != target['year']) return false;
                    if(date['month'] != target['month']) return false;
                    return true;
                });   
            }
            
            monthNames = monthNames.concat(names);
            isTooBig = monthNames.length > this.tooBig;
            
        }while(isDateOK && !isTooBig);
        return monthNames;
    }
    async analyzeChoices()
    {
        let months = PageTransfer.thisPageTransfer.months;
        let tag = PageTransfer.thisPageTransfer.tag;        
        let monthActive = PageTransfer.thisPageTransfer.monthActive;
        let tagActive = PageTransfer.thisPageTransfer.tagActive;

        let transfer = [];

        if(monthActive)
        {
            this.page = 0;
            for(let index = 0; index < 3 && months[index] != null; index++)
            {
                let target = parseDateFromId(months[index]);
                if(index>0 && this.lastName['month' == target['month']] ) this.page--;
                let monthNames = await this.listNamesForMonth(target);
                transfer = transfer.concat(monthNames);
            } 
            transfer = transfer.map((name)=>{return name.name;});
            console.log('Months names are the following : ');
            console.log(transfer);  
        }

        if(tagActive)
        {
            let accessor = new AccessorTags();
            let taggedNames = accessor.getNamesForTag(tag);  
            console.log(taggedNames);
            if(monthActive)
                transfer = transfer.filter(name => taggedNames.includes(name));
            else
                transfer = taggedNames;
        }
        console.log('Transfer names are the following : ');
        console.log(transfer);  
        return transfer;
    }
    removeTransferedNames(transfered)
    {
        let tagActive = PageTransfer.thisPageTransfer.tagActive;
        if(tagActive)
        {
            let accessor = new AccessorTags();
            let taggedNames = accessor.removeNames(transfered);  
        }        
    }
    async transferNames()
    {
        let walletInput = document.getElementById('destination-wallet');
        let secretInput = document.getElementById('namebase-secret');
        let address = walletInput.value;
        let secret = secretInput.value;
        let formBox = document.getElementById('form-transfer-infos');
        formBox.innerHTML = '';
        let transferInfosBox = document.getElementById('transfer-infos');
        let waitingBox = document.getElementById('waiting-box');
        transferInfosBox.append(waitingBox);
        waitingBox.style.display = 'block';

        let messagesFun = ['Picking flowers...',
                           'Baking cupcakes...',
                          'Compressing the internet...',
                          'Inventing web4...',
                          'Surfing on a rainbow...',
                          'Painting the sky...',
                          'Flavoring websites...',
                          'Jumping in wormholes...',
                          ];
        
        let accessor = new AccessorNames();
        let transfers = PageTransfer.thisPageTransfer.transfers;
        let explanationBox = document.getElementById("waiting-explanation");
        for(let name of transfers)
        {
            let encodedName = convertToPunycode(name);
            await accessor.transferName(encodedName, address, secret); 
            await accessor.sleepSomeTime(200);
            
            let message = 'Transfering ' + name + " ...";
            console.log(message);
            explanationBox.innerHTML = '<p>' + message + '</p>';
            explanationBox.innerHTML += '<p>' + messagesFun[getRandom(7)] + '</p>';
        }
        this.removeTransferedNames(transfers);
        explanationBox.innerHTML = '<p>Finished !!!</p>';
        let hourglassBox = document.getElementById('waiting');
        hourglassBox.classList.add('stop');
    }
}

PageTransfer.CSS = [
    '#months-configuration {display:none;position:relative;padding:1vw 0vw 0vw 1vw;height:14vw;}',
    '#months-configuration {font-size:2.5vw;background-color:#eeeeee;}',
    '#months-configuration > p {margin:0vw 0vw 0vw 1vw;}',
    '#months-configuration > #month-average {font-weight:bold;width:auto;}',
    '#months-configuration > #checkboxes {margin:1vw 0vw 0vw 1vw;}',
    '#months-configuration input{float:left;clear:none;}',
    '#months-configuration span{float:left;clear:none;margin:0 1vw 0 0vw;}',
    
    '#tags-configuration {position:relative;padding-top:1vw;}',
    '#tags-configuration #analyze {height:6vw;}',
    '#tags-configuration #analyze a {padding:1.2vw; font-size:3vw;}',
    '#selection-tag {display:none;font-size:3vw;padding:2vw;background-color:#eeeeee;}',
    
    '#analyze {display:none;position:absolute;right:2vw; top:2vw; width:auto; height:10vw;}',
    '#analyze a {display:inline-block;font-size:5vw; padding:2vw;height:100%;vertical-align:middle;}',
    '#analyze a {background-color: #aaaaaa;color:white;}',
    '#analyze a:hover {background-color:orange;color:white;}',
    
//    '#waiting-box {width: 20vw;  height: 20vw;}',
    '#waiting-box {position:relative; display:none;flex-direction:row;margin-top:2vw;}',
    '#waiting {background-color:orange;}',
    '#waiting-explanation {margin-left:5vw;}',
    '#waiting-explanation, #waiting-explanation p {color:orange;font-weight:bold;font-size:6vw;}',

    '#transfer-infos #waiting-explanation {position:absolute;top:0;right:0;width:70vw;}',
    '#transfer-infos #waiting-explanation p {font-size:4vw;}',
    
    '#transfer-infos {display:none;}',
    '#transfer-infos form {background-color:#eeeeee;padding-top:1vw;padding-bottom:2vw;}',
    '#transfer-infos form > div {}',
    '#transfer-infos form > div > label {display:block; color:#666666;font-size:2.5vw; margin:1vw 0 1vw 0;}',
    '#transfer-infos form > div > input {width:90vw;line-height:5vw;font-size:2.5vw;padding-left:1vw;padding-right:1vw;}',
    '#transfer-infos form > #transfer-submit {display:block;width:90vw;margin-left:0vw;font-size:5vw;margin-top:2vw;cursor:pointer;}',
    '#transfer-infos form > #transfer-submit {text-align:center;background-color:orange;font-weight:bold;color:white;border:none;}',
];

PageTransfer.HTML =`
        <div id="page"> 
        <h3>Yes !! You can transfert to Bob</h3>
        <p>You will have to priorize 
        names by labels or by expiration month.</p>
        <h3>Step by Step</h3>
        <div id="step-tags">
            <div id="tags-activation">
                <p>First you have to select tags ON or OFF : </p>
            </div>
            <div id="tags-configuration"> 
                <div id="tags-selection"><div id="selection-tag"></div> </div> 
            </div> 
        </div>
        <div id="step-months">
            <div id="months-activation"> 
                <p>Then you have to configure the transfer : </p> 
            </div> 
            <p>Then you have to choose the month to transfer : </p> 
            <div id="months-configuration">
                <p><span>Next expiration date is</span><span id="month-next"></span></p>
                <p id="month-average"></p>
                <div class="checkboxes" id="checkboxes">
                </div>
                <div id="analyze"><a>ANALYZE</a></div>
            </div> 
        </div>
        <div id="waiting-box">
            <div id="waiting" class="hourglass"></div>
            <div id="waiting-explanation"><p>Preparing the whole </p><p> list of names</p></div>
        </div>
        <div id="conclusions">
            
        </div>
        <div id="transfer-infos">
            <h3>Transfer infos</h3>
            <form id="form-transfer-infos">
                <div>
                    <label for="namebase-secret">Namebase 2FA secret : </label>
                    <input name="namebase-secret" id="namebase-secret" type="text"/>
                </div>
                <div>
                    <label for="destination-wallet">Destination wallet : </label>
                    <input name="destination-wallet" id="destination-wallet" type="text"/>
                </div>
                <a id="transfer-submit" href="#transfer">TRANSFER NOW<a/>
                <!--input id="transfer-submit" type="submit" value="TRANSFER NOW"/-->
            </form>
        </div>
    </div> 
    `;
PageTransfer.HTML_SELECT_TAG = '<label for="select-tag">Choose a tag to transfer : </label>\
                                <select id="select-tag">[OPTIONS]</select>';

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
    LINK_STATS = 'https://www.namebase.io/api/user/wallet';
    LINK_NAME = "https://www.namebase.io/api/domains/search";
    PARA = 'sortKey=acquiredAt&sortDirection=desc&limit=100&minLength=8&offset=';
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
    async searchNameWithName(name) // from wallet
    {
        let para = this.para;
        para['startsWith'] = name;
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
    async filterActiveNames(names)
    {
        
    }
}
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

/**
 * @preserve A JavaScript implementation of the SHA family of hashes, as
 * defined in FIPS PUB 180-2 as well as the corresponding HMAC implementation
 * as defined in FIPS PUB 198a
 *
 * Copyright Brian Turek 2008-2015
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 *
 * Several functions taken from Paul Johnston
 */

 /**
  * SUPPORTED_ALGS is the stub for a compile flag that will cause pruning of
  * functions that are not needed when a limited number of SHA families are
  * selected
  *
  * @define {number} ORed value of SHA variants to be supported
  *   1 = SHA-1, 2 = SHA-224/SHA-256, 4 = SHA-384/SHA-512
  */
var SUPPORTED_ALGS = 4 | 2 | 1;

(function (global)
{
	"use strict";
	/**
	 * Int_64 is a object for 2 32-bit numbers emulating a 64-bit number
	 *
	 * @private
	 * @constructor
	 * @this {Int_64}
	 * @param {number} msint_32 The most significant 32-bits of a 64-bit number
	 * @param {number} lsint_32 The least significant 32-bits of a 64-bit number
	 */
	function Int_64(msint_32, lsint_32)
	{
		this.highOrder = msint_32;
		this.lowOrder = lsint_32;
	}

	/**
	 * Convert a string to an array of big-endian words
	 *
	 * There is a known bug with an odd number of existing bytes and using a
	 * UTF-16 encoding.  However, this function is used such that the existing
	 * bytes are always a result of a previous UTF-16 str2binb call and
	 * therefore there should never be an odd number of existing bytes
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {string} utfType The Unicode type, UTF8 or UTF16BE, UTF16LE, to
	 *   use to encode the source string
	 * @param {Array.<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array.<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function str2binb(str, utfType, existingBin, existingBinLen)
	{
		var bin = [], codePnt, binArr = [], byteCnt = 0, i, j, existingByteLen,
			intOffset, byteOffset;

		bin = existingBin || [0];
		existingBinLen = existingBinLen || 0;
		existingByteLen = existingBinLen >>> 3;

		if ("UTF8" === utfType)
		{
			for (i = 0; i < str.length; i += 1)
			{
				codePnt = str.charCodeAt(i);
				binArr = [];

				if (0x80 > codePnt)
				{
					binArr.push(codePnt);
				}
				else if (0x800 > codePnt)
				{
					binArr.push(0xC0 | (codePnt >>> 6));
					binArr.push(0x80 | (codePnt & 0x3F));
				}
				else if ((0xd800 > codePnt) || (0xe000 <= codePnt)) {
					binArr.push(
						0xe0 | (codePnt >>> 12),
						0x80 | ((codePnt >>> 6) & 0x3f),
						0x80 | (codePnt & 0x3f)
					);
				}
				else
				{
					i += 1;
					codePnt = 0x10000 + (((codePnt & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
					binArr.push(
						0xf0 | (codePnt >>> 18),
						0x80 | ((codePnt >>> 12) & 0x3f),
						0x80 | ((codePnt >>> 6) & 0x3f),
						0x80 | (codePnt & 0x3f)
					);
				}

				for (j = 0; j < binArr.length; j += 1)
				{
					byteOffset = byteCnt + existingByteLen;
					intOffset = byteOffset >>> 2;
					while (bin.length <= intOffset)
					{
						bin.push(0);
					}
					/* Known bug kicks in here */
					bin[intOffset] |= binArr[j] << (8 * (3 - (byteOffset % 4)));
					byteCnt += 1;
				}
			}
		}
		else if (("UTF16BE" === utfType) || "UTF16LE" === utfType)
		{
			for (i = 0; i < str.length; i += 1)
			{
				codePnt = str.charCodeAt(i);
				/* Internally strings are UTF-16BE so only change if UTF-16LE */
				if ("UTF16LE" === utfType)
				{
					j = codePnt & 0xFF;
					codePnt = (j << 8) | (codePnt >>> 8);
				}

				byteOffset = byteCnt + existingByteLen;
				intOffset = byteOffset >>> 2;
				while (bin.length <= intOffset)
				{
					bin.push(0);
				}
				bin[intOffset] |= codePnt << (8 * (2 - (byteOffset % 4)));
				byteCnt += 2;
			}
		}
		return {"value" : bin, "binLen" : byteCnt * 8 + existingBinLen};
	}

	/**
	 * Convert a hex string to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {Array.<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array.<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function hex2binb(str, existingBin, existingBinLen)
	{
		var bin, length = str.length, i, num, intOffset, byteOffset,
			existingByteLen;

		bin = existingBin || [0];
		existingBinLen = existingBinLen || 0;
		existingByteLen = existingBinLen >>> 3;

		if (0 !== (length % 2))
		{
			throw new Error("String of HEX type must be in byte increments");
		}

		for (i = 0; i < length; i += 2)
		{
			num = parseInt(str.substr(i, 2), 16);
			if (!isNaN(num))
			{
				byteOffset = (i >>> 1) + existingByteLen;
				intOffset = byteOffset >>> 2;
				while (bin.length <= intOffset)
				{
					bin.push(0);
				}
				bin[intOffset] |= num << 8 * (3 - (byteOffset % 4));
			}
			else
			{
				throw new Error("String of HEX type contains invalid characters");
			}
		}

		return {"value" : bin, "binLen" : length * 4 + existingBinLen};
	}

	/**
	 * Convert a string of raw bytes to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String of raw bytes to be converted to binary representation
	 * @param {Array.<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array.<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function bytes2binb(str, existingBin, existingBinLen)
	{
		var bin = [], codePnt, i, existingByteLen, intOffset,
			byteOffset;

		bin = existingBin || [0];
		existingBinLen = existingBinLen || 0;
		existingByteLen = existingBinLen >>> 3;

		for (i = 0; i < str.length; i += 1)
		{
			codePnt = str.charCodeAt(i);

			byteOffset = i + existingByteLen;
			intOffset = byteOffset >>> 2;
			if (bin.length <= intOffset)
			{
				bin.push(0);
			}
			bin[intOffset] |= codePnt << 8 * (3 - (byteOffset % 4));
		}

		return {"value" : bin, "binLen" : str.length * 8 + existingBinLen};
	}

	/**
	 * Convert a base-64 string to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {Array.<number>} existingBin A packed int array of bytes to
	 *   append the results to
	 * @param {number} existingBinLen The number of bits in the existingBin
	 *   array
	 * @return {{value : Array.<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function b642binb(str, existingBin, existingBinLen)
	{
		var bin = [], byteCnt = 0, index, i, j, tmpInt, strPart, firstEqual,
			b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			existingByteLen, intOffset, byteOffset;

		bin = existingBin || [0];
		existingBinLen = existingBinLen || 0;
		existingByteLen = existingBinLen >>> 3;

		if (-1 === str.search(/^[a-zA-Z0-9=+\/]+$/))
		{
			throw new Error("Invalid character in base-64 string");
		}
		firstEqual = str.indexOf('=');
		str = str.replace(/\=/g, '');
		if ((-1 !== firstEqual) && (firstEqual < str.length))
		{
			throw new Error("Invalid '=' found in base-64 string");
		}

		for (i = 0; i < str.length; i += 4)
		{
			strPart = str.substr(i, 4);
			tmpInt = 0;

			for (j = 0; j < strPart.length; j += 1)
			{
				index = b64Tab.indexOf(strPart[j]);
				tmpInt |= index << (18 - (6 * j));
			}

			for (j = 0; j < strPart.length - 1; j += 1)
			{
				byteOffset = byteCnt + existingByteLen;
				intOffset = byteOffset >>> 2;
				while (bin.length <= intOffset)
				{
					bin.push(0);
				}
				bin[intOffset] |= ((tmpInt >>> (16 - (j * 8))) & 0xFF) <<
					8 * (3 - (byteOffset % 4));
				byteCnt += 1;
			}
		}

		return {"value" : bin, "binLen" : byteCnt * 8 + existingBinLen};
	}

	/**
	 * Convert an array of big-endian words to a hex string.
	 *
	 * @private
	 * @param {Array.<number>} binarray Array of integers to be converted to
	 *   hexidecimal representation
	 * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
	 *   containing validated output formatting options
	 * @return {string} Hexidecimal representation of the parameter in string
	 *   form
	 */
	function binb2hex(binarray, formatOpts)
	{
		var hex_tab = "0123456789abcdef", str = "",
			length = binarray.length * 4, i, srcByte;

		for (i = 0; i < length; i += 1)
		{
			/* The below is more than a byte but it gets taken care of later */
			srcByte = binarray[i >>> 2] >>> ((3 - (i % 4)) * 8);
			str += hex_tab.charAt((srcByte >>> 4) & 0xF) +
				hex_tab.charAt(srcByte & 0xF);
		}

		return (formatOpts["outputUpper"]) ? str.toUpperCase() : str;
	}

	/**
	 * Convert an array of big-endian words to a base-64 string
	 *
	 * @private
	 * @param {Array.<number>} binarray Array of integers to be converted to
	 *   base-64 representation
	 * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
	 *   containing validated output formatting options
	 * @return {string} Base-64 encoded representation of the parameter in
	 *   string form
	 */
	function binb2b64(binarray, formatOpts)
	{
		var str = "", length = binarray.length * 4, i, j, triplet, offset, int1, int2,
			b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

		for (i = 0; i < length; i += 3)
		{
			offset = (i + 1) >>> 2;
			int1 = (binarray.length <= offset) ? 0 : binarray[offset];
			offset = (i + 2) >>> 2;
			int2 = (binarray.length <= offset) ? 0 : binarray[offset];
			triplet = (((binarray[i >>> 2] >>> 8 * (3 - i % 4)) & 0xFF) << 16) |
				(((int1 >>> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) |
				((int2 >>> 8 * (3 - (i + 2) % 4)) & 0xFF);
			for (j = 0; j < 4; j += 1)
			{
				if (i * 8 + j * 6 <= binarray.length * 32)
				{
					str += b64Tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
				}
				else
				{
					str += formatOpts["b64Pad"];
				}
			}
		}
		return str;
	}

	/**
	 * Convert an array of big-endian words to raw bytes string
	 *
	 * @private
	 * @param {Array.<number>} binarray Array of integers to be converted to
	 *   a raw bytes string representation
	 * @return {string} Raw bytes representation of the parameter in string
	 *   form
	 */
	function binb2bytes(binarray)
	{
		var str = "", length = binarray.length * 4, i, srcByte;

		for (i = 0; i < length; i += 1)
		{
			srcByte = (binarray[i >>> 2] >>> ((3 - (i % 4)) * 8)) & 0xFF;
			str += String.fromCharCode(srcByte);
		}

		return str;
	}

	/**
	 * Validate hash list containing output formatting options, ensuring
	 * presence of every option or adding the default value
	 *
	 * @private
	 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined)}=}
	 *   options Hash list of output formatting options
	 * @return {{outputUpper : boolean, b64Pad : string}} Validated hash list
	 *   containing output formatting options
	 */
	function getOutputOpts(options)
	{
		var retVal = {"outputUpper" : false, "b64Pad" : "="}, outputOptions;
		outputOptions = options || {};

		retVal["outputUpper"] = outputOptions["outputUpper"] || false;
		retVal["b64Pad"] = outputOptions["b64Pad"] || "=";

		if ("boolean" !== typeof(retVal["outputUpper"]))
		{
			throw new Error("Invalid outputUpper formatting option");
		}

		if ("string" !== typeof(retVal["b64Pad"]))
		{
			throw new Error("Invalid b64Pad formatting option");
		}

		return retVal;
	}

	/**
	 * Function that takes an input format and UTF encoding and returns the
	 * appropriate function used to convert the input.
	 *
	 * @private
	 * @param {string} format The format of the string to be converted
	 * @param {string} utfType The string encoding to use (UTF8, UTF16BE,
	 *	UTF16LE)
	 * @return {function(string, Array.<number>=, number=): {value :
	 *   Array.<number>, binLen : number}} Function that will convert an input
	 *   string to a packed int array
	 */
	function getStrConverter(format, utfType)
	{
		var retVal;

		/* Validate encoding */
		switch (utfType)
		{
		case "UTF8":
			/* Fallthrough */
		case "UTF16BE":
			/* Fallthrough */
		case "UTF16LE":
			/* Fallthrough */
			break;
		default:
			throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE");
		}

		/* Map inputFormat to the appropriate converter */
		switch (format)
		{
		case "HEX":
			retVal = hex2binb;
			break;
		case "TEXT":
			retVal = function(str, existingBin, existingBinLen)
				{
					return str2binb(str, utfType, existingBin, existingBinLen);
				};
			break;
		case "B64":
			retVal = b642binb;
			break;
		case "BYTES":
			retVal = bytes2binb;
			break;
		default:
			throw new Error("format must be HEX, TEXT, B64, or BYTES");
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of circular rotate left
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted circularly by n bits
	 */
	function rotl_32(x, n)
	{
		return (x << n) | (x >>> (32 - n));
	}

	/**
	 * The 32-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted circularly by n bits
	 */
	function rotr_32(x, n)
	{
		return (x >>> n) | (x << (32 - n));
	}

	/**
	 * The 64-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted circularly by n bits
	 */
	function rotr_64(x, n)
	{
		var retVal = null, tmp = new Int_64(x.highOrder, x.lowOrder);

		if (32 >= n)
		{
			retVal = new Int_64(
					(tmp.highOrder >>> n) | ((tmp.lowOrder << (32 - n)) & 0xFFFFFFFF),
					(tmp.lowOrder >>> n) | ((tmp.highOrder << (32 - n)) & 0xFFFFFFFF)
				);
		}
		else
		{
			retVal = new Int_64(
					(tmp.lowOrder >>> (n - 32)) | ((tmp.highOrder << (64 - n)) & 0xFFFFFFFF),
					(tmp.highOrder >>> (n - 32)) | ((tmp.lowOrder << (64 - n)) & 0xFFFFFFFF)
				);
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of shift right
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted by n bits
	 */
	function shr_32(x, n)
	{
		return x >>> n;
	}

	/**
	 * The 64-bit implementation of shift right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted by n bits
	 */
	function shr_64(x, n)
	{
		var retVal = null;

		if (32 >= n)
		{
			retVal = new Int_64(
					x.highOrder >>> n,
					x.lowOrder >>> n | ((x.highOrder << (32 - n)) & 0xFFFFFFFF)
				);
		}
		else
		{
			retVal = new Int_64(
					0,
					x.highOrder >>> (n - 32)
				);
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of the NIST specified Parity function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function parity_32(x, y, z)
	{
		return x ^ y ^ z;
	}

	/**
	 * The 32-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function ch_32(x, y, z)
	{
		return (x & y) ^ (~x & z);
	}

	/**
	 * The 64-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function ch_64(x, y, z)
	{
		return new Int_64(
				(x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function maj_32(x, y, z)
	{
		return (x & y) ^ (x & z) ^ (y & z);
	}

	/**
	 * The 64-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function maj_64(x, y, z)
	{
		return new Int_64(
				(x.highOrder & y.highOrder) ^
				(x.highOrder & z.highOrder) ^
				(y.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^
				(x.lowOrder & z.lowOrder) ^
				(y.lowOrder & z.lowOrder)
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function sigma0_32(x)
	{
		return rotr_32(x, 2) ^ rotr_32(x, 13) ^ rotr_32(x, 22);
	}

	/**
	 * The 64-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function sigma0_64(x)
	{
		var rotr28 = rotr_64(x, 28), rotr34 = rotr_64(x, 34),
			rotr39 = rotr_64(x, 39);

		return new Int_64(
				rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
				rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder);
	}

	/**
	 * The 32-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function sigma1_32(x)
	{
		return rotr_32(x, 6) ^ rotr_32(x, 11) ^ rotr_32(x, 25);
	}

	/**
	 * The 64-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function sigma1_64(x)
	{
		var rotr14 = rotr_64(x, 14), rotr18 = rotr_64(x, 18),
			rotr41 = rotr_64(x, 41);

		return new Int_64(
				rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
				rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder);
	}

	/**
	 * The 32-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function gamma0_32(x)
	{
		return rotr_32(x, 7) ^ rotr_32(x, 18) ^ shr_32(x, 3);
	}

	/**
	 * The 64-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function gamma0_64(x)
	{
		var rotr1 = rotr_64(x, 1), rotr8 = rotr_64(x, 8), shr7 = shr_64(x, 7);

		return new Int_64(
				rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
				rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function gamma1_32(x)
	{
		return rotr_32(x, 17) ^ rotr_32(x, 19) ^ shr_32(x, 10);
	}

	/**
	 * The 64-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function gamma1_64(x)
	{
		var rotr19 = rotr_64(x, 19), rotr61 = rotr_64(x, 61),
			shr6 = shr_64(x, 6);

		return new Int_64(
				rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
				rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
			);
	}

	/**
	 * Add two 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @return {number} The sum of a + b
	 */
	function safeAdd_32_2(a, b)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add four 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @param {number} c The third 32-bit integer argument to be added
	 * @param {number} d The fourth 32-bit integer argument to be added
	 * @return {number} The sum of a + b + c + d
	 */
	function safeAdd_32_4(a, b, c, d)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
				(lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add five 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @param {number} c The third 32-bit integer argument to be added
	 * @param {number} d The fourth 32-bit integer argument to be added
	 * @param {number} e The fifth 32-bit integer argument to be added
	 * @return {number} The sum of a + b + c + d + e
	 */
	function safeAdd_32_5(a, b, c, d, e)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF) +
				(e & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
				(e >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add two 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument to be added
	 * @param {Int_64} y The second 64-bit integer argument to be added
	 * @return {Int_64} The sum of x + y
	 */
	function safeAdd_64_2(x, y)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
		msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * Add four 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} a The first 64-bit integer argument to be added
	 * @param {Int_64} b The second 64-bit integer argument to be added
	 * @param {Int_64} c The third 64-bit integer argument to be added
	 * @param {Int_64} d The fouth 64-bit integer argument to be added
	 * @return {Int_64} The sum of a + b + c + d
	 */
	function safeAdd_64_4(a, b, c, d)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
			(c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
		msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
			(c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
			(c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
			(c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * Add five 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} a The first 64-bit integer argument to be added
	 * @param {Int_64} b The second 64-bit integer argument to be added
	 * @param {Int_64} c The third 64-bit integer argument to be added
	 * @param {Int_64} d The fouth 64-bit integer argument to be added
	 * @param {Int_64} e The fouth 64-bit integer argument to be added
	 * @return {Int_64} The sum of a + b + c + d + e
	 */
	function safeAdd_64_5(a, b, c, d, e)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
			(c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) +
			(e.lowOrder & 0xFFFF);
		msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
			(c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) +
			(lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
			(c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) +
			(e.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
			(c.highOrder >>> 16) + (d.highOrder >>> 16) +
			(e.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * Gets the H values for the specified SHA variant
	 *
	 * @param {string} variant The SHA variant
	 * @return {Array.<number|Int_64>} The initial H values
	 */
	function getH(variant)
	{
		var retVal, H_trunc, H_full;

		if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
		{
			retVal = [
				0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0
			];
		}
		else if (6 & SUPPORTED_ALGS)
		{
			H_trunc = [
				0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
				0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
			];
			H_full = [
				0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
				0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
			];

			switch (variant)
			{
			case "SHA-224":
				retVal = H_trunc;
				break;
			case "SHA-256":
				retVal = H_full;
				break;
			case "SHA-384":
				retVal = [
					new Int_64(0xcbbb9d5d, H_trunc[0]),
					new Int_64(0x0629a292a, H_trunc[1]),
					new Int_64(0x9159015a, H_trunc[2]),
					new Int_64(0x0152fecd8, H_trunc[3]),
					new Int_64(0x67332667, H_trunc[4]),
					new Int_64(0x98eb44a87, H_trunc[5]),
					new Int_64(0xdb0c2e0d, H_trunc[6]),
					new Int_64(0x047b5481d, H_trunc[7])
				];
				break;
			case "SHA-512":
				retVal = [
					new Int_64(H_full[0], 0xf3bcc908),
					new Int_64(H_full[1], 0x84caa73b),
					new Int_64(H_full[2], 0xfe94f82b),
					new Int_64(H_full[3], 0x5f1d36f1),
					new Int_64(H_full[4], 0xade682d1),
					new Int_64(H_full[5], 0x2b3e6c1f),
					new Int_64(H_full[6], 0xfb41bd6b),
					new Int_64(H_full[7], 0x137e2179)
				];
				break;
			default:
				throw new Error("Unknown SHA variant");
			}
		}
		else
		{
			throw new Error("No SHA variants supported");
		}

		return retVal;
	}

	/**
	 * Performs a round of SHA-1 hashing over a 512-byte block
	 *
	 * @private
	 * @param {Array.<number>} block The binary array representation of the
	 *   block to hash
	 * @param {Array.<number>} H The intermediate H values from a previous
	 *   round
	 * @return {Array.<number>} The resulting H values
	 */
	function roundSHA1(block, H)
	{
		var W = [], a, b, c, d, e, T, ch = ch_32, parity = parity_32,
			maj = maj_32, rotl = rotl_32, safeAdd_2 = safeAdd_32_2, t,
			safeAdd_5 = safeAdd_32_5;

		a = H[0];
		b = H[1];
		c = H[2];
		d = H[3];
		e = H[4];

		for (t = 0; t < 80; t += 1)
		{
			if (t < 16)
			{
				W[t] = block[t];
			}
			else
			{
				W[t] = rotl(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
			}

			if (t < 20)
			{
				T = safeAdd_5(rotl(a, 5), ch(b, c, d), e, 0x5a827999, W[t]);
			}
			else if (t < 40)
			{
				T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0x6ed9eba1, W[t]);
			}
			else if (t < 60)
			{
				T = safeAdd_5(rotl(a, 5), maj(b, c, d), e, 0x8f1bbcdc, W[t]);
			} else {
				T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, 0xca62c1d6, W[t]);
			}

			e = d;
			d = c;
			c = rotl(b, 30);
			b = a;
			a = T;
		}

		H[0] = safeAdd_2(a, H[0]);
		H[1] = safeAdd_2(b, H[1]);
		H[2] = safeAdd_2(c, H[2]);
		H[3] = safeAdd_2(d, H[3]);
		H[4] = safeAdd_2(e, H[4]);

		return H;
	}

	/**
	 * Finalizes the SHA-1 hash
	 *
	 * @private
	 * @param {Array.<number>} remainder Any leftover unprocessed packed ints
	 *   that still need to be processed
	 * @param {number} remainderBinLen The number of bits in remainder
	 * @param {number} processedBinLen The number of bits already
	 *   processed
	 * @param {Array.<number>} H The intermediate H values from a previous
	 *   round
	 * @return {Array.<number>} The array of integers representing the SHA-1
	 *   hash of message
	 */
	function finalizeSHA1(remainder, remainderBinLen, processedBinLen, H)
	{
		var i, appendedMessageLength, offset;

		/* The 65 addition is a hack but it works.  The correct number is
		   actually 72 (64 + 8) but the below math fails if
		   remainderBinLen + 72 % 512 = 0. Since remainderBinLen % 8 = 0,
		   "shorting" the addition is OK. */
		offset = (((remainderBinLen + 65) >>> 9) << 4) + 15;
		while (remainder.length <= offset)
		{
			remainder.push(0);
		}
		/* Append '1' at the end of the binary string */
		remainder[remainderBinLen >>> 5] |= 0x80 << (24 - (remainderBinLen % 32));
		/* Append length of binary string in the position such that the new
		length is a multiple of 512.  Logic does not work for even multiples
		of 512 but there can never be even multiples of 512 */
		remainder[offset] = remainderBinLen + processedBinLen;

		appendedMessageLength = remainder.length;

		/* This will always be at least 1 full chunk */
		for (i = 0; i < appendedMessageLength; i += 16)
		{
			H = roundSHA1(remainder.slice(i, i + 16), H);
		}

		return H;
	}

	/* Put this here so the K arrays aren't put on the stack for every block */
	var K_sha2, K_sha512;
	if (6 & SUPPORTED_ALGS)
	{
		K_sha2 = [
			0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
			0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
			0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
			0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
			0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
			0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
			0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
			0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
			0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
			0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
			0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
			0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
			0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
			0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
			0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
			0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
		];

		if (4 & SUPPORTED_ALGS)
		{
			 K_sha512 = [
				new Int_64(K_sha2[ 0], 0xd728ae22), new Int_64(K_sha2[ 1], 0x23ef65cd),
				new Int_64(K_sha2[ 2], 0xec4d3b2f), new Int_64(K_sha2[ 3], 0x8189dbbc),
				new Int_64(K_sha2[ 4], 0xf348b538), new Int_64(K_sha2[ 5], 0xb605d019),
				new Int_64(K_sha2[ 6], 0xaf194f9b), new Int_64(K_sha2[ 7], 0xda6d8118),
				new Int_64(K_sha2[ 8], 0xa3030242), new Int_64(K_sha2[ 9], 0x45706fbe),
				new Int_64(K_sha2[10], 0x4ee4b28c), new Int_64(K_sha2[11], 0xd5ffb4e2),
				new Int_64(K_sha2[12], 0xf27b896f), new Int_64(K_sha2[13], 0x3b1696b1),
				new Int_64(K_sha2[14], 0x25c71235), new Int_64(K_sha2[15], 0xcf692694),
				new Int_64(K_sha2[16], 0x9ef14ad2), new Int_64(K_sha2[17], 0x384f25e3),
				new Int_64(K_sha2[18], 0x8b8cd5b5), new Int_64(K_sha2[19], 0x77ac9c65),
				new Int_64(K_sha2[20], 0x592b0275), new Int_64(K_sha2[21], 0x6ea6e483),
				new Int_64(K_sha2[22], 0xbd41fbd4), new Int_64(K_sha2[23], 0x831153b5),
				new Int_64(K_sha2[24], 0xee66dfab), new Int_64(K_sha2[25], 0x2db43210),
				new Int_64(K_sha2[26], 0x98fb213f), new Int_64(K_sha2[27], 0xbeef0ee4),
				new Int_64(K_sha2[28], 0x3da88fc2), new Int_64(K_sha2[29], 0x930aa725),
				new Int_64(K_sha2[30], 0xe003826f), new Int_64(K_sha2[31], 0x0a0e6e70),
				new Int_64(K_sha2[32], 0x46d22ffc), new Int_64(K_sha2[33], 0x5c26c926),
				new Int_64(K_sha2[34], 0x5ac42aed), new Int_64(K_sha2[35], 0x9d95b3df),
				new Int_64(K_sha2[36], 0x8baf63de), new Int_64(K_sha2[37], 0x3c77b2a8),
				new Int_64(K_sha2[38], 0x47edaee6), new Int_64(K_sha2[39], 0x1482353b),
				new Int_64(K_sha2[40], 0x4cf10364), new Int_64(K_sha2[41], 0xbc423001),
				new Int_64(K_sha2[42], 0xd0f89791), new Int_64(K_sha2[43], 0x0654be30),
				new Int_64(K_sha2[44], 0xd6ef5218), new Int_64(K_sha2[45], 0x5565a910),
				new Int_64(K_sha2[46], 0x5771202a), new Int_64(K_sha2[47], 0x32bbd1b8),
				new Int_64(K_sha2[48], 0xb8d2d0c8), new Int_64(K_sha2[49], 0x5141ab53),
				new Int_64(K_sha2[50], 0xdf8eeb99), new Int_64(K_sha2[51], 0xe19b48a8),
				new Int_64(K_sha2[52], 0xc5c95a63), new Int_64(K_sha2[53], 0xe3418acb),
				new Int_64(K_sha2[54], 0x7763e373), new Int_64(K_sha2[55], 0xd6b2b8a3),
				new Int_64(K_sha2[56], 0x5defb2fc), new Int_64(K_sha2[57], 0x43172f60),
				new Int_64(K_sha2[58], 0xa1f0ab72), new Int_64(K_sha2[59], 0x1a6439ec),
				new Int_64(K_sha2[60], 0x23631e28), new Int_64(K_sha2[61], 0xde82bde9),
				new Int_64(K_sha2[62], 0xb2c67915), new Int_64(K_sha2[63], 0xe372532b),
				new Int_64(0xca273ece, 0xea26619c), new Int_64(0xd186b8c7, 0x21c0c207),
				new Int_64(0xeada7dd6, 0xcde0eb1e), new Int_64(0xf57d4f7f, 0xee6ed178),
				new Int_64(0x06f067aa, 0x72176fba), new Int_64(0x0a637dc5, 0xa2c898a6),
				new Int_64(0x113f9804, 0xbef90dae), new Int_64(0x1b710b35, 0x131c471b),
				new Int_64(0x28db77f5, 0x23047d84), new Int_64(0x32caab7b, 0x40c72493),
				new Int_64(0x3c9ebe0a, 0x15c9bebc), new Int_64(0x431d67c4, 0x9c100d4c),
				new Int_64(0x4cc5d4be, 0xcb3e42b6), new Int_64(0x597f299c, 0xfc657e2a),
				new Int_64(0x5fcb6fab, 0x3ad6faec), new Int_64(0x6c44198c, 0x4a475817)
			];
		}
	}

	/**
	 * Performs a round of SHA-2 hashing over a block
	 *
	 * @private
	 * @param {Array.<number>} block The binary array representation of the
	 *   block to hash
	 * @param {Array.<number|Int_64>} H The intermediate H values from a previous
	 *   round
	 * @param {string} variant The desired SHA-2 variant
	 * @return {Array.<number|Int_64>} The resulting H values
	 */
	function roundSHA2(block, H, variant)
	{
		var a, b, c, d, e, f, g, h, T1, T2, numRounds, t, binaryStringMult,
			safeAdd_2, safeAdd_4, safeAdd_5, gamma0, gamma1, sigma0, sigma1,
			ch, maj, Int, W = [], int1, int2, offset, K;

		/* Set up the various function handles and variable for the specific
		 * variant */
		if ((variant === "SHA-224" || variant === "SHA-256") &&
			(2 & SUPPORTED_ALGS))
		{
			/* 32-bit variant */
			numRounds = 64;
			binaryStringMult = 1;
			Int = Number;
			safeAdd_2 = safeAdd_32_2;
			safeAdd_4 = safeAdd_32_4;
			safeAdd_5 = safeAdd_32_5;
			gamma0 = gamma0_32;
			gamma1 = gamma1_32;
			sigma0 = sigma0_32;
			sigma1 = sigma1_32;
			maj = maj_32;
			ch = ch_32;
			K = K_sha2;
		}
		else if ((variant === "SHA-384" || variant === "SHA-512") &&
			(4 & SUPPORTED_ALGS))
		{
			/* 64-bit variant */
			numRounds = 80;
			binaryStringMult = 2;
			Int = Int_64;
			safeAdd_2 = safeAdd_64_2;
			safeAdd_4 = safeAdd_64_4;
			safeAdd_5 = safeAdd_64_5;
			gamma0 = gamma0_64;
			gamma1 = gamma1_64;
			sigma0 = sigma0_64;
			sigma1 = sigma1_64;
			maj = maj_64;
			ch = ch_64;
			K = K_sha512;
		}
		else
		{
			throw new Error("Unexpected error in SHA-2 implementation");
		}

		a = H[0];
		b = H[1];
		c = H[2];
		d = H[3];
		e = H[4];
		f = H[5];
		g = H[6];
		h = H[7];

		for (t = 0; t < numRounds; t += 1)
		{
			if (t < 16)
			{
				offset = t * binaryStringMult;
				int1 = (block.length <= offset) ? 0 : block[offset];
				int2 = (block.length <= offset + 1) ? 0 : block[offset + 1];
				/* Bit of a hack - for 32-bit, the second term is ignored */
				W[t] = new Int(int1, int2);
			}
			else
			{
				W[t] = safeAdd_4(
						gamma1(W[t - 2]), W[t - 7],
						gamma0(W[t - 15]), W[t - 16]
					);
			}

			T1 = safeAdd_5(h, sigma1(e), ch(e, f, g), K[t], W[t]);
			T2 = safeAdd_2(sigma0(a), maj(a, b, c));
			h = g;
			g = f;
			f = e;
			e = safeAdd_2(d, T1);
			d = c;
			c = b;
			b = a;
			a = safeAdd_2(T1, T2);
		}

		H[0] = safeAdd_2(a, H[0]);
		H[1] = safeAdd_2(b, H[1]);
		H[2] = safeAdd_2(c, H[2]);
		H[3] = safeAdd_2(d, H[3]);
		H[4] = safeAdd_2(e, H[4]);
		H[5] = safeAdd_2(f, H[5]);
		H[6] = safeAdd_2(g, H[6]);
		H[7] = safeAdd_2(h, H[7]);

		return H;
	}

	/**
	 * Finalizes the SHA-2 hash
	 *
	 * @private
	 * @param {Array.<number>} remainder Any leftover unprocessed packed ints
	 *   that still need to be processed
	 * @param {number} remainderBinLen The number of bits in remainder
	 * @param {number} processedBinLen The number of bits already
	 *   processed
	 * @param {Array.<number|Int_64>} H The intermediate H values from a previous
	 *   round
	 * @param {string} variant The desired SHA-2 variant
	 * @return {Array.<number>} The array of integers representing the SHA-2
	 *   hash of message
	 */
	function finalizeSHA2(remainder, remainderBinLen, processedBinLen, H, variant)
	{
		var i, appendedMessageLength, offset, retVal, binaryStringInc;

		if ((variant === "SHA-224" || variant === "SHA-256") &&
			(2 & SUPPORTED_ALGS))
		{
			/* 32-bit variant */
			/* The 65 addition is a hack but it works.  The correct number is
			   actually 72 (64 + 8) but the below math fails if
			   remainderBinLen + 72 % 512 = 0. Since remainderBinLen % 8 = 0,
			   "shorting" the addition is OK. */
			offset = (((remainderBinLen + 65) >>> 9) << 4) + 15;;
			binaryStringInc = 16;
		}
		else if ((variant === "SHA-384" || variant === "SHA-512") &&
			(4 & SUPPORTED_ALGS))
		{
			/* 64-bit variant */
			/* The 129 addition is a hack but it works.  The correct number is
			   actually 136 (128 + 8) but the below math fails if
			   remainderBinLen + 136 % 1024 = 0. Since remainderBinLen % 8 = 0,
			   "shorting" the addition is OK. */
			offset = (((remainderBinLen + 129) >>> 10) << 5) + 31;
			binaryStringInc = 32;
		}
		else
		{
			throw new Error("Unexpected error in SHA-2 implementation");
		}

		while (remainder.length <= offset)
		{
			remainder.push(0);
		}
		/* Append '1' at the end of the binary string */
		remainder[remainderBinLen >>> 5] |= 0x80 << (24 - remainderBinLen % 32);
		/* Append length of binary string in the position such that the new
		 * length is correct */
		remainder[offset] = remainderBinLen + processedBinLen;

		appendedMessageLength = remainder.length;

		/* This will always be at least 1 full chunk */
		for (i = 0; i < appendedMessageLength; i += binaryStringInc)
		{
			H = roundSHA2(remainder.slice(i, i + binaryStringInc), H, variant);
		}

		if (("SHA-224" === variant) && (2 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0], H[1], H[2], H[3],
				H[4], H[5], H[6]
			];
		}
		else if (("SHA-256" === variant) && (2 & SUPPORTED_ALGS))
		{
			retVal = H;
		}
		else if (("SHA-384" === variant) && (4 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder
			];
		}
		else if (("SHA-512" === variant) && (4 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder,
				H[6].highOrder, H[6].lowOrder,
				H[7].highOrder, H[7].lowOrder
			];
		}
		else /* This should never be reached */
		{
			throw new Error("Unexpected error in SHA-2 implementation");
		}

		return retVal;
	}

	/**
	 * jsSHA is the workhorse of the library.  Instantiate it with the string to
	 * be hashed as the parameter
	 *
	 * @constructor
	 * @this {jsSHA}
	 * @param {string} variant The desired SHA variant (SHA-1, SHA-224, SHA-256,
	 *   SHA-384, or SHA-512)
	 * @param {string} inputFormat The format of srcString: HEX, TEXT, B64, or BYTES
	 * @param {{encoding: (string|undefined), numRounds: (string|undefined)}=}
	 *   options Optional values
	 */
	var jsSHA = function(variant, inputFormat, options)
	{
		var processedLen = 0, remainder = [], remainderLen = 0, utfType,
			intermediateH, converterFunc, shaVariant = variant, outputBinLen,
			variantBlockSize, roundFunc, finalizeFunc, finalized = false,
			hmacKeySet = false, keyWithIPad = [], keyWithOPad = [], numRounds,
			updatedCalled = false, inputOptions;

		inputOptions = options || {};
		utfType = inputOptions["encoding"] || "UTF8";
		numRounds = inputOptions["numRounds"] || 1;

		converterFunc = getStrConverter(inputFormat, utfType);

		if ((numRounds !== parseInt(numRounds, 10)) || (1 > numRounds))
		{
			throw new Error("numRounds must a integer >= 1");
		}

		if (("SHA-1" === shaVariant) && (1 & SUPPORTED_ALGS))
		{
			variantBlockSize = 512;
			roundFunc = roundSHA1;
			finalizeFunc = finalizeSHA1;
			outputBinLen = 160;
		}
		else
		{
			if (6 & SUPPORTED_ALGS)
			{
				roundFunc = function (block, H) {
					return roundSHA2(block, H, shaVariant);
				};
				finalizeFunc = function (remainder, remainderBinLen, processedBinLen, H)
				{
					return finalizeSHA2(remainder, remainderBinLen, processedBinLen, H, shaVariant);
				};
			}

			if (("SHA-224" === shaVariant) && (2 & SUPPORTED_ALGS))
			{
				variantBlockSize = 512;
				outputBinLen = 224;
			}
			else if (("SHA-256" === shaVariant) && (2 & SUPPORTED_ALGS))
			{
				variantBlockSize = 512;
				outputBinLen = 256;
			}
			else if (("SHA-384" === shaVariant) && (4 & SUPPORTED_ALGS))
			{
				variantBlockSize = 1024;
				outputBinLen = 384;
			}
			else if (("SHA-512" === shaVariant) && (4 & SUPPORTED_ALGS))
			{
				variantBlockSize = 1024;
				outputBinLen = 512;
			}
			else
			{
				throw new Error("Chosen SHA variant is not supported");
			}
		}

		intermediateH = getH(shaVariant);

		/**
		 * Sets the HMAC key for an eventual getHMAC call.  Must be called
		 * immediately after jsSHA object instantiation
		 *
		 * @expose
		 * @param {string} key The key used to calculate the HMAC
		 * @param {string} inputFormat The format of key, HEX, TEXT, B64, or BYTES
		 * @param {{encoding : (string|undefined)}=} options Associative array
		 *   of input format options
		 */
		this.setHMACKey = function(key, inputFormat, options)
		{
			var keyConverterFunc, convertRet, keyBinLen, keyToUse, blockByteSize,
				i, lastArrayIndex, keyOptions;

			if (true === hmacKeySet)
			{
				throw new Error("HMAC key already set");
			}

			if (true === finalized)
			{
				throw new Error("Cannot set HMAC key after finalizing hash");
			}

			if (true === updatedCalled)
			{
				throw new Error("Cannot set HMAC key after calling update");
			}

			keyOptions = options || {};
			utfType = keyOptions["encoding"] || "UTF8";

			keyConverterFunc = getStrConverter(inputFormat, utfType);

			convertRet = keyConverterFunc(key);
			keyBinLen = convertRet["binLen"];
			keyToUse = convertRet["value"];

			blockByteSize = variantBlockSize >>> 3;

			/* These are used multiple times, calculate and store them */
			lastArrayIndex = (blockByteSize / 4) - 1;

			/* Figure out what to do with the key based on its size relative to
			 * the hash's block size */
			if (blockByteSize < (keyBinLen / 8))
			{
				keyToUse = finalizeFunc(keyToUse, keyBinLen, 0, getH(shaVariant));
				/* For all variants, the block size is bigger than the output
				 * size so there will never be a useful byte at the end of the
				 * string */
				while (keyToUse.length <= lastArrayIndex)
				{
					keyToUse.push(0);
				}
				keyToUse[lastArrayIndex] &= 0xFFFFFF00;
			}
			else if (blockByteSize > (keyBinLen / 8))
			{
				/* If the blockByteSize is greater than the key length, there
				 * will always be at LEAST one "useless" byte at the end of the
				 * string */
				while (keyToUse.length <= lastArrayIndex)
				{
					keyToUse.push(0);
				}
				keyToUse[lastArrayIndex] &= 0xFFFFFF00;
			}

			/* Create ipad and opad */
			for (i = 0; i <= lastArrayIndex; i += 1)
			{
				keyWithIPad[i] = keyToUse[i] ^ 0x36363636;
				keyWithOPad[i] = keyToUse[i] ^ 0x5C5C5C5C;
			}

			intermediateH = roundFunc(keyWithIPad, intermediateH);
			processedLen = variantBlockSize;

			hmacKeySet = true;
		};

		/**
		 * Takes strString and hashes as many blocks as possible.  Stores the
		 * rest for either a future update or getHash call.
		 *
		 * @expose
		 * @param {string} srcString The string to be hashed
		 */
		this.update = function(srcString)
		{
			var convertRet, chunkBinLen, chunkIntLen, chunk, i, updateProcessedLen = 0,
				variantBlockIntInc = variantBlockSize >>> 5;

			convertRet = converterFunc(srcString, remainder, remainderLen);
			chunkBinLen = convertRet["binLen"];
			chunk = convertRet["value"];

			chunkIntLen = chunkBinLen >>> 5;
			for (i = 0; i < chunkIntLen; i += variantBlockIntInc)
			{
				if (updateProcessedLen + variantBlockSize <= chunkBinLen)
				{
					intermediateH = roundFunc(
						chunk.slice(i, i + variantBlockIntInc),
						intermediateH
					);
					updateProcessedLen += variantBlockSize;
				}
			}
			processedLen += updateProcessedLen;
			remainder = chunk.slice(updateProcessedLen >>> 5);
			remainderLen = chunkBinLen % variantBlockSize;
			updatedCalled = true;
		};

		/**
		 * Returns the desired SHA hash of the string specified at instantiation
		 * using the specified parameters
		 *
		 * @expose
		 * @param {string} format The desired output formatting (B64, HEX, or BYTES)
		 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined)}=}
		 *   options Hash list of output formatting options
		 * @return {string} The string representation of the hash in the format
		 *   specified
		 */
		this.getHash = function(format, options)
		{
			var formatFunc, i, outputOptions;

			if (true === hmacKeySet)
			{
				throw new Error("Cannot call getHash after setting HMAC key");
			}

			outputOptions = getOutputOpts(options);

			/* Validate the output format selection */
			switch (format)
			{
			case "HEX":
				formatFunc = function(binarray) {return binb2hex(binarray, outputOptions);};
				break;
			case "B64":
				formatFunc = function(binarray) {return binb2b64(binarray, outputOptions);};
				break;
			case "BYTES":
				formatFunc = binb2bytes;
				break;
			default:
				throw new Error("format must be HEX, B64, or BYTES");
			}

			if (false === finalized)
			{
				intermediateH = finalizeFunc(remainder, remainderLen, processedLen, intermediateH);
				for (i = 1; i < numRounds; i += 1)
				{
					intermediateH = finalizeFunc(intermediateH, outputBinLen, 0, getH(shaVariant));
				}
			}

			finalized = true;
			return formatFunc(intermediateH);
		};

		/**
		 * Returns the the HMAC in the specified format using the key given by
		 * a previous setHMACKey call.
		 *
		 * @expose
		 * @param {string} format The desired output formatting
		 *   (B64, HEX, or BYTES)
		 * @param {{outputUpper : (boolean|undefined), b64Pad : (string|undefined)}=}
		 *   options associative array of output formatting options
		 * @return {string} The string representation of the hash in the format
		 *   specified
		 */
		this.getHMAC = function(format, options)
		{
			var formatFunc,	firstHash, outputOptions;

			if (false === hmacKeySet)
			{
				throw new Error("Cannot call getHMAC without first setting HMAC key");
			}

			outputOptions = getOutputOpts(options);

			/* Validate the output format selection */
			switch (format)
			{
			case "HEX":
				formatFunc = function(binarray) {return binb2hex(binarray, outputOptions);};
				break;
			case "B64":
				formatFunc = function(binarray) {return binb2b64(binarray, outputOptions);};
				break;
			case "BYTES":
				formatFunc = binb2bytes;
				break;
			default:
				throw new Error("outputFormat must be HEX, B64, or BYTES");
			}

			if (false === finalized)
			{
				firstHash = finalizeFunc(remainder, remainderLen, processedLen, intermediateH);
				intermediateH = roundFunc(keyWithOPad, getH(shaVariant));
				intermediateH = finalizeFunc(firstHash, outputBinLen, variantBlockSize, intermediateH);
			}

			finalized = true;
			return formatFunc(intermediateH);
		};
	};

	if (("function" === typeof define) && (define["amd"])) /* AMD Support */
	{
		define(function()
		{
			return jsSHA;
		});
	} else if ("undefined" !== typeof exports) /* Node Support */
	{
		if (("undefined" !== typeof module) && module["exports"])
		{
		  module["exports"] = exports = jsSHA;
		}
		else {
			exports = jsSHA;
		}
	} else { /* Browsers and Web Workers*/
		global["jsSHA"] = jsSHA;
	}
}(this));

(function() {
  var Hotp, Totp;

  Totp = class Totp {
    // pass in the secret, code dom element, ticker dom element
    constructor(expiry = 30, length = 6) {
      this.expiry = expiry;
      this.length = length;
      // validate input
      if (this.length > 8 || this.length < 6) {
        throw "Error: invalid code length";
      }
    }

    dec2hex(s) {
      return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    }

    hex2dec(s) {
      return parseInt(s, 16);
    }

    base32tohex(base32) {
      var base32chars, bits, chunk, hex, i, val;
      base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      bits = "";
      hex = "";
      i = 0;
      while (i < base32.length) {
        val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += this.leftpad(val.toString(2), 5, "0");
        i++;
      }
      i = 0;
      while (i + 4 <= bits.length) {
        chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16);
        i += 4;
      }
      return hex;
    }

    leftpad(str, len, pad) {
      if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
      }
      return str;
    }

    getOtp(secret, now = new Date().getTime()) {
      var epoch, hmac, key, offset, otp, shaObj, time;
      key = this.base32tohex(secret);
      epoch = Math.round(now / 1000.0);
      time = this.leftpad(this.dec2hex(Math.floor(epoch / this.expiry)), 16, "0");
      shaObj = new jsSHA("SHA-1", "HEX");
      shaObj.setHMACKey(key, "HEX");
      shaObj.update(time);
      hmac = shaObj.getHMAC("HEX");
      // hmacObj = new jsSHA(time, "HEX")  # Dependency on sha.js
      // hmac = hmacObj.getHMAC(key, "HEX", "SHA-1", "HEX")
      if (hmac === "KEY MUST BE IN BYTE INCREMENTS") {
        throw "Error: hex key must be in byte increments";
      } else {
        // return null
        offset = this.hex2dec(hmac.substring(hmac.length - 1));
      }
      otp = (this.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec("7fffffff")) + "";
      if (otp.length > this.length) {
        otp = otp.substr(otp.length - this.length, this.length);
      } else {
        otp = this.leftpad(otp, this.length, "0");
      }
      return otp;
    }

  };

  Hotp = class Hotp {
    constructor(length = 6) {
      this.length = length;
      // validate input
      if (this.length > 8 || this.length < 6) {
        throw "Error: invalid code length";
      }
    }

    // stuck on this for a long time. Use JSON.stringify to inspect uintToString output!!
    uintToString(uintArray) {
      var decodedString, encodedString;
      encodedString = String.fromCharCode.apply(null, uintArray);
      decodedString = decodeURIComponent(escape(encodedString));
      return decodedString;
    }

    getOtp(key, counter) {
      var digest, h, offset, shaObj, v;
      shaObj = new jsSHA("SHA-1", "TEXT");
      shaObj.setHMACKey(key, "TEXT");
      shaObj.update(this.uintToString(new Uint8Array(this.intToBytes(counter))));
      digest = shaObj.getHMAC("HEX");
      // Get byte array
      h = this.hexToBytes(digest);
      
      // Truncate
      offset = h[19] & 0xf;
      v = (h[offset] & 0x7f) << 24 | (h[offset + 1] & 0xff) << 16 | (h[offset + 2] & 0xff) << 8 | h[offset + 3] & 0xff;
      v = v + '';
      return v.substr(v.length - this.length, this.length);
    }

    intToBytes(num) {
      var bytes, i;
      bytes = [];
      i = 7;
      while (i >= 0) {
        bytes[i] = num & 255;
        num = num >> 8;
        --i;
      }
      return bytes;
    }

    hexToBytes(hex) {
      var C, bytes, c;
      bytes = [];
      c = 0;
      C = hex.length;
      while (c < C) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
        c += 2;
      }
      return bytes;
    }

  };

  window.jsOTP = {};

  jsOTP.totp = Totp;

  jsOTP.hotp = Hotp;

}).call(this);

// https://github.com/mathiasbynens/punycode.js
// https://cdnjs.com/libraries/punycode

'use strict';

/** Highest positive signed 32-bit float value */
const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
const base = 36;
const tMin = 1;
const tMax = 26;
const skew = 38;
const damp = 700;
const initialBias = 72;
const initialN = 128; // 0x80
const delimiter = '-'; // '\x2D'

/** Regular expressions */
const regexPunycode = /^xn--/;
const regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
const errors = {
	'overflow': 'Overflow: input needs wider integers to process',
	'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
const baseMinusTMin = base - tMin;
const floor = Math.floor;
const stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
	throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map(array, fn) {
	const result = [];
	let length = array.length;
	while (length--) {
		result[length] = fn(array[length]);
	}
	return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
	const parts = string.split('@');
	let result = '';
	if (parts.length > 1) {
		// In email addresses, only the domain name should be punycoded. Leave
		// the local part (i.e. everything up to `@`) intact.
		result = parts[0] + '@';
		string = parts[1];
	}
	// Avoid `split(regex)` for IE8 compatibility. See #17.
	string = string.replace(regexSeparators, '\x2E');
	const labels = string.split('.');
	const encoded = map(labels, fn).join('.');
	return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
	const output = [];
	let counter = 0;
	const length = string.length;
	while (counter < length) {
		const value = string.charCodeAt(counter++);
		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
			// It's a high surrogate, and there is a next character.
			const extra = string.charCodeAt(counter++);
			if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
			} else {
				// It's an unmatched surrogate; only append this code unit, in case the
				// next code unit is the high surrogate of a surrogate pair.
				output.push(value);
				counter--;
			}
		} else {
			output.push(value);
		}
	}
	return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
const ucs2encode = array => String.fromCodePoint(...array);

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
const basicToDigit = function(codePoint) {
	if (codePoint - 0x30 < 0x0A) {
		return codePoint - 0x16;
	}
	if (codePoint - 0x41 < 0x1A) {
		return codePoint - 0x41;
	}
	if (codePoint - 0x61 < 0x1A) {
		return codePoint - 0x61;
	}
	return base;
};

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
const digitToBasic = function(digit, flag) {
	//  0..25 map to ASCII a..z or A..Z
	// 26..35 map to ASCII 0..9
	return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
const adapt = function(delta, numPoints, firstTime) {
	let k = 0;
	delta = firstTime ? floor(delta / damp) : delta >> 1;
	delta += floor(delta / numPoints);
	for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
		delta = floor(delta / baseMinusTMin);
	}
	return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
const decode = function(input) {
	// Don't use UCS-2.
	const output = [];
	const inputLength = input.length;
	let i = 0;
	let n = initialN;
	let bias = initialBias;

	// Handle the basic code points: let `basic` be the number of input code
	// points before the last delimiter, or `0` if there is none, then copy
	// the first basic code points to the output.

	let basic = input.lastIndexOf(delimiter);
	if (basic < 0) {
		basic = 0;
	}

	for (let j = 0; j < basic; ++j) {
		// if it's not a basic code point
		if (input.charCodeAt(j) >= 0x80) {
			error('not-basic');
		}
		output.push(input.charCodeAt(j));
	}

	// Main decoding loop: start just after the last delimiter if any basic code
	// points were copied; start at the beginning otherwise.

	for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

		// `index` is the index of the next character to be consumed.
		// Decode a generalized variable-length integer into `delta`,
		// which gets added to `i`. The overflow checking is easier
		// if we increase `i` as we go, then subtract off its starting
		// value at the end to obtain `delta`.
		let oldi = i;
		for (let w = 1, k = base; /* no condition */; k += base) {

			if (index >= inputLength) {
				error('invalid-input');
			}

			const digit = basicToDigit(input.charCodeAt(index++));

			if (digit >= base || digit > floor((maxInt - i) / w)) {
				error('overflow');
			}

			i += digit * w;
			const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

			if (digit < t) {
				break;
			}

			const baseMinusT = base - t;
			if (w > floor(maxInt / baseMinusT)) {
				error('overflow');
			}

			w *= baseMinusT;

		}

		const out = output.length + 1;
		bias = adapt(i - oldi, out, oldi == 0);

		// `i` was supposed to wrap around from `out` to `0`,
		// incrementing `n` each time, so we'll fix that now:
		if (floor(i / out) > maxInt - n) {
			error('overflow');
		}

		n += floor(i / out);
		i %= out;

		// Insert `n` at position `i` of the output.
		output.splice(i++, 0, n);

	}

	return String.fromCodePoint(...output);
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
const encode = function(input) {
	const output = [];

	// Convert the input in UCS-2 to an array of Unicode code points.
	input = ucs2decode(input);

	// Cache the length.
	let inputLength = input.length;

	// Initialize the state.
	let n = initialN;
	let delta = 0;
	let bias = initialBias;

	// Handle the basic code points.
	for (const currentValue of input) {
		if (currentValue < 0x80) {
			output.push(stringFromCharCode(currentValue));
		}
	}

	let basicLength = output.length;
	let handledCPCount = basicLength;

	// `handledCPCount` is the number of code points that have been handled;
	// `basicLength` is the number of basic code points.

	// Finish the basic string with a delimiter unless it's empty.
	if (basicLength) {
		output.push(delimiter);
	}

	// Main encoding loop:
	while (handledCPCount < inputLength) {

		// All non-basic code points < n have been handled already. Find the next
		// larger one:
		let m = maxInt;
		for (const currentValue of input) {
			if (currentValue >= n && currentValue < m) {
				m = currentValue;
			}
		}

		// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
		// but guard against overflow.
		const handledCPCountPlusOne = handledCPCount + 1;
		if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
			error('overflow');
		}

		delta += (m - n) * handledCPCountPlusOne;
		n = m;

		for (const currentValue of input) {
			if (currentValue < n && ++delta > maxInt) {
				error('overflow');
			}
			if (currentValue == n) {
				// Represent delta as a generalized variable-length integer.
				let q = delta;
				for (let k = base; /* no condition */; k += base) {
					const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
					if (q < t) {
						break;
					}
					const qMinusT = q - t;
					const baseMinusT = base - t;
					output.push(
						stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
					);
					q = floor(qMinusT / baseMinusT);
				}

				output.push(stringFromCharCode(digitToBasic(q, 0)));
				bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
				delta = 0;
				++handledCPCount;
			}
		}

		++delta;
		++n;

	}
	return output.join('');
};

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
const toUnicode = function(input) {
	return mapDomain(input, function(string) {
		return regexPunycode.test(string)
			? decode(string.slice(4).toLowerCase())
			: string;
	});
};

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
const toASCII = function(input) {
	return mapDomain(input, function(string) {
		return regexNonASCII.test(string)
			? 'xn--' + encode(string)
			: string;
	});
};

/*--------------------------------------------------------------------------*/

/** Define the public API */
const punycode = {
	/**
	 * A string representing the current Punycode.js version number.
	 * @memberOf punycode
	 * @type String
	 */
	'version': '2.1.0',
	/**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */
	'ucs2': {
		'decode': ucs2decode,
		'encode': ucs2encode
	},
	'decode': decode,
	'encode': encode,
	'toASCII': toASCII,
	'toUnicode': toUnicode
};



class Format
{
    constructor()
    {
        
    }
}

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
if( typeof Element.prototype.clearChildren === 'undefined' ) {
    Object.defineProperty(Element.prototype, 'clearChildren', {
      configurable: true,
      enumerable: false,
      value: function() {
        while(this.firstChild) this.removeChild(this.lastChild);
      }
    });
}
function convertToPunycode(name)
{
    let nameAscii;
    try{nameAscii = punycode.toASCII(name);}catch(e){console.log('not a punycode');}
    //console.log(nameAscii);
    return nameAscii;
}
function convertFromPunycode(name)
{
    if(name.startsWith('xn--'))
    {
        try{name = punycode.toUnicode(name);}catch(e){console.log('punycode error');}
    }
    return name;
}
function parseDate(date)
{
    date = date.split('T')[0];
    date = date.split("-");
    let newDate = {};
    newDate['day'] = parseInt(date[2]);
    newDate['month'] = parseInt(date[1]);
    newDate['year'] = parseInt(date[0]);
    return newDate;
}
MONTHS = ['','JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
function formatDateToText(date)
{
    let text = date['day'] + ' ' + this.MONTHS[date['month']] + ' ' + date['year'];
    return text;
}
function formatMonthToText(date)
{
    let text = this.MONTHS[date['month']] + ' ' + date['year'];
    return text;
}
function formatDateToId(date)
{
    let id = date['year'] + '-' + date['month'] + '-' + date['day'];
    return id;
}
function parseDateFromId(id)
{
    date = id.split("-");
    let newDate = {};
    newDate['day'] = parseInt(date[2]);
    newDate['month'] = parseInt(date[1]);
    newDate['year'] = parseInt(date[0]);
    return newDate;    
}
function listArrayWithEllipsis(data)
{
    return data.join(", ").slice(0,70) + '...';
}
function getRandom(max) {
  return Math.floor(Math.random() * max);
}

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


