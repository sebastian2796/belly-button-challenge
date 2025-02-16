// Build the metadata panel
function buildDemoInfo(subjectID) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data);
    console.log("buildDemoInfo");
    // get the metadata field


    // Filter the metadata for the object with the desired sample number


    // Use d3 to select the panel with id of `#sample-metadata`


    // Use `.html("") to clear any existing metadata


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

  });
}

// function to build both charts
function buildCharts(subjectID) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(subjectID);
    console.log("buildCharts");
    // Get the samples field


    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}


// Function for event listener
function personChanged(subjectID) {
  // Build charts and metadata panel each time a new sample is selected
  buildDemoInfo(subjectID);
  buildCharts(subjectID);
}


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the names field
    let allIDs = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    allIDs.forEach(id => {
      dropdown.append("option").attr("value", id).text(id);
    });

    // Get the first sample from the list
    // Build charts and metadata panel with the first sample
    personChanged(allIDs[0]);
  });
}



// Initialize the dashboard
init();
