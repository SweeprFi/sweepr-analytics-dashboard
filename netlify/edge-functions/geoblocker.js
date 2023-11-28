export default async (req, { geo }) => {
    if (geo.country.code === "US") {
        const url = new URL("/api/forbidden", req.url);
        return Response.redirect(url);
    }
};

