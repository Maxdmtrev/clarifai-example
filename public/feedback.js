
function evergreen() {
    const image = document.getElementById('img').src;
    const value = true;
    const id = 'evergreen';
    const feedback = {
        image: image,
        value: value,
        id: id,
    };

    sendPost(feedback)
};

function deciduous() {
    const image = document.getElementById('img').src;
    const value = true;
    const id = 'deciduous'
    const feedback = {
        image: image,
        value: value,
        id: id,
    };

    sendPost(feedback)
};

function sendPost(feedback) {
    postData(`http://localhost:3000/feedback`, feedback)
        .then(data => console.log(JSON.stringify(data)))
    function postData(url = ``, data = {}) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
    }
};

const Clarifai = require('clarifai');

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({apiKey: 'd6dd707fbdd9404e869be038368df4db'});

// Predict the contents of an image by passing in a URL.
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg')
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });



