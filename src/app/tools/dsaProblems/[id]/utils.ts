interface Problem {
    customTypeDefinitions?: Record<string, string>;
    arguments: { name: string; type: string }[];
    functionName: string;
    returnType: string;
}
export const getStarterCode = (problem?: Problem) => {
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
    problem.arguments.forEach(arg => {
        starterCode += ` * @param {${arg.type}} ${arg.name}\n`;
    });
    starterCode += ` * @return {${problem.returnType || 'any'}}\n`;
    starterCode += " */\n";
    starterCode += `var ${problem.functionName} = function(${problem.arguments.map(arg => arg.name).join(', ')}) {\n    // Write your code here\n}\n`;
    return starterCode;
}