var tractatus;
var depth=0;
var prop=0;
var height=0;
var highest='';
var delay=false;

function buildBody(json){
  // console.log(json)
  tractatus=d3.hierarchy(json);
  sayChildren(tractatus);
  document.querySelector('#grid').addEventListener('wheel',scrollTrigger);

  // d3.selectAll(".content").on('click',expand);

}

function sayChildren(object){
  object.children.forEach((item, i) => {
    var keyArray=item.data.key.split('.');
    var keyDisplay=keyArray[0]+'.';

    for(var i=1;i<keyArray.length;i++){
      keyDisplay=keyDisplay+keyArray[i];
    }

    var keyClass=keyArray.join('-');
    var keyParent=keyArray.slice(0,keyArray.length-1).join('-');
    highest=(item.depth>height)?item.data.key:highest;
    height=(item.depth>height)?item.depth:height;
    var parent=d3.select('#i'+keyParent)
    parent
    .append('div')
    .datum(item)
    .attr('id','i'+keyClass)
    .attr('class',`depth${item.depth} tree ${item.depth>1?'child':'primary'} ${item.children?'':'empty'}`)
    .append('div').attr('class','content')
    .html(`<span class="key">${keyDisplay}</span>`+(item.data.empty==false?item.data.content.en:''));

    if(item.children){sayChildren(item);};
  });

}

function scrollTrigger(){
  console.log(event)
  if(delay==false){
    delay=true;
    var presentTop=d3.select('#grid').style('top').replace('vh','')

    if(event.wheelDeltaY<0){
      var newTop=parseInt(presentTop)-100>-600?parseInt(presentTop)-100:-600;
    }else{
        var newTop=parseInt(presentTop)+100<0?parseInt(presentTop)+100:0;
    }


    d3.select('#grid').style('top',newTop+'vh');
    setTimeout(function () {delay=false}, 1000);
  }
}

// function expand(){
//   var parent=event.path[0];
//   for(var i=0;i<event.path.length;i++){
//     if(d3.select(event.path[i]).classed('content')){
//       parent=event.path[i].parentNode;
//       break;
//     }
//   }
//   var children=d3.select(parent).selectAll('.child').filter(function() { return this.parentNode == parent});
//   children.style('display','block')
//   setTimeout(function(){children.style('opacity','1')},50);
//   console.log(d3.select(parent).datum());
// }
