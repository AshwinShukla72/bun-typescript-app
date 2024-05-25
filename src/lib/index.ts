// Custom Router
type Handler = (req: Request) => Response | Promise<Response>;

interface Route {
	method: string;
	path: string;
	handler: Handler;
}
export class Router {
	private routes: Route[] = [];
	register(method: string, path: string, handler: Handler) {
		this.routes.push({ method, path, handler });
	}

	get(path: string, handler: Handler) {
		this.register("GET", path, handler);
	}

	post(path: string, handler: Handler) {
		this.register("POST", path, handler);
	}
	/**
	 * handle
	 */
	public handle(req: Request) {
		const url = new URL(req.url);

		// Determine Route
		const route = this.routes.find((route) => {
			return route.method === req.method && route.path === url.pathname;
		});
		if (route) return route.handler(req);
		// return the 404 page
		return new Response(Bun.file(`${import.meta.dir}static/pages/404.html`));
	}
}
