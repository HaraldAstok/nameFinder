const { getNames } = require('./getData');

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

const askFileName = () => {
	return new Promise((resolve, _reject) => {
		readline.question(
			`What's the file path? (default will be names.txt in the same folder) `,
			(answer) => {
				console.log('----');
				resolve(answer);
			}
		);
	});
};

const askPersonName = () => {
	return new Promise((resolve, _reject) => {
		readline.question('What is the name you are looking for? ', (answer) => {
			console.log('----');
			resolve(answer);
		});
	});
};

const askToContinue = () => {
	return new Promise((resolve, _reject) => {
		readline.question('Do you want to search again? y/n ', (answer) => {
			console.log('----');
			resolve(answer.toLowerCase());
		});
	});
};

const askToChangeFileName = () => {
	return new Promise((resolve, _reject) => {
		readline.question('Do you want to change file path? y/n ', (answer) => {
			console.log('----');
			resolve(answer.toLowerCase());
		});
	});
};

async function findName(needle, haystack) {
	return haystack.indexOf(needle.toLowerCase()) > -1;
}

init();

async function init() {
	console.log('Insert "Q" to cancel program\n----');
	let fileName;
	let data = [];

	while (true) {
		if (fileName === undefined) {
			fileName = await askFileName();
		}

		if (fileName === 'Q') {
			break;
		}

		data = await getNames(fileName);
		if (data) {
			const personName = await askPersonName();
			if (personName === 'Q') {
				break;
			}

			if (await findName(personName, data)) {
				console.log('Name IS in the file');
			} else {
				console.log('Name IS NOT in the file');
			}

			const toContinue = await askToContinue();
			if (toContinue === 'n' || toContinue === 'q') {
				break;
			}
		}
		const changeFileName = await askToChangeFileName();
		switch (changeFileName) {
			case 'y':
				fileName = undefined;
			case 'n':
				break;
			case 'q':
				break;
		}
	}

	readline.close();
	console.log('BYE');
}
