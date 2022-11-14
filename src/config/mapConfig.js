require([
  "esri/config",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/Graphic",
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/GraphicsLayer",
  "esri/geometry/Polygon",
], function (
  esriConfig,
  SketchViewModel,
  Graphic,
  Map,
  MapView,
  GraphicsLayer,
  Polygon
) {
  esriConfig.apiKey =
    "AAPK2968d346215e432ba79cba268da42ed4wV1SivEJXMqmAzjb72hjDBOke4nn1BSzRFcCZU3ee4SeGO-jUOBNK6o2a4SnGQxd";

  const poligonoBtn = document.getElementById("polygon");
  const linetBtn = document.getElementById("line");
  const pointBtn = document.getElementById("point");
  const removeBtn = document.getElementById("remove");
  const graphicsLayer = new GraphicsLayer();
  const blueColorSymbol = "rgba(84, 145, 245,  0.6)"
  const blueColorInsidePolygon = "rgba(84, 145, 245,  0.3)"
  const coordinatesCostaneraCenter = [-70.6075306, -33.4170258]
  let sketchViewModel;

  const map = new Map({
    basemap: "arcgis-topographic",
    layers: [graphicsLayer],
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 16,
    center: coordinatesCostaneraCenter,
  });

  setUpInstructions();

  view.when(function () {
    sketchViewModel = new SketchViewModel({
      view: view,
      layer: graphicsLayer,
      pointSymbol: {
        type: "simple-marker",
        color: blueColorSymbol,
        style: "circle",
        outline: {
          color: blueColorSymbol,
          width: 1,
        },
      },
      polylineSymbol: {
        type: "simple-line",
        color: blueColorSymbol,
        style: "solid",
        width: 2,
      },
      polygonSymbol: {
        type: "simple-fill",
        color: blueColorInsidePolygon,
        style: "solid",
        outline: {
          color: blueColorSymbol,
          width: 1,
        },
      },
    });

    sketchViewModel.on("create", function (evt) {
      graphicsLayer.add(evt.graphic);
    });
  });

  pointBtn.addEventListener("click", function () {
    sketchViewModel.create("point");
  });

  linetBtn.addEventListener("click", function () {
    sketchViewModel.create("polyline");
  });

  poligonoBtn.addEventListener("click", function () {
    sketchViewModel.create("polygon");
  });

  removeBtn.onclick = () => {
    sketchViewModel.layer.removeAll();
  };

  function setUpInstructions() {
    const sampleInstructions = document.getElementById("graphic");
    view.ui.add(sampleInstructions, "top-right");
  }
});
