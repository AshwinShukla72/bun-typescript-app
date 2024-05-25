// Create and start the server
import { logger } from "./lib/logger";
import { config } from "./config.ts";
import { users } from "./static/sampleData/users.ts";

const server = Bun.serve({
	port: Bun.env.PORT,
	fetch(request) {
		const url = new URL(request.url);
		if (url.pathname === "/") return new Response("Home page!");
		if (url.pathname === "/users")
			return new Response(JSON.stringify(users), {
				headers: { "Content-Type": "application/json" },
			});

		const file = Bun.file(`${config.staticPagesPath}/404.html`);
		return new Response(file);
	},
});
logger.info(`Server started on PORT: ${server.port}`);
