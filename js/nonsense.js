// timing/scroll distance
let expandHead=false;
let recordDist='80px';
let lang='en';
let sinceReset=Date.now();
console.log(sinceReset);


// physics (matter js)
let engine;
let world;
let runner;
let render;
Matter.use('matter-collision-events');
Matter.use('matter-dom-plugin');
var Engine = Matter.Engine,
Runner = Matter.Runner,
RenderDom = Matter.RenderDom,
Body = Matter.Body,
DomBodies = Matter.DomBodies,
MouseConstraint = Matter.MouseConstraint,
DomMouseConstraint = Matter.DomMouseConstraint,
Mouse = Matter.Mouse,
Events = Matter.Events,
World = Matter.World,
Vector = Matter.Vector,
Vertices = Matter.Vertices,
Bounds = Matter.Bounds;

var contents654={
  en:'<p>My propositions serve as elucidations in the following way: anyone who understands me eventually recognizes them as nonsensical, when he has used them—as steps—to climb up beyond them. (He must, so to speak, throw away the ladder after he has climbed up it.)</p><p>He must transcend these propositions, and then he will see the world aright.</p>',
  de:'<p>Meine Sätze erläutern dadurch, dass sie der, welcher mich versteht, am Ende als unsinnig erkennt, wenn er durch sie—auf ihnen—über sie hinausgestiegen ist. (Er muss sozusagen die Leiter wegwerfen, nachdem er auf ihr hinaufgestiegen ist.)</p> <p>Er muss diese Sätze überwinden, dann sieht er die Welt richtig.</p>'
}

// dom
const prop=d3.select('#prop6-5-4');

let pagewrap=document.querySelector('#pagewrap');

let props={
  en:[
    'The world is all that is the case.',
    'What is the case a fact is the existence of states of affairs.',
    'A logical picture of facts is a thought.',
    'A thought is a proposition with a sense.',
    'A proposition is a truth function of elementary propositions. (An elementary proposition is a truth function of itself.)',
    'The general form of a truth function is <var>[p,ξ,N(ξ)]</var>. This is the general form of a proposition.'
  ],
  de:[
    'Die Welt ist alles, was der Fall ist.',
    'Was der Fall ist, die Tatsache, ist das Bestehen von Sachverhalten.',
    'Das logische Bild der Tatsachen ist der Gedanke.',
    'Der Gedanke ist der sinnvolle Satz.',
    'Der Satz ist eine Wahrheitsfunktion der Elementarsätze. (Der Elementarsatz ist eine Wahrheitsfunktion seiner selbst.)',
    'Die allgemeine Form der Wahrheitsfunktion ist: <var>[p,ξ,N(ξ)]</var>. Dies ist die allgemeine Form des Satzes.',
    'Wovon man nicht sprechen kann, darüber muss man schweigen.'
  ]

}



props.en.forEach((item, i) => {
  let temp=item.split(' ');
  temp.forEach((x, ind) => {
    temp[ind]=x.replace(/_/g,' ');
  });
  props.en[i]=temp;
});
props.de.forEach((item, i) => {
  let temp=item.split(' ');
  temp.forEach((x, ind) => {
    temp[ind]=x.replace(/_/g,' ');
  });
  props.de[i]=temp;
});

function prop654(){
  props[lang].forEach((prop, i) => {
    prop.forEach((segment, x) => {
      // let el=document.createElement('span');
      d3.select('#prop6-5-4').append('span')
      .attr('class','segment noselect')
      .attr('id','seg'+i+'-'+x)
      .attr('matter','')
      .html(segment)

      // const content = document.createTextNode(segment);
      // el.appendChild(content);
      // el.setAttribute('matter', '');
      // el.setAttribute('id', 'seg'+i+'-'+x);
      // el.setAttribute('class', 'segment noselect');
      // document.querySelector('#prop6-5-4').appendChild(el);
    });
  });
}





function setUp(){
  console.log('hello');
  headerStartUp();
  let wrapHeight=()=>{return pagewrap.clientHeight;};
  let wrapScroll=()=>{return pagewrap.scrollHeight;};
  var overflowing=()=>{return wrapScroll()>wrapHeight()*1.5};
  prop654();
  matterTest();

}

function matterTest(){
  prop.append('div').attr('id','debug');
  prop.append('div').attr('id','text6-5-4').attr('class','noselect').html(contents654[lang]);
  prop.append('div').attr('id','ceiling');
  prop.append('div').attr('id','right-wall');
  prop.append('div').attr('id','left-wall');
  prop.append('div').attr('id','ground');
  engine = Engine.create();
  world = engine.world;
  runner = Runner.create();
  Runner.run(runner, engine);
  render = RenderDom.create({
     engine: engine
  });
  RenderDom.run(render);
  var worldWidth = render.mapping.WORLD.width;
  var worldHeight = render.mapping.WORLD.height;
  var worldCenter = render.mapping.WORLD.center;
  var viewHeight = render.mapping.VIEW.height;
  var viewWidth = render.mapping.VIEW.width;
  var viewCenter = render.mapping.VIEW.center;
  /**
  * Add components
  */
  var ceiling = DomBodies.create({
     Dom: {
         render: render,
         element: document.querySelector('#ceiling')
     },
     el: '#ceiling',
     render: render,
     position: {x: viewCenter.x, y: 0},
     bodyType: 'block',
     isStatic: true
  });
  var leftWall = DomBodies.create({
     Dom: {
         render: render,
         element: document.querySelector('#left-wall')
     },
     el: '#left-wall',
     render: render,
     position: {x: 0, y: viewCenter.y},
     bodyType: 'block',
     isStatic: true
  });
  var rightWall = DomBodies.create({
     Dom: {
         render: render,
         element: document.querySelector('#right-wall')
     },
     el: '#right-wall',
     render: render,
     position: {x: viewWidth, y: viewCenter.y},
     bodyType: 'block',
     isStatic: true
  });
  var ground = DomBodies.create({
     Dom: {
         render: render,
         element: document.querySelector('#ground')
     },
     el: '#ground',
     render: render,
     position: {x: viewCenter.x, y: viewHeight},
     bodyType: 'block',
     isStatic: true
  });
  var proptext = DomBodies.create({
     Dom: {
         render: render,
         element: document.querySelector('#text6-5-4')
     },
     el: '#text6-5-4',
     render: render,
     position: {x: viewCenter.x, y: viewCenter.y},
     bodyType: 'block',
     isStatic: true
  });
  var matterProps=[];
  document.querySelectorAll('.segment').forEach((item, i) => {
  matterProps.push('');
  matterProps[i]=DomBodies.create({
       Dom: {
           render: render,
           element: document.querySelector('#'+item.getAttribute('id'))
       },
       el: '#'+item.getAttribute('id'),
       render: render,
       position: {x: viewCenter.x*2*Math.random(), y: 0},
       bodyType: 'block',
       restitution: 0.3,
       friction: 0,
       frictionStatic: 0,
       frictionAir: 0.1
   });
  });

  /** Mouse control **/
  var mouse = Mouse.create(document.querySelector('#prop6-5-4'));
  var MouseConstraint = DomMouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.5,
    render: {
      visible: false
    }
  }
  });
  World.add(world, MouseConstraint);
}





window.addEventListener('resize',reset654);

function reset654(event){
  if(event!==undefined){
    setTimeout(function () {redraw654(false);}, 100);
    sinceReset=Date.now();
  }else{
    redraw654(true);
  }
}

function redraw654(bypass){
  prop.html('');
  console.log(bypass);
  if(bypass==true||Date.now()-sinceReset>100){
    World.clear(world);
    Engine.clear(engine);
    RenderDom.stop(render);
    Runner.stop(runner);
    // render.canvas.remove();
    // render.canvas = null;
    // render.context = null;
    // render.textures = {};
    prop654();
    matterTest();
  }
}


function changeLang(){
  lang=(lang=='en')?'de':'en';
  d3.selectAll('.active').classed('active',false);
  d3.select('#'+lang).classed('active',true);
  reset654();
  // console.log('sadness');
}
