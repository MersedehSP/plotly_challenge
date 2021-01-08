
// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    d3.json("sample.json").then(metadata_=> {
        console.log(metadata)

        Object.entries(sample).forEach(([key, value]) => {
            console.log(key,value);
            metadata.append("h5").text(`${key}:- ${value}`);
          });
        });
    }
    // msp// Promise Pending????????????
//const dataPromise = d3.json(url);
//console.log("Data Promise: ", dataPromise);


    // Read the json data

        // Parse and filter the data to get the sample's metadata

        // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
function buildCharts(sample) {
    

    // Read the json data

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

        // Create bar chart in correct location
        var data = d3.json("sample.json");
      
        d3.json(sample_url).then(function(data) {
      
          var sample_values = data.sample_values;
          console.log(sample_values);
          var otu_labels = data.otu_labels;
          console.log(otu_labels);
          var otu_ids = data.otu_ids;
          console.log(otu_ids);
      
          var data = [{
            values: sample_values,
            labels: otu_ids,
            hovertext: otu_labels,
            type: 'bar'
            orientation: 'h'
          }];
      
          var layout = {
            height: 400,
            width: 500
          };
      
          Plotly.newPlot('bar', data);
      
          });
        // Create bubble chart in correct location
        var chartsURL = "/samples/" + sample;
        d3.json(chartsURL).then((data) => {
          var trace1 = {
            x: data.otu_ids,
            y: data.sample_values,
            mode: 'markers',
            text: data.otu_labels,
            marker: {
              color: data.otu_ids,
              size: data.sample_values,
              colorscale: "Earth"
            }
          };
          var trace1 = [trace1];
          var layout = {
            title: "OTU ID",
            showlegend: false,
            height: 600,
            width: 1500
          };
          Plotly.newPlot("bubble", trace1, layout);
}

// Define function that will run on page load
function init() {

    var selector = d3.select("#selDataset");

    //  populate the select options using ls of sample names
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
      console.log(firstSample)
    });
  }
    // Read json data

        // Parse and filter data to get sample names

        // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots

}

function optionChanged(newSample){

    // Update metadata with newly selected sample
    buildCharts(newSample);
    buildMetadata(newSample);
    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

