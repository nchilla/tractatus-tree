var tractatus;


function setUp(json){
  tractatus=d3.hierarchy(json);
  console.log(tractatus);
  populate(tractatus,0);
  d3.selectAll('.sheet').on('click',function(){

    if(event.srcElement==this){
      var ind=d3.select(this).attr('id').split('')[1];
      resetFocus(ind);
    }
  })
  d3.select('#window-minmax').on('click',toggleWin);
}

function populate(parent,startInd){
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
      .html('<span class="open-children">←</span><p>Preface</p>')
    }else{
      layer.append('div').attr('class',domClass).datum(trunk[i]).attr('id','p'+key.dom).html(item.content.en);
      d3.select('#p'+key.dom).insert('span',':first-child').attr('class','key').html(key.display);
      if(isParent){
        var lastChild=d3.select('#p'+key.dom).node().lastChild;
        d3.select(lastChild).append('span').attr('class','open-children').html(` [${trunk[i].children.length}]→`);
      }
      resetFocus(depth);
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


  if(d3.select(prop).classed('prop')){
    populate(d3.select(prop).datum(),0);
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
  .html(tractatus.children[0].data.content.en)
  .insert('span',':first-child').attr('class','key').html('Preface');
  resetFocus(0);

  setTimeout(function () {
    depth0.classed('expand',true);
  }, 10);

  depth0.select('.open-children').on('click',function(){
    d3.select('#d0').classed('expand',false);
    populate(tractatus,0);
  })
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
