var tractatus;
var depth=0;
var prop=0;

function buildBody(json){
  // console.log(json)
  tractatus=d3.hierarchy(json);
  console.log(tractatus);
  sayChildren(tractatus)

}

function sayChildren(object){
  object.children.forEach((item, i) => {
    var keyArray=item.data.key.split('.');
    var keyClass=keyArray.join('-');
    var keyParent=keyArray.slice(0,keyArray.length-1).join('-');
    d3.select('#i'+keyParent)
      .append('div')
      .attr('id','i'+keyClass)
      .attr('class',`depth${item.depth} tree ${item.depth>1?'child':''}`)
      .html(`<span class="key">${item.data.key}</span>`+(item.data.empty==false?item.data.content.en:''));
    if(item.children){sayChildren(item);};
  });

}
