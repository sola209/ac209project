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
var thriller = d3.select("#genre-thriller");
var uk = d3.select("#genre-uk")
var similar_user = d3.select("#similar-user")

romance.on('click', function (e) {
    similar_user.html("Your interests most closely match the user <a href=''>USERNAME</a>, who read the following titles: <br>TITLE1, TITLE2, TITLE3, TITLE4, TITLE5.");  
    $('#rec-images-0').fadeIn(1000);
    $('#rec-images-1').fadeOut(1000);
    $('#rec-images-2').fadeOut(1000);    

});

thriller.on('click', function (e) {
    similar_user.html("Your interests most closely match the user <a href=''>USERNAME</a>, who read the following titles: <br>TITLE1, TITLE2, TITLE3, TITLE4, TITLE5.");  
    $('#rec-images-0').fadeOut(1000);
    $('#rec-images-1').fadeIn(1000);
    $('#rec-images-2').fadeOut(1000);
});

uk.on('click', function (e) {
    similar_user.html("Your interests most closely match the user <a href=''>USERNAME</a>, who read the following titles: <br>TITLE1, TITLE2, TITLE3, TITLE4, TITLE5.");  
    $('#rec-images-0').fadeOut(1000);
    $('#rec-images-1').fadeOut(1000);
    $('#rec-images-2').fadeIn(1000);

});
