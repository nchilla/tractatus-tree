var tractatus;
var expandHead=false;
var recordDist='80px';
var lang='en';
var prefacetitle={en:'Preface',de:'Vorwort'};
var atm;
var indrecord=1;

function setUp(json){
  tractatus=d3.hierarchy(json);
  console.log(tractatus);
  atm=tractatus;
  populate(tractatus,0,true);
  d3.selectAll('.sheet').on('click',function(){
    if(event.srcElement==this){
      var ind=d3.select(this).attr('id').split('')[1];
      ind=parseInt(ind);
      for(var i=0; i<indrecord-ind;i++){
        atm=atm.parent;
      }
      indrecord=ind;
      resetFocus(ind);
    }
  })
  headerStartUp();
  // d3.select('#window-minmax').on('click',toggleWin);
}

function populate(parent,startInd,present){
  var trunk=parent.children;
  var depth=parent.depth+1;
  var layer=d3.select('#d'+depth);
  if(depth>1){
    var parentKey=parseKey(parent.data.key);
    d3.select('#d'+parent.depth).node().scrollTop=0;
    var tab=d3.select('#d'+parent.depth).select('.tab');
    tab.select('span').html(parentKey.display);
    var intProg=parseInt(parentKey.array[parentKey.array.length-1]);
    var progress=Math.round((intProg>0?intProg:1)/tab.datum().childcount*80);
    tab.style('top',`${progress}vh`)
  }
  layer.selectAll('.prop').remove();
  for(var i=startInd;i<trunk.length;i++){
    var item=trunk[i].data;
    var key=parseKey(item.key);
    var isParent=trunk[i].children?true:false;
    var domClass=`prop ${(isParent?'parent':'')}`;

    if(depth==1&&i==0){
      d3.select('#d1')
      .append('div')
      .attr('class','prop')
      .attr('id','p'+key.dom)
      .html(`<span class="open-children">←</span><p>${prefacetitle[lang]}</p>`)
    }else{
      layer.append('div').attr('class',domClass).datum(trunk[i]).attr('id','p'+key.dom).html(item.content[lang]);
      d3.select('#p'+key.dom).insert('span',':first-child').attr('class','key').html(key.display);
      if(isParent){
        var lastChild=d3.select('#p'+key.dom).node().lastChild;
        d3.select(lastChild).append('span').attr('class','open-children').html(` [${trunk[i].children.length}]→`);
      }
      if(present==true){
        indrecord=depth;
        resetFocus(depth);
      }
    }
  }
  layer.select('.tab').datum({childcount:(depth>1?trunk.length:trunk.length-1)});
  layer.selectAll('.open-children').on('click',open);

}

function resetFocus(crosshair){
  d3.selectAll('.visible').classed('visible',false);
  d3.select('#d'+crosshair).classed('visible',true);
  d3.selectAll('.prev').classed('prev',false);
  for(var i=crosshair-1;i>0;i-- ){
    d3.select('#d'+i).classed('prev',true);
  }
}


function open(){
  var prop=this.parentNode.parentNode;
  atm=d3.select(prop).datum();

  if(d3.select(prop).classed('prop')){
    populate(d3.select(prop).datum(),0,true);
  }else{
    handlePreface();
  }

}

function handlePreface(){
  var depth0=d3.select('#d0');
  depth0.html('');
  depth0.append('div').attr('class','prop')
  .html('<p>Propositions<span class="open-children"> →</span> </p>')

  depth0.append('div').attr('class','prop')
  .html(tractatus.children[0].data.content[lang])
  .insert('span',':first-child').attr('class','key').html(prefacetitle[lang]);
  indrecord=0;
  resetFocus(0);
  setTimeout(function () {
    depth0.classed('expand',true);
  }, 10);

  depth0.select('.open-children').on('click',function(){
    d3.select('#d0').classed('expand',false);
    atm=tractatus;
    populate(tractatus,0,true);
  })
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
  console.log(atm);
  lang=(lang=='en')?'de':'en';
  d3.selectAll('.active').classed('active',false);
  d3.select('#'+lang).classed('active',true);
  if(atm!==undefined){
    populate(atm,0,true);
    var crosshair=atm;
    for(var i=indrecord;i>1;i--){
      crosshair=crosshair.parent;
      populate(crosshair,0,false);
    }
  }else{
    handlePreface();
  }
  // d3.selectAll('.prop').each(function(d,i){
  //
  // })
}

function theSearch(key){
  locate(key);
}

function locate(key){
  let field=tractatus;
  key.array.forEach((item, i) => {
    var scopeKey=parseKeyArray(key.array.slice(0,i+1));
    let temp;
    for(var x=0;x<field.children.length;x++){
      if(field.children[x].data.key==scopeKey.js){
        temp=field.children[x];
      }
    }
    if(temp!==undefined){
      field=temp;
    }
  });
  if(field.parent!==null){
    atm=field.parent;
    populate(field.parent,0,true)
  }
}

function toggleWin(){
  var header=d3.select('#header-bar');
  var sheets=d3.selectAll('.sheet')
  if(header.classed('minimized')){
    header.classed('minimized',false);
    sheets.style('padding-top','60px');
    d3.select('#window-minmax').html('-');
  }else{
    header.classed('minimized',true);
    sheets.style('padding-top','120px');
    d3.select('#window-minmax').html('+');
  }
}
