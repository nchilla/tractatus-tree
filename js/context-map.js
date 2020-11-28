// universal variables-------------------------




// data related
var tractatus;
var preface;

// dom selectors
var svg=d3.select('#map').select('svg');
var nodes=d3.select('#nodes')
var svgLines=[];
for(var i=1;i<7;i++){
  svgLines.push(d3.select('#depth'+i));
}



//big DOM-building and modifying functions------------

//first thing called once the JSON loads
function setUp(json){
  preface=json.children[0];
  var data=json;
  data.children.splice(0,1);
  tractatus=d3.hierarchy(data);
  console.log(preface,tractatus);
  var testKey1=tractatus.children[2].children[1].children[0].data.key;
  var testKey2='6.4.3.2.1';
  var testKey3=tractatus.children[5].children[3].children[3].children[2];
  var testKey4=tractatus.children[2];
  draw(testKey3);
  buildText(tractatus);
  observing();
}
//draws the graph according to a currently focused node
function draw(endNode){
  nodes.selectAll('.node').remove();
  svg.selectAll('polygon').remove();
  svg.selectAll('.depth').style('opacity',0);
  d3.selectAll('.focus').classed('focus',false);

  var key=parseKey(endNode.data.key);
  var depth=endNode.depth;
  var interval=80/(depth-1);

  var polygonStart;

  //for each depth layer
  for(var i=0;i<depth;i++){
    var focus=i==depth-1?true:false;
    var incr=12;
    var parent=findParent(endNode,depth-i);
    var current=findParent(endNode,depth-i-1);
    var lm1=parent.children.length-1
    var lineHeight=(lm1)*incr;
    var domX=10+((interval==Infinity)?40:(interval*i));

    //set position of line at this depth
    svgLines[i]
    .style('opacity',1)
    .classed('focus',focus)
    .attr('x1',domX)
    .attr('x2',domX)
    .attr('y1',0)
    .attr('y2',lineHeight);

    //nodes for each child at this depth
    for(var x=0;x<parent.children.length;x++){
      var el=parent.children[x];
      var elKey=parseKey(el.data.key)
      var isParent=el.children?true:false;
      nodes.append('div')
      .attr('id','p'+elKey.dom)
      .attr('class',`node${isParent?' parent':''}${focus?' focus':''}${elKey.dom==key.dom?' end-node':''}`)
      .datum(el)
      .style('top',incr*x+'%')
      .style('left',domX+'%')
      .append('span').html(elKey.display)
      var domEl=d3.select('#p'+elKey.dom);
      domEl.append('div').attr('class','circle')
      domEl.append('div').attr('class','highlight')

      domEl.on('click',function(){
        draw(d3.select(this).datum());
      })

      if(elKey.dom==key.dom){
        svg.select('#highlight')
        .attr('x1',domX)
        .attr('x2',domX)
        .attr('y1',incr*x)
        .attr('y2',incr*x+0.1);
      }
    }

    //shadow shooting out from parent node at previous depth to start and end of this depth
    if(i>0){
      svg.append('polygon')
      .attr('vector-effect','non-scaling-stroke')
      .attr('points',`${10+interval*(i-1)},${polygonStart*incr} ${domX},0 ${domX},${incr*lm1}`);
    }
    var polygonStart=outerPos(current);

  }


}
function buildText(object){
  object.children.forEach((item, i) => {
    var key=parseKey(item.data.key);
    d3.select('#text')
    .append('div')
      .datum(item)
      .attr('id','i'+key.dom)
      .attr('class',`depth${item.depth} prop ${item.depth>1?'child':''} ${item.data.empty==true?'empty':''}`)
      .html(`<span class="key">${key.display}</span>`+(item.data.empty==false?item.data.content.en:''))
      .append('div').attr('class','orb');
    if(item.children){buildText(item);};
  });

}
function observing(){
  const scroller = scrollama();
  scroller
    .setup({
      step: ".prop",
    })
    .onStepEnter((response) => {
      var el=d3.select(response.element);
      d3.selectAll('.select').classed('select',false);
      el.classed('select',true);
      var datum=el.datum();
      draw(datum);
    })
  window.addEventListener("resize", scroller.resize);
}


//these are smaller assisting functions used multiple times in the above
function parseKey(keystring){
  var keyArray=keystring.split('.');
  var keyDisplay=[...keyArray];
  keyDisplay[0]=keyDisplay[0]+'.';
  keyDisplay=keyDisplay.join('');
  var keyClass=keyArray.join('-');
  var keyParent=keyArray.slice(0,keyArray.length-1).join('-');
  return {array:keyArray,display:keyDisplay,dom:keyClass,parent:keyParent}
}
function findParent(origin,stepsUp){
  var target=origin;
  for(var i=0;i<stepsUp;i++){
    target=target.parent;
  }
  return target;
}
function outerPos(node){
  var parent=findParent(node,1);
  var index=parent.children.indexOf(node);
  return index;
}
