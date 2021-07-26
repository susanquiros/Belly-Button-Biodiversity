// JSON promise- to read the dataset in  Java
d3.json("samples.json").then(function(data) {
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


