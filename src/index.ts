import './config';
import { createApp } from './utils/createApp';
import './database/';
const PORT = process.env.PORT || 3001;

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