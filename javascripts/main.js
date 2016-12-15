console.log('This would be the main JS file.');

var svg = d3.select("#force").append("svg"),
    width = 604,
    height = 649;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var mb = d3.forceManyBody();

mb.strength([-250])

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", mb)
    .force("center", d3.forceCenter(width / 2, height / 2));


d3.json("books.json", function(error, graph) {
    if (error) throw error;

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    /*var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", function(d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));*/

    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start",dragstarted)
            .on("drag",dragged)
            .on("end",dragended));

    var circle = node.append("circle")
        .attr("r", 5);

    circle.attr("fill", function(d) { return color(d.group)});

    var label = node.append("text")
        .attr("dy", ".35em")
        .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        circle
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        label
            .attr("x", function(d) { return d.x + 8; })
            .attr("y", function(d) { return d.y; });
    }
});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}


// Recommendation stuff

  $('#rec-images-0').fadeOut(1000);
  $('#rec-images-1').fadeOut(1000);
  $('#rec-images-2').fadeOut(1000);

var romance = d3.select("#genre-romance");
var selfhelp = d3.select("#genre-selfhelp");
var dystopia = d3.select("#genre-dystopia")
var similar_user = d3.select("#similar-user")

romance.on('click', function (e) {
    similar_user.html("Your interests most closely match the user <a href='https://www.amazon.com/gp/pdp/profile/AZ2EXXGD7FAD4'>Avidreader</a>, who read the following titles: " + 
        "<br><a href='https://www.amazon.com/exec/obidos/ASIN/B00408AQ98'>Her Dark Angel (Her Angel Romance Series Book 1)</a>, " + 
        "<a href='https://www.amazon.com/exec/obidos/ASIN/B00439GLEI'>Forgotten Soul (Soul Searchers Series Book 1)</a>, and " + 
        "<a href='https://www.amazon.com/exec/obidos/ASIN/B004AM59T6'>Vampire for Christmas</a>");
    $('#rec-images-0').fadeIn(1000);
    $('#rec-images-1').fadeOut(1000);
    $('#rec-images-2').fadeOut(1000);    

});

selfhelp.on('click', function (e) {
    similar_user.html("Your interests most closely match the user <a href='https://www.amazon.com/gp/pdp/profile/AA5HLEE8ND8TJ'>CagleVision</a>, who read the following titles: " + 
        "<br><a href='https://www.amazon.com/exec/obidos/ASIN/B00E39SCMC'>Alkaline Foods</a>, " + 
        "<a href='https://www.amazon.com/exec/obidos/ASIN/B00FW6F93A'>Best Damn Advice Ever: 10 Real Signs that He's Cheating On You</a>, and " + 
        "<a href='https://www.amazon.com/exec/obidos/ASIN/B00G9GOQFE'>The Jetstream of Success</a>");
    $('#rec-images-0').fadeOut(1000);
    $('#rec-images-1').fadeIn(1000);
    $('#rec-images-2').fadeOut(1000);
});

dystopia.on('click', function (e) {
    similar_user.html("Your interests most closely match the user <a href='https://www.amazon.com/gp/pdp/profile/A2G5IFYYHFIQNB'>Navy Vet...VT town</a>, who read the following titles: " + 
        "<br><a href='https://www.amazon.com/exec/obidos/ASIN/B001V9KG4E'>Surviving the Fog</a>, " + 
        "<a href='https://www.amazon.com/exec/obidos/ASIN/B002JCSFSQ'>The Birth of the Peacekeepers</a>, and " + 
        "<a href='https://www.amazon.com/exec/obidos/ASIN/B004WXEVOW'>Diary of the Displaced</a>");
    $('#rec-images-0').fadeOut(1000);
    $('#rec-images-1').fadeOut(1000);
    $('#rec-images-2').fadeIn(1000);

});

// Recommendation stuff

$('#rec-text-0').fadeOut(10);
$('#rec-text-1').fadeOut(10);
$('#rec-text-2').fadeOut(10);

var text_romance = d3.select("#text-romance");
var text_thriller = d3.select("#text-thriller");
var text_uk = d3.select("#text-uk")
var text_similar_user = d3.select("#text-similar-user")

text_romance.on('click', function (e) {
    $('#rec-text-0').fadeIn(300);
    $('#rec-text-1').fadeOut(300);
    $('#rec-text-2').fadeOut(300);

});

text_thriller.on('click', function (e) {
    $('#rec-text-0').fadeOut(300);
    $('#rec-text-1').fadeIn(300);
    $('#rec-text-2').fadeOut(300);
});

text_uk.on('click', function (e) {
    $('#rec-text-0').fadeOut(300);
    $('#rec-text-1').fadeOut(300);
    $('#rec-text-2').fadeIn(300);

});

