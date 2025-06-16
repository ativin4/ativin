interface Problem {
    customTypeDefinitions?: Record<string, string>;
    arguments?: { name: string; type: string }[];
    functionName?: string;
    constructorName?: string;
    returnType: string;
    testCases?: Array<{
        input: unknown[];
        expected: string | number | boolean | null | Array<number | null> | number[];
    }>;
}

const primitiveTypes = ['bigint', 'number', 'string', 'boolean', 'object', 'string[]', 'number[]', 'boolean[]', 'object[]'] as const;

interface RunUserCodeParams {
    code: string;
    problem?: Problem;
}

export const getStarterCode = (problem?: Problem): string => {
    if (!problem) {
        return '';
    }
    let starterCode = '';
    // Print custom type definitions as JSDoc, multi-line, indented, matching user style
    if (problem.customTypeDefinitions) {
        for (const [typeName, def] of Object.entries(problem.customTypeDefinitions)) {
            starterCode += "/**\n";
            starterCode += ` * Definition for a ${typeName} .\n`;
            // Split the definition into lines and indent each line
            def.split('\n').forEach(line => {
                starterCode += ` * ${line}\n`;
            });
            starterCode += " */\n";
        }
    }
    starterCode += "/**\n";
    problem.arguments?.forEach(arg => {
        starterCode += ` * @param {${arg.type}} ${arg.name}\n`;
    });
    starterCode += ` * @return {${problem.returnType}}\n`;
    starterCode += " */\n";
    starterCode += problem.functionName
        ? `var ${problem.functionName} = function(${problem.arguments?.map(arg => arg.name).join(', ')}) {\n    // Write your code here\n}\n`
        : `function ${problem.constructorName}(${problem.arguments?.map(arg => arg.name).join(', ')}) {\n    // Write your code here\n}\n`;
    return starterCode;
}

export const runUserCode = ({code, problem}: RunUserCodeParams): string => {
    if (!problem) {
        return '';
    }
    const { functionName, constructorName, customTypeDefinitions, arguments: args } = problem;
    if (constructorName) {
        return `
                ${code}
                if (typeof ${constructorName} !== 'function') throw new Error('Constructor not found');
                let classDeclaration;
                input[0].forEach((method, i) => {
                    if (method === '${constructorName}'){
                        classDeclaration = new ${constructorName}(...input[1][i]);
                        return null;
                    }
                    if (typeof classDeclaration[method] === 'function') {
                        return classDeclaration[method](...input[1][i]);
                    } 
                    if (typeof classDeclaration[method] === 'object') {
                        return classDeclaration[method] = input[1][i];
                    }
                    throw new Error('Method not found: ' + method);
                })
            `;
    }
    return `
              ${customTypeDefinitions ? Object.values(customTypeDefinitions).join(";"): ""}
              ${code}
              if (typeof ${functionName} !== 'function') throw new Error('Function not found');
              const argumentTypes = ${JSON.stringify(args?.map(arg => arg.type))};
              const primitiveTypes = ${JSON.stringify(primitiveTypes)};
              const wrappedInput = input.map((arg, index) => {
                if (primitiveTypes.includes(argumentTypes[index])) {
                    return arg;
                }
                return new (eval(argumentTypes[index]))(arg);
              });
              return ${functionName}.apply(null, wrappedInput);
            `;
}