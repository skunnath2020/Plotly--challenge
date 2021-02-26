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
    })
}

function optionChanged(id) {
    console.log("In OptionChanged "+ id);
    createDemographics(id);
    // createChart(id); 
};

init();


// For each samples.id there are :
// samples.otu_ids
// samples.sample_values
// samples.otu_labels