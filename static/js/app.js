function init() {
    var selector = d3.select("#selDataset");
    d3.json("data/samples.json").then((data) => {
        data.names.forEach((name)=> {
            selector
            .append("option")
            .text(name)
            .property("value", name);
    });
    //Construct initial plots with the first data value
    createDemographics(data.names[0]);
    createChart(data.names[0]); 
    // On change to the DOM, call getData()
    // d3.selectAll("#selDataset").on("change", optionChanged);
});
};
function createDemographics(id){
    d3.json("data/samples.json").then((data) => {
        var metadata= data.metadata;
        console.log("Here")
        console.log(metadata);
        var filteredId = metadata.filter(d => d.id.toString() === id);
        showDemographics(filteredId);
    
    });
}  
function showDemographics(metadata){
    demographics = d3.select("#sample-metadata")
    console.log(metadata[0] )
    //clear the panel 
    demographics.html('');
    //get the key/value pair
    Object.entries(metadata[0]).forEach(([key, value]) => {
        console.log(key);
        demographics.append("h5").text(`${key} : ${value}`)
    })
}

function createChart(id){
    d3.json("data/samples.json").then((data) => {
        var filtered = data.samples.filter(d => d.id.toString() === id)[0];
        console.log("OTU " , filtered)
        // Top ten OTU_ids and sample values
        var toptenOTU = filtered
                        .otu_ids.slice(0, 10)
                        .reverse()
                        .sort(function(a,b){return b-a;})
                        .map(otu => "OTU"+ otu)
        var toptenSample= filtered
                        .sample_values
                        .slice(0, 10)
                        .reverse()
                        .sort(function(a,b){return a-b;});
        //Hover text
        var labels = filtered.otu_labels.slice(0, 10) 
        console.log(toptenOTU)
        //Build Bar charts     
        var trace = {
            x: toptenSample,
            y: toptenOTU,
            text: labels,
            marker: {color: 'rgb(106, 83, 184)'},
            type:"bar",
            orientation: "h"
         };
         var layout = {
             title: "Top ten OTUs",
             "titlefont": {
                "size": 18
              },
             yaxis: {
                 tickmode: "linear",
             }
         };
         Plotly.newPlot("bar", [trace], layout)
    
        //Build Bubble charts
        var trace1 = {
           x: filtered.otu_ids,
           y: filtered.sample_values,
           text: filtered.otu_labels,
           mode: "markers",
           marker: {
            size: filtered.sample_values,
            color:filtered.otu_ids,
            colorscale: "Earth"
            },
           
        };
        var bubble_layout = {
            xaxis: {title: "OTU IDs"},
            height : 600,
            width: 1000
        }
        Plotly.newPlot(bubble, [trace1], bubble_layout)
});
}

function optionChanged(id) {
    console.log("In OptionChanged "+ id);
    createDemographics(id);
    createChart(id);
   };

init();


// For each samples.id there are :
    // samples.otu_ids
    // samples.sample_values
    // samples.otu_labels