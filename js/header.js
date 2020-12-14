
let searchval=[];

function headerStartUp(){
  handleHeader();
  d3.select('#info-button').on('click',function(){
    if(expandHead==false){
      expandHead=true;
      if(window.scrollY==0){expand(expandHead);};
      window.scrollTo({top: 0,left: 0,behavior: 'smooth'});
    }else{
      expandHead=false;
      expand(expandHead);
    }
  });
  d3.selectAll('.lang-button').on('click',changeLang);

  const search=d3.select('#search').select('input')
  search.on('input',function(){
    let val=search.node().value;
    const num=['0','1','2','3','4','5','6','7','8','9'];
    let newVal;
    if(num.includes(event.data)){
      searchval.push(event.data);
    }else if(event.data==null){
      searchval.splice(-1,1);
    }
    newVal=parseKeyArray(searchval);
    search.node().value=newVal.display;
    theSearch(newVal);
  })

}

function parseKeyArray(array){

  var keyArray=array;
  var keyDisplay=[...keyArray];
  keyDisplay[0]=keyDisplay[0]+'.';
  keyJs=keyArray.join('.');
  keyDisplay=keyDisplay.join('');
  var keyClass=keyArray.join('-');
  var keyParent=keyArray.slice(0,keyArray.length-1).join('-');
  return {js:keyJs,array:keyArray,display:(keyArray.length>0)?keyDisplay:'',dom:keyClass,parent:keyParent}
}



function changeLangKey(){
  if(event.keyCode == 32 && event.target == document.body) {
    event.preventDefault();
    changeLang();
  }
}

function handleHeader(){
  var dist=window.scrollY;
  var nav=d3.select('#nav')
  var navheight=parseInt(nav.style('height').replace('px',''));
  if(expandHead==false){
    if(dist<81){
      d3.select('#nav').style('height',`${80-dist}px`);
    }else if(navheight>0){
      d3.select('#nav').style('height',`0px`);
    }
  }else{
    if(dist==0){
      expand(true);
    }
    recordDist=((80-dist)>0)?`${80-dist}px`:0;
  }
}

function expand(val){
  var nav=d3.select('#nav');
  if(val){nav.classed('expanded',val);};
  nav.style('height',val?'100vh':recordDist);
  d3.select('#pagewrap').style('top',val?'100vh':'79px');
  d3.select('#info-button').html(`<span>${val?'X':'i'}</span>`);
  if(!val){
    d3.select('#info').node().scrollTo({top: 0,left: 0,behavior: 'smooth'});
    setTimeout(function () {nav.classed('expanded',val);}, 600);
  };
}

window.addEventListener('keydown',changeLangKey)
window.addEventListener('scroll',handleHeader);
