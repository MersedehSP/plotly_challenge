
// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    d3.json("sample.json").then(data_=> {
        console.log(data)

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
        d3.json("sample.json").then(function(data) {
      
            var sample_values = data.sample_values;
            console.log(sample_values);
            var otu_labels = data.otu_labels;
            console.log(otu_labels);
            var otu_ids = data.otu_ids;
            console.log(otu_ids);
        
            var data = [{
              values: sample_values,
              x: data.otu_ids,
              y: data.sample_values,
        // create trace variable for the plot
        var trace = {
            x: sample_values,
            y: otu_ids,
            text: labels,
            type:"bar",
            orientation: "h",
        };
        
        // create data variable
        var data = [trace];
        
        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
                    },
                margin: {
                        l: 100,
                        r: 100,
                        t: 30,
                        b: 20
                    }
                };
        
 
        // Create bubble chart in correct location
        
        d3.json("sample.json").then((data) => {
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


          /// gauge chart
          var bb_freqwash = [
            {
              type: "indicator",
              mode: "gauge+number+delta",
              value: data.WFREQ,
              title: "Number of Belly Button Washes",
              delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
              gauge: {
                axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
                bar: { color: "darkblue" },
                bgcolor: "white",
                borderwidth: 2,
                bordercolor: "gray",
                steps: [
                    { range: [0, 1], color: "#B2EC5D" },
                    { range: [1, 2], color: "#66FF00" },
                    { range: [2, 3], color: "#93C572" },
                    { range: [3, 4], color: "#87A96B" },
                    { range: [4, 5], color: "#78866B" },
                    { range: [5, 6], color: "#556B2F" },
                    { range: [6, 7], color: "#414833" },
                    { range: [7, 8], color: "#85BB65" },
                    { range: [8, 9], color: "#87A96B" },
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 490
                }
              }
            }
          ];
          
          var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            paper_bgcolor: "lavender",
            font: { color: "darkblue", family: "Arial" }
          };
          
          Plotly.newPlot('myDiv', data, layout);



        }




// Define function that will run on page load
function init() {

    var selector = d3.select("#selDataset");
    // Read json data
    // Parse and filter data to get sample names
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
    // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
      console.log(firstSample)
    });
  }
    
}
function optionChanged(newSample){

    // Update metadata with newly selected sample
    buildCharts(newSample);
    buildMetadata(newSample);
    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

