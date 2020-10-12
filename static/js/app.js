// pull in data
d3.json('../data/samples.json').then(data => {

    let subjectID = data.names
    let metadata = data.metadata
    let samples = data.samples;

    console.log(data);
    
})