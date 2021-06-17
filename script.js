var jsav = new JSAV("JSAV-container");
jsav.label("Algoritmo de Karatsuba");
var numero1;
var numero2;

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
  karatsuba(a, b);
  //console.log(karatsuba(a, b));
  //console.log(a * b);
  var arr = toArray(a, b);
  //console.log(arr);
  animate(arr, 1, arr.length);
  console.log(childs);
}

function karatsuba(x,y)
{

  var x1,x0,y1,y0,base,m;
  base  = 10;


  if((x<base)||(y<base)){
    console.log( " X - y = " , x,y, x*y)
    return x * y;
  }

  var dummy_x = x.toString();
  var dummy_y = y.toString();

  var n = (dummy_x.length > dummy_y.length) ? dummy_y.length : dummy_x.length;
  m = Math.round(n/2);



  var high1 = parseInt(dummy_x.substring(0,dummy_x.length-m));
  var low1 = parseInt(dummy_x.substring(dummy_x.length-m,dummy_x.length  )) ;

  var high2 = parseInt(dummy_y.substring(0,dummy_y.length-m)); 
  var low2 = parseInt(dummy_y.substring(dummy_y.length-m,dummy_y.length));


  var z0   =   karatsuba( low1, low2);
  var z1   =   karatsuba(low1+high1, low2+high2);
  var z2   =   karatsuba(high1,high2);

  var res  =   (z2 *  Math.pow(10, 2 * m )  ) + ( (z1-z2-z0) * Math.pow(10,  m )) + z0;


  return res;
}

var k = 0;
childs = [];
function animate(arr, init, len, relative){

  if (arr.length <= 2){
    var firstHalf = arr.slice(0, len/2);
    var caseBase1 = jsav.ds.array(firstHalf, {relativeTo: relative, left: -100, top: 100, anchor: "left bottom"});
    caseBase1.layout();
    var secondHalf = arr.slice(-len/2);
    var caseBase2 = jsav.ds.array(secondHalf, {relativeTo: relative, left: 100, top: 100, anchor: "right bottom"});
    caseBase2.layout();
  return;
  }

    //console.log(half);
    if(len > 2 && init == 1){
      var firstArr = jsav.ds.array(arr);
      firstArr.layout();
      var half = len;
      relative = firstArr;
      animate(arr, 0, half, relative);
    }
    else if(len > 2){
      half = Math.ceil(len / 2);
      console.log(half);
      var firstHalf = arr.slice(0, half);
      childs[k] = jsav.ds.array(firstHalf, {relativeTo: relative, left: -100, top: 100, anchor: "left bottom"});
      childs[k].layout();
      newRelative = childs[k];
      k++;
      animate(firstHalf, 0, half, newRelative);

      if(len%2 != 0){ //si el numero de elementos a dividir es impar, se tiene que tomar en cuenta, si no hay duplicidad de datos donde se hace la division
        var secondHalf = arr.slice(-half+1);
        childs[k] = jsav.ds.array(secondHalf, {relativeTo: relative, left: 100, top: 100, anchor: "right bottom"});
        childs[k].layout();
        k++;
      }
      else{
        var secondHalf = arr.slice(-half);
        childs[k] = jsav.ds.array(secondHalf,  {relativeTo: relative, left: 100, top: 100, anchor: "right bottom"});
        childs[k].layout();
        newRelative = childs[k];
        k++;
        animate(secondHalf, 0, half, newRelative);
      }
    }
}


function toArray(a, b){
var fullNum = "" + a + b;

return Array.from(fullNum).map(Number);
}




