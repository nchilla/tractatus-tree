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
    if(keyArray.length>1){
      var keyDisplay=keyArray[0]+'.';
    }else{
      var keyDisplay=keyArray[0];
    }

    for(var i=1;i<keyArray.length;i++){
      keyDisplay=keyDisplay+keyArray[i];
    }

    var keyClass=keyArray.join('-');
    var keyParent=keyArray.slice(0,keyArray.length-1).join('-');
    highest=(item.depth>height)?item.data.key:highest;
    height=(item.depth>height)?item.depth:height;
    d3.select('#i'+keyParent)
      .append('div')
      .attr('id','i'+keyClass)
      .attr('class',`depth${item.depth} tree ${item.depth>1?'child':''} ${item.data.empty==true?'empty':''}`)
      .html(`<span class="key">${keyDisplay}</span>`+(item.data.empty==false?item.data.content.en:''));
    if(item.children){sayChildren(item);};
  });

}
