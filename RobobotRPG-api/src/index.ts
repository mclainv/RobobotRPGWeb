import './config';
import { createApp } from './utils/createApp';
import './database/';
const PORT = parseInt(process.env.API_PORT || '3001', 10);

async function main() {
    try {
        const app = createApp();
        app.listen(PORT, () => {
            console.log("Running on port ", PORT);
        })
    }
    catch (err) {
        console.log("there was an error")
    }
}
main();