function buildMetadata(sample) {

  // Use d3 to select the panel with id of `#sample-metadata`
  const selectTag = d3.select("#sample-metadata")

  // Use `d3.json` to fetch the metadata for a sample
  let metadata_URL = "/metadata/" + sample

  d3.json(metadata_URL).then(function(metadata) {
    selectTag.selectAll("*").remove()  // clear existing metadata
    
    // add each key and value pair to the panel
    for (const property in metadata) {
      selectTag.append("p").text(`${property}: ${metadata[property]}`);
    }
    
  })
  
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  let sample_URL = "/samples/" + sample

  d3.json(sample_URL).then(function(sample) {
    // console.log(sample)

    let sampleSort = []
    for (let i = 0; i < sample.sample_values.length; i++) {
      sampleSort.push(
        {
        "otu_ids": sample.otu_ids[i],
        "otu_labels": sample.otu_labels[i],
        "sample_values": sample.sample_values[i]
        }
      )
    }

    sampleSort = sampleSort.sort(function (a, b) {
      return b.sample_values - a.sample_values;
    });
    // console.log(sampleSort)
  
    // use slice() to grab the top 10 sample_values
    sampleSort = sampleSort.slice(0, 10)
    console.log(sampleSort)
  })
  
  // @TODO: Build a Bubble Chart using the sample data
  const bubbleTag = d3.select("#bubble")



  // @TODO: Build a Pie Chart
  const pieTag = d3.select("#pie")


  // const layout = {
  //   height: 600,
  //   width: 800
  // };

  // Plotly.plot("pie", data, layout);


    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
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
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
