const path = require('path');
const fs = require('fs');

async function readFile(filepath) {
	try {
		return fs.readFileSync(filepath).toString().split(/\r?\n/);
	} catch (error) {
		console.log('Error:', error.message);
		console.log('Check if the name is correct or that the file exists \n----');
	}
}

async function getNames(inputFilepath) {
	const pathInput = inputFilepath ? './' + inputFilepath : './names.txt';
	let filepath = path.join(__dirname, pathInput);

	const data = await readFile(filepath);

	if (data) {
		return data.map((name) => name.toLowerCase());
	}
	return;
}

module.exports = { getNames };
