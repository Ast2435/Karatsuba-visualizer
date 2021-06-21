var jsav = new JSAV("JSAV-container");
jsav.label("Multiplicación de Karatsuba");
var numero1;
var numero2;
var k = 0;
var kBR = 0; //k before recursion
var arr =[];
var results = [];
var JSAVwidth = document.getElementById('JSAV-container').offsetWidth;

var getDatos = function ()
{
  numero1 = document.getElementById("numero1").value;
  numero2 = document.getElementById("numero2").value;
  if (numero1=="")
  {
    document.getElementById("numero1").focus();
  }
  else
  {
    if (numero2=="")
    {
      document.getElementById("numero2").focus();
    }
    else
    {
      console.log(numero1+" "+numero2);
      document.getElementById("numero1").value="";
      document.getElementById("numero2").value="";
      document.getElementById("numero1").focus();
      
      visualizar(numero1, numero2);
    }
  }
}

function visualizar(a, b){
  karatsuba(a, b, 1);
  //console.log(karatsuba(a, b));
  //console.log(a * b);
  //var arr = toArray(a, b);
  //console.log(arr);
  //animate(arr, 1, arr.length);
  console.log(results.length);
  jsav.umsg("Resultado final de " + a + "*" + b + " = " + results[results.length-1].value(0));
  results[results.length-1].show().highlight(true);
  jsav.step();
  jsav.recorded();  
}



function karatsuba(x,y, init, relative){
  var x1,x0,y1,y0,base,m;
  base  = 10;

if((x<base)||(y<base)){
  //console.log( " X - y = " , x,y, x*y)
  return x * y;
}
  if(init == 1){
    var input = toArray(x,y);
    arr[k]= jsav.ds.array(input, {center: true});
    arr[k].layout();
    jsav.displayInit();
    relative = arr[k];
    k++;
  karatsuba(x,y,0, relative);
  }
else{

  var dummy_x = x.toString();
  var dummy_y = y.toString();

  var n = (dummy_x.length > dummy_y.length) ? dummy_y.length : dummy_x.length;
  m = Math.round(n/2);
  

  var high1 = [parseInt(dummy_x.substring(0,dummy_x.length-m))];
  console.log("h1: " + high1[0]);
  jsav.umsg("Calculando H1 para " + dummy_x + "*" + dummy_y);
  /*partitionLength = high1.toString().length;
  arr[k-1].highlight(function(index){ return index < partitionLength});
  partitionLength = partitionLength + high1.toString().length;
  jsav.step();*/
  arr[k] = jsav.ds.array(high1,{relativeTo: relative, center: false, top: 30,  anchor: "center bottom"});
  arr[k].layout();
  relative = arr[k];
  k++;
  jsav.step();

  var low1 = [parseInt(dummy_x.substring(dummy_x.length-m,dummy_x.length))];
  console.log("l1: " + low1[0]);
  jsav.umsg("Calculando L1 para " + dummy_x + "*" + dummy_y);
  arr[k] = jsav.ds.array(low1,{relativeTo: relative, center: false, top: 30, anchor: "center bottom"});
  arr[k].layout();
  relative = arr[k];
  k++;
  jsav.step();

  var high2 = [parseInt(dummy_y.substring(0,dummy_y.length-m))]; 
  console.log("h2: " + high2[0]);
  jsav.umsg("Calculando H2 para " + dummy_x + "*" + dummy_y);
  arr[k] = jsav.ds.array(high2,{relativeTo: relative, center: false, top: 30, anchor: "center bottom"});
  arr[k].layout();
  relative = arr[k];
  k++;
  jsav.step();

  var low2 = [parseInt(dummy_y.substring(dummy_y.length-m,dummy_y.length))];
  console.log("l2: " + low2[0]);
  jsav.umsg("Calculando L2 para " + dummy_x + "*" + dummy_y);
  arr[k] = jsav.ds.array(low2,{relativeTo: relative, center: false, top: 30, anchor: "center bottom"});
  arr[k].layout();
  relative = arr[k];
  k++;
  jsav.step();


  var z0   =   karatsuba(low1[0], low2[0], 0, relative);
  jsav.umsg("Calculando Z0 (" + low1[0] + " * " + low2[0] + ") para " + dummy_x + "*" + dummy_y + " = " + z0);
  jsav.step();
  var z1   =   karatsuba(low1[0]+high1[0], low2[0]+high2[0], 0, relative);
  jsav.umsg("Calculando Z1 [(" + high1[0] + " + " + low1 [0] + ")" + " * " + "(" + high2[0] + "+" + low2[0] + ")] para " + dummy_x + "*" + dummy_y + " = " + z1);
  jsav.step();
  var z2   =   karatsuba(high1[0],high2[0], 0, relative);
  jsav.umsg("Calculando Z2 (" + high1[0] + " * " + high2[0] + ") para " + dummy_x + "*" + dummy_y + " = " + z2);
  jsav.step();
  console.log("z0:"+z0);
  console.log("z1:"+z1);
  console.log("z2:"+z2);
  
  kBR=kBR+5;
  var res  =   [(z2 *  Math.pow(10, 2 * m )  ) + ( (z1-z2-z0) * Math.pow(10,  m )) + z0];
  console.log(res);
  jsav.umsg("Resultado Karatsuba = " + res);
  arr[k] = jsav.ds.array(res,{relativeTo: relative, center: false, top:30, anchor: "center bottom"});
  arr[k].highlight(true);
  arr[k].layout;
  relative = arr[k];
  results.push(arr[k]);
  k++;
  jsav.step();
    /*esconder nodos ya terminados de calcular*/
    for(i = k-kBR; i < k; i++){
      arr[i].hide();
    } 
    jsav.step();
  return res;
}
}

