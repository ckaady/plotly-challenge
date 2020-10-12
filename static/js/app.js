function buildPlot(id) {

    d3.json("data/samples.json").then((data) => {
      //console.log(data);
  // filter sample values by id 
      let samples = data.samples.filter(samples => samples.id.toString() === id)[0];
      console.log(samples);
      //get the top 10 
      let samplevalues = samples.sample_values.slice(0,10).reverse();
  
      // get only the top 10 OTU IDs for the plot OTU and reverse for plotting
      let OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
  
      // use map to get the OTU IDs to form for the plot
      let OTU_id = OTU_top.map(d => "OTU " + d)
  
      // console.log(OTU_id)
  
      // Top 10 labels for the plot
  
      let labels = samples.otu_labels.slice(0, 10);
  
      //console.log(samplevalues)
      //console.log(OTU_top)
  
      // trace variable for the bar chart
      var trace1 = {
        x: samplevalues,
        y: OTU_id,
        text: labels,
        type:"bar",
        orientation: "h"
        };
  
      var data = [trace1];

      // bar chart layout
      var layout = {
        title: "Top 10 Bacteria Found",
        height: 500,
        width: 805
      };
  
      // bar chart
      Plotly.newPlot("bar", data, layout);
  
      // console.log(samples.otu_ids)
      
      // bubble chart
  
      var trace2 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        marker: {
            size: samples.sample_values,
            color: samples.otu_ids,
            colorscale: "Greens"
        },
        text: samples.otu_labels
      };
  
      // bubble chart layout
      var layout_b = {
        xaxis: {title: "OTU Id"},
        height: 500,
        width: 1000  
      };
  
      // data variable
      var data1 = [trace2];
      
      // bubble plot
      Plotly.newPlot("bubble", data1, layout_b);
  
    });
  
  }
  // function to get metadata for Demographic chart for each id entered
  function getMetainfo(id) {
  
    // read the json file to get the data
    
    d3.json("data/samples.json").then((data) => {
       
      // get metadata info for demographic chart
      let metadata = data.metadata;
  
      //console.log(metadata);
  
      // filter metadata by id
      let filtermeta = metadata.filter(metadata => metadata.id.toString() === id)[0];
  
      // use d3 to select for metadata placement
      let demoInfo = d3.select("#sample-metadata");
  
      // refresh page so demographic info change of id entered
      demoInfo.html("");
  
      // retrieve demographic data for id and append to h5 element
      Object.entries(filtermeta).forEach((key) => {
          demoInfo.append("h5").text(key[0] + ": " + key[1] + "\n");
      });
    });
    
  }
  // function for change event for event listener "optionChanged" to build plots and render meta data
  function optionChanged(id) {
  
    buildPlot(id);
    getMetainfo(id);
  }
  
  // function for initial data rendering
  function init() {
    // select dropdown menu
    let dropdown = d3.select("#selDataset");
  
    // read the data
    d3.json("data/samples.json").then((data) => {
      //console.log(data)
  
      // get id data to dropdown menu
      data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
  
      });
      // call functions to display data and plots to page
      buildPlot(data.names[0]);
      getMetainfo(data.names[0]);
    });
  
  }
  init();