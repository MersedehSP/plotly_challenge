# plotly_challenge

![Dashboard](/Belly Button Biodiversity/Images/Dashboard.JPG)

## **plotly_ homework_ Belly Button Biodiversity:**

This interactive dashboard is built to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

The dataset is included as `samples.json`

## Step 1: Plotly

1. Dropdown menu is populated with all of the Sample ID's. When an option is selected, this will update all of the charts.

2. A horizontal bar chart is built with a dropdown menu to display the top 10 OTUs found in that individual.

  * **Note:** For each sample, the OTU's are listed in descending order

  

3. A bubble chart is built to display each sample:

	* `otu_ids`is used for the x values.
	
	*  `sample_values`  is used for the y values.
	
	* `sample_values` is used for the marker size.
	
	*  `otu_ids` is used for the marker colors.
	
	* `otu_labels` is used for the text values.

	

4. sample metadata is displayed as an individual's demographic information.

  