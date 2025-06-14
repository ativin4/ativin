"use client";
import React, { useState, useEffect, use } from "react";
import dynamic from "next/dynamic";
import problems from "@/data/problems.json";
import { getStarterCode } from "./utils";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface DSAProblemPageProps {
  params: Promise<{ id: string }>;
}

const DSAProblemPage = (props: DSAProblemPageProps) => {
  const params = use(props.params);
  const problem = problems.find((p) => p.id === params.id);
  const starterCode = getStarterCode(problem)

  const [code, setCode] = useState<string>("");
  useEffect(() => {
    if (problem) {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(`dsa_code_${problem.id}`) : null;
      setCode(saved ?? starterCode);
    }
  }, [problem, starterCode]);

  useEffect(() => {
    if (problem) {
      localStorage.setItem(`dsa_code_${problem.id}`, code);
    }
  }, [code, problem]);

  const [results, setResults] = useState<{ pass: boolean; actual: any; expected: any; input: any; logs: any[]; }[]>([]);

  const handleRun = () => {
    if (!problem?.testCases) return;
    const newResults: { pass: boolean; actual: any; expected: any; input: any[]; logs: string[] }[] = [];

    // Extract the first function name from the user code
    const match = code.match(/$function\s+([a-zA-Z0-9_]+)|var\s+([a-zA-Z0-9_]+)\s*=\s*function|const\s+([a-zA-Z0-9_]+)\s*=\s*\(/);
    const functionName = match?.[1] || match?.[2] || match?.[3];

    try {
      for (const test of problem.testCases) {
        let actual;
        let logs: string[] = [];
        try {
          // Prepare the sandboxed function
          const runner = new Function(
            "console",
            "input",
            `
              ${problem.customTypeDefinitions ? Object.values(problem.customTypeDefinitions).join(";"): ""}
              ${code}
              if (typeof ${functionName} !== 'function') throw new Error('Function not found');
              const argumentTypes = ${JSON.stringify(problem.arguments.map(arg => arg.type))};
              const wrappedInput = input.map((arg, index) => {
                if (argumentTypes[index] === 'number') return Number(arg);
                if (argumentTypes[index] === 'string') return String(arg);
                if (argumentTypes[index] === 'boolean') return Boolean(arg);
                if (argumentTypes[index] === 'object') return JSON.parse(arg);
                return new (eval(argumentTypes[index]))(arg);
              });
              return ${functionName}.apply(null, wrappedInput);
            `
          );
          // Capture console.log
          const userConsole = { log: (...args: any[]) => logs.push(args.join(" ")) };
          // Run the function with test input
          actual = runner(userConsole, test.input);
        } catch (e: any) {
          actual = e?.message || "Error";
        }
        newResults.push({
          pass: actual === test.expected,
          actual,
          expected: test.expected,
          input: test.input,
          logs,
        });
      }
      setResults(newResults);
    } catch (err: any) {
      setResults([]);
    }
  };

  if (!problem) return <div className="p-6">Problem not found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
      <div
        className="mb-4 border rounded p-4 bg-gray-800 text-white text-sm whitespace-pre-wrap"
      >
        {problem.description}
      </div>
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Test Cases:</h2>
        <ul className="list-disc ml-6">
          {problem.testCases?.map((test, idx) => (
            <li key={idx}>
              <span className="font-mono">Input: {JSON.stringify(test.input)}</span>
              <span className="ml-2 font-mono">Expected: {JSON.stringify(test.expected)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[400px] border rounded mb-4">
        <MonacoEditor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={starterCode}
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
          options={{
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            automaticLayout: true,
            scrollbar: {
              alwaysConsumeMouseWheel: false,
            }
          }}
        />
      </div>
      <button
        onClick={handleRun}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4 clickable cursor-pointer"
      >
        Run Code
      </button>
      <div className="mb-4">
        {results.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Results:</h2>
            <ul>
              {results.map((res, idx) => (
                <li key={idx} className={res.pass ? "text-green-500" : "text-red-500"}>
                  Test {idx + 1}: {res.pass ? "Passed" : "Failed"} | Input: {JSON.stringify(res.input)} | Expected: {JSON.stringify(res.expected)} | Got: {JSON.stringify(res.actual)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ul>
        {results.map((res, idx) => (
          <li key={idx} className={res.pass ? "text-green-500" : "text-red-500"}>
            <div>
              Test {idx + 1}: {res.pass ? "Passed" : "Failed"}
              <br />
              <span className="font-mono">Input: {JSON.stringify(res.input)}</span>
              <br />
              <span className="font-mono">Expected: {JSON.stringify(res.expected)}</span>
              <br />
              <span className="font-mono">Got: {JSON.stringify(res.actual)}</span>
              {res.logs.length > 0 && (
                <div className="mt-1 text-xs text-gray-400 bg-black rounded p-2">
                  <div className="font-bold text-white">Console Output:</div>
                  {res.logs.map((log, i) => (
                    <div key={i} className="font-mono text-green-400">{log}</div>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DSAProblemPage;