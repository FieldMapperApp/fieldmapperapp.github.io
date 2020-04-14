// constants

let img = document.getElementById('screenshot');
let map = document.getElementById('image-map');
let container = document.getElementsByClassName('screenshot-description')[0];

let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

if (isMobile) {
    img.style.visibility = "hidden";
    container.innerHTML =
        "<span>Oops, looks like the device you're using isn't big enough. Please visit again using a bigger device to show the interactive interface guide!</span>"
} else {
    scaleAreas()
}

// scale areas

function scaleAreas() {

    let origHeight = img.naturalHeight;
    let origWidth = img.naturalWidth;

    let height = img.offsetHeight;
    let width = img.offsetWidth;

    [...map.childNodes].filter(e => e.tagName == "AREA")
        .forEach(e => {
            let _coords = e.coords.split(',').map(Number);
            coords = [
                Math.round((_coords[0] / origWidth) * width),
                Math.round((_coords[1] / origHeight) * height),
                Math.round((_coords[2] / origWidth) * width),
                Math.round((_coords[3] / origHeight) * height)
            ];
            e.coords = coords.join();
            e.addEventListener('mouseover', onMouseover);
        });

}

// events

function onMouseover(e) {
    let elem = e.target;
    let textContent = getText(e.target.alt);
    container.classList.remove('centered');
    container.innerHTML = `
    <span style="color: white">${elem.title}</span><br />
    <span style="font-size: smaller">${textContent}</p>
    `;
    container.setAttribute("height", container.scrollHeight.toString() + "px");
}

// text content

let text = [
    {
        name: "modes",
        text: `You can add point features to the map or draw lines (freehand). It is highly recommended using a stylus if your device supports it.<br />
        Note that you can only drag the map while in point mode.`
    },
    {
        name: "colorbar",
        text: `Choose between different colors for the next feature added to the map.<br /> 
        You can set the available colors in the options.`
    },
    {
        name: "buttons",
        text: `Variables (= attributes of the features that you add to the map) will show up as buttons after you add them through the Variable Management interface which you can find in the settings.<br />
        FieldMapper allows several ways to operationalise variables.`
    },
    {
        name: "status",
        text: `The status field shows the current map center and zoom level.<br /> 
        It will also show progress of other processes such as caching.`
    },
    {
        name: "marker",
        text: `Click on the map (or draw a line) to add a feature.<br /> 
        The color of the feature, custom attribute values and the timestamp among other things are stored as properties of the features.<br />
        If the comments functionality is enabled, you can append additional remarks as text.`
    },
    {
        name: "layers",
        text: `Click here to show or hide layers.<br />
        FieldMapper comes with an import function to work with your own layers that can be uploaded in the Layer Management menu. `
    },
    {
        name: "zoom",
        text: "Click here to zoom in and out."
    },
    {
        name: "cache",
        text: `FieldMapper also works offline. <br />
        Just click the cache button to store the current map boundaries for offline use.`
    },
    {
        name: "undo",
        text: "Click here to delete the last feature added to the map."
    },
    {
        name: "clear",
        text: "Click here to delete all features on the map."
    },
    {
        name: "save",
        text: `Click here to export map features together with all attributes as a GeoJSON file which can be imported into the GIS software of your choice.
        `
    },
    {
        name: "locate",
        text: "Click here to show your current location on the map."
    },
    {
        name: "group",
        text: "Use the group functionality to mark interaction between objects or relationships of all kinds that cannot be reasonably encoded in variables."
    }
];
function getText(name) {
    let obj = text.filter(e => e.name === name)[0];
    return obj.text
}
