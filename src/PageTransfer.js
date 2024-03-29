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
