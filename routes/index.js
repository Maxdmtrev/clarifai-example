
const express = require("express");
const router = express.Router();
const Clarifai = require("clarifai");
const path = require('path');
const bodyParser = require("body-parser");
const clarifai = new Clarifai.App({  apiKey: 'd6dd707fbdd9404e869be038368df4db'});


router.route('/')
    .get(async (req, res, next) => {
        res.render('index');
    });

router.route('/upload')
    .post( async (req, res) => {
        const url = req.body.url;
        const inputModel = req.body.inputGroup;
        console.log(req.body);

        if(inputModel === 'general') {
        await clarifai.models.predict(Clarifai.GENERAL_MODEL, `${url}`)
        .then(response => {
            let result = response['outputs'][0]['data']['concepts'];
            let name = result.map(e => e.name);
            let newRes = result.map(e => e.value.toFixed(3));
            res.render('index', { result, name, newRes, url} )
        })
        .catch(err => {
            console.log(err);
        });
      } if(inputModel === 'demograph') {
                await clarifai.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", `${url}`)
            .then(response => {
                let age = response['outputs'][0]['data']['regions'][0]['data']['face']['age_appearance']['concepts'][0];
                let age1 = response['outputs'][0]['data']['regions'][0]['data']['face']['age_appearance']['concepts'][1];
                let nameAge = age.name;
                let valueAge = age.value.toFixed(3);
                let nameAge1 = age1.name;
                let valueAge1 = age1.value.toFixed(3);
                let gender_fem = response['outputs'][0]['data']['regions'][0]['data']['face']['gender_appearance']['concepts'][0];
                let gender_mas = response['outputs'][0]['data']['regions'][0]['data']['face']['gender_appearance']['concepts'][1];
                let genderName = gender_fem.name;
                let genderValue = gender_fem.value.toFixed(3);
                let genderName1 = gender_mas.name;
                let genderValue1 = gender_mas.value.toFixed(3);
                let result = response['outputs'][0]['data']['regions'][0]['data']['face']['multicultural_appearance']['concepts'];
                let nameMulti = result.map(e => e.name);
                let valueMulti = result.map(e => e.value.toFixed(3));
                 res.render('demography', {nameAge, valueAge, nameAge1, valueAge1,
                                           genderName, genderName1, genderValue, genderValue1, result, nameMulti, valueMulti, url} )
            })
            .catch(err => {
                console.log(err);
            });
        }
    });


module.exports = router;