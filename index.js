import bootstrap from './src/accounts/infrastructure/config/bootstrap'
import dependencies from './src/accounts/infrastructure/config/dependencies'
import createServer from "./src/accounts/infrastructure/server/server"

// Start the server
const start = async () => {

  try {
    await bootstrap.init();
    await createServer(dependencies());
    console.log('Server running');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();