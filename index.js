const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';

const makeCommit = n => {
    if (n === 0) {
        simpleGit().push(); // push the last commit to the remote repository
        return;
    }

    // Generate random integers for weeks and days using Math.random
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Generate a random date in the past year (between May 1, 2023 and April 30, 2024)
    const startDate = moment('2023-05-01');
    const endDate = moment('2024-04-30');

    // Calculate total days in this fixed range
    const daysInRange = endDate.diff(startDate, 'days');

    // Generate a random number of days to add (between 0 and daysInRange)
    const randomDays = getRandomInt(0, daysInRange);

    // Create the random date
    const randomDate = moment(startDate).add(randomDays, "d");

    // Format the date
    const DATE = randomDate.format();

    const data = {
        date: DATE
    }

    console.log(`Commit ${n}: ${DATE}`);

    jsonfile.writeFile(FILE_PATH, data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }

        // Use the standard Git commit date format with a more descriptive commit message
        const commitMessage = `Update data for ${DATE}`;
        simpleGit().add([FILE_PATH]).commit(commitMessage, { '--date': DATE }, () => {
            makeCommit(--n);
        });
    });
};



makeCommit(100);