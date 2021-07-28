// JSON promise- to read the dataset in  Java
d3.json("samples.json").then(function (data) {
    init(data); // this is your data
});

// Json organization
function init(data) {
    console.log(data.names);
    console.log(data.metadata);
    console.log(data.samples);
    load_dropdown_list(data.names);
    build_chart('940')
};

//generating the drop-down list 
function load_dropdown_list(names) {
    let dropdown = document.getElementById('selDataset');
    names.forEach(function (name) {
        let opcion = document.createElement('option');
        let atributo = document.createAttribute('value');
        atributo.value = name;
        opcion.setAttributeNode(atributo);
        opcion.text = name;
        dropdown.appendChild(opcion);
    })
};

// to change the ID
function optionChanged(id) {
    build_chart(id);
};

// Build a chart for a single sample such as 940
function build_chart(id) {
    console.log('chart for' + id);
    d3.json('samples.json')
        .then(function (data) {
            let names = data.names;
            let metadata = data.metadata;
            let samples = data.samples;
            // Filter name and other arrays for id
            metadata = metadata.filter(participant => participant.id == id)[0];
            samples = samples.filter(participant => participant.id == id)[0];
            // Creating variables for arrays
            label_ids = samples.otu_ids;
            label_labels = samples.otu_labels;
            sample_values = samples.sample_values;
            // Verifying filter and variables
            console.log(samples);
            console.log(metadata);
            console.log(label_ids);
            console.log(label_labels);
            console.log(sample_values);
            // Build metaPanel for id sample-metadata
            let metaPanel = d3.select('#sample-metadata');
            metaPanel.html('');
            // Loop for each id and information in the #sample-metadata box
            Object.entries(metadata).forEach(([key, value]) => {
                metaPanel.append('h6').text(`${key.toUpperCase()}: ${value}`);
            });
            // Creating top 10 arrays
            let toplabel_ids = label_ids.slice(0, 10).reverse();
            let toplabel_labels = label_labels.slice(0, 10).reverse();
            let topsample_values = sample_values.slice(0, 10).reverse();
            // Map function to store the Ids adding OTU for labeling
            let topotu_id_labels = toplabel_ids.map(otu_ids => 'OTU ' + otu_ids)
            console.log(topotu_id_labels)
            // Verifying top 10 arrays
            console.log(toplabel_ids)
            console.log(toplabel_labels)
            console.log(topsample_values)
            // Creating a trace
            var traceBar = {
                x: topsample_values,
                y: topotu_id_labels,
                type: 'bar',
                orientation: 'h',
                marker: {
                    color: 'green'
                }
            }
            // Setting title
            let layout = {
                title: `Top 10 OTU for ID ${(id)}`
            }
            // Defining traceBar
            var traceBar = [traceBar]
            // Placing the bar chart into the 'bar' div
            Plotly.newPlot('bar', traceBar, layout);
        });

};


