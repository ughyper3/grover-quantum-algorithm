const express = require('express');
const {spawn} = require('child_process');

const app = express();

app.get('/', (req, res) =>{
    let dataToSend;
    
    const python = spawn('python', ['main.py']);

    python.stdout.on('data', (data) => {
        console.log("Pipe data from python script...");
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(`Child process close all stdio wit code ${code}`);
        res.send(dataToSend);
    })
})

module.exports = app;