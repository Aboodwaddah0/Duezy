const errorHandler = (error, _req, res, _next) => {
    const code = typeof error === "object" && error !== null && "code" in error
        ? error.code
        : undefined;
    if (code === "P2002") {
        res.status(409).json({ message: "Resource already exists" });
        return;
    }
    if (code === "P2025") {
        res.status(404).json({ message: "Resource not found" });
        return;
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
};
export default errorHandler;
