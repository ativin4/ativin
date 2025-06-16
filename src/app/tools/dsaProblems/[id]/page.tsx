"use client";
import React, { useState, useEffect, use } from "react";
import dynamic from "next/dynamic";
import problems from "@/data/problems.json";
import { getStarterCode, runUserCode } from "./utils";

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
      setCode(saved || starterCode);
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

    try {
      for (const test of problem.testCases) {
        let actual;
        let logs: string[] = [];
        try {
          // Prepare the sandboxed function
          const runner = new Function(
            "console",
            "input",
            runUserCode({code, problem})
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
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 position-relative">
      {/* Fixed Header */}
      <div className="fixed top-16 left-0 right-0 h-16 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm z-10">
        <div className="h-full max-w-[1800px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-100">{problem.title}</h1>
          <button
            onClick={handleRun}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Run Code
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="fixed top-32 left-0 right-0 bottom-0 flex gap-4 p-4">
        {/* Left Side - Description and Test Cases */}
        <div className="h-full grid grid-rows-[1fr_1fr] gap-4 w-full">
          {/* Description Section */}
          <div className="bg-gray-800/50 rounded-lg overflow-auto flex flex-col p-4">
            <h2 className="text-lg font-semibold mb-4">Problem Description</h2>
            <div className="text-gray-300 space-y-4 leading-relaxed whitespace-pre-wrap">
              {problem.description}
            </div>
          </div>

          {/* Example Test Cases */}
          <div className="bg-gray-800/50 rounded-lg overflow-auto flex flex-col p-4">
            <h2 className="text-lg font-semibold mb-4">Example Test Cases</h2>
            <div className="space-y-4">
              {problem.testCases?.map((test, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-400 mb-2">Example {idx + 1}</div>
                  <div className="font-mono text-sm space-y-2">
                    <div>Input: <span className="text-blue-400">{JSON.stringify(test.input)}</span></div>
                    <div>Expected: <span className="text-green-400">{JSON.stringify(test.expected)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Editor and Results */}
        <div className="h-full grid grid-rows-[1fr_1fr] gap-4 w-full">

          {/* Editor */}
          <div className="bg-gray-800/50 rounded-lg overflow-hidden flex flex-col">
            <MonacoEditor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={starterCode}
              value={code}
              onChange={(val) => setCode(val || "")}
              theme="vs-dark"
              options={{
                scrollBeyondLastLine: false,
                minimap: { enabled: false },
                lineNumbers: "on",
                renderLineHighlight: "none",
                automaticLayout: true,
                padding: { top: 16 },
                fontSize: 14,
                fontFamily: "JetBrains Mono, monospace",
              }}
            />
          </div>

          {/* Test Results */}
          <div className="bg-gray-800/50 rounded-lg overflow-auto flex flex-col p-4">
            {results.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg">Run your code to see the results</p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">Test Results</h2>
                <div className="space-y-4">
                  {results.map((res, idx) => (
                    <div key={idx} className={`bg-gray-800 rounded-lg p-4 border-l-4 ${res.pass ? "border-green-500" : "border-red-500"}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {res.pass ? (
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`font-medium ${res.pass ? "text-green-500" : "text-red-500"}`}>
                          Test {idx + 1}: {res.pass ? "Passed" : "Failed"}
                        </span>
                      </div>
                      <div className="font-mono text-sm space-y-2">
                        <div>Input: <span className="text-blue-400">{JSON.stringify(res.input)}</span></div>
                        <div>Expected: <span className="text-green-400">{JSON.stringify(res.expected)}</span></div>
                        <div>Output: <span className={res.pass ? "text-green-400" : "text-red-400"}>{JSON.stringify(res.actual)}</span></div>
                      </div>
                      {res.logs.length > 0 && (
                        <div className="mt-3 bg-gray-900 rounded-lg p-3">
                          <div className="text-xs font-medium text-gray-400 mb-2">Console Output:</div>
                          {res.logs.map((log, i) => (
                            <div key={i} className="font-mono text-sm text-gray-300">{log}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSAProblemPage;