
/*
 * CountVis - Object constructor function
 * @param _parentElement 	-- the HTML element in which to draw the visualization
 * @param _data						-- the actual data
 */

SliderVis = function(_parentElement, _data ) {
    this.parentElement = _parentElement;
    this.data = _data;

    this.initVis();
}

SliderVis.prototype.initVis = function() {
    var vis = this;

    // Check that data is properly imported
    // console.log(this.data);

    vis.margin = {top: 20, right: 20, bottom: 20, left: 20};

    vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right,
        vis.height = 600 - vis.margin.top - vis.margin.bottom;

    // SVG drawing area
    vis.svg = d3.select("#" + vis.parentElement).append("svg")
        .attr("width", vis.width + vis.margin.left + vis.margin.right)
        .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

    vis.wrangleData();

}

/*
 * Data wrangling
 */

SliderVis.prototype.wrangleData = function(){
    var vis = this;

    this.displayData = this.data;

    // new data structure containing the average attributes for each country playlist
    vis.countryAvgAttributes = d3.nest()
        .key(function(d) { return d.playlist_name; })
        .rollup(function(v) {
            return {
                "acousticness": d3.mean(v, function(d) { return d.acousticness; }),
                "danceability": d3.mean(v, function(d) { return d.danceability; }),
                "duration_ms": d3.mean(v, function(d) { return d.duration_ms; }),
                "energy": d3.mean(v, function(d) { return d.energy; }),
                "liveness": d3.mean(v, function(d) { return d.liveness; }),
                "loudness": d3.mean(v, function(d) { return d.loudness; }),
                "speechiness": d3.mean(v, function(d) { return d.speechiness; }),
                "tempo": d3.mean(v, function(d) { return d.tempo; }),
                "valence": d3.mean(v, function(d) { return d.valence; })
            };
        })
        .entries(vis.displayData);

    console.log(vis.countryAvgAttributes);

    // console.log(d3.select("#acousticness-slider").property("value"));

    // Update the visualization
    vis.updateVis();
}

SliderVis.prototype.updateVis = function() {
    var vis = this;

}