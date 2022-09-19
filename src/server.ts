import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from  "apollo-server-core";
import dotenv from "dotenv-safe";
import { readFileSync } from "fs";

dotenv.config();

const startServer = () => {

	const superGraphSchema = readFileSync("./supergraph.graphql").toString();

	const gateWay = new ApolloGateway({
		supergraphSdl: superGraphSchema,
		// supergraphSdl: new IntrospectAndCompose({
		// 	subgraphs:  [
		// 		{
		// 			name: "users",
		// 			url: process.env.USERS_SERVICE_URL,
		// 		},
				
		// 	]
		// })
	});

  const server = new ApolloServer({
		gateway: gateWay,
		cors: {
	  	origin: "*",
	  	credentials: true,
	  },
		csrfPrevention: true, 
  	introspection: true,
	  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false, embed: true })] ,
	});

	 // Start the server
	 server
	  .listen(process.env.PORT || 4000)
	  .then(({ url }) => {
		  	 // eslint-disable-next-line no-console
		  	console.log(`'🚀 Server ready @ ${url}`);
	  })
	  .catch((error) => {
		   // eslint-disable-next-line no-console
		  	console.log(`There was an error - ${error}`);
    });

}

startServer();