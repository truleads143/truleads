import geoip from "geoip-lite";

export const handleRestrictUserLocation = async (req, res) => {
    try {
        // extract client ip (render / proxy safe)

        // very top of controller
        // if (process.env.NODE_ENV !== "production") {
            return res.status(200).json({
                allowed: true,
                country: "us",
                method: "dev_override",
            });
        // }

        // if (process.env.NODE_ENV !== "production") {
        //     return res.status(301).json({
        //         allowed: false,
        //         country:"india",
        //         reason: "geo_blocked",
        //         method: "dev_override",
        //     });
        // }

        const ip =
            req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.socket.remoteAddress;

        if (!ip) {
            return res.status(200).json({
                allowed: false,
                error: true,
                reason: "ip_not_found",
                method: "ip",
            });
        }

        // lookup geo info
        const geo = geoip.lookup(ip);

        if (!geo || !geo.country) {
            return res.status(200).json({
                allowed: false,
                error: true,
                reason: "geo_lookup_failed",
                method: "ip",
            });
        }

        const country = geo.country.toLowerCase();

        // block non-us users
        if (country !== "us") {
            return res.status(200).json({
                allowed: false,
                country,
                reason: "geo_blocked",
                method: "ip",
            });
        }

        // allow us users
        return res.status(200).json({
            allowed: true,
            country,
            method: "ip",
        });
    } catch (error) {
        return res.status(200).json({
            allowed: false,
            error: true,
            reason: "unexpected_error",
            method: "ip",
        });
    }
};
