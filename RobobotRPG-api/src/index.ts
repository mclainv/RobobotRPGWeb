import './config';
import { createApp } from './utils/createApp';
import './database/';
const API_PORT = process.env.API_PORT || 3001;

async function main() {
    try {
        const app = createApp();
        app.listen(API_PORT, () => {
            console.log("Running on port ", API_PORT);
        })
    }
    catch (err) {
        console.log("there was an error")
    }
}
main();