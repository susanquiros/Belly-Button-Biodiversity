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
                title: {
                    text: `<b>Top 10 OTU for ID ${(id)}</b>`,
                    font: {
                        size: 16,
                    },
                    height: 1000,
                    width: 800
                }
            };
            // Defining traceBar
            var traceBar = [traceBar]
            // Placing the bar chart into the 'bar' div
            Plotly.newPlot('bar', traceBar, layout);

            //Creating the bubble chart
            let traceBubble = {
                x:  label_ids,
                y: sample_values,
                text: label_labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: label_ids,
                    colorscale: 'Picnic'
                }
            };

            // Setting title
            let layout_bubble = {
                title: {
                    text: `<b>Bacteria Cultures for ID ${(id)}</b>`,
                    font: {
                        size: 16,
                    },
                    height: 1000,
                    width: 800
                },
                xaxis: {
                    title : {
                        text:'<b>OTU ID</b>',
                        font: {
                            size: 16,
                        },
                        height: 1000,
                        width: 800
                }}
            };
            let traceBubble1 = [traceBubble];
            // Placing the bar chart into the 'bar' div
            Plotly.newPlot('bubble', traceBubble1, layout_bubble );


            //creating the Gauge chart 
            let traceGauge = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: metadata.wfreq,
                    title: { text: `<b> Belly Button Washing Frequency ID ${(id)}</b>` },
                    type: "indicator",
                    mode: "gauge+number",
                    gauge: {
                        axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
                        steps: [
                            { range: [0, 1], color: 'rgb(215,48,39)' },
                            { range: [1, 2], color: 'rgb(244,109,67)' },
                            { range: [2, 3], color: 'rgb(253,174,97)' },
                            { range: [3, 4], color: 'rgb(254,224,144)' },
                            { range: [4, 5], color: 'rgb(224,243,248)' },
                            { range: [5, 6], color: 'rgb(171,217,233)' },
                            { range: [6, 7], color: 'rgb(116,173,209)'},
                            { range: [7, 8], color: 'rgb(69,117,180)' },
                            { range: [8, 9], color: 'rgb(49,54,149)' }
                        ],
                        threshold: {
                            line: { color: "red", width: 4 },
                            thickness: 0.75,
                            value: 9
                        }
                    }
                }
            ];

            var layout_gauge = { width: 600, height: 500, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge', traceGauge, layout_gauge);


        });

};


