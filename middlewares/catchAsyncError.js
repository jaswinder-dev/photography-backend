export const catchAsyncError = (theMethod) => {
    return (req, res, next) => {
        Promise.resolve(theMethod(req, res, next)).catch(next);
    };
};