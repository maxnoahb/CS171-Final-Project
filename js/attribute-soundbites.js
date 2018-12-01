AttributeSoundbites = function(_parentElement, _data) {
    this.parentElement = _parentElement;
    this.data = _data;

    this.initVis();
}

AttributeSoundbites.prototype.initVis = function() {
    var vis = this;

    vis.margin = {top: 20, right: 120, bottom: 20, left: 150};
    vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
    vis.height = 300 - vis.margin.top - vis.margin.bottom;

    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    // scales and axes
    vis.xScale = d3.scaleLinear()
        .range([0, vis.width])
        .domain([0,4]);

    vis.yScale = d3.scaleBand()
        .range([0, vis.height/2])
        .padding(.3);

    vis.yScale.domain(["danceability", "valence", "speechiness", "loudness", "acousticness"]);

    // initialize Spotify API object
    // vis.spotifyApi = new SpotifyWebApi();
    // vis.spotifyApi.setAccessToken("BQAXjEE9-rbGkAJ-rsMP_MxB_XgWtCWzSZq5jw-h2-sU4WoGFoL5NqNmMhLoGfpzSqPSkil-br4YREO0Sbo");

    vis.wrangleData();

}

AttributeSoundbites.prototype.wrangleData = function() {
    var vis = this;

    vis.updateVis();

}

AttributeSoundbites.prototype.updateVis = function() {
    var vis = this;

    vis.attributeLabels = vis.svg.selectAll(".attribute-labels-soundbites")
        .data(vis.yScale.domain());

    vis.attributeLabels
        .enter()
        .append("text")
        .attr("class", "attribute-labels-soundbites")
        .attr("text-anchor", "middle")
        .text(function(d) { return d; })
        .attr("x", function(d,i) { return vis.xScale(i); })
        .attr("y", 150);

    vis.topButtons = vis.svg.selectAll(".top-buttons")
        .data(vis.data);

    vis.topButtons
        .enter()
        .append("circle")
        .attr("class", "top-buttons")
        .attr("cx", function(d,i) { return vis.xScale(i); })
        .attr("cy", 75)
        .attr("r", 20);

    vis.bottomButtons = vis.svg.selectAll(".bottom-buttons")
        .data(vis.data);

    vis.bottomButtons
        .enter()
        .append("circle")
        .attr("class", "bottom-buttons")
        .attr("cx", function(d,i) { return vis.xScale(i); })
        .attr("cy", 225)
        .attr("r", 20);

    // vis.test = vis.svg.append("circle").attr("cx", 100).attr("cy", 100).attr("r", 20);
    //
    // vis.test.on("mouseover", function() {
    //     PlaySound("most-danceable")
    // }).on("mouseout", function() {
    //     StopSound("most-danceable")
    // });

}

function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}
