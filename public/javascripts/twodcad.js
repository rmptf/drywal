const width = "400"
const height = "700"

function shit() {
    const [p1, p2, p3] = [[width / 3, 213], [2 * width / 3, 363], [width / 2, 132]];
    
    // const svg = d3.select(DOM.svg(width, height));
    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

    // Add a background
    svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("stroke", "#999999")
    .style("fill", "#F6F6F6")
        
    const line = svg.append("line")
        .attr("stroke", "lightgray");
    
    const segment = svg.append("line")
        .attr("stroke", "black");
    
    const connection = svg.append("line")
        .attr("stroke", "red");
    
    const projection = svg.append("circle")
        .attr("r", 5)
        .attr("stroke", "red")
        .attr("fill", "none");
    
    const point = svg.append("g")
        .attr("cursor", "move")
        .attr("pointer-events", "all")
        // .attr("stroke", "transparent")
        .attr("stroke", "#00000050")
        .attr("stroke-width", 30)
        .selectAll("circle")
        .data([p1, p2, p3])
        .enter().append("circle")
        .attr("r", 5)
        .attr("fill", (d, i) => i === 2 ? "red" : "green")
        .call(d3.drag()
            .subject(([x, y]) => ({x, y}))
            .on("drag", dragged));
    update();
    
    function dragged(d) {
        d[0] = d3.event.x;
        d[1] = d3.event.y;
        update();
    }
    
    function update() {
        const t = (width + height) / distance(p1, p2);
        const l1 = interpolate(p1, p2, t);
        const l2 = interpolate(p2, p1, t);
        const p = interpolate(p1, p2, Math.max(0, Math.min(1, project(p1, p2, p3))));
        connection.attr("x1", p3[0]).attr("y1", p3[1]);
        connection.attr("x2", p[0]).attr("y2", p[1]);
        projection.attr("cx", p[0]).attr("cy", p[1]);
        line.attr("x1", l1[0]).attr("y1", l1[1]);
        line.attr("x2", l2[0]).attr("y2", l2[1]);
        segment.attr("x1", p1[0]).attr("y1", p1[1]);
        segment.attr("x2", p2[0]).attr("y2", p2[1]);
        point.attr("cx", d => d[0]).attr("cy", d => d[1]);

        // console.log((distance(p1, p2) / 72))
        console.log(line.attr("x1", l1[0]).attr("y1", l1[1]))
    }
    
    return svg.node();
}

function distance([x1, y1], [x2, y2]) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function interpolate([x1, y1], [x2, y2], t) {
    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
}

function project([x1, y1], [x2, y2], [x3, y3]) {
    const x21 = x2 - x1, y21 = y2 - y1;
    const x31 = x3 - x1, y31 = y3 - y1;
    return (x31 * x21 + y31 * y21) / (x21 * x21 + y21 * y21);
}
shit()