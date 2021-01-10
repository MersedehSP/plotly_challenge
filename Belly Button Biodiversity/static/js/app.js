
// This function will create metadata for given sample, it will rese the json data, parse and filter the data to get samples's metadata/
function buildMetadata(sample) {
    d3.json("samples.json").then(data => {
        var metaData = data.metadata;
        //console.log(metaData)
        console.log(sample)
        var metadatafilter = metaData.filter(rowObject =>rowObject.id == sample);
        console.log(metadatafilter)
        var result = metadatafilter[0]
        console.log(result)
        var display = d3.select("#sample-metadata")
        display.html("");
        // Specify the location of the metadata and update it
        Object.entries(result).forEach(([key, value]) => {
            console.log(key,value);
            display.append("h4").text(`${key}: ${value}`);
          });
        });
    }

// // Define a function that will create charts for given sample//////////////////////////
function buildCharts(sample) {
    d3.json("samples.json").then(data => {
        var allSamples = data.samples;
      
        var samplefilter = allSamples.filter(rowObject =>rowObject.id == sample);
        //console.log(metadatafilter)
        var result = samplefilter[0];
  /////////// Create bar chart in correct location///////////////////////////////////////
            var sample_values = result.sample_values;
            console.log(sample_values);
            var otu_labels = result.otu_labels;
            console.log(otu_labels);
            var otu_ids = result.otu_ids;
            console.log(otu_ids);
        
            var bardata = [{
                x: sample_values.slice(0,10).reverse(),
                y: otu_ids.slice(0,10).map(otu_id => `otu_id${otu_id}`).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type:"bar",
                orientation: "h"
            }];   

                Plotly.newPlot("bar", bardata);
  //////// Create bubble chart in correct location/////////////////////////////////////
            var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              color: otu_ids,
              size: sample_values,
              colorscale: "Earth"
            }
          }];
          
          var layout = {
            title: "OTU ID",
            showlegend: false,
            height: 600,
            width: 1700
          };
          Plotly.newPlot("bubble", bubbledata, layout);
           });
        }
// Define function that will run on page load/////////////////////////////////////////////////
function init() {

    var selector = d3.select("#selDataset");
    // Read json data
    // Parse and filter data to get sample names
    d3.json("samples.json").then((sampleNames) => {
        var sampleNamesID = sampleNames.names
      sampleNamesID.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

    // Use first sample to build metadata and initial plots//////////////////////////////////////
      const firstSample = sampleNamesID[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
      console.log(firstSample)
    });
  }
//to update chart when a new sample selected/////////////////////////////////////////////////////
function optionChanged(newSample){

    // Update metadata with newly selected sample
    // Update charts with newly selected sample
    buildCharts(newSample);
    buildMetadata(newSample);
    
}

// Initialize dashboard on page load/////////////////////////////////////////////////////////////
init();