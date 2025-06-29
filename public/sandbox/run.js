self.onmessage = async ({ data }) => {
const { uid, code, testCases } = data;
const results = [];
if (testCases) {
    try {
        for (const test of testCases) {
            let actual;
            const logs = [];
            try {
            // Prepare the sandboxed function
            const runner = new Function(
                "console",
                "input",
                code
            );
            // Capture console.log
            const userConsole = { log: (...args) => logs.push(args.join(" ")) };
            // Run the function with test input
            actual = runner(userConsole, test.input);
            } catch (e) {
            actual = e instanceof Error ? e.message : "Error";
            }
            results.push({
                pass: actual === test.expected,
                actual,
                expected: test.expected,
                input: test.input,
                logs,
            });
        }
    } catch {
        // Handle any unexpected errors in the test execution
        results.push({
            pass: false,
            actual: "Error during test execution",
            expected: "N/A",
            input: "N/A",
            logs: []
        });
    }
};


// Always post back to parent
parent.postMessage({ uid, results }, '*');
};
