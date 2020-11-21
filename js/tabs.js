var tractatus;


function setUp(json){
  tractatus=d3.hierarchy(json);
  console.log(tractatus);
  // var trunk=tractatus.children;
  // var d1=d3.select('#d1');
  // for(var i=1;i<trunk.length;i++){
  //   var item=trunk[i].data;
  //   var key=parseKey(item.key);
  //   d1.append('div').attr('class','prop').attr('id','p'+key.dom).html(item.content.en);
  //   d3.select('#p'+key.dom).insert('span',':first-child').attr('class','key').html(key.display);
  // }
  populate(tractatus,1);
  d3.selectAll('.sheet').on('click',function(){
    if(event.srcElement==this){
      var ind=d3.select(this).attr('id').split('')[1];
      resetFocus(ind);
    }
  })
  d3.select('#window-minmax').on('click',toggleWin);
  // $('#header-bar').draggable();
}

function populate(parent,startInd){
  var trunk=parent.children;
  var depth=parent.depth+1;
  var layer=d3.select('#d'+depth);
  layer.selectAll('.prop').remove();
  for(var i=startInd;i<trunk.length;i++){
    var item=trunk[i].data;
    var key=parseKey(item.key);
    var isParent=trunk[i].children?true:false;
    var domClass=`prop ${(isParent?'parent':'')}`;
    layer.append('div').attr('class',domClass).datum(trunk[i]).attr('id','p'+key.dom).html(item.content.en);
    d3.select('#p'+key.dom).insert('span',':first-child').attr('class','key').html(key.display);
    resetFocus(depth);
  }

  layer.selectAll('.parent').on('click',open)

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
  populate(d3.select(this).datum(),0);
}

function parseKey(key){
  var keyArray=key.split('.');
  var keyDisplay=keyArray[0]+'.';
  // if(keyArray.length>1){
  //   var keyDisplay=keyArray[0]+'.';
  // }else{
  //   var keyDisplay=keyArray[0];
  // }

  for(var i=1;i<keyArray.length;i++){
    keyDisplay=keyDisplay+keyArray[i];
  }
  var keyClass=keyArray.join('-');
  var keyParent=keyArray.slice(0,keyArray.length-1).join('-');

  return {array:keyArray,display:keyDisplay,dom:keyClass,parent:keyParent}

}

function toggleWin(){
  var header=d3.select('#header-bar');
  if(header.classed('minimized')){
    header.classed('minimized',false);
  }else{
    header.classed('minimized',true);
  }
}
