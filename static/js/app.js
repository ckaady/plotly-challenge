// init function
function init() {
    
    // Use the D3 library to read in samples.json and add to dropdown
    d3.json('../data/samples.json').then(data => {

        let subjectID = data.names
        let metadata = data.metadata
        let samples = data.samples

        console.log(data);
    
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset")
    .selectAll("select")
    .data(subjectID)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);


    })

    }
  
init();
  

