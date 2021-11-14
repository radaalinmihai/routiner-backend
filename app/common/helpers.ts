export const handlePromise = (
	promise: Promise<any>,
): Promise<(undefined | any)[] | (Error | undefined)[]> => {
	return promise
		.then((data) => [undefined, data])
		.catch((error: Error) => [error, undefined]);
};