/*
var k = 0;
childs = [];
function animate(arr, init, len, relative){

  if (arr.length <= 2){
    var firstHalf = arr.slice(0, len/2);
    childs[k] = jsav.ds.array(firstHalf, {relativeTo: relative, center: "false", left: -150, top: 150, anchor: "left bottom"});
    childs[k].layout();
    k++;
    jsav.step();
    var secondHalf = arr.slice(-len/2);
    childs[k] = jsav.ds.array(secondHalf, {relativeTo: relative, center: "false", left: 150, top: 150, anchor: "right bottom"});
    childs[k].layout();
    k++;
    jsav.step();

  return;
  }

    //console.log(half);
    if(len > 2 && init == 1){
      childs[k] = jsav.ds.array(arr,{center: "true", left: (JSAVwidth/2.3)});
      childs[k].layout();
      var half = len;
      relative = childs[k]
      k++;
      jsav.displayInit();
      animate(arr, 0, half, relative);
    }
    else if(len > 2){
      half = Math.ceil(len / 2);
      console.log(half);
      var firstHalf = arr.slice(0, half);
      childs[k] = jsav.ds.array(firstHalf, {relativeTo: relative, center: "false", left: -150, top: 150, anchor: "left bottom"});
      childs[k].layout();
      jsav.step();
      newRelative = childs[k];
      k++;
      animate(firstHalf, 0, half, newRelative);

      if(len%2 != 0){ //si el numero de elementos a dividir es impar, se tiene que tomar en cuenta, si no hay duplicidad de datos donde se hace la division
        var secondHalf = arr.slice(-half+1);
        childs[k] = jsav.ds.array(secondHalf, {relativeTo: relative, center: "false", left: 150, top: 150, anchor: "right bottom"});
        childs[k].layout();
        jsav.step();
        k++;
      }
      else{
        var secondHalf = arr.slice(-half);
        childs[k] = jsav.ds.array(secondHalf,  {relativeTo: relative, center: "false", left: 150, top: 150, anchor: "right bottom"});
        childs[k].layout();
        jsav.step();
        newRelative = childs[k];
        k++;
        animate(secondHalf, 0, half, newRelative);
      }
    }
}*/

/*chad*/
function toArray(a, b){
var fullNum = "" + a + b;

return Array.from(fullNum).map(Number);
}




