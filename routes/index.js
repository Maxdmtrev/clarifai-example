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

// router.route('/upload')
//     .post( async (req, res) => {
//         const url = req.body.url;
//         await clarifai.models.predict(Clarifai.GENERAL_MODEL, `${url}`)
//         .then(response => {
//             let result = response['outputs'][0]['data']['concepts'];
//             let name = result.map(e => e.name);
//             let value = result.map(e => e.value.toFixed(3));
//             console.log(name);
//             console.log(value);
//             // res.json({name: name, value: value});
//             console.log(response['outputs'][0]['data']['concepts']);
//             res.render('index', { result, name, value, url} )
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     });

router.route('/upload')
    .post( async (req, res) => {
        const url = req.body.url;
        // const model = "c0c0ac362b03416da06ab3fa36fb58e3";
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

                console.log(response['outputs'][0]['data']['regions'][0]['data']['face']);
                res.json({status: response['outputs'][0]['data']['regions'][0]['data']['face']});

                // res.json({name: age});

                ///////// In this data (age_appearance, gender_appearance, multicultural_appearance)
                // console.log(response['outputs'][0]['data']['regions'][0]['data']);



                // res.render('index', { result, name, value, url} )

                 res.render('demography', {nameAge, valueAge, nameAge1, valueAge1,
                                           genderName, genderName1, genderValue, genderValue1, url} );
            })
            .catch(err => {
                console.log(err);
            });
    });

module.exports = router;