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

    // Generate a random date between 1 year ago and yesterday (to ensure all dates are in the past)
    const now = moment();
    const oneYearAgo = moment().subtract(1, "y");

    // Calculate days between one year ago and today
    const daysInRange = now.diff(oneYearAgo, 'days');

    // Generate a random number of days to add (between 0 and daysInRange-1)
    const randomDays = getRandomInt(0, daysInRange - 1); // -1 to exclude today

    // Create a new date object to avoid modifying the original
    const randomDate = moment(oneYearAgo).add(randomDays, "d");

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