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
        var filtered = data.samples.filter(d => d.id.toString() === id);
        console.log("OTU " , filtered)
        // Top ten OTU_ids and sample values
        var toptenOTU = filtered[0]
                        .otu_ids.slice(0, 10)
                        .reverse()
                        .sort(function(a,b){return b-a;})
                        .map(otu => "OTU"+ otu)
        var toptenSample= filtered[0]
                        .sample_values
                        .slice(0, 10)
                        .reverse()
                        .sort(function(a,b){return b-a;});
        //Hover text
        var labels = filtered[0].otu_labels.slice(0, 10) 
        console.log(toptenOTU)

        var trace = {
            x: toptenSample,
            y: toptenOTU,
            text: labels,
            type:"bar",
            orientation: "h"
         };
         var layout = {
             title: "Top ten OTUs",
             yaxis: {
                 tickmode: "linear"
             }
         };
         Plotly.newPlot("bar", [trace], layout)
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