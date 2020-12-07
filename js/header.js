
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
