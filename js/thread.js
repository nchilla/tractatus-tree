var tractatus;
var depth=0;
var prop=0;
var height=0;
var highest='';
var prefacetitle={en:'Preface',de:'Vorwort'};
var lang='en';

var expandHead=false;
var recordDist='80px';

function buildBody(json){
  // console.log(json)
  tractatus=d3.hierarchy(json);
  console.log(tractatus);
  sayChildren(tractatus);
  console.log(highest,height);
  headerStartUp();
}

function sayChildren(object){
  object.children.forEach((item, i) => {
    var key=parseKey(item.data.key)
    highest=(item.depth>height)?item.data.key:highest;
    height=(item.depth>height)?item.depth:height;
    d3.select('#i'+key.parent)
    .append('div')
    .datum(item)
    .attr('id','i'+key.dom)
    .attr('class',`depth${item.depth} prop ${item.data.empty==true?'empty':''}`)
    .append('div').attr('class','content')
    var currentProp=d3.select('#i'+key.dom)
    fillProp(currentProp);
    // currentProp.html(`<span class="key">${key.display==0?prefacetitle[lang]:key.display}</span>`+(item.data.empty==false?item.data.content.en:''));

    if(item.children){sayChildren(item);};
  });
}

function fillProp(selection){
  var prop=selection.datum();
  var key=parseKey(prop.data.key);
  selection.select('.content').html(`<span class="key">${key.display==0?prefacetitle[lang]:key.display}</span>`+(prop.data.empty==false?prop.data.content[lang]:''));
}

function theSearch(key){
  var node=d3.select('#i'+key.dom).node();
  if(node!==null){
    var scrollingOpt={behavior:'auto',block:'start'};
    document.querySelector('#i'+key.dom).scrollIntoView(scrollingOpt);
  }
}

function parseKey(keystring){
  var keyArray=keystring.split('.');
  var keyDisplay=[...keyArray];
  keyDisplay[0]=keyDisplay[0]+'.';
  keyDisplay=keyDisplay.join('');
  var keyClass=keyArray.join('-');
  var keyParent=keyArray.slice(0,keyArray.length-1).join('-');
  return {array:keyArray,display:keyDisplay,dom:keyClass,parent:keyParent}
}

function changeLang(){
  lang=(lang=='en')?'de':'en';
  d3.selectAll('.active').classed('active',false);
  d3.select('#'+lang).classed('active',true);
  d3.selectAll('.prop').each(function(){
    fillProp(d3.select(this))
  })
}
