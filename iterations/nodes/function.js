var tractatus;
var depth=0;
var prop=0;
var height=0;
var highest='';
var delay=false;
var rootcontent=d3.select('#i').select('.content');
function buildBody(json){
  // console.log(json)
  tractatus=d3.hierarchy(json);
  sayChildren(tractatus);
  setTimeout(function () {
    d3.selectAll('.nodeline').filter(function() { return this.parentNode.parentNode == rootcontent.node()}).style('width','150px');
  }, 50);
  d3.selectAll('.expandme').on('click',function(){
    var parent=event.path[0];
      for(var i=0;i<event.path.length;i++){
        if(d3.select(event.path[i]).classed('content')){
          parent=event.path[i];
          break;
        }
      }
      d3.select(parent).classed('expanded',true);
  })


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
    parent.select('.content')
    .append('div')
    .datum(item)
    .attr('id','i'+keyClass)
    .attr('class',`depth${item.depth} tree ${item.depth>1?'child':'primary'} ${item.data.empty==true?'empty':''} ${item.children?'':'nochildren'}`)
    .append('div').attr('class','nodeline')
    var newLev=d3.select('#i'+keyClass);
    newLev
    .append('div').attr('class','content')
    .html(`<span class="key">${keyDisplay}</span>`+(item.data.empty==false?item.data.content.en:'')+'<span class="expandme">+</span>');
    if(item.children){sayChildren(item);};
  });

}
