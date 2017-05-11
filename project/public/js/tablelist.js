

function generaChart ()
{

var list = document.getElementsByTagName("td");
console.log('tengo esto');
console.log(list);

console.log('todas');
var datasetValues =[];
var datasetId = [];
for(var i=0; i< list.length; i++)
{
//console.log(list[i+1].innerText);
datasetId.push(list[i].innerText);
++i;
datasetValues.push(list[i].innerText);

}

var w = 500;
var h = 500;
var barPadding = 1;  // <-- Nueva!
//console.log(aux);
//var dataset = [ 5, 10, 15, 20, 25, 0, 75, 50, 200, 480 ];
//Creará un elemento SVG
var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

        svg.selectAll("rect")
            .data(datasetValues)
            .enter()
            .append("rect")
            .attr("y", function(d) {return h - d;  //Altura menos el dato
            })
            .attr("x", function(d, i) {
              return i * (w / datasetValues.length);
            })
            .attr("height", function(d) {return d;  //Solo el dato
               })
            .attr("width", w / datasetValues.length - barPadding)
            .attr("fill", "teal");


            svg.selectAll("text")
            .data(datasetValues)
            .enter()
            .append("text")
            .text(function(d) {
            return d;
            })
            .attr("x", function(d, i) {
            return i * (w / datasetValues.length);
            })
            .attr("y", function(d) {return h - d;  //Altura menos el dato
            })
            .attr("text-anchor", "middle")
            .attr("x", function(d, i) {
            return i * (w / datasetValues.length) + (w / datasetValues.length - barPadding) / 2;
            });


}
