var tractatus;
var depth=0;
var prop=0;
var height=0;
var highest='';

function buildBody(json){
  // console.log(json)
  tractatus=d3.hierarchy(json);
  console.log(tractatus);
  sayChildren(tractatus);
  console.log(highest,height);

}

function sayChildren(object){
  object.children.forEach((item, i) => {
    var keyArray=item.data.key.split('.');
    var keyClass=keyArray.join('-');
    var keyParent=keyArray.slice(0,keyArray.length-1).join('-');
    highest=(item.depth>height)?item.data.key:highest;
    height=(item.depth>height)?item.depth:height;
    d3.select('#i'+keyParent)
      .append('div')
      .attr('id','i'+keyClass)
      .attr('class',`depth${item.depth} tree ${item.depth>1?'child':''}`)
      .html(`<span class="key">${item.data.key}</span>`+(item.data.empty==false?item.data.content.en:''));
    if(item.children){sayChildren(item);};
  });

}
