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
