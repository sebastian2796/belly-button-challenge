// Build the metadata panel
function buildDemoInfo(subjectID) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data); 
    console.log("buildDemoInfo");
    
    const metadata = data.metadata; 
    console.log("Metadata:", metadata); 

    console.log("Available IDs:", metadata.map(item => item.id)); 
    console.log("Requested subjectID:", subjectID); 

    // Ensure subjectID is treated as a string for comparison
    const subjectMetadata = metadata.find(item => item.id.toString() === subjectID);
    console.log("Found subjectMetadata:", subjectMetadata); // Log the found metadata

    if (subjectMetadata) {
      const panel = d3.select("#sample-metadata");
      panel.html(""); // Clear existing content

      Object.entries(subjectMetadata).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
    } else {
      console.log("Metadata for the given subjectID not found.");
    }
  }).catch(error => {
    console.error("Error fetching data:", error); 
  });
}

// function to build both charts
function buildCharts(subjectID) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(subjectID);
    console.log("buildCharts");
    // Get the samples field
    const samples = data.samples; 

    // Find the specific sample for the given subjectID
    const subjectSample = samples.find(sample => sample.id === subjectID);

    // Check if the subjectSample exists
    if (subjectSample) {      
      const sampleValues = subjectSample.sample_values; 
      const otuIDs = subjectSample.otu_ids; 
      const otuLabels = subjectSample.otu_labels; 

      // Build a bar chart using Plotly
      const barData = [{
        x: sampleValues.slice(0, 10), 
        y: otuIDs.slice(0, 10).map(id => `OTU ${id}`), 
        text: otuLabels.slice(0, 10), 
        type: 'bar',
        orientation: 'h' 
      }];

      const barLayout = {
        title: 'Top 10 OTUs',
        xaxis: { title: 'Sample Values' },
        yaxis: { title: 'OTU IDs' }
      };

      // Render the bar chart
      Plotly.newPlot('bar', barData, barLayout);

      
      const bubbleData = [{
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuIDs,
          colorscale: 'Earth'
        }
      }];

      const bubbleLayout = {
        title: 'OTU Bubble Chart',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' },
        showlegend: false
      };

      // Render the bubble chart
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    } else {
      console.log("Sample for the given subjectID not found.");
    }
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
     allIDs.forEach(id => {
       dropdown.append("option").attr("value", id).text(id);
     });
 
     // Get the first sample from the list
     // Build charts and metadata panel with the first sample
     personChanged(allIDs[0]);
 
     // Add event listener for changes in the dropdown
     dropdown.on("change", function() {
       // Get the selected value
       const selectedID = d3.select(this).property("value");
       // Call the personChanged function with the selected ID
       personChanged(selectedID);
     });
   });
 }


// Initialize the dashboard
init();
