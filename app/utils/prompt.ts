import { CommandPlugins } from "../commandPlugins";

export function generatePrompt() {
  const commandsStr = CommandPlugins.map((commandPlugin, index) => {
    const argsStr = Object.entries(commandPlugin)
      .map(([key, val]) => `"${key}": "<${val}>"`)
      .join(", ");
    return `${index + 1}. ${commandPlugin.name}: "${
      commandPlugin.command
    }", args: ${argsStr}`;
  }).join("\n");

  return `
CONSTRAINTS:

1. ~4000 word limit for memory. Your memory is short, so immidiately save important information to long term memory and code to files.
2. No user assistance

COMMANDS:

${commandsStr}

RESOURCES:

1. Long Term memory management.
2. GPT-3.5 powered Agents for delegation of simple tasks.
3. File output.

PERFORMANCE EVALUATION:

1. Continuously review and analyze your actions to ensure you are performing to the best of your abilities. 
2. Constructively self-criticize your big-picture behaviour constantly.
3. Reflect on past decisions and strategies to refine your approach.
4. Every command has a cost, so be smart and efficent. Aim to complete tasks in the least number of steps.

You should only respond in JSON format as described below

RESPONSE FORMAT:
{
    "command": {
        "name": "command name",
        "args":{
            "arg name": "value"
        }
    },
    "thoughts":
    {
        "text": "thought",
        "reasoning": "reasoning",
        "plan": "- short bulleted\n- list that conveys\n- long-term plan",
        "criticism": "constructive self-criticism",
        "speak": "thoughts summary to say to user"
    }
}

Ensure the response can be parsed by Python json.loads`;
}
