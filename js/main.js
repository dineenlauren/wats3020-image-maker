/* WATS 3020 Image Maker Code */

//////////////////////////////////////////////////
// ImageMaker Class Definition               /////
////////////////////////////////////////////////////////////////////////
// This class is  used to manage the image manipulation and prep on    //
// the page. It is instantiated when the page is loaded, and it       //
// handles all the logic of updating the image preview with the data  //
// submitted by users via the image maker form.                       //
////////////////////////////////////////////////////////////////////////

class ImageMaker {
    constructor()
        // When this class is instantiated, the `constructor()` method is executed.
        // TODO: Set up attributes that point to the HTML elements we wish to work with.

        // TODO: Select the `#image-preview` div using any document selector method.
        this.imagePreview = document.querySelector('div[id="image-preview"]');

        // TODO: create a new `<p>` element called `this.topText`
        // TODO: Add a `class` attribute to `this.topText` that contains the classname "top-text".
        // TODO: Append `this.topText` as a child element to `this.imagePreview`
        
        this.topText = document.createElement('p');
        this.topText.setAttribute('class', 'top-text');
        this.imagePreview.appendChild(this.topText);
        
        //should I add 'this.' to colorText??
        this.colorTopText = document.querySelector('input);
        var defaultColor = "#0000ff";
        window.addEventListener("load", startup, false);
        
        function startup() {  //could I replace the id with just '#colorTopText'? 
            this.colorTopText = document.querySelector('input[id="colorTopText"]');
            this.colorTopText.value = defaultColor;
            this.colorTopText.addEventListener("input", updateFirst, false);
            // this.colorTopText.addEventListener("change", updateAll, false);
            this.colorTopText.select(); 
        }

        function updateFirst(event) {
            if (this.topText) {
                this.topText.style.color = event.target.value;
            } 
        }

        // function updateAll(event) {
        //     document.querySelectorAll(this.topText).forEach(function (topText) {
        //         this.topText.style.color = event.target.value;
        //     });
        // }
        

        // TODO: create a new `<p>` element called `this.bottomText`
        // TODO: Add a `class` attribute to `this.bottomText` that contains the classname "bottom-text".
        // TODO: Append `this.bottomText` as a child element to `this.imagePreview`

        this.bottomText = document.createElement('p');
        this.bottomText.setAttribute('class', 'bottom-text');
        this.imagePreview.appendChild(this.bottomText);

        // This class also needs to use the form fields to read user input. Set
        // those up for future use, too.
        
        // TODO: Select the `input` element with the `name` attribute "backgroundImage"
        // TODO: Select the `input` element with the `name` attribute "topText"
        // TODO: Select the `input` element with the `name` attribute "bottomText"
        
        this.backgroundInput = document.querySelector('select[name="backgroundImage"]');
        this.topTextInput = document.querySelector('input[name="topText"]');
        this.topColorTextInput = document.querySelector('input[')
        this.bottomTextInput = document.querySelector('input[name="bottomText"]');


        // NOTE: If you add additional form fields to modify other aspects of
        // the image, then you will need to make attributes for each of those
        // elements here.
    }


    drawPreview(){
        // This function is called whenever a user changes one of the form fields
        // and whenever an image is generated for download. This function must
        // update the style attributes and innerHTML content of the HTML
        // elements selected in the `constructor()` of this class in order to
        // update `this.imagePreview`.

        // TODO: Update the `background-image` CSS property for `this.imagePreview`.
        this.imagePreview.style.backgroundImage = `url(images/${this.backgroundInput.value}`;
        // TODO: Update the `innerHTML` of `this.topText`.
        this.topText.innerHTML = this.topTextInput.value;
        this.colorTopText.style.innerHTML = this.colorTopText.value
        // TODO: Update the `innerHTML` of `this.bottomText`
        this.bottomText.innerHTML = this.bottomTextInput.value;

    }
    downloadImage(){
        this.drawPreview();
        generateImage();
    }
}

let imageMaker = new ImageMaker();

//////////////////////////////////////////////////
// Do Not Edit Below This Line               /////
////////////////////////////////////////////////////////////////////////

// This function uses the `domtoimage` module to render an image of the
// `#image-preview` element and prompts the user to download the created image.
// It is possible to use the `height` and `width` parameters to alter the size
// of the rendered image.
function generateImage(elementID="image-preview", height="800px", width="1280px"){
    let htmlTemplate = document.getElementById(elementID);
    htmlTemplate.style.height = height;
    htmlTemplate.style.width = width;
    let imageName = "image_" + Date.now();

    // Generate image and prompt download for user.
    domtoimage.toJpeg(htmlTemplate, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = imageName;
            link.href = dataUrl;
            link.click();
        });
}


// This function creates event listeners for each every form field added to
// the image maker form as well as the submit button that generates an image
// for download. New form inputs can be created and will automatically have
// a "change" listener added to them.
//
// The form field listeners look for a "change" event and call the
// `imageMaker.drawPreview()` method.
//
// The submit listener on the form interrupts the regular form processing of the
// browser and calls the `imageMaker.downloadImage()` method.
function applyEventListeners(){
    let inputs = document.querySelectorAll('input, select, textarea');
    for (input of inputs){
        input.addEventListener("change", function(event){
            imageMaker.drawPreview();
        })
    }
    let imageForm = document.querySelector('form');
    imageForm.addEventListener('submit', function(event){
        event.preventDefault();
        imageMaker.downloadImage();
    })
}

// Apply event listeners on page load.
applyEventListeners();
