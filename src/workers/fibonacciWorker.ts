onmessage = (e) => {
    const recursiveFibonacci = (value: number) => {
        const fib = (n: number): number => {
            if (n <= 1) {
                return n
            }
            return fib(n - 1) + fib(n - 2)
        }

        fib(value)
    }

    const result = recursiveFibonacci(e.data);
    postMessage(result);
};

