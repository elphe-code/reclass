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

