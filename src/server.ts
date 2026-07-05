import { app } from "./app";
import confiq from "./confiq";


async function main() {
  
  try {
    app.listen(confiq.port, () => {
      console.log(`Server is running on port ${confiq.port}`);
    });
  }catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  } 
}

main();