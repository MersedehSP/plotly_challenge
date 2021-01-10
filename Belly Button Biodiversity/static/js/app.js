
// Define a function that will create metadata for given sample
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

        Object.entries(result).forEach(([key, value]) => {
            console.log(key,value);
            display.append("h4").text(`${key}: ${value}`);
          });
        });
    }



    // Read the json data

        // Parse and filter the data to get the sample's metadata

        // Specify the location of the metadata and update it



// // Define a function that will create charts for given sample
function buildCharts(sample) {
    d3.json("samples.json").then(data => {
        var allSamples = data.samples;
        
        var samplefilter = allSamples.filter(rowObject =>rowObject.id == sample);
        //console.log(metadatafilter)
        var result = samplefilter[0];

    // Read the json data

        // Parse and filter the data to get the sample's OTU data
        // Pay attention to what data is required for each chart

        // Create bar chart in correct location
        
      
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
        // Create bubble chart in correct location
        
        
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
            width: 1500
          };
          Plotly.newPlot("bubble", bubbledata, layout);


        //   /// gauge chart
        //   var bb_freqwash = [
        //     {
        //       type: "indicator",
        //       mode: "gauge+number+delta",
        //       value: data.WFREQ,
        //       title: "Number of Belly Button Washes",
        //       delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
        //       gauge: {
        //         axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
        //         bar: { color: "darkblue" },
        //         bgcolor: "white",
        //         borderwidth: 2,
        //         bordercolor: "gray",
        //         steps: [
        //             { range: [0, 1], color: "#B2EC5D" },
        //             { range: [1, 2], color: "#66FF00" },
        //             { range: [2, 3], color: "#93C572" },
        //             { range: [3, 4], color: "#87A96B" },
        //             { range: [4, 5], color: "#78866B" },
        //             { range: [5, 6], color: "#556B2F" },
        //             { range: [6, 7], color: "#414833" },
        //             { range: [7, 8], color: "#85BB65" },
        //             { range: [8, 9], color: "#87A96B" },
        //         ],
        //         threshold: {
        //           line: { color: "red", width: 4 },
        //           thickness: 0.75,
        //           value: 490
        //         }
        //       }
        //     }
        //   ];
          
        //   var layout = {
        //     width: 500,
        //     height: 400,
        //     margin: { t: 25, r: 25, l: 25, b: 25 },
        //     paper_bgcolor: "lavender",
        //     font: { color: "darkblue", family: "Arial" }
        //   };
          
        //   Plotly.newPlot('myDiv', data, layout);


            });
        }




// Define function that will run on page load
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
  
    // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots
      const firstSample = sampleNamesID[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
      console.log(firstSample)
    });
  }
    


function optionChanged(newSample){

    // Update metadata with newly selected sample
    buildCharts(newSample);
    buildMetadata(newSample);
    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

